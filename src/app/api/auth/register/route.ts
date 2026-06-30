import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, county, occupation, password } = body;

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (name && email && password) {
      if (email === 'exists@example.com') {
        return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
      }
      
      // Mock successful registration
      return NextResponse.json({
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI...mock-jwt-token-register',
        user: {
          name,
          email,
          phone,
          county,
          occupation
        }
      });
    }

    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
