//tab2 scene
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

import { fetchScenesByFilmId } from "../peticiones/Petitions";
import Scene from "../Scene/SceneCard";

export default function Tab2() {
  const [scenes, setScenes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchScenesByFilmId("filmId");
        setScenes(data);
      } catch (error) {
        console.error("Error fetching scenes:", error);
      }
    }

    fetchData();
  }, []);

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
