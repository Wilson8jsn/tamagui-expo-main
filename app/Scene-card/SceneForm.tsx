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

interface SceneFormProps {
  initialScene: {
    description: string;
    budget: string;
    hours: number;
    filmId: number;
  };
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const API_URL = "http://10.10.3.30:8088";

const SceneForm: React.FC<SceneFormProps> = ({
  initialScene,
  onSubmit,
  onCancel
}) => {
  const [description, setDescription] = useState(
    initialScene.description || ""
  );
  const [budget, setBudget] = useState(initialScene.budget || "");
  const [hours, setHours] = useState(
    initialScene.hours ? initialScene.hours.toString() : ""
  );
  const [filmId, setFilmId] = useState(
    initialScene.filmId ? initialScene.filmId.toString() : ""
  );

  const handleSubmit = () => {
    const sceneData = {
      description,
      budget,
      hours: parseInt(hours),
      filmId: parseInt(filmId)
    };
    fetch(`${API_URL}/scene`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(sceneData)
    })
      .then((response) => response.json())
      .then((data) => {
        onSubmit(data);
        setDescription("");
        setBudget("");
        setHours("");
        setFilmId("");
      })
      .catch((error) =>
        console.error("Error al enviar los datos al servidor:", error)
      );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Scene</Text>
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

      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Description</Text>
        <TextInput
          style={styles.titleInput}
          value={description}
          onChangeText={(text) => setDescription(text)}
          placeholder="Enter description"
        />
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoBox}>
          <Text style={styles.infoLabelText}>Budget</Text>
          <TextInput
            style={styles.infoInput}
            value={budget}
            onChangeText={(text) => setBudget(text)}
            placeholder="Enter budget"
          />
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoLabelText}>Hours</Text>
          <TextInput
            style={styles.infoInput}
            value={hours}
            onChangeText={(text) => setHours(text)}
            placeholder="Enter hours"
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoBox}>
          <Text style={styles.infoLabelText}>Film ID</Text>
          <TextInput
            style={styles.infoInput}
            value={filmId}
            onChangeText={(text) => setFilmId(text)}
            placeholder="Enter film ID"
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSubmit}
          style={styles.createFilmButton}
        >
          <Text style={styles.createFilmButtonText}>Create Scene</Text>
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

export default SceneForm;
