import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface FilmsFormProps {
  initialFilm: {
    title: string;
  };
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const API_URL = "http://192.168.3.18:8088";

const FilmsForm: React.FC<FilmsFormProps> = ({
  initialFilm,
  onSubmit,
  onCancel
}) => {
  const [title, setTitle] = useState(initialFilm.title || "");
  const [duration, setDuration] = useState("");
  const [director, setDirector] = useState("");

  const handleSubmit = () => {
    const filmData = { title, duration, director };
    fetch(`${API_URL}/film`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(filmData)
    })
      .then((response) => response.json())
      .then((data) => {
        onSubmit(data);
        setTitle("");
        setDuration("");
        setDirector("");
      })
      .catch((error) =>
        console.error("Error al enviar los datos al servidor:", error)
      );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Films</Text>
        <TouchableOpacity
          onPress={onCancel}
          style={styles.closeIcon}
        >
          <MaterialCommunityIcons
            name="close"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={require("../images/Vector.png")}
          style={styles.image}
        />
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Title</Text>
        <TextInput
          style={styles.titleInput}
          value={title}
          onChangeText={(text) => setTitle(text)}
          placeholder="Enter title"
        />
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoBox}>
          <Text style={styles.infoLabelText}>Duration</Text>
          <TextInput
            style={styles.infoInput}
            value={duration}
            onChangeText={(text) => setDuration(text)}
            placeholder="Enter duration"
          />
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoLabelText}>Director</Text>
          <TextInput
            style={styles.infoInput}
            value={director}
            onChangeText={(text) => setDirector(text)}
            placeholder="Enter director"
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSubmit}
          style={styles.createFilmButton}
        >
          <Text style={styles.createFilmButtonText}>Create Film</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    zIndex: 9999,
    position: "absolute",
    top: -45,
    left: 0,
    right: 0,
    bottom: 0
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    marginTop: 30
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold"
  },
  closeIcon: {
    marginLeft: 10
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 50
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 10,
    overflow: "hidden"
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 10,
    marginTop: 50
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10
  },
  titleInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 16,
    width: 350,
    borderRadius: 15
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10
  },
  infoBox: {
    width: "48%",
    marginBottom: 10
  },
  infoLabelText: {
    fontWeight: "bold",
    marginBottom: 5
  },
  infoInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 15
  },
  buttonContainer: {
    alignSelf: "center",
    marginTop: 50
  },
  createFilmButton: {
    backgroundColor: "#900000",
    paddingVertical: 15,
    borderRadius: 15,
    width: 200,
    alignItems: "center"
  },
  createFilmButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  }
});

export default FilmsForm;
