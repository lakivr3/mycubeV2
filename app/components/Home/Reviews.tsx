import React from "react";
import prisma from "@/prisma/client";
import "./Reviews.css";
import { Avatar } from "@radix-ui/themes";
const mockreviews = [
  {
    id:"review1",
    image: "https://www.geocities.ws/homer564/homerrubix.gif",
    user: "Mark",
    description: "My cube arrived in one day! Well done, thank you.",
    grade: "9",
  },
  {
    id:"review2",
    image: "https://st.depositphotos.com/1695366/1400/v/950/depositphotos_14001287-stock-illustration-cartoon-boy-playing-rubiks-cube.jpg",
    user: "Jake",
    description: "Got my 4x4 cube and it moves like crazy. ",
    grade: "8.5",
  },
  {
    id:"review3",

    image: "https://res.cloudinary.com/teepublic/image/private/s--7AAkt639--/t_Resized%20Artwork/c_fit,g_north_west,h_1054,w_1054/co_ffffff,e_outline:53/co_ffffff,e_outline:inner_fill:53/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_auto,h_313,q_auto:good:420,w_313/v1641856206/production/designs/27106104_1",
    user: "Blake",
    description: "MyCube has them all, they delivered them all on time. I am very satisfied and will definitely buy again!",
    grade: "10",
  },
];

const Testemonials = async () => {
  const reviews = await prisma.review.findMany({
    orderBy: { id: "desc" },
    take: 3,
  });
  const allreviews = [...reviews,...mockreviews].slice(0,3)
  return (
    <div className="rew">
      <h1 className="rew-h1">Reviews</h1>
      <div className="rew-reviews">
        {allreviews.map((review) => (
          <div key={review.id} className="rew-reviews-review">
            <div className="rew-reviews-review-image">
              <Avatar src={review.image!} fallback="?" className="avatar" />
            </div>
            <div className="rew-reviews-review-content">
              <h1 className="rew-reviews-review-content-name">{review.user}</h1>
              <div className="rew-reviews-review-content-line"></div>
              <p className="rew-reviews-review-content-p">
                {review.description}
              </p>
              <p className="rew-reviews-review-content-grade">
                {review.grade}/10
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testemonials;
