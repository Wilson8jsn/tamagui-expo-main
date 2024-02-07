import React, { useState } from "react";
import {
  Image,
  ImageStyle,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface FilmsFormProps {
  initialFilm: {
    title: string;
  };
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const API_URL = "http://10.0.8.224:8088";

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

const styles = {
  container: {
    position: "absolute", // Posicionamiento absoluto para superponer sobre la lista de películas
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
    backgroundColor: "#fff",
    zIndex: 9999 // Asegura que esté por encima de la lista de películas
    // Resto de estilos...
  } as ViewStyle,
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    marginTop: 30
  } as ViewStyle,
  headerText: {
    fontSize: 24,
    fontWeight: "bold"
  } as TextStyle,
  closeIcon: {
    marginLeft: 10
  } as ViewStyle,
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 50
  } as ViewStyle,
  image: {
    width: 300,
    height: 200,
    borderRadius: 10,
    overflow: "hidden"
  } as ImageStyle,
  titleContainer: {
    alignItems: "center",
    marginBottom: 10,
    marginTop: 50
  } as ViewStyle,
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10
  } as TextStyle,
  titleInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 16,
    width: 350,
    borderRadius: 15
  } as TextStyle,
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10
  } as ViewStyle,
  infoBox: {
    width: "48%",
    marginBottom: 10
  } as ViewStyle,
  infoLabelText: {
    fontWeight: "bold",
    marginBottom: 5
  } as TextStyle,
  infoInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 15
  } as TextStyle,
  buttonContainer: {
    alignSelf: "center",
    marginTop: 50
  } as ViewStyle,
  createFilmButton: {
    backgroundColor: "#900000",
    paddingVertical: 15,
    borderRadius: 15,
    width: 200,
    alignItems: "center"
  } as ViewStyle,
  createFilmButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  } as TextStyle
};

export default FilmsForm;
