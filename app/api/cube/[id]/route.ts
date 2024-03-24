import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
interface Props {
  params: { id: string };
}

export async function GET(request: NextRequest, { params }: Props) {
  const cubes = await prisma.cube.findUnique({
    where: { id: parseInt(params.id) },
  });
  return NextResponse.json(cubes);
}
