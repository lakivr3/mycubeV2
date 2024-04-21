import React from "react";
import prisma from "@/prisma/client";
import "./Reviews.css";
import { Avatar } from "@radix-ui/themes";

const Testemonials = async () => {
  const reviews = await prisma.review.findMany({
    orderBy: { id: "desc" },
    take: 3,
  });
  return (
    <div className="rew">
      <h1 className="rew-h1">Reviews</h1>
      <div className="rew-reviews">
        {reviews.map((review) => (
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
