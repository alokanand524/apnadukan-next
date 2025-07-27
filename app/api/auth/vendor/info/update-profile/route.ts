import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function POST(req: Request) {
    try {
        const { vendor_id, name, shop_name, email, phone } = await req.json()

        await prisma.user.updateMany({
            where: { vendor_id },
            data: { name, shop_name, email, phone },
        })


        return NextResponse.json({
            success: true,
            message: "Profile updated successfully",
        })
    } catch (err: any) {
        return NextResponse.json({
            success: false,
            message: err.message,
        }, { status: 500 })
    }
}
