import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { useRoute } from "@react-navigation/native";

import { fetchScenesByFilmId } from "../peticiones/Petitions";
import Scene from "../Scene-card/SceneCard";

export default function Tab2() {
  const [scenes, setScenes] = useState([]);
  const route = useRoute();

  useEffect(() => {
    async function fetchData() {
      try {
        if (route.params && route.params.filmId) {
          const filmId = route.params.filmId;
          const data = await fetchScenesByFilmId(filmId);
          setScenes(data);
        }
      } catch (error) {
        console.error("Error fetching scenes:", error);
      }
    }

    fetchData();
  }, [route.params]);

  return (
    <ScrollView>
      {scenes.map((scene) => (
        <Scene
          key={scene.id}
          scene={scene}
        />
      ))}
    </ScrollView>
  );
}
