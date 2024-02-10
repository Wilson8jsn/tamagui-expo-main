import axios from "axios";

const baseUrl = "http://192.168.3.18:8088";

export const fetchFilm = async (ruta) => {
  const url = `${baseUrl}/${ruta}`;
  const response = await axios.get(url);
  console.log(response.data);
  return response.data;
};

export const saveFilm = async (ruta, form) => {
  const url = `${baseUrl}/${ruta}`;
  console.log(url);
  const response = await axios.post(url, form).catch((error) => {
    console.log("Error:", error);
  });
  console.log(response?.data);
};

export const updateFilm = async (updatedData) => {
  const url = `${baseUrl}/film/put`;
  try {
    const response = await axios.put(url, updatedData, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Error:", error);
    throw new Error("Error al actualizar la película: " + error.message);
  }
};

export const fetchScenesByFilmId = async (filmId: number) => {
  const url = `${baseUrl}/scenes?filmId=${filmId}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener escenas de la película ${filmId}:`, error);
    throw error;
  }
};

export const fetchAllScenes = async () => {
  const url = `${baseUrl}/scenes`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching all scenes:", error);
    throw error;
  }
};

export const saveCharacter = async (form) => {
  const url = `${baseUrl}/characters`;

  const response = await axios.post(url, form).catch((error) => {
    console.error("Error saving character:", error);
    throw error;
  });

  console.log(response?.data);
  return response.data;
};

export const deleteCharacter = async (id) => {
  const url = `${baseUrl}/characters/delete/${id}`;

  const response = await axios.delete(url).catch((error) => {
    console.error("Error deleting character:", error);
    throw error;
  });

  console.log(response?.data);
  return "Deleted Successfully";
};

export const updateCharacter = async (id, updatedData) => {
  const url = `${baseUrl}/characters/put`;

  try {
    const response = await axios.put(url, updatedData, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating character:", error);
    throw new Error("Error updating character: " + error.message);
  }
};

export const fetchCharacters = async (ruta) => {
  const url = `${baseUrl}/${ruta}`;
  const response = await axios.get(url);
  console.log(response.data);
  return response.data;
};

export const deleteFilm = async (id) => {
  const url = `${baseUrl}/characters/delete/${id}`;

  const response = await axios.delete(url).catch((error) => {
    console.error("Error deleting film:", error);
    throw error;
  });

  console.log(response?.data);
  return "Deleted Successfully";
};

export const fetchScene = async (ruta) => {
  const url = `${baseUrl}/${ruta}`;
  const response = await axios.get(url);
  console.log(response.data);
  return response.data;
};

export const saveScene = async (form) => {
  const url = `${baseUrl}/scene`;

  const response = await axios.post(url, form).catch((error) => {
    console.error("Error saving scene:", error);
    throw error;
  });

  console.log(response?.data);
  return response.data;
};

export const deleteScene = async (id) => {
  const url = `${baseUrl}/characters/scene/${id}`;

  const response = await axios.delete(url).catch((error) => {
    console.error("Error deleting scene:", error);
    throw error;
  });

  console.log(response?.data);
  return "Deleted Successfully";
};
