import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

const CardEdit = ({ data, onCancel, onSave }) => {
  const [title, setTitle] = useState(data.title);
  const [duration, setDuration] = useState(data.duration.toString());
  const [director, setDirector] = useState(data.director);

  const handleSubmit = async () => {
    const updatedFilm = { title, duration: parseInt(duration), director };
    try {
      await updateFilm(data.id, updatedFilm);
      onSave(updatedFilm);
    } catch (error) {
      console.error("Error al guardar la película:", error);
    }
  };

  return (
    <View>
      <Text>Edit Film</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
      />
      <TextInput
        value={duration}
        onChangeText={setDuration}
        placeholder="Duration"
        keyboardType="numeric"
      />
      <TextInput
        value={director}
        onChangeText={setDirector}
        placeholder="Director"
      />
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

export default CardEdit;
