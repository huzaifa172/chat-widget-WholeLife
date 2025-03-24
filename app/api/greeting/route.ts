// File: app/api/greeting/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Replace with your Flask API URL
    const flaskAPIUrl = 'https://chat.wholelife.church/start';
    
    const response = await fetch(flaskAPIUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Flask API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching greeting from Flask API:', error);
    return NextResponse.json(
      { status: "false", "start chat": "Hello! How can I help you today?" },
      { status: 200 }
    );
  }
}