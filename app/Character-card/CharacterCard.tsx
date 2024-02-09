import React, { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

import CardEdit from "./CharacterEdit";

interface CardProps {
  data: any;
  handleEdit: () => void;
  handleDelete: () => void;
}

const Card: React.FC<CardProps> = ({ data, handleEdit, handleDelete }) => {
  const [editing, setEditing] = useState(false);

  const handleCancelEdit = () => {
    setEditing(false);
  };

  const handleSave = (updatedCharacter) => {
    console.log("Personaje actualizado:", updatedCharacter);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <Pressable onPress={() => setEditing(true)}>
        <View style={styles.cardContainer}>
          <View style={styles.characterNumberContainer}>
            <Text style={styles.characterNumber}>Character {data.id}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>Description: {data.description}</Text>
            <Text style={styles.infoText}>Cost: {data.cost}</Text>
            <Text style={styles.infoText}>Aspect: {data.Aspect}</Text>
            <Text style={styles.infoText}>Age: {data.age}</Text>
            <Text style={styles.infoText}>Interpreted: {data.interpreted}</Text>
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
        <CardEdit
          data={data}
          onCancel={handleCancelEdit}
          onSave={(updatedCharacter) => {
            setEditing(false);
            handleSave(updatedCharacter);
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
    marginBottom: 5
  }
};

export default Card;
