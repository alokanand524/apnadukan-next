// /app/api/auth/register/route.ts

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'
import { v4 as uuidv4 } from 'uuid'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { name, email, shop_name, phone, password, planId } = await req.json()

    // Check for duplicate email
    const existing = await prisma.user.findUnique({
      where: { email },
    })

    if (existing) {
      return new Response(JSON.stringify({ success: false, error: "Email already exists" }), {
        status: 400,
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const emailToken = uuidv4()

    const user = await prisma.user.create({
      data: {
        vendor_id: `VD-${Date.now()}`,
        name,
        email,
        shop_name,
        phone: Number(phone) || 0,
        password: hashedPassword,
        planId: Number(planId),
        emailToken,
      },
    })

    // const verifyUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verify-email?token=${emailToken}`

    // const transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: process.env.EMAIL_USER,
    //     pass: process.env.EMAIL_PASS,
    //   },
    // })

    // await transporter.sendMail({
    //   from: process.env.EMAIL_FROM,
    //   to: email,
    //   subject: 'Verify your DukaanDar account',
    //   html: `<p>Hello ${name},</p>
    //          <p>Please verify your email by clicking the link below:</p>
    //          <a href="${verifyUrl}" target="_blank">Verify Email</a>`,
    // })

    return new Response(JSON.stringify({ success: true, message: "Check your email for verification link." }), {
      status: 200,
    })

  } catch (error: any) {
    console.error("Register API error:", error)
    return new Response(JSON.stringify({ success: false, error: error.message || "Something went wrong" }), {
      status: 500,
    })
  }
}
