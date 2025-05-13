import { GoogleGenerativeAI } from "@google/generative-ai";
import mammoth from "mammoth";
import * as cheerio from 'cheerio';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const MAX_RETRIES = 2;
const VALID_ROLES = new Set([
  'Frontend Developer', 'Backend Developer', 'Full Stack Developer',
  'DevOps Engineer', 'Data Scientist', 'ML Engineer', 'Mobile Developer',
  'Cloud Architect', 'Technical Lead', 'Software Developer'
]);
// Combined weights (adjust based on your requirements)
const WEIGHTS = {
    github: 0.5,
    resume: 0.5
  };

async function fetchGitHubData(username) {
  try {
    const headers = {
      'User-Agent': 'SkillChain/1.0',
      ...(process.env.GITHUB_TOKEN && { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` })
    };

    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, { headers }),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100`, { headers })
    ]);

    if (!userRes.ok) throw new Error(`GitHub API error: ${userRes.statusText}`);
    if (!reposRes.ok) throw new Error(`Repositories error: ${reposRes.statusText}`);

    const [userData, repos] = await Promise.all([
      userRes.json(),
      reposRes.json()
    ]);

    const langData = await Promise.all(
      repos.map(async repo => {
        const res = await fetch("/api/analyze", { method: "POST", body: formData });
        const data = await res.json();
        return data;
      })
    );

    return {
      login: userData.login,
      name: userData.name || '',
      bio: userData.bio || '',
      publicRepos: userData.public_repos,
      followers: userData.followers,
      following: userData.following,
      languages: langData.reduce((acc, langs) => {
        Object.entries(langs).forEach(([lang, bytes]) => {
          acc[lang] = (acc[lang] || 0) + bytes;
        });
        return acc;
      }, {}),
      repos
    };

  } catch (error) {
    console.error('GitHub Data Error:', error);
    throw new Error('Failed to fetch GitHub data');
  }
}

