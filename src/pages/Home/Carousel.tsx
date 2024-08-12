//images
// import banner01 from "../../assets/banner/banner01.jpeg"
// import banner02 from "../../assets/banner/banner02.jpeg"
// import banner03 from "../../assets/banner/banner03.jpeg"
// import banner04 from "../../assets/banner/banner04.jpeg"
// import banner05 from "../../assets/banner/banner05.jpeg"

// const Carousel = () => {
// 	return (
// 		<div className="mx-auto mt-2 h-24 w-10/12 rounded-lg bg-arerBgc"></div>
// 	);
// };
// export default Carousel;

import React, { useState, useRef } from 'react';

import banner01 from "../../assets/banner/banner01.jpeg";
import banner02 from "../../assets/banner/banner02.jpeg";
import banner03 from "../../assets/banner/banner03.jpeg";
import banner04 from "../../assets/banner/banner04.jpeg";
import banner05 from "../../assets/banner/banner05.jpeg";

const images = [banner01, banner02, banner03, banner04, banner05];

const Carousel = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	const touchStartX = useRef<number | null>(null);

	const handlePrev = () => {
		setActiveIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
	};

	const handleNext = () => {
		setActiveIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
	};

	const handleTouchStart = (e: React.TouchEvent) => {
		touchStartX.current = e.touches[0].clientX;
	};

	const handleTouchEnd = (e: React.TouchEvent) => {
		if (touchStartX.current === null) return;

		const touchEndX = e.changedTouches[0].clientX;
		const deltaX = touchEndX - touchStartX.current;

		if (deltaX > 50) {
			handlePrev();
		} else if (deltaX < -50) {
			handleNext();
		}

		touchStartX.current = null;
	};

	return (
		<div
			className="mx-auto mt-2 h-24 w-10/12 rounded-lg bg-arerBgc relative"
			onTouchStart={handleTouchStart}
			onTouchEnd={handleTouchEnd}
		>
			{images.map((image, index) => (
				<img
					key={index}
					src={image}
					alt={`Slide ${index}`}
					className={`absolute w-full h-full object-cover ${index === activeIndex ? 'opacity-100' : 'opacity-0'
						} transition-opacity duration-300`}
				/>
			))}
			<button
				onClick={handlePrev}
				className="absolute top-1/2 left-0 transform -translate-y-1/2 text-white text-4xl font-black h-24 bg-black opacity-50"
			>
				{"<"}
			</button>
			<button
				onClick={handleNext}
				className="absolute top-1/2 right-0 transform -translate-y-1/2 text-white text-4xl font-black h-24 bg-black opacity-50"
			>
				{">"}
			</button>
		</div>
	);
};

export default Carousel;

