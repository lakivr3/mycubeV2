"use client";
import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import "./HomeBlog.css";
import Link from "next/link";
import { Blog } from "@prisma/client";
interface Props {
  news: Blog[];
}

const News = ({ news }: Props) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false); //570-2
  const [isMiddleScreen, setIsMiddleScreen] = useState(false); //880-3
  const [isLargeScreen, setIsLargeScreen] = useState(false); //1190-5

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth <= 1190);

      setIsMiddleScreen(window.innerWidth <= 880);
      setIsSmallScreen(window.innerWidth <= 570);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const truncateString = (str: string, num: number) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };
  return (
    <div className="news">
      <div className="news-h1">
        <h1>Latest news</h1>
      </div>
      <div className="news-blogs">
        {news.map((a, index) => {
          if (isSmallScreen && index >= 2) {
            return null;
          } else if (isMiddleScreen && index >= 3) {
            return null;
          } else if (isLargeScreen && index >= 4) {
            return null;
          } else {
            return (
              <Link key={a.id + index} href={`/blog/${a.id}`}>
                <div key={a.title} className="news-blogs-blog">
                  <div className="container">
                    <img
                      src={a.image}
                      alt={a.title}
                      className="news-blogs-blog-img"
                    />
                    <div className="overlay scale-up-center">
                      <div className="content">
                        <AiOutlinePlus className="aiplus " />
                      </div>
                    </div>
                  </div>
                  <div className="news-blogs-blog-content">
                    <h1 className="news-blogs-blog-content-title">{a.title}</h1>

                    <p className="news-blogs-blog-content-description">
                      {truncateString(a.description, 110)}
                    </p>
                    <p className="news-blogs-blog-content-time">
                      {a.date.toDateString()}
                    </p>
                  </div>
                </div>
              </Link>
            );
          }
        })}
      </div>
    </div>
  );
};

export default News;
