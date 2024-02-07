import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button, Text, View } from "tamagui";

import FilmsForm from "./Films";

export default function Layout() {
  const [showForm, setShowForm] = useState(false);
  const [films, setFilms] = useState([]);
  const [selectedFilmIndex, setSelectedFilmIndex] = useState(null);
  const [showCrossButton, setShowCrossButton] = useState(true);
  const [showBackendData, setShowBackendData] = useState(true);

  useEffect(() => {
    fetchFilmsFromBackend();
  }, []);

  const fetchFilmsFromBackend = async () => {
    try {
      const response = await fetch("http://10.0.8.224:8088/film");
      const data = await response.json();
      setFilms(data);
    } catch (error) {
      console.error("Error al obtener los datos del servidor:", error);
    }
  };

  const handleFilmClick = (index) => {
    setSelectedFilmIndex(selectedFilmIndex === index ? null : index);
  };

  const handleEditFilm = (index) => {
    setSelectedFilmIndex(index);
    setShowForm(true);
    setShowCrossButton(false);
    setShowBackendData(false);
  };

  const handleDeleteFilm = async (id) => {
    try {
      const response = await fetch(`http://10.0.8.224:8088/film/delete/${id}`, {
        method: "DELETE"
      });
      if (response.ok) {
        const updatedFilms = films.filter((film) => film.id !== id);
        setFilms(updatedFilms);
        setSelectedFilmIndex(null);
      } else {
        console.error("Error al eliminar la película del servidor");
      }
    } catch (error) {
      console.error("Error al eliminar la película:", error);
    }
  };

  return (
    <>
      {showForm && (
        <FilmsForm
          onSubmit={async (film) => {
            try {
              const updatedFilms = [...films];
              if (selectedFilmIndex !== null) {
                const response = await fetch(
                  `http://10.0.8.224:8088/film/${selectedFilmIndex}`,
                  {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify(film)
                  }
                );
                if (response.ok) {
                  updatedFilms[selectedFilmIndex] = film;
                } else {
                  console.error(
                    "Error al actualizar la película en el servidor"
                  );
                }
              } else {
                const response = await fetch("http://10.0.8.224:8088/film", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify(film)
                });
                if (response.ok) {
                  updatedFilms.push(film);
                } else {
                  console.error("Error al agregar la película en el servidor");
                }
              }
              setFilms(updatedFilms);
              setSelectedFilmIndex(null);
              setShowForm(false);
              setShowCrossButton(true);
              setShowBackendData(true);
            } catch (error) {
              console.error("Error al procesar la película:", error);
            }
          }}
          onCancel={() => {
            setShowForm(false);
            setShowCrossButton(true);
            setShowBackendData(true);
          }}
          initialFilm={
            selectedFilmIndex !== null ? films[selectedFilmIndex] : {}
          }
        />
      )}

      {showCrossButton && (
        <Button
          position="absolute"
          right="$6"
          bottom="$2.5"
          onPress={() => {
            setShowForm(true);
            setShowCrossButton(false);
            setShowBackendData(false);
          }}
          style={{
            backgroundColor: "#900000",
            borderRadius: 50,
            padding: 10,
            height: 84,
            width: 84,
            position: "absolute",
            top: 710
          }}
        >
          <MaterialCommunityIcons
            name="plus"
            size={60}
            color="#fff"
            style={{ borderRadius: 50 }}
          />
        </Button>
      )}

      <View style={styles.filmsListContainer}>
        {showBackendData &&
          films.map((film, index) => (
            <View
              key={index}
              style={styles.filmContainer}
            >
              <Button onPress={() => handleFilmClick(index)}>
                <View style={styles.filmBox}>
                  <Text style={styles.filmText}>{`Film ${index + 1}`}</Text>
                </View>
              </Button>
              {selectedFilmIndex === index && (
                <View style={styles.filmDetails}>
                  <Text style={styles.detailLabel}>Title:</Text>
                  <Text style={styles.detailText}>{film.title}</Text>
                  <Text style={styles.detailLabel}>Duration:</Text>
                  <Text style={styles.detailText}>{film.duration}</Text>
                  <Text style={styles.detailLabel}>Director:</Text>
                  <Text style={styles.detailText}>{film.director}</Text>
                  <View style={styles.buttonContainer}>
                    <Button onPress={() => handleEditFilm(index)}>Edit</Button>
                    <Button onPress={() => handleDeleteFilm(index)}>
                      Delete
                    </Button>
                  </View>
                </View>
              )}
            </View>
          ))}
      </View>
    </>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  filmsListContainer: {
    width: "100%",
    alignItems: "center",
    paddingTop: 70,
    display: "flex",
    marginTop: -50
  },
  filmText: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5
  },

  filmDetails: {
    marginTop: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 10,
    width: "100%"
  },
  detailLabel: {
    fontWeight: "bold",
    marginRight: 5
  },
  detailText: {
    marginBottom: 5
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10
  }
};
