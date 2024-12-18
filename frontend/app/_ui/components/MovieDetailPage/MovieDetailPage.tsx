import Link from "next/link";
import styles from "./MovieDetailPage.module.css";
import Image from "next/image";
import { useState } from "react";
import { MovieData } from "@/_api/types"; // Adjust the import path accordingly
import AddMovieToListModal from "../UserLists/UserLists";

interface MovieDetailPageProps {
  data: MovieData | null;
  userId: string;
}

export default function MovieDetailPage({
  data,
  userId,
}: MovieDetailPageProps) {
  const [isAddToListModalOpen, setAddToListModalOpen] = useState(false);

  if (!data) {
    return <div>No data available</div>;
  }

  const openAddToListModal = () => {
    setAddToListModalOpen(true);
  };

  const closeAddToListModal = () => {
    setAddToListModalOpen(false);
  };

  return (
    <div className={styles.moviepage}>
      {data.backdrop_path && (
        <div className={styles.backdrop}>
          <Image
            className={styles.image}
            src={`/_assets/films/popularfilms/${data.backdrop_path}`}
            alt={`backdrop for ${data.title}`}
            style={{
              margin: "auto",
              width: "80%",
              height: "auto",
              background: "#191c2d",
              boxShadow: "0 0 20px 20px rgba(0,0,0,0.9)",
            }}
            width={1280}
            height={720}
          />
        </div>
      )}
      <div className={styles.container}>
        <div className={styles.poster}>
          <Image
            className={styles.posterimage}
            priority
            src={
              data.poster_path
                ? `/_assets/films/popularfilms/${data.poster_path}`
                : "/_assets/NOTFOUND.png"
            }
            width={255}
            height={382.5}
            alt="Search for a movie"
          ></Image>
        </div>
        <div className={styles.info}>
          <div className={styles.movietitle}>{data.title}</div>
          <button
            className={styles.addMovieButton}
            onClick={openAddToListModal}
          >
            Add to List
          </button>
          <AddMovieToListModal
            isOpen={isAddToListModalOpen}
            onClose={closeAddToListModal}
            userId={userId}
            movieId={data.id} // Pass the movie ID to the modal
            movieTitle={data.title} 
          />
          <div className={styles.moviedetail}>
            <div className={styles.set}>
              <label> Release Date</label>
              <span> {data.release_date}</span>
            </div>
            <div className={styles.set}>
              <label> Running time</label>
              <span> {data.runtime} minutes</span>
            </div>
            {data.genres && (
              <div className={styles.set}>
                <label> Genre</label>
                <span>
                  {data.genres.map((genre, index) => (
                    <span key={genre.id}>
                      {genre.name}
                      {index !== data.genres.length - 1 && "/"}{" "}
                    </span>
                  ))}
                </span>
              </div>
            )}
            <div className={styles.set}>
              <label> About </label>
              <span>{data.tagline}</span>
              <div className={styles.moviedescription}>{data.overview}</div>
            </div>
            {data.credits && (
              <div className={styles.set}>
                <label> Cast </label>
                <div className={styles.horizontalScroll}>
                  {data.credits.cast.map((entry) => (
                    <div key={entry.id} className={styles.imageItemContainer}>
                      <Link href={`/people/${entry.id}`}>
                        <div className={styles.imageItem}>
                          {entry.profile_path ? (
                            <Image
                              className={styles.castImage}
                              src={`https://image.tmdb.org/t/p/original${entry.profile_path}`}
                              alt={entry.id.toString()}
                              width={50}
                              height={70}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            entry.id
                          )}
                        </div>
                      </Link>
                      <div className={styles.name}>{entry.original_name}</div>
                      <div className={styles.character}> {entry.character}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
