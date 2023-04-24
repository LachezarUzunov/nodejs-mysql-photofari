const API_URL = "http://localhost:5000/api/photos";

// Uplaod and publish new photo
const publishPhoto = async (photo, token) => {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    body: JSON.stringify(photo),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (response.status === 401) {
    throw new Error("Няма такъв потребител");
  }

  if (response.status === 403) {
    throw new Error(
      "Нямате право да качите повече от 10 снимки, моля изтрийте някоя първо"
    );
  }

  if (response.status === 201) {
    const uploadedPhoto = await response.json();
    return uploadedPhoto;
  }
};

// GET Last Three recipes
const getLastTen = async () => {
  const response = await fetch(`http://localhost:5000/api/photos/lastTen`);

  if (response.status === 200) {
    const photos = await response.json();
    console.log(photos);
    return photos;
  }
};

const photosService = {
  publishPhoto,
  getLastTen,
};

export default photosService;
