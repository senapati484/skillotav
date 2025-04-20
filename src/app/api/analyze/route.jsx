// File: app/api/analyze/route.jsx

import { NextResponse } from 'next/server';
import PizZip from 'pizzip';
import { DOMParser } from '@xmldom/xmldom';
import {
  analyzeResumeContent,
  calculateFitScore,
  predictRole,
  determineFinalRole
} from '@/lib/ai';

export const config = {
  api: {
    bodyParser: false,
  },
};

function str2xml(str) {
  if (str.charCodeAt(0) === 0xfeff) str = str.slice(1);
  return new DOMParser().parseFromString(str, 'text/xml');
}

function getParagraphs(buffer) {
  const zip = new PizZip(buffer);
  const xml = str2xml(zip.files['word/document.xml'].asText());
  const paras = xml.getElementsByTagName('w:p');
  const paragraphs = [];
  for (let i = 0; i < paras.length; i++) {
    let txt = '';
    const texts = paras[i].getElementsByTagName('w:t');
    for (let j = 0; j < texts.length; j++) {
      const node = texts[j].childNodes[0];
      if (node?.nodeValue) txt += node.nodeValue;
    }
    if (txt.trim()) paragraphs.push(txt.trim());
  }
  return paragraphs;
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('resume');
    const username = formData.get('username');
    if (!file || !username) {
      return NextResponse.json(
        { error: 'Resume and GitHub username are required.' },
        { status: 400 }
      );
    }

    // Buffer the file
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Extract text sections heuristically
    const paragraphs = getParagraphs(buffer);
    const content = {
      workExperience: paragraphs.filter(p => /experience/i.test(p)).join('\n'),
      skills: paragraphs.filter(p => /skill/i.test(p)).join('\n'),
      projects: paragraphs.filter(p => /project/i.test(p)).join('\n'),
      certifications: paragraphs
        .filter(p => /certificate|certification/i.test(p))
        .join('\n'),
    };

    // Do analyses
    const resumeAnalysis = await analyzeResumeContent(content);
    const githubAnalysis = await predictRole(username.trim());
    const fitPercentage = calculateFitScore(githubAnalysis, resumeAnalysis);
    const finalRole = determineFinalRole(githubAnalysis, resumeAnalysis);

    const skills = Array.from(
      new Set([
        ...githubAnalysis.skills,
        ...(resumeAnalysis.factors || []),
      ])
    );
    const recommendations = githubAnalysis.recommendations || [];

    return NextResponse.json({
      fitPercentage,
      finalRole,
      skills,
      recommendations,
    });
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
