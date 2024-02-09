//card film
import React, { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import CardEdit from "./Card-edit";

interface CardProps {
  data: any;
  handleEdit: () => void;
  handleDelete: () => void;
}

const Card: React.FC<CardProps> = ({ data, handleEdit, handleDelete }) => {
  const [editing, setEditing] = useState(false);
  const navigation = useNavigation();

  const handleCancelEdit = () => {
    setEditing(false);
  };

  const handleSave = (updatedFilm) => {
    setFilmData(updatedFilm);
    console.log("Película actualizada:", updatedFilm);
  };

  const handleCardPress = () => {
    navigation.navigate("tab-scene", { filmId: data.id });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <Pressable onPress={handleCardPress}>
        <View style={styles.cardContainer}>
          <View style={styles.filmNumberContainer}>
            <Text style={styles.filmNumber}>Film {data.id}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>Title: {data.title}</Text>
            <Text style={styles.infoText}>Duration: {data.duration}</Text>
            <Text style={styles.infoText}>Director: {data.director}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Pressable
              onPress={() => setEditing(true)}
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
        <CardEdit
          data={data}
          onCancel={handleCancelEdit}
          onSave={(updatedFilm) => {
            setEditing(false);
            handleSave(updatedFilm);
          }}
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
  filmNumberContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    marginBottom: 10
  },
  filmNumber: {
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
