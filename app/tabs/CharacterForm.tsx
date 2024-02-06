import React, { useState } from "react";
import {
  Button,
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

interface CharacterFormProps {
  initialCharacter: {
    name?: string;
    occupation?: string;
  };
  onSubmit: (data: {
    name: string;
    occupation: string;
    time: string;
    director: string;
  }) => void;
  onCancel: () => void;
}

const CharacterForm: React.FC<CharacterFormProps> = ({
  initialCharacter,
  onSubmit,
  onCancel
}) => {
  const [name, setName] = useState(initialCharacter.name || "");
  const [occupation, setOccupation] = useState(
    initialCharacter.occupation || ""
  );
  const [time, setTime] = useState("");
  const [director, setDirector] = useState("");

  const handleSubmit = () => {
    onSubmit({ name, occupation, time, director });
    setName("");
    setOccupation("");
    setTime("");
    setDirector("");
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
          value={name}
          onChangeText={(text) => setName(text)}
          placeholder="Enter title"
        />
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoBox}>
          <Text style={styles.infoLabelText}>Time</Text>
          <TextInput
            style={styles.infoInput}
            value={time}
            onChangeText={(text) => setTime(text)}
            placeholder="Enter time"
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
          style={styles.createCharacterButton}
        >
          <Text style={styles.createCharacterButtonText}>Create Character</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff"
  } as ViewStyle,
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    marginTop: 16
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
  createCharacterButton: {
    backgroundColor: "#900000",
    paddingVertical: 15,
    borderRadius: 15,
    width: 200,
    alignItems: "center"
  } as ViewStyle,
  createCharacterButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  } as TextStyle
};

export default CharacterForm;
