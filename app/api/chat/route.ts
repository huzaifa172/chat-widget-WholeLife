// File: app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Replace with your Flask API URL
    const flaskAPIUrl = 'https://chat.wholelife.church/ask';
    
    const response = await fetch(flaskAPIUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    if (!response.ok) {
      throw new Error(`Flask API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error proxying to Flask API:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}