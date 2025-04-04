import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MoveRight, Newspaper } from "lucide-react";
import Link from "next/link";
// import sharp from 'sharp';
// import { useEffect, useState } from "react";





const NewsCard = ({ post }) => {
  const createdDate = new Date(post.$createdAt).toLocaleDateString("ru-RU");

  return (
    <div className="relative w-full h-[22vw] max-xl:h-[24rem] max-md:h-[16rem] overflow-hidden rounded-2xl mb-[1.2rem] group bg-gray-100">
      <div className="relative flex flex-col w-full p-[1.5rem] z-[2] h-full justify-between">
        <div className="text-white w-full flex justify-end">
          <Newspaper />
        </div>
        <div className="flex flex-col text-white">
          <h2 className="text-[1.8rem] leading-relaxed font-[600] line-clamp-2 !leading-10 mb-[1rem] transition-all duration-300 group-hover:mb-[1.5rem] max-md:text-[1.2rem] max-md:!leading-7">
            {post.title}
          </h2>
          <div className="flex flex-row justify-between max-md:text-[0.9rem]">
            <p className="text-white">{createdDate}</p>
            <div className="flex flex-row items-center gap-[0.5rem]">
              <p>Читать новость</p>
              <MoveRight />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-mainAccent to-background/100 md:to-background/40 z-[1] w-full h-full opacity-50 group-hover:opacity-30 transition-opacity duration-300" />

      <Image
        // src={post.imageURL}
        src={`${post.imageURL}&quality=100`} // или &q=100
        quality={100}
        // src={`/api/optimize-image?imageUrl=${encodeURIComponent(post.imageURL)}`}
        // src={`${post.imageURL}&q=100`} // или &q=100
        alt="news_image"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority
        className="w-full h-full bg-cover object-cover z-[0] grayscale-50 group-hover:grayscale-0 transition-all duration-300 saturate-150 backdrop-saturate-125"
      />
    </div>
  );
};
export default NewsCard;
