import React, { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import SceneEdit from "./Card-edit";

interface CardProps {
  data: any;
  handleEdit: () => void;
  handleDelete: () => void;
}

const API_URL = "http://10.0.3.26:8088";

const Card: React.FC<CardProps> = ({ data, handleEdit, handleDelete }) => {
  const [editing, setEditing] = useState(false);
  const navigation = useNavigation();

  const handleCancelEdit = () => {
    setEditing(false);
  };

  const handleSave = async (updatedScene) => {
    try {
      const response = await fetch(`${API_URL}/scene/${updatedScene.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedScene)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log("Escena actualizada:", updatedScene);
    } catch (error) {
      console.error("Error al actualizar la escena:", error);
    }
  };

  const handleDeletePress = async () => {
    try {
      const response = await fetch(`${API_URL}/scene/${data.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log("Escena eliminada:", data.id);
      handleDelete();
    } catch (error) {
      console.error("Error al eliminar la escena:", error);
    }
  };

  const handleCardPress = () => {
    navigation.navigate("tab-characters");
  };

  return (
    <Pressable onPress={handleCardPress}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.cardContainer}>
          <View style={styles.characterNumberContainer}>
            <Text style={styles.characterNumber}>Scene {data.id}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>Description: {data.description}</Text>
            <Text style={styles.infoText}>Budget: {data.budget}</Text>
            <Text style={styles.infoText}>Hours: {data.hours}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Pressable
              onPress={() => setEditing(true)} // Abre SceneEdit al tocar el ícono de editar
              style={styles.button}
            >
              <Image source={require("../images/EditIcon.png")} />
            </Pressable>
            <Pressable
              onPress={handleDeletePress}
              style={styles.button}
            >
              <Image source={require("../images/DeleteIcon.png")} />
            </Pressable>
          </View>
        </View>
      </ScrollView>
      {editing && (
        <SceneEdit
          data={data}
          onCancel={handleCancelEdit}
          onSave={(updatedScene) => {
            setEditing(false);
            handleSave(updatedScene);
          }}
        />
      )}
    </Pressable>
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
  characterNumberContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    marginBottom: 10
  },
  characterNumber: {
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
    marginBottom: 5,
    left: 25
  }
};

export default Card;
