import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { vendor_id, current, newPassword, confirmPassword } = await req.json()

    if (newPassword !== confirmPassword) {
      return NextResponse.json({ success: false, message: "Passwords do not match" }, { status: 400 })
    }

    const user = await prisma.user.findFirst({ where: { vendor_id } })

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    const isMatch = await bcrypt.compare(current, user.password)

    if (!isMatch) {
      return NextResponse.json({ success: false, message: "Incorrect current password" }, { status: 401 })
    }

    const hashed = await bcrypt.hash(newPassword, 10)

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashed },
    })

    return NextResponse.json({ success: true, message: "Password updated successfully" })
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 })
  }
}
