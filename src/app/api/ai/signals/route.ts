import { NextResponse } from 'next/server'

import { getPresenceSnapshot } from '@/lib/ai/presence'

export const GET = async () => NextResponse.json(await getPresenceSnapshot())

