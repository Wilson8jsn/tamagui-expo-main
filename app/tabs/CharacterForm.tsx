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
  onSubmit: (data: { name: string; occupation: string }) => void;
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

  const handleSubmit = () => {
    onSubmit({ name, occupation });
    setName("");
    setOccupation("");
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
          <Text style={styles.infoText}>Time</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Director</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          onPress={handleSubmit}
          title="Create Character"
        />
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
    paddingHorizontal: 10
  } as TextStyle,
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10
  } as ViewStyle,
  infoBox: {
    width: "48%",
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 10
  } as ViewStyle,
  infoText: {
    fontWeight: "bold"
  } as TextStyle,
  buttonContainer: {
    alignSelf: "center",
    marginTop: 50
  } as ViewStyle
};

export default CharacterForm;
