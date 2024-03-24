import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  const cubes = await prisma.cube.findMany({
    orderBy: { id: "asc" },
  });
  return NextResponse.json(cubes);
}
