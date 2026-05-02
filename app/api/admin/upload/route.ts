import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(req: NextRequest) {
  const token = (await cookies()).get('admin_token')?.value
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const form = await req.formData()
  const file = form.get('file') as File | null
  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'png'
  const allowed = ['png', 'jpg', 'jpeg', 'webp', 'gif', 'avif']
  if (!allowed.includes(ext)) return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })

  const slug = file.name
    .replace(/\.[^.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  const filename = `${slug}.${ext}`

  const dir = path.join(process.cwd(), 'public', 'projects')
  await mkdir(dir, { recursive: true })
  const dest = path.join(dir, filename)

  const bytes = await file.arrayBuffer()
  await writeFile(dest, Buffer.from(bytes))

  return NextResponse.json({ url: `/projects/${filename}` }, { status: 201 })
}
