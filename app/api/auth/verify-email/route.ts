import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  if (!token) {
    return new Response("Invalid link", { status: 400 });
  }

  const user = await prisma.user.findFirst({ where: { emailToken: token } });

  if (!user) {
    return new Response("Invalid or expired token", { status: 404 });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      is_email_verified: true,
      emailToken: null,
    },
  });

  return Response.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/login`);
}