function generateRolePrompt(githubData) {
  const totalBytes = Object.values(githubData.languages).reduce((a, b) => a + b, 0);
  const langPercentages = Object.entries(githubData.languages)
    .map(([lang, bytes]) => ({
      lang,
      percent: ((bytes / totalBytes) * 100).toFixed(1)
    }))
    .sort((a, b) => b.percent - a.percent);

  const repoTypes = githubData.repos.reduce((acc, repo) => {
    const isFrontend = repo.topics?.some(t => t.match(/frontend|ui|ux/i));
    const isBackend = repo.topics?.some(t => t.match(/backend|api|server/i));
    const isMobile = repo.topics?.some(t => t.match(/mobile|android|ios/i));
    const isDevOps = repo.topics?.some(t => t.match(/devops|infra|cloud/i));
    const isData = repo.topics?.some(t => t.match(/data|ml|ai/i));
    
    if (isFrontend) acc.frontend++;
    if (isBackend) acc.backend++;
    if (isMobile) acc.mobile++;
    if (isDevOps) acc.devops++;
    if (isData) acc.data++;
    return acc;
  }, { frontend: 0, backend: 0, mobile: 0, devops: 0, data: 0 });

return `
  **Task**: Predict the best technical role for a GitHub user based on their profile data. Analyze the provided data step-by-step, using the role prediction framework to determine the primary specialization, secondary skills, and confidence level. Generate the output in the exact format specified, ensuring it meets all validation rules.

**Profile Data**:
- Username: ${githubData.login}
- Name: ${githubData.name || 'Not Provided'}
- Bio: ${githubData.bio || 'No bio available'}
- Public Repositories: ${githubData.publicRepos}
- Followers: ${githubData.followers}
- Following: ${githubData.following}

**Technical Breakdown**:

1. **Language Distribution**:
${langPercentages.slice(0, 5).map(l => `   - ${l.lang.padEnd(15)} ${l.percent}%`).join('\n')}

2. **Project Distribution**:
   - Frontend: ${repoTypes.frontend} repos
   - Backend: ${repoTypes.backend} repos
   - Mobile: ${repoTypes.mobile} repos
   - DevOps: ${repoTypes.devops} repos
   - Data/ML: ${repoTypes.data} repos

3. **Activity Analysis**:
   - Last active: ${githubData.repos[0]?.pushed_at?.split('T')[0] || 'Unknown'}
   - Avg. commits/month: ${Math.round(githubData.publicRepos * 0.7)} (estimated)
   - Documentation score: ${Math.min(Math.round(githubData.repos.length * 0.2), 5)}/5

**Role Prediction Framework**:

1. **Primary Specialization**:
   - **Step 1: Analyze Project Distribution**:
     - Identify the category (Frontend, Backend, Mobile, DevOps, Data/ML) with the highest number of repositories.
     - Calculate the percentage of total repositories it represents (e.g., Frontend repos / Public Repositories).
     - This is the strongest indicator of specialization unless contradicted by other data.
   - **Step 2: Cross-Verify with Language Distribution**:
     - Map languages to roles using these associations:
       - **Frontend**: JavaScript, TypeScript, HTML, CSS
       - **Backend**: Node.js,Python, Java, Ruby, PHP, C#, Go
       - **Mobile**: Swift, Kotlin, Java (for Android), Objective-C
       - **DevOps**: Shell, YAML, Python (for scripting), PowerShell
       - **Data/ML**: Python, R, Julia, SQL
     - Check if the dominant language(s) align with the top project category. For example, high JavaScript usage supports Frontend; Python could support Backend, DevOps, or Data/ML.
   - **Step 3: Incorporate Topics**:
     - Use repository topics (implicitly reflected in project distribution) to confirm or adjust the specialization.
     - Keywords like "react" or "ui" reinforce Frontend; "aws" or "docker" reinforce DevOps; "machine-learning" reinforces Data/ML.
   - **Decision**:
     - If project distribution, languages, and topics align, select that role.
     - If there’s a conflict (e.g., Python-heavy but mostly Frontend repos), prioritize project distribution, then language distribution.

2. **Secondary Skills**:
   - Identify complementary skills from:
     - Secondary languages in the distribution (e.g., CSS for a Frontend developer).
     - Technologies implied by topics or languages (e.g., React if JavaScript dominates).
     - High documentation score (≥4) suggests documentation skills.
     - High followers (>50) or following (>50) suggests collaboration or leadership skills.
   - Select 3 specific, relevant skills that enhance the primary role.

3. **Confidence Scoring**:
   - Calculate the focus percentage: (Repos in primary category / Total Public Repositories) × 100.
   - Assign confidence:
     - **High**: >60% focus and strong alignment with languages/topics.
     - **Medium**: 40-60% focus or moderate alignment.
     - **Low**: <40% focus or significant ambiguity across data.
   - Adjust downward if language or topic data contradicts the project-based prediction.

**Output Format**:
"Best Role: [Role] | Confidence: [High/Medium/Low] | Recommended Skills: [Skill1, Skill2, Skill3]"

**Valid Roles**:
Frontend Developer, Backend Developer, Full Stack Developer, DevOps Engineer, Data Scientist, ML Engineer, Mobile Developer, Cloud Architect, Technical Lead, Software Developer

**Reasoning Instructions**:
- **Step 1**: Start with project distribution. Which category has the most repositories? What percentage does it represent?
- **Step 2**: Check language distribution. Do the top languages support the project-based role? If not, reconsider the role.
- **Step 3**: Use activity analysis and bio for context (e.g., recent activity confirms relevance; bio might hint at focus).
- **Step 4**: Assign the role, ensuring it’s from the valid list.
- **Step 5**: Pick 3 secondary skills tied to the data.
- **Step 6**: Calculate confidence based on focus percentage and data consistency.
- **Step 7**: Handle special cases if applicable.

**Examples**:

1. **Clear Frontend Case**:
   - Languages: JavaScript 80%, HTML 10%, CSS 10%
   - Projects: Frontend 20, Backend 1
   - Reasoning: 20/21 repos = 95% Frontend, JavaScript aligns, high focus.
   - Output: "Best Role: Frontend Developer | Confidence: High | Recommended Skills: JavaScript, React, CSS"

2. **Ambiguous Multi-Domain**:
   - Languages: Python 50%, JavaScript 30%, SQL 20%
   - Projects: Backend 5, Data/ML 5, Frontend 3
   - Reasoning: No clear majority (5/13 = 38% Backend), Python could be Backend or Data/ML, JavaScript suggests Frontend. Full Stack possible due to diversity.
   - Output: "Best Role: Full Stack Developer | Confidence: Low | Recommended Skills: Python, JavaScript, SQL"

3. **Junior Developer**:
   - Languages: JavaScript 100%
   - Projects: Frontend 3
   - Bio: "Learning to code"
   - Reasoning: 3 repos = 100% Frontend but low repo count indicates beginner.
   - Output: "Best Role: Junior Frontend Developer | Confidence: Medium | Recommended Skills: JavaScript, HTML, CSS"

**Special Cases**:
- **Junior Developers**: If Public Repositories < 5 or bio includes "beginner", "learning", or similar, prefix role with "Junior".
- **Technical Writer**: If documentation score ≥4 and repos < 5 (indicating low coding activity), suggest "Technical Writer" with skills like "Documentation, Markdown, Technical Writing".
- **Technical Lead**: If followers > 100, Public Repositories > 20, and multiple categories have >20% focus, suggest "Technical Lead".

**Validation Rules**:
1. Output must exactly match the format: "Best Role: [Role] | Confidence: [High/Medium/Low] | Recommended Skills: [Skill1, Skill2, Skill3]".
2. Role must be from the valid list (case-sensitive).
3. Skills must be specific (e.g., "React", not "Programming") and tied to languages or topics.
4. Confidence must reflect the calculated focus percentage and data alignment.

**Edge Case Handling**:
- If data is insufficient (e.g., no repos or languages), output: "Best Role: Software Developer | Confidence: Low | Recommended Skills: General Programming, Version Control, Problem Solving".
- If specialization is unclear, lean toward "Software Developer" or "Full Stack Developer" with "Low" confidence.

**Final Note**:
Reason through each step carefully. Prioritize data-driven decisions over assumptions, and ensure the output is precise and validated.
`


//   return `
// **GitHub Profile Analysis for Technical Role Prediction**

// **Profile Data**:
// - Username: ${githubData.login}
// - Name: ${githubData.name || 'Not Provided'}
// - Bio: ${githubData.bio || 'No bio available'}
// - Public Repositories: ${githubData.publicRepos}
// - Followers: ${githubData.followers}
// - Following: ${githubData.following}

// **Technical Breakdown**:

// 1. **Language Distribution**:
// ${langPercentages.slice(0, 5).map(l => `  - ${l.lang.padEnd(15)} ${l.percent}%`).join('\n')}

// 2. **Project Distribution**:
//    - Frontend: ${repoTypes.frontend} repos
//    - Backend: ${repoTypes.backend} repos
//    - Mobile: ${repoTypes.mobile} repos
//    - DevOps: ${repoTypes.devops} repos
//    - Data/ML: ${repoTypes.data} repos

// 3. **Activity Analysis**:
//    - Last active: ${githubData.repos[0]?.pushed_at?.split('T')[0] || 'Unknown'}
//    - Avg. commits/month: ${Math.round(githubData.publicRepos * 0.7)} (estimated)
//    - Documentation score: ${Math.min(Math.round(githubData.repos.length * 0.2), 5)}/5

// **Role Prediction Framework**:

// 1. **Primary Specialization**:
//    Identify dominant technical area based on:
//    - Language distribution weights
//    - Project type concentration
//    - Repository topics analysis

// 2. **Secondary Skills**:
//    Identify complementary skills from:
//    - Supporting technologies in projects
//    - Documentation quality
//    - Community engagement metrics

// 3. **Confidence Scoring**:
//    - High: >60% focus in one domain
//    - Medium: 40-60% primary focus
//    - Low: <40% focus in any domain

// **Output Requirements**:
// \`\`\`
// "Best Role: [Role] | Confidence: [High/Medium/Low] | Recommended Skills: [Skill1, Skill2, Skill3]"
// \`\`\`

// **Valid Roles**:
// ${Array.from(VALID_ROLES).join(', ')}

// **Examples**:
// 1. Frontend: "Best Role: Frontend Developer | Confidence: High | Recommended Skills: React, TypeScript, Webpack"
// 2. DevOps: "Best Role: DevOps Engineer | Confidence: Medium | Recommended Skills: AWS, Kubernetes, Terraform"
// 3. Generalist: "Best Role: Full Stack Developer | Confidence: Low | Recommended Skills: Node.js, React, PostgreSQL"

// **Special Cases**:
// - Junior Developers: Add "Junior" prefix
// - Non-code Contributions: Suggest "Technical Writer"
// - Multiple Domains: Recommend "Technical Lead"

// **Validation Rules**:
// 1. Match regex: /^Best Role: (.+) \\| Confidence: (High|Medium|Low) \\| Recommended Skills: (.+)$/
// 2. Skills must appear in language distribution or project topics
// 3. Confidence level must match calculated weights
//   `;
}

