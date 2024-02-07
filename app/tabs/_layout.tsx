import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from "tamagui";

import CharacterForm from "./CharacterForm";

export default function Layout() {
  const [showForm, setShowForm] = useState(false);
  const [films, setFilms] = useState([]);
  const [selectedFilmIndex, setSelectedFilmIndex] = useState(null);
  const [showCrossButton, setShowCrossButton] = useState(true);

  const handleCreateFilm = (film) => {
    setFilms([...films, film]);
    setShowForm(false);
    setShowCrossButton(true);
  };

  const handleEditFilm = (index) => {
    setSelectedFilmIndex(index);
    setShowForm(true);
    setShowCrossButton(false);
  };

  const handleDeleteFilm = (index) => {
    const updatedFilms = [...films];
    updatedFilms.splice(index, 1);
    setFilms(updatedFilms);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setSelectedFilmIndex(null);
    setShowCrossButton(true);
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

      {showCrossButton && (
        <Button
          position="absolute"
          right="$2.5"
          bottom="$2.5"
          style={{
            backgroundColor: "#900000", // Color rojo vino
            borderRadius: "60%", // Borde circular
            padding: "10px", // Ajuste de padding para la posición
            boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.1)" // Sombra para un efecto de elevación
          }}
          onPress={() => {
            setShowForm(true);
            setShowCrossButton(false);
          }}
        >
          <MaterialCommunityIcons
            name="plus"
            size={24}
            color="#fff" // Color del icono
          />
        </Button>
      )}

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
