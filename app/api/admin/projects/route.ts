import { NextRequest, NextResponse } from 'next/server'
import { getAdminFromRequest } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const admin = getAdminFromRequest(req)
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const projects = await prisma.project.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    })
    return NextResponse.json(projects, { status: 200 })
  } catch (error) {
    console.error('[GET /api/admin/projects]', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  const admin = getAdminFromRequest(req)
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
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

    if (!name?.trim() || !desc?.trim() || !fullDesc?.trim()) {
      return NextResponse.json(
        { error: 'name, desc, and fullDesc are required' },
        { status: 400 }
      )
    }

    const project = await prisma.project.create({
      data: {
        name: name.trim(),
        emoji: emoji ?? '🚀',
        tags: tags ?? [],
        desc: desc.trim(),
        fullDesc: fullDesc.trim(),
        tech: tech ?? [],
        liveUrl: liveUrl ?? '#',
        ghClientUrl: ghClientUrl ?? '#',
        ghServerUrl: ghServerUrl ?? '#',
        screenshot: screenshot ?? '',
        challenges: challenges ?? [],
        featured: featured ?? false,
        order: order ?? 0,
      },
    })

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error('[POST /api/admin/projects]', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
