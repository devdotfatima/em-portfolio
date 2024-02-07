"use client";
import Image from "next/image";
import { Chip } from "primereact/chip";
import { Galleria } from "primereact/galleria";
import React, { useRef, useState } from "react";
import { imageData } from "../utils/consts";
import { ImageData } from "../utils/types";

const MasnoryGrid = () => {
	const [activeIndex, setActiveIndex] = useState<number>(0);
	const galleria = useRef<Galleria>(null);
	const [selectedChip, setSelectedChip] = useState("All");

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
		setSelectedChip(label);
	};

	const filteredImages =
		selectedChip === "All"
			? imageData
			: imageData.filter((item) => item.tags.includes(selectedChip));

	const handleThumbnailClick = (index: number) => {
		setActiveIndex(index);
		galleria.current && galleria.current.show();
	};

	return (
		<section className="self-center w-full sm:w-10/12 card ">
			<div className="flex   flex-wrap gap-2 items-center justify-center sm:gap-x-8 gap-y-3 ">
				<Chip
					label="All"
					className={`cursor-pointer w-[40vw] sm:w-fit px-8 flex justify-center hover:bg-purple-400 hover:text-white transform duration-300 ${
						selectedChip === "All" ? "bg-purple-400 text-white" : ""
					}`}
					onClick={() => handleChipClick("All")}
				/>
				{/* Render chips dynamically based on unique tags */}
				{Array.from(new Set(imageData.flatMap((item) => item.tags))).map(
					(tag) => (
						<Chip
							key={tag}
							label={tag}
							className={`cursor-pointer w-[40vw] sm:w-fit px-8 flex justify-center hover:bg-purple-400 hover:text-white transform duration-300 ${
								selectedChip === tag ? "bg-purple-400 text-white" : ""
							}`}
							onClick={() => handleChipClick(tag)}
						/>
					)
				)}
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

			<article className=" w-full mt-20">
				{filteredImages &&
					filteredImages.map((image, index) => (
						<div
							key={index}
							onClick={() => handleThumbnailClick(index)}
						>
							<figure key={index}>
								<figcaption>{image.caption}</figcaption>
								<Image
									className=" cursor-pointer"
									src={image.src}
									alt={`Image ${image.caption}`}
									width={500} // Set your desired width
									height={300} // Set your desired height
								/>
							</figure>
						</div>
					))}
			</article>

			{/* <article className=" w-full mt-20">
				{filteredImages.map((item, index) => (
					<figure key={index}>
						<figcaption>{item.caption}</figcaption>
						<Image
							className=" cursor-pointer"
							src={item.src}
							alt={`Image ${item.caption}`}
							width={500} // Set your desired width
							height={300} // Set your desired height
						/>
					</figure>
				))}
			</article> */}
		</section>
	);
};

export default MasnoryGrid;
