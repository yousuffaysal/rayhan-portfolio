import { NextRequest, NextResponse } from 'next/server'
import { signToken } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { username, password } = body as {
      username?: string
      password?: string
    }

    const validUsername = process.env.ADMIN_USERNAME
    const validPassword = process.env.ADMIN_PASSWORD

    if (
      !username ||
      !password ||
      username !== validUsername ||
      password !== validPassword
    ) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const token = signToken({ username })

    const isProduction = process.env.NODE_ENV === 'production'
    const maxAge = 60 * 60 * 24 * 7 // 7 days in seconds

    const res = NextResponse.json({ success: true }, { status: 200 })
    res.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'strict',
      maxAge,
      path: '/',
    })

    return res
  } catch (error) {
    console.error('[POST /api/admin/login]', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