function validateGeminiResponse(text) {
  try {
    const cleanText = text.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
    const pattern = /Best Role: (.+) \| Confidence: (High|Medium|Low) \| Recommended Skills: (.+)/i;
    const match = cleanText.match(pattern);

    if (!match) throw new Error('Invalid response format');
    
    const [, role, confidence, skills] = match;
    const normalizedRole = role.trim().toLowerCase();

    if (!Array.from(VALID_ROLES).some(r => r.toLowerCase() === normalizedRole)) {
      throw new Error(`Invalid role: ${role}`);
    }

    return {
      role: role.trim(),
      confidence: confidence.trim(),
      skills: skills.split(',').map(s => s.trim())
    };
  } catch (error) {
    console.error('Validation Error:', error.message);
    throw new Error(`Response validation failed: ${error.message}`);
  }
}

export async function predictRole(username) {
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const githubData = await fetchGitHubData(username);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      
      const prompt = generateRolePrompt(githubData);
      const result = await model.generateContent(prompt);
      const response = await result.response.text();
      
      return validateGeminiResponse(response);

    } catch (error) {
      if (attempt === MAX_RETRIES) {
        console.error('Prediction failed after retries');
        return {
          role: 'Software Developer',
          confidence: 'Low',
          skills: ['General Programming']
        };
      }
      await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
      console.warn(`Retrying... Attempt ${attempt + 1}`);
    }
  }
}

