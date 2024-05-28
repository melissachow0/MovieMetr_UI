"use client";
import styles from "./movielist.module.css";
import { useEffect, useState } from "react";
import { getListInfo, getMovieInfo } from "@/_api/lists";
import Link from "next/link";
import { updateList, deleteMovieFromList } from "@/_api/lists";


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

  const handleEditClick = () => {
    setIsEditing(true);
    setNewName(listData.details.name);
  };

  const handleCancelEditClick = () => {
    setIsEditing(false);
    setNewName("");
  };

  const handleSaveClick = async () => {
    await updateList(params.listid, newName);
    setIsEditing(false);
    // Refresh list data
    // fetchData();
  };

  const handleDeleteMovieClick = async (movieId: string) => {
    await deleteMovieFromList(params.listid, movieId);
    // Refresh list data
    // fetchData();
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getListInfo(params.listid);
      const moviePromises = data.entries.map((entry: { item_id: string; }) => getMovieInfo(entry.item_id));
      const movieInfos = await Promise.all(moviePromises);
      for (let i = 0; i < data.entries.length; i++) { // movies load faster
        data.entries[i].imageUrl = `https://image.tmdb.org/t/p/original${movieInfos[i].image_path}`;
        data.entries[i].name = movieInfos[i].title;
        data.entries[i].id = movieInfos[i]._id;
      }
      setListData({ details: data, loading: false });
    };
    fetchData();
  }, [params.listid]);

  return (
    <div className={styles.container}>
      {listData.loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className={styles.header}>
            <h1 className={styles.listName}>{listData.details.name}</h1>
            {isEditing ? (
              <form
                className={styles.EditListForm}
                onSubmit={handleSaveClick}
              >
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
                <button type="submit">Save</button>
                <button type="button" onClick={handleCancelEditClick}>Cancel</button>
              </form> 
            ) : (
              <button className={styles.editlistButton} onClick={handleEditClick}>Edit</button>
            )}
          </div>
          <div className={styles.movieGrid}>
            {listData.details.entries.map((entry: any, index: number) => (
              <div key={index} className={styles.movieItem}>
                <img
                  src={entry.imageUrl}
                  alt={entry.item_id}
                  className={styles.movieImage}
                />
                {isEditing && (
                  <div className={styles.overlay}>
                    <button onClick={() => handleDeleteMovieClick(entry.id)}>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
