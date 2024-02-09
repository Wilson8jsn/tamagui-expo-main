import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

interface CharacterEditProps {
  data: any;
  onCancel: () => void;
  onSave: (updatedCharacter: any) => void;
}

const CharacterEdit: React.FC<CharacterEditProps> = ({
  data,
  onCancel,
  onSave
}) => {
  const [description, setDescription] = useState(data.description);
  const [cost, setCost] = useState(data.cost.toString());
  const [Aspect, setAspect] = useState(data.Aspect);
  const [age, setAge] = useState(data.age.toString());
  const [interpreted, setInterpreted] = useState(data.interpreted);

  const handleSave = () => {
    const updatedCharacter = {
      description,
      cost: parseFloat(cost),
      Aspect,
      age: parseInt(age),
      interpreted
    };
    onSave(updatedCharacter);
  };

  return (
    <View>
      <Text>Edit Character</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
      />
      <TextInput
        value={cost}
        onChangeText={setCost}
        placeholder="Enter cost"
        keyboardType="numeric"
      />
      <TextInput
        value={Aspect}
        onChangeText={setAspect}
        placeholder="Enter aspect"
      />
      <TextInput
        value={age}
        onChangeText={setAge}
        placeholder="Enter age"
        keyboardType="numeric"
      />
      <TextInput
        value={interpreted}
        onChangeText={setInterpreted}
        placeholder="Enter interpreted"
      />
      <TouchableOpacity onPress={handleSave}>
        <Text>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onCancel}>
        <Text>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CharacterEdit;
