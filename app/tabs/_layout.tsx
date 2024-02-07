import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button, ScrollView, View } from "tamagui";

import Card from "../Card/Card";
import { deleteFilm, fetchFilm } from "../peticiones/Petitions";

import FilmsForm from "./Films";

export default function Layout() {
  const [showForm, setShowForm] = useState(false);
  const [films, setFilms] = useState([]);
  const [cardsToShow, setCardsToShow] = useState(3); // Número de tarjetas para mostrar inicialmente
  const [visibleCards, setVisibleCards] = useState([]); // Tarjetas de películas actualmente visibles

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchFilm("film");
        setFilms(data);
      } catch (error) {
        console.error("Error al obtener datos de películas:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    // Actualizar las tarjetas de películas visibles al cambiar la cantidad de tarjetas para mostrar
    setVisibleCards(films.slice(0, cardsToShow));
  }, [films, cardsToShow]);

  const handleDeleteFilm = async (filmId) => {
    try {
      await deleteFilm("films", filmId);
      setFilms(films.filter((film) => film.id !== filmId));
    } catch (error) {
      console.error("Error al eliminar la película:", error);
    }
  };

  const handleScroll = (event) => {
    // Verificar si se ha desplazado hasta el final del ScrollView
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height) {
      // Mostrar tres tarjetas más al desplazarse hasta el final
      setCardsToShow(cardsToShow + 3);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        onScroll={(event) => handleScroll(event)}
        scrollEventThrottle={400}
      >
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "flex-start", // Cambiado a flex-start
            paddingBottom: 100 // Espacio adicional para evitar que el botón cubra las últimas tarjetas
          }}
        >
          {visibleCards.map((film) => (
            <Card
              key={film.id}
              data={film}
              handleDelete={() => handleDeleteFilm(film.id)}
              handleEdit={() => {}}
            />
          ))}
        </View>
      </ScrollView>

      <Button
        onPress={() => setShowForm(true)}
        style={{
          backgroundColor: "#751C1C",
          borderRadius: 50,
          padding: 10,
          height: 64,
          width: 64,
          position: "absolute",
          right: 20,
          bottom: 20
        }}
      >
        <MaterialCommunityIcons
          name="plus"
          size={40}
          color="#fff"
          style={{ borderRadius: 50 }}
        />
      </Button>

      {showForm && (
        <FilmsForm
          onSubmit={(newFilm) => {
            setFilms([...films, newFilm]);
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
          initialFilm={{}}
        />
      )}
    </View>
  );
}
