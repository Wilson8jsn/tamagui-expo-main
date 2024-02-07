import React from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

interface CardProps {
  data: any;
  handleEdit: () => void;
  handleDelete: () => void;
}

const Card: React.FC<CardProps> = ({ data, handleEdit, handleDelete }) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.cardContainer}>
        <Text style={styles.filmNumber}>Film {data.id}</Text>
        <Text>Title: {data.title}</Text>
        <Text>Duration: {data.duration}</Text>
        <Text>Director: {data.director}</Text>
        <View style={styles.buttonContainer}>
          <Pressable onPress={handleEdit}>
            <Image source={require("../images/EditIcon.png")} />
          </Pressable>
          <Pressable onPress={handleDelete}>
            <Image source={require("../images/DeleteIcon.png")} />
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = {
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  cardContainer: {
    backgroundColor: "#900000",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: 300,
    alignItems: "center",
    marginTop: 20
  },
  filmNumber: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 16
  }
};

export default Card;
