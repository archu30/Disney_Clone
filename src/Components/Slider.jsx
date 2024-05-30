import React, { useEffect, useRef, useState } from 'react';
import GlobalApi from '../Services/GlobalApi'; // Import the entire GlobalApi object
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
const screenWidth = window.innerWidth;

function Slider() {
  const [movieList, setMovieList] = useState([]);
  const elementRef = useRef(null);

  useEffect(() => {
    getTrendingMovies();
  }, []);

  const getTrendingMovies = async () => {
    try {
      const resp = await GlobalApi.getTrendingVideos(); // Call the method from the GlobalApi object
      if (resp && resp.data && resp.data.results) {
        console.log(resp.data.results);
        setMovieList(resp.data.results);
      } else {
        console.error("Response does not contain movie results:", resp);
      }
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    }
  };

  const sliderRight = () => {
    if (elementRef.current) {
      elementRef.current.scrollLeft += screenWidth - 110;
    }
  };

  const sliderLeft = () => {
    if (elementRef.current) {
      elementRef.current.scrollLeft -= screenWidth - 110;
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <HiChevronLeft
        className="hidden md:block text-white text-[30px] absolute mx-8 mt-[150px] cursor-pointer "
        onClick={sliderLeft}
      />
      <HiChevronRight
        className='hidden md:block text-white text-[30px] absolute mx-8 mt-[150px] cursor-pointer right-0'
        onClick={sliderRight}
      />

      <div className='flex overflow-x-auto w-full px-16 py-4 scroll-smooth ' ref={elementRef} style={{ scrollbarWidth: 'none' }}>
        {movieList.map((item) => (
          <img
            key={item.id}
            src={IMAGE_BASE_URL + item.backdrop_path}
            alt={item.title || item.name}
            className='min-w-full md:h-[310px] object-cover object-left-top mr-5 rounded-md hover:border-[4px] border-gray-400 transition-all duration-100 ease-in'
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;
