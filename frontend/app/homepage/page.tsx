"use client";
import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { mockplayingData } from "@/_api/mockdata";
import { mockpopularData } from "@/_api/mockdata";
import { mocktopratedData } from "@/_api/mockdata";
import "./homepage.css";

interface Movie {
  image: string;
  title: string;
  id: number;
  summary: string;
}

interface MovieListItemProps {
  image: string;
  title: string;
  id: number;
  summary: string;
}

const MovieListItem: React.FC<MovieListItemProps> = ({
  image,
  title,
  id,
  summary,
}) => (
  <div className="movie-list-item">
    <Link href={`/films/${id}`}>
      <Image
        className="movie-list-item-img"
        src={`/_assets/films/popularfilms/${image}`} // Adjust path based on your folder structure within `public`
        alt={title}
        width={14}
        height={33}
      />
    </Link>
    <div className="movie-list-item-title">{title}</div>
    {/* <p className="movie-list-item-desc">{summary}</p> */}
  </div>
);

interface MovieListContainerProps {
  title: string;
  movies: Movie[];
}

const MovieListContainer: React.FC<MovieListContainerProps> = ({
  title,
  movies,
}) => (
  <div className="movie-list-container">
    <h1 className="movie-list-title">{title}</h1>
    <div className="movie-list-wrapper">
      <div className="movie-list">
        {movies.map((movie, index) => (
          <MovieListItem
            key={index}
            id={movie.id}
            image={movie.image}
            title={movie.title}
            summary={movie.summary}
          />
        ))}
      </div>
      <i className="fas fa-chevron-right arrow"></i>
    </div>
  </div>
);

interface FeaturedContentProps {
  image: string;
  title: string;
  summary: string;
}

const FeaturedContent: React.FC<FeaturedContentProps> = ({
  image,
  title,
  summary,
}) => (
  <div className="featured-content">
    <Image
      className="backdrop-image"
      src={`/_assets/films/popularfilms/${image}`}
      alt=""
      width={1400}
      height={1200}
      style={{ height: "auto" }}
    />
    <div className="featured-info">
      <div className="featured-title">{title}</div>
      <div className="featured-desc">{summary}</div>
    </div>
  </div>
);

const HomePage: React.FC = () => {
  const [playingData, setPlayingData] = useState<{
    data: any;
    loading: boolean;
  }>({
    data: null,
    loading: true,
  });

  useEffect(() => {
    const fetchData = async () => {
       
      setPlayingData({ data: mockplayingData, loading: false });
    };
    fetchData();
  }, []);

  const [popularData, setPopularData] = useState<{
    data: any;
    loading: boolean;
  }>({
    data: null,
    loading: true,
  });

  useEffect(() => {
    const fetchData = async () => {

      setPopularData({ data: mockplayingData, loading: false });
    };
    fetchData();
  }, []);
  const [topratedData, setTopRatedData] = useState<{
    data: any;
    loading: boolean;
  }>({
    data: null,
    loading: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      // const data = await getTopRated();
      setTopRatedData({ data: mockplayingData, loading: false });
    };
    fetchData();
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === mockplayingData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? mockplayingData.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === mockplayingData.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000); // 15 seconds

    return () => clearInterval(interval);
  }, [mockplayingData]);

  return (
    <div>
      <div className="container">
        <div className="content-container">
          <FeaturedContent
            image={mockplayingData[currentIndex].backdrop_path}
            title={mockplayingData[currentIndex].title}
            summary={mockplayingData[currentIndex].summary}
          />
          <div
            className="arrow"
            onClick={handlePrev}
            style={{ right: "1340px", top: "350px", fontSize: "60px" }}
          >
            {"<"}
          </div>
          <div
            className="arrow"
            onClick={handleNext}
            style={{ top: "350px", fontSize: "60px" }}
          >
            {">"}
          </div>
          <MovieListContainer title="NEW RELEASES" movies={mockplayingData} />
          <MovieListContainer title="POPULAR" movies={mockpopularData} />
          <MovieListContainer
            title="ALL TIME FAVORITES"
            movies={mocktopratedData}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
