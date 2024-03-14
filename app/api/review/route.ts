import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { reviewSchema } from "@/app/validationSchema";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) return NextResponse.json({}, { status: 401 });
  const body = await request.json();
  const validation = reviewSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const newReview = await prisma.review.create({
    data: {
      grade: body.grade,
      description: body.description,
      image: body.image,
      user: body.user,
    },
  });

  return NextResponse.json(newReview, { status: 201 });
}
