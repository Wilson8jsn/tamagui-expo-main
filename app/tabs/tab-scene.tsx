import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button, ScrollView, View } from "tamagui";

import { deleteScene, fetchScene } from "../peticiones/Petitions";
import SceneCard from "../Scene-card/SceneCard";
import ScenesForm from "../Scene-card/SceneForm";

export default function Layout() {
  const [showForm, setShowForm] = useState(false);
  const [scenes, setScenes] = useState([]);
  const [cardsToShow, setCardsToShow] = useState(3);
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchScene("scene");
        setScenes(data);
      } catch (error) {
        console.error("Error al obtener datos de escenas:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    setVisibleCards(scenes.slice(0, cardsToShow));
  }, [scenes, cardsToShow]);

  const handleDeleteScene = async (sceneId) => {
    try {
      await deleteScene(sceneId);
      setScenes(scenes.filter((scene) => scene.id !== sceneId));
    } catch (error) {
      console.error("Error al eliminar la escena:", error);
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
          {visibleCards.map((scene) => (
            <SceneCard
              key={scene.id}
              data={scene}
              handleDelete={() => handleDeleteScene(scene.id)}
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
        <ScenesForm // Cambiado a ScenesForm
          onSubmit={(newScene) => {
            setScenes([...scenes, newScene]);
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
          initialData={{}} // Cambiado a initialData
        />
      )}
    </View>
  );
}
