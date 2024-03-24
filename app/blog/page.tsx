"use client";
import "./Blog.scss";
import { AiOutlinePlus } from "react-icons/ai";
import SectionWrapper from "../components/SectionWrapper";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Blog } from "@prisma/client";
import axios from "axios";

const BlogPage = () => {
  const truncateString = (str: string, num: number) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };
  const {
    data: news,
    error,
    isLoading,
  } = useQuery<Blog[]>({
    queryKey: ["news"],
    queryFn: () => axios.get("/api/news").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });
  if (isLoading) return <h1>Loading...</h1>;

  if (error) return null;

  return (
    <div className="min-h-[100vh]">
      <div className="blog">
        <h1 className="blog-title">News</h1>
        <div className="blog-blogs">
          {news!.map((blog, index) => {
            return (
              <Link href={`/blog/${blog.id}`} key={blog.title}>
                <div className="blog-blogs-blog">
                  <div className="container">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="blog-blogs-blog-img"
                    />
                    <div className="overlay scale-up-center">
                      <div className="content">
                        <AiOutlinePlus className="aiplus hidden hover:flex " />
                      </div>
                    </div>
                  </div>
                  <div className="blog-blogs-blog-content">
                    <h1 className="blog-blogs-blog-content-title">
                      {blog.title}
                    </h1>

                    <p className="blog-blogs-blog-content-description">
                      {truncateString(blog.description, 110)}
                    </p>
                    <p className="blog-blogs-blog-content-time">
                      {/* {blog.date.toDateString} */}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(BlogPage, "blog");
