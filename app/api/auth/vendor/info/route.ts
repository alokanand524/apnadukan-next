import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { vendor_id } = await req.json()

    const user = await prisma.user.findFirst({
      where: { vendor_id },
      select: { 
        shop_name: true, 
        vendor_id: true,
        name: true 
      }
    })

    if (!user) return NextResponse.json({ success: false, message: "Vendor not found" }, { status: 404 })

    return NextResponse.json({ success: true, vendor: user })
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 })
  }
}