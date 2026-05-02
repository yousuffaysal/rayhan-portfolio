import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken'
import { NextRequest } from 'next/server'

export interface AdminPayload extends JwtPayload {
  username: string
}

function secret(): string {
  const s = process.env.JWT_SECRET
  if (!s) throw new Error('JWT_SECRET env var is not set')
  return s
}

export function signToken(payload: Record<string, unknown>): string {
  const options: SignOptions = { expiresIn: '7d' }
  return jwt.sign(payload, secret(), options)
}

export function verifyToken(token: string): AdminPayload | null {
  try {
    return jwt.verify(token, secret()) as AdminPayload
  } catch {
    return null
  }
}

export function getAdminFromRequest(req: NextRequest): AdminPayload | null {
  const token = req.cookies.get('admin_token')?.value
  if (!token) return null
  return verifyToken(token)
}
