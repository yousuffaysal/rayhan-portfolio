import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, subject, message } = body as {
      name?: string
      email?: string
      subject?: string
      message?: string
    }

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'name, email, and message are required' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'A valid email address is required' },
        { status: 400 }
      )
    }

    await prisma.message.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        subject: subject?.trim() ?? null,
        message: message.trim(),
      },
    })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error('[POST /api/contact]', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
