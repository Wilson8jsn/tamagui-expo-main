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
interface CharactersFormProps {
  initialData?: {
    id: number;
    description: string;
    cost: number;
    Aspect: string;
    age: number;
    interpreted: string;
  };
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const API_URL = "http://192.168.3.18:8088";

const CharactersForm: React.FC<CharactersFormProps> = ({
  initialData = {
    id: 0,
    description: "",
    cost: 0,
    Aspect: "",
    age: 0,
    interpreted: ""
  },
  onSubmit,
  onCancel
}) => {
  const [description, setDescription] = useState(initialData.description || "");
  const [cost, setCost] = useState(initialData.cost.toString() || "");
  const [Aspect, setAspect] = useState(initialData.Aspect || "");
  const [age, setAge] = useState(initialData.age.toString() || "");
  const [interpreted, setInterpreted] = useState(initialData.interpreted || "");

  const handleSubmit = () => {
    const entityData = { description, cost, Aspect, age, interpreted };
    fetch(`${API_URL}/characters`, {
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
        setCost("");
        setAspect("");
        setAge("");
        setInterpreted("");
      })
      .catch((error) =>
        console.error("Error al enviar los datos al servidor:", error)
      );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Characters Form</Text>
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
          source={require("../images/Vector-2.png")}
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
          <Text style={styles.infoLabelText}>Cost</Text>
          <TextInput
            style={styles.infoInput}
            value={cost}
            onChangeText={(text) => setCost(text)}
            placeholder="Enter cost"
          />
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoLabelText}>Aspect</Text>
          <TextInput
            style={styles.infoInput}
            value={Aspect}
            onChangeText={(text) => setAspect(text)}
            placeholder="Enter aspect"
          />
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoBox}>
          <Text style={styles.infoLabelText}>Age</Text>
          <TextInput
            style={styles.infoInput}
            value={age}
            onChangeText={(text) => setAge(text)}
            placeholder="Enter age"
          />
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoLabelText}>Interpreted</Text>
          <TextInput
            style={styles.infoInput}
            value={interpreted}
            onChangeText={(text) => setInterpreted(text)}
            placeholder="Enter interpreted"
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSubmit}
          style={styles.createFilmButton}
        >
          <Text style={styles.createFilmButtonText}>Create Characters</Text>
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
    overflow: "hidden",
    right: 29
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

export default CharactersForm;
