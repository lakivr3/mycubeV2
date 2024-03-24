import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  const news = await prisma.blog.findMany({
    orderBy: { id: "desc" },
  });
  return NextResponse.json(news);
}
