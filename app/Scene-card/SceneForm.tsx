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

interface ScenesFormProps {
  initialData: {
    id: Long;
    description: string;
    budget: string;
    hours: Int;
    filmId: Long;
  };
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const API_URL = "http://192.168.3.18:8088";

const ScenesForm: React.FC<ScenesFormProps> = ({
  initialData,
  onSubmit,
  onCancel
}) => {
  const [description, setDescription] = useState(initialData.description || "");
  const [budget, setBudget] = useState(initialData.budget || "");
  const [hours, setHours] = useState(
    initialData.hours ? initialData.hours.toString() : ""
  );
  const [filmId, setFilmId] = useState(
    initialData.filmId ? initialData.filmId.toString() : ""
  );

  const handleSubmit = () => {
    const entityData = {
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
      body: JSON.stringify(entityData)
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
        <Text style={styles.headerText}>Scenes Form</Text>
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
          source={require("../images/scene.png")}
          style={styles.image}
        />
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
          />
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={[styles.infoBox, styles.filmIdContainer]}>
          <Text style={styles.infoLabelTexts}>Film ID</Text>
          <TextInput
            style={[styles.infoInput, styles.filmIdInput]}
            value={filmId}
            onChangeText={(text) => setFilmId(text)}
            placeholder="Enter film ID"
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
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 0
  },
  image: {
    width: 200,
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
  filmIdContainer: {
    alignItems: "center"
  },
  filmIdLabelText: {
    textAlign: "center"
  },
  filmIdInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 16,
    width: 350,
    borderRadius: 15,
    left: 80,
    textAlign: "center"
  },
  infoLabelText: {
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center"
  },

  infoLabelTexts: {
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
    left: 80
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
    marginTop: 10
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

export default ScenesForm;
