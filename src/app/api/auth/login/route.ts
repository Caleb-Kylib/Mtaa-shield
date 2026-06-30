import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (email && password) {
      if (password === 'wrongpassword') {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
      }
      
      // Mock successful login
      return NextResponse.json({
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI...mock-jwt-token',
        user: {
          name: email.split('@')[0],
          email: email,
        }
      });
    }

    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
