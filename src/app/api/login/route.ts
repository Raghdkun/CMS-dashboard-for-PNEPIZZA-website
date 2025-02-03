// app/api/login/route.ts
import { api } from "@/src/lib/axios";
import { NextResponse } from "next/server";

interface LoginSuccessResponse {
  data: {
    id: number;
    name: string;
    email: string;
  };
  token: string;
}

interface LoginErrorResponse {
  msg: string;
}

type LoginResponse = LoginSuccessResponse | LoginErrorResponse;

export async function POST(request: Request) {
  const credentials = await request.json();
  
  try {
    const response = await api.post<LoginResponse>('/login', credentials);
    const data = response.data;

    if ('msg' in data) {
      return NextResponse.json({ error: data.msg }, { status: 401 });
    }

    const nextResponse = NextResponse.json({ data: data.data });
    
    // Set HTTP-only cookie securely
    nextResponse.cookies.set('auth_token', data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    
    return nextResponse;
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: error.response?.data?.msg || 'Login failed' },
      { status: 401 }
    );
  }
}