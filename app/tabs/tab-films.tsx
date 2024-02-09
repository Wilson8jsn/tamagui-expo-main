// tab-films
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button, ScrollView, View } from "tamagui";

import Cardfilm from "../Card/Cardfilm";
import FilmsForm from "../Card/Films";
import { deleteFilm, fetchFilm } from "../peticiones/Petitions";

export default function Layout() {
  const [showForm, setShowForm] = useState(false);
  const [films, setFilms] = useState([]);
  const [cardsToShow, setCardsToShow] = useState(3);
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchFilm("film");
        setFilms(data);
      } catch (error) {
        console.error("Error al obtener datos de film:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    setVisibleCards(films.slice(0, cardsToShow));
  }, [films, cardsToShow]);

  const handleDeleteFilm = async (filmId) => {
    try {
      await deleteFilm(filmId);
      setFilms(films.filter((film) => film.id !== filmId));
    } catch (error) {
      console.error("Error al eliminar el films:", error);
    }
  };

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height) {
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
            justifyContent: "flex-start",
            paddingBottom: 0
          }}
        >
          {visibleCards.map((film) => (
            <Cardfilm
              key={film.id}
              data={film}
              handleDelete={() => handleDeleteFilm(film.id)}
              handleEdit={() => {}}
              style={{ marginBottom: 10 }}
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
