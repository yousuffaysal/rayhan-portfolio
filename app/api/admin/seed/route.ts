import { NextRequest, NextResponse } from 'next/server'
import { getAdminFromRequest } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { projectsData } from '@/data/portfolio'

export async function POST(req: NextRequest) {
  const admin = getAdminFromRequest(req)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const existing = await prisma.project.count()
    if (existing > 0) {
      return NextResponse.json({ message: `Already has ${existing} projects — skipped.` }, { status: 200 })
    }

    await prisma.project.createMany({
      data: projectsData.map((p, i) => ({
        name: p.name,
        emoji: p.emoji,
        tags: p.tags,
        desc: p.desc,
        fullDesc: p.fullDesc,
        tech: p.tech,
        liveUrl: p.liveUrl,
        ghClientUrl: p.ghClientUrl,
        ghServerUrl: p.ghServerUrl,
        screenshot: p.screenshot,
        challenges: p.challenges,
        order: i,
        featured: p.tags.includes('Featured'),
      })),
    })

    return NextResponse.json({ message: `Seeded ${projectsData.length} projects.` }, { status: 201 })
  } catch (error) {
    console.error('[POST /api/admin/seed]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
