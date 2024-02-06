import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from "tamagui";

import CharacterForm from "./CharacterForm";
export default function Layout() {
  const [showForm, setShowForm] = useState(false);
  const [films, setFilms] = useState([]);
  const [selectedFilmIndex, setSelectedFilmIndex] = useState(null);

  const handleCreateFilm = (film) => {
    setFilms([...films, film]);
    setShowForm(false);
  };

  const handleEditFilm = (index) => {
    setSelectedFilmIndex(index);
    setShowForm(true);
  };

  const handleDeleteFilm = (index) => {
    const updatedFilms = [...films];
    updatedFilms.splice(index, 1);
    setFilms(updatedFilms);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setSelectedFilmIndex(null);
  };

  return (
    <>
      {showForm && (
        <CharacterForm
          onSubmit={(film) => {
            if (selectedFilmIndex !== null) {
              const updatedFilms = [...films];
              updatedFilms[selectedFilmIndex] = film;
              setFilms(updatedFilms);
              setSelectedFilmIndex(null);
            } else {
              handleCreateFilm(film);
            }
          }}
          onCancel={handleFormCancel}
          initialCharacter={
            selectedFilmIndex !== null ? films[selectedFilmIndex] : {}
          }
        />
      )}

      <Button
        position="absolute"
        right="$2.5"
        bottom="$2.5"
        onPress={() => setShowForm(true)}
      >
        <MaterialCommunityIcons
          name="plus"
          size={24}
          color="black"
        />
      </Button>

      {films.map((film, index) => (
        <div
          key={index}
          className="film-container"
        >
          <p>{`Film ${index + 1}`}</p>
          <Button onClick={() => handleEditFilm(index)}>Edit</Button>
          <Button onClick={() => handleDeleteFilm(index)}>Delete</Button>
        </div>
      ))}
    </>
  );
}
