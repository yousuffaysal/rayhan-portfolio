import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken'
import { NextRequest } from 'next/server'

const JWT_SECRET = process.env.JWT_SECRET as string

export interface AdminPayload extends JwtPayload {
  username: string
}

export function signToken(payload: Record<string, unknown>): string {
  const options: SignOptions = { expiresIn: '7d' }
  return jwt.sign(payload, JWT_SECRET, options)
}

export function verifyToken(token: string): AdminPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminPayload
  } catch {
    return null
  }
}

export function getAdminFromRequest(req: NextRequest): AdminPayload | null {
  const token = req.cookies.get('admin_token')?.value
  if (!token) return null
  return verifyToken(token)
}
