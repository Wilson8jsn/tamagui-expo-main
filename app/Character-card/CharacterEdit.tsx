import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

import { updateCharacter } from "../peticiones/Petitions";

const CharacterEdit = ({ data, onCancel, onSave }) => {
  const [description, setDescription] = useState(data.description);
  const [cost, setCost] = useState(data.cost.toString());
  const [aspect, setAspect] = useState(data.aspect);
  const [age, setAge] = useState(data.age.toString());
  const [interpreted, setInterpreted] = useState(data.interpreted);

  const handleSubmit = async () => {
    const updatedCharacter = {
      description,
      cost: parseInt(cost),
      aspect,
      age: parseInt(age),
      interpreted
    };
    try {
      await updateCharacter(data.id, updatedCharacter);
      onSave(updatedCharacter);
    } catch (error) {
      console.error("Error saving character:", error);
    }
  };

  return (
    <View>
      <Text>Edit Character</Text>

      <Button
        title="Save"
        onPress={handleSubmit}
      />
      <Button
        title="Cancel"
        onPress={onCancel}
      />
    </View>
  );
};

export default CharacterEdit;
