import AboutUs from "./components/Home/AboutUs";
import Products from "./components/Home/Products";
import RubiksImage from "./components/Home/RubiksImage";
import Reviews from "@/app/components/Home/Reviews";
import prisma from "@/prisma/client";

export default async function Home() {
  const newcubes = await prisma.cube.findMany({
    where: { category: "NEW_CUBES" },
  });
  const bestsellers = await prisma.cube.findMany({
    where: { category: "BEST_SELLER" },
  });

  return (
    <>
      <RubiksImage />
      <Products cubes={newcubes} />
      <AboutUs />
      <Products cubes={bestsellers} />
      <Reviews />
    </>
  );
}