// New Resume Analysis Functions
export async function parseResumeDocx(buffer) {
    try {
      if (buffer.slice(0, 4).toString('hex') !== '504b0304') {
        throw new Error('Invalid DOCX file format');
      }
      const { value: html } = await mammoth.convertToHtml({ buffer });
      const $ = cheerio.load(html);
      
      // Extract sections using heuristic parsing
      const sections = {
        workExperience: extractSection($, ['work experience', 'experience']),
        skills: extractSection($, ['skills', 'technical skills']),
        projects: extractSection($, ['projects', 'key projects']),
        certifications: extractSection($, ['certifications', 'certificates'])
      };
  
      return {
        rawText: html,
        ...sections
      };
    } catch (error) {
      console.error('Resume Parsing Error:', error);
      throw new Error('Failed to parse resume document');
    }
  }
  
  function extractSection($, possibleTitles) {
    for (const title of possibleTitles) {
      const element = $(`*:contains("${title}")`).filter((i, el) => {
        const text = $(el).text().toLowerCase().trim();
        return text === title.toLowerCase();
      }).first();
  
      if (element.length > 0) {
        let content = '';
        let next = element.next();
        while (next.length > 0 && !next.is('h1, h2, h3')) {
          content += next.text() + '\n';
          next = next.next();
        }
        return content.trim();
      }
    }
    return '';
  }
  
  export async function analyzeResumeContent(content) {
    try {
        if (!content || Object.values(content).every(v => !v)) {
            throw new Error("Resume content is empty");
          }
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      
      const prompt = `
        Analyze this resume content and predict the best technical role:
        - Work Experience: ${content.workExperience || 'Not provided'}
        - Skills: ${content.skills || 'Not provided'}
        - Projects: ${content.projects || 'Not provided'}
        - Certifications: ${content.certifications || 'Not provided'}
  
        Respond in format: 
        "Best Role: [Role] | Confidence: [High/Medium/Low] | Key Factors: [Factor1, Factor2, Factor3]"
  
        Valid Roles: ${Array.from(VALID_ROLES).join(', ')}
        Consider: Skill relevance, project complexity, industry certifications
      `;
  
      const result = await model.generateContent(prompt);
      const text = await result.response.text();
      return validateResumeResponse(text);
    } catch (error) {
        console.error('Resume Analysis Error:', error);
        throw new Error(`Resume analysis failed: ${error.message}`);
      }
  }
  
  function validateResumeResponse(text) {
    const pattern = /Best Role: (.+) \| Confidence: (High|Medium|Low) \| Key Factors: (.+)/i;
    const match = text.match(pattern);
  
    if (!match) throw new Error('Invalid resume response format');
    
    const [, role, confidence, factors] = match;
    if (!VALID_ROLES.has(role.trim())) {
      throw new Error(`Invalid role from resume: ${role}`);
    }
  
    return {
      role: role.trim(),
      confidence: confidence.trim(),
      factors: factors.split(',').map(f => f.trim())
    };
  }
  
  // Combined Analysis Algorithm
  export function calculateFitScore(githubData, resumeData) {
    // Convert confidence to numerical values
    const confidenceValues = {
      High: 0.9,
      Medium: 0.7,
      Low: 0.5
    };
  
    // Calculate base scores
    const githubScore = confidenceValues[githubData.confidence] * WEIGHTS.github;
    const resumeScore = confidenceValues[resumeData.confidence] * WEIGHTS.resume;
  
    // Role alignment bonus
    const roleMatchBonus = githubData.role === resumeData.role 
      ? 0.15 
      : rolesAreRelated(githubData.role, resumeData.role) 
        ? 0.08 
        : 0;
  
    // Skill overlap bonus
    const skillOverlap = calculateSkillOverlap(
      githubData.skills, 
      resumeData.factors
    );
    const skillBonus = skillOverlap * 0.1;
  
    // Total score with bounds
    const totalScore = Math.min(
      Math.max(
        githubScore + resumeScore + roleMatchBonus + skillBonus,
        0
      ),
      1
    );
  
    return Math.round(totalScore * 100);
  }
  
  function rolesAreRelated(role1, role2) {
    const roleGroups = {
      'Frontend Developer': ['Full Stack Developer', 'Technical Lead'],
      'Backend Developer': ['Full Stack Developer', 'Technical Lead'],
      'DevOps Engineer': ['Cloud Architect', 'Technical Lead'],
      'Data Scientist': ['ML Engineer', 'Technical Lead']
    };
  
    return roleGroups[role1]?.includes(role2) || 
           roleGroups[role2]?.includes(role1);
  }
  
  function calculateSkillOverlap(githubSkills, resumeFactors) {
    const normalizedSkills = githubSkills.map(s => s.toLowerCase());
    const normalizedFactors = resumeFactors.map(f => f.toLowerCase());
    
    return normalizedSkills.filter(s => 
      normalizedFactors.some(f => f.includes(s))
    ).length / normalizedSkills.length;
  }

  export function determineFinalRole(githubAnalysis, resumeAnalysis) {
    const confidenceValues = { High: 0.9, Medium: 0.7, Low: 0.5 };
    const githubScore =
      (confidenceValues[githubAnalysis.confidence] || 0) * WEIGHTS.github;
    const resumeScore =
      (confidenceValues[resumeAnalysis.confidence] || 0) * WEIGHTS.resume;
    return githubScore >= resumeScore
      ? githubAnalysis.role
      : resumeAnalysis.role;
  }

  