import { NextRequest, NextResponse } from 'next/server'
import { getAdminFromRequest } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

interface RouteContext {
  params: Promise<{ id: string }>
}

export async function GET(req: NextRequest, context: RouteContext) {
  const admin = getAdminFromRequest(req)
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await context.params
    const project = await prisma.project.findUnique({ where: { id } })

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    return NextResponse.json(project, { status: 200 })
  } catch (error) {
    console.error('[GET /api/admin/projects/[id]]', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(req: NextRequest, context: RouteContext) {
  const admin = getAdminFromRequest(req)
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await context.params
    const body = await req.json()
    const {
      name,
      emoji,
      tags,
      desc,
      fullDesc,
      tech,
      liveUrl,
      ghClientUrl,
      ghServerUrl,
      screenshot,
      challenges,
      featured,
      order,
    } = body as {
      name?: string
      emoji?: string
      tags?: string[]
      desc?: string
      fullDesc?: string
      tech?: string[]
      liveUrl?: string
      ghClientUrl?: string
      ghServerUrl?: string
      screenshot?: string
      challenges?: string[]
      featured?: boolean
      order?: number
    }

    const updateData: Record<string, unknown> = {}

    if (name !== undefined) updateData.name = name.trim()
    if (emoji !== undefined) updateData.emoji = emoji
    if (tags !== undefined) updateData.tags = tags
    if (desc !== undefined) updateData.desc = desc.trim()
    if (fullDesc !== undefined) updateData.fullDesc = fullDesc.trim()
    if (tech !== undefined) updateData.tech = tech
    if (liveUrl !== undefined) updateData.liveUrl = liveUrl
    if (ghClientUrl !== undefined) updateData.ghClientUrl = ghClientUrl
    if (ghServerUrl !== undefined) updateData.ghServerUrl = ghServerUrl
    if (screenshot !== undefined) updateData.screenshot = screenshot
    if (challenges !== undefined) updateData.challenges = challenges
    if (featured !== undefined) updateData.featured = featured
    if (order !== undefined) updateData.order = order

    const updated = await prisma.project.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json(updated, { status: 200 })
  } catch (error) {
    console.error('[PUT /api/admin/projects/[id]]', error)
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

    await prisma.project.delete({ where: { id } })
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('[DELETE /api/admin/projects/[id]]', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
