// File: app/api/predict-role/route.jsx

import { NextResponse } from 'next/server';
import { predictRole } from '@/lib/ai';

export async function POST(request) {
  try {
    const { username } = await request.json();
    if (!username || typeof username !== 'string' || username.length < 3) {
      return NextResponse.json(
        { error: 'Invalid GitHub username.' },
        { status: 400 }
      );
    }
    const result = await predictRole(username.trim());
    return NextResponse.json(result);
  } catch (error) {
    console.error('predict-role error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
