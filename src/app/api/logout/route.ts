import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api } from '@/src/lib/axios';
import type { AxiosError } from 'axios';

export const dynamic = 'force-dynamic';

interface LogoutApiResponse {
  success: boolean;
  message?: string;
}

export async function POST() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('auth_token')?.value;
    

    if (!token) {
      console.warn('No auth token found in cookies');
      return NextResponse.json(
        { error: 'No authentication token found' },
        { status: 401 }
      );
    }

    // Add API request timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const response = await api.post<LogoutApiResponse>(
      '/logout',
      {}, // Empty body
      {
        headers: { 
          Authorization: `Bearer ${token}`,
          // 'X-CSRF-TOKEN': '' // Add if required by your API
        },
        signal: controller.signal
      }
    );

    clearTimeout(timeout);

    // Validate API response
    if (!response.data?.success) {
      console.error('API returned unsuccessful logout:', response.data);
      throw new Error(response.data?.message || 'Logout failed on API side');
    }

    // Clear cookie
    const nextResponse = NextResponse.json({ success: true });
    nextResponse.cookies.delete('auth_token');
    
    return nextResponse;

  } catch (error: unknown) {
    console.error('Logout error details:', error);
    
    // Handle Axios errors
    if ((error as AxiosError).isAxiosError) {
      const axiosError = error as AxiosError;
      console.error('API Error Details:', {
        status: axiosError.response?.status,
        data: axiosError.response?.data,
        headers: axiosError.response?.headers
      });
    }

    return NextResponse.json(
      { error: 'Logout failed. Please try again.' },
      { status: 500 }
    );
  }
}