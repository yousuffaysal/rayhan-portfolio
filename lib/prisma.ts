import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

let _client: PrismaClient | undefined

function getClient(): PrismaClient {
  if (!_client) {
    const pool = new pg.Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    })
    _client = new PrismaClient({ adapter: new PrismaPg(pool) })
  }
  return _client
}

// Proxy defers pool creation until first property access (inside a route handler,
// after Next.js has injected env vars into process.env)
export const prisma = new Proxy({} as PrismaClient, {
  get(_, prop) {
    return (getClient() as unknown as Record<string | symbol, unknown>)[prop]
  },
})

export default prisma
