import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 })
    }

    // Optional: Uncomment this if you're using email verification
    // if (!user.is_email_verified) {
    //   return NextResponse.json({ success: false, error: "Please verify your email" }, { status: 401 })
    // }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 })
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    )

    // ✅ Add vendor_id and shop_name to response
    return NextResponse.json({
      success: true,
      token,
      vendor_id: user.vendor_id,
      shop_name: user.shop_name,
    }, { status: 200 })

  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
