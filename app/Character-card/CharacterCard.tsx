import React, { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

import { updateScene } from "../peticiones/Petitions";

import SceneEdit from "./CharacterEdit";

interface CardProps {
  data: any;
  handleDelete: () => void;
}

const Card: React.FC<CardProps> = ({ data, handleDelete }) => {
  const [editing, setEditing] = useState(false);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
  };

  const handleSave = async (updatedScene) => {
    try {
      await updateScene(data.id, updatedScene);
      setEditing(false);
    } catch (error) {
      console.error("Error al actualizar la escena:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <Pressable onPress={handleEdit}>
        <View style={styles.cardContainer}>
          <View style={styles.sceneNumberContainer}>
            <Text style={styles.sceneNumber}>Characters {data.id}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>Description: {data.description}</Text>
            <Text style={styles.infoText}>cost: {data.cost}</Text>
            <Text style={styles.infoText}>age: {data.age}</Text>
            <Text style={styles.infoText}>interpreted: {data.interpreted}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Pressable
              onPress={handleEdit}
              style={styles.button}
            >
              <Image source={require("../images/EditIcon.png")} />
            </Pressable>
            <Pressable
              onPress={handleDelete}
              style={styles.button}
            >
              <Image source={require("../images/DeleteIcon.png")} />
            </Pressable>
          </View>
        </View>
      </Pressable>
      {editing && (
        <SceneEdit
          data={data}
          onCancel={handleCancelEdit}
          onSave={handleSave}
        />
      )}
    </ScrollView>
  );
};

const styles = {
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60
  },
  cardContainer: {
    backgroundColor: "#900000",
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    width: 300,
    alignItems: "center"
  },
  sceneNumberContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    marginBottom: 10
  },
  sceneNumber: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold"
  },
  buttonContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    flexDirection: "row"
  },
  button: {
    marginLeft: 10,
    alignItems: "center"
  },
  infoContainer: {
    alignItems: "flex-start",
    marginBottom: 10,
    right: 30
  },
  infoText: {
    color: "#fff",
    marginBottom: 5
  }
};

export default Card;
