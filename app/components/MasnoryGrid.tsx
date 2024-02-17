"use client";
import Image from "next/image";
import { Chip } from "primereact/chip";
import { Galleria } from "primereact/galleria";
import Masonry from "@mui/lab/Masonry";
import { useTheme } from "@mui/material/styles";
import Grow from "@mui/material/Grow";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useEffect, useRef, useState } from "react";
import { images } from "../utils/consts";
import { ImageData } from "../utils/types";

const MasnoryGrid = () => {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const galleria = useRef<Galleria>(null);
  const [selectedChip, setSelectedChip] = useState("All");
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.only("md"));
  const isLg = useMediaQuery(theme.breakpoints.only("lg"));
  const isXl = useMediaQuery(theme.breakpoints.only("xl"));
  const [growAnimation, setGrowAnimation] = useState(true);

  let columns = 1;
  if (isXs) {
    columns = 1;
  } else if (isSm) {
    columns = 2;
  } else if (isMd) {
    columns = 3;
  } else if (isLg) {
    columns = 4;
  } else if (isXl) {
    columns = 5;
  }

  const responsiveOptions = [
    {
      breakpoint: "1024px",
      numVisible: 5,
    },
    {
      breakpoint: "960px",
      numVisible: 4,
    },
    {
      breakpoint: "768px",
      numVisible: 3,
    },
    {
      breakpoint: "560px",
      numVisible: 1,
    },
  ];

  const itemTemplate = (item: ImageData) => {
    return (
      <img
        src={item.src}
        alt={item.caption}
        style={{
          width: "100vw",
          height: "70vh",
          objectFit: "contain",
          display: "block",
        }}
      />
    );
  };

  const thumbnailTemplate = (item: ImageData) => {
    return (
      <img
        src={item.src}
        alt={item.caption}
        style={{
          borderRadius: "0",
          width: "100vw",
          height: "10vh",
          objectFit: "cover",
          display: "block",
        }}
      />
    );
  };

  const handleChipClick = (label: string) => {
    selectedChip !== label && setGrowAnimation(false);
    setSelectedChip(label);
    setTimeout(() => setGrowAnimation(true), 300);
  };
  const filteredImages =
    selectedChip === "All"
      ? images
      : images.filter((item) => item.tags.includes(selectedChip));

  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index);

    galleria.current && galleria.current.show();
  };

  return (
    <section className="self-center w-full sm:w-10/12 card ">
      <div className="flex  mb-10  flex-wrap gap-2 items-center justify-center sm:gap-x-8 gap-y-3 ">
        <Chip
          label="All"
          className={`cursor-pointer w-[40vw] sm:w-fit px-8 flex justify-center hover:bg-purple-400 hover:text-white transform duration-300 ${
            selectedChip === "All" ? "bg-purple-400 text-white" : ""
          }`}
          onClick={() => handleChipClick("All")}
        />
        {/* Render chips dynamically based on unique tags */}
        {Array.from(new Set(images.flatMap((item) => item.tags))).map((tag) => (
          <Chip
            key={tag}
            label={tag}
            className={`cursor-pointer w-[40vw] sm:w-fit px-8 flex justify-center hover:bg-purple-400 hover:text-white transform duration-300 ${
              selectedChip === tag ? "bg-purple-400 text-white" : ""
            }`}
            onClick={() => handleChipClick(tag)}
          />
        ))}
      </div>
      <Galleria
        pt={{
          nextThumbnailButton: { className: "text-white" },
          previousThumbnailButton: { className: "text-white" },
          nextItemButton: {
            className: "bg-white rounded-full w-10 h-10 sm:w-14 sm:h-14",
          },
          previousItemButton: {
            className: "bg-white rounded-full w-10 h-10  sm:w-14 sm:h-14",
          },
          thumbnailItem: { className: " rounded-sm bg-red-400" },

          closeButton: {
            className: "bg-white rounded-full w-10 h-10 m-3 sm:w-14 sm:h-14",
          },
        }}
        responsiveOptions={responsiveOptions}
        ref={galleria}
        value={filteredImages}
        numVisible={7}
        style={{ maxWidth: "50vw" }}
        activeIndex={activeIndex}
        onItemChange={(e) => setActiveIndex(e.index)}
        circular
        fullScreen
        showItemNavigators
        showThumbnails={false}
        item={itemTemplate}
        thumbnail={thumbnailTemplate}
      />

      <Masonry columns={columns} spacing={1}>
        {filteredImages &&
          filteredImages.map((image, index) => (
            <Grow in={growAnimation}>
              <div
                className=" flex justify-center cursor-pointer pointer-events-none sm:pointer-events-auto items-center"
                key={index}
                onClick={() => handleThumbnailClick(index)}
              >
                <Image
                  className="  hover:scale-105 duration-300 ease-in w-11/12 mt-4"
                  src={image.src}
                  alt={`Image ${image.caption}`}
                  width={500} // Set your desired width
                  height={300} // Set your desired height
                />
              </div>
            </Grow>
          ))}
      </Masonry>
    </section>
  );
};

export default MasnoryGrid;
