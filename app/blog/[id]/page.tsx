import "./BlogDetails.scss";
import { notFound } from "next/navigation";
import prisma from "@/prisma/client";
interface Props {
  params: { id: string };
}

const BlogDetails = async ({ params }: Props) => {
  const blog = await prisma.blog.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!blog) notFound();
  return (
    <div className="  smallscreen-blog ">
      <div className="blogdetails">
        <div className="blogdetails-details">
          <div className="blogdetails-details-text">
            <h1 className="blogdetails-details-text-title">{blog.title}</h1>

            <p className="blogdetails-details-text-p">{blog.description}</p>
            <img src={blog.image} alt={blog.title} />
            <p className="blogdetails-details-text-time">
              {blog.date.toDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
