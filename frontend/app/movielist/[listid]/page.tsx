"use client";
import styles from "./movielist.module.css";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { mockplayingData, MovieLists } from "@/_api/mockdata";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import Image from "next/image";

interface Entry {
  item_id: string;
  imageUrl?: string;
  name?: string;
  id?: string;
}

export default function MovieListPage({
  params,
}: {
  params: { listid: string };
}) {
  const [listData, setListData] = useState<any>({
    details: null,
    loading: true,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDescription, setnewDescription] = useState("");
  const [showAddIcon, setShowAddIcon] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
    setNewName(listData.details.name);
    setShowAddIcon(true);
  };

  const handleCancelEditClick = () => {
    setIsEditing(false);
    setNewName("");
    setShowAddIcon(false);
  };

  const handleSaveClick = async () => {
    const finalName = newName !== "" ? newName : listData.details.name;
    const finalDescription =
      newDescription !== "" ? newDescription : listData.details.description;

    // Use the mock function to update the list
    updateMockList(params.listid, finalName, finalDescription);
    setIsEditing(false);
    fetchData();
  };

  const handleDeleteMovieClick = async (
    event: React.MouseEvent,
    movieId: string
  ) => {
    deleteMockMovieFromList(params.listid, movieId);
    event.stopPropagation();
    event.preventDefault();
    fetchData();
  };

  const handleDescriptionClick = () => {
    setShowFullDescription(!showFullDescription);
  };

  const fetchData = useCallback(() => {
    const data = MovieLists.find((list) => list._id === params.listid);
    if (data) {
      const movieInfos = data.entries.map((entry) => {
        const movie = mockplayingData.find((movie) => movie.id === parseInt(entry.item_id));
        return {
          ...entry,
          imageUrl: movie?.image,
          name: movie?.title,
          id: movie?.id,
        };
      });
      setListData({ details: { ...data, entries: movieInfos }, loading: false });
    }
  }, [params.listid]);

  useEffect(() => {
    fetchData();
  }, [params.listid, fetchData]);

  // Mock function to update the list data
  const updateMockList = (listId: string, updatedName: string, updatedDescription: string) => {
    const listIndex = MovieLists.findIndex(list => list._id === listId);
    if (listIndex !== -1) {
      MovieLists[listIndex] = {
        ...MovieLists[listIndex],
        name: updatedName,
        description: updatedDescription,
      };
    } else {
      console.error("List not found");
    }
  };

  // Mock function to delete a movie from a list
  const deleteMockMovieFromList = (listId: string, movieId: string) => {
    const list = MovieLists.find((list) => list._id === listId);
    if (list) {
      list.entries = list.entries.filter((entry) => entry.item_id !== movieId);
    } else {
      console.error("List not found");
    }
  };

  return (
    <div className={styles.container}>
      {listData.loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className={styles.header}>
            <div className={styles.listHeader}>
              <h1 className={styles.listName}>{listData.details.name}</h1>
              {!isEditing && (
                <IconButton
                  style={{ color: "white" }}
                  onClick={handleEditClick}
                >
                  <EditIcon style={{ fontSize: 30 }} />
                </IconButton>
              )}
              {showAddIcon && (
                <Link href={`/search`}>
                  <IconButton style={{ color: "white" }}>
                    <AddIcon style={{ fontSize: 30 }} />
                  </IconButton>
                </Link>
              )}
            </div>
            {isEditing && (
              <form className={styles.EditListForm} onSubmit={handleSaveClick}>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
                <input
                  type="text"
                  value={newDescription}
                  onChange={(e) => setnewDescription(e.target.value)}
                />
                <button type="submit">Save</button>
                <button type="button" onClick={handleCancelEditClick}>
                  Cancel
                </button>
              </form>
            )}
          </div>
          <p
            className={styles.listDescription}
            onClick={handleDescriptionClick}
          >
            {showFullDescription
              ? listData.details.description || "No description available"
              : `${listData.details.description?.substring(0, 100) || "No description available"}...`}
          </p>
          <div className={styles.movieGrid}>
            {listData.details.entries.map((entry: any, index: number) => (
              <div key={index} className={styles.movieItem}>
                <div className={styles.imageContainer}>
                  <Link href={`/films/${entry.id}`}>
                    <Image
                      width={200}
                      height={200}
                      src={`/_assets/films/popularfilms/${entry.imageUrl}`}
                      alt={entry.item_id}
                      className={styles.movieImage}
                    />
                  </Link>
                  {isEditing && (
                    <div className={styles.overlay}>
                      <button
                        onClick={(event) =>
                          handleDeleteMovieClick(event, entry.id)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
