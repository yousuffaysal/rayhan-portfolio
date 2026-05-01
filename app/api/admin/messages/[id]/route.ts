import { NextRequest, NextResponse } from 'next/server'
import { getAdminFromRequest } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

interface RouteContext {
  params: Promise<{ id: string }>
}

export async function PATCH(req: NextRequest, context: RouteContext) {
  const admin = getAdminFromRequest(req)
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await context.params
    const body = await req.json()
    const {
      read,
      replied,
      replyText,
    } = body as {
      read?: boolean
      replied?: boolean
      replyText?: string
    }

    const updateData: Record<string, unknown> = {}

    if (read !== undefined) updateData.read = read
    if (replied !== undefined) updateData.replied = replied
    if (replyText !== undefined) updateData.replyText = replyText

    // If marking as replied with a replyText, record the timestamp
    if (replied === true && replyText) {
      updateData.repliedAt = new Date()
    }

    const updated = await prisma.message.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json(updated, { status: 200 })
  } catch (error) {
    console.error('[PATCH /api/admin/messages/[id]]', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  const admin = getAdminFromRequest(req)
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await context.params

    await prisma.message.delete({ where: { id } })
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('[DELETE /api/admin/messages/[id]]', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
