// scene-card.tsx
import React, { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface SceneProps {
  data: {
    description: string;
    budget: string;
    hours: number;
    filmId: number;
  };
  handleEdit: () => void;
  handleDelete: () => void;
}

const SceneCard: React.FC<SceneProps> = ({
  data,
  handleEdit,
  handleDelete
}) => {
  const [editing, setEditing] = useState(false);
  const navigation = useNavigation();

  const handleCancelEdit = () => {
    setEditing(false);
  };

  const handleSave = (updatedScene) => {
    console.log("Escena actualizada:", updatedScene);
    setEditing(false);
  };

  const handleCardPress = () => {
    navigation.navigate("tab2", { filmId: data.id });
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
          onSave={(updatedScene) => {
            setEditing(false);
            handleSave(updatedScene);
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

export default SceneCard;
