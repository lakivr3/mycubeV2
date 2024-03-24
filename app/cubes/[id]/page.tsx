import CubeDetails from "@/app/components/CubeDetails/CubeDetails";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

const CubeID = async ({ params }: Props) => {
  const cube = await prisma.cube.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!cube) notFound();
  else
    return (
      <>
        <CubeDetails cube={cube} />
      </>
    );
};

export default CubeID;
