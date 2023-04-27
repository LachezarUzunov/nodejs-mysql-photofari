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

// GET Last Ten photos
const getLastTen = async () => {
  const response = await fetch(`http://localhost:5000/api/photos/lastTen`);

  if (response.status === 200) {
    const photos = await response.json();
    console.log(photos);
    return photos;
  }
};

// GET single photo/ by ID
const getPhotoById = async (photoId) => {
  const response = await fetch(`${API_URL}/${photoId}`)

  if (response.status === 200) {
    const photo = await response.json();
    return photo;
  }
}

const photosService = {
  publishPhoto,
  getLastTen,
  getPhotoById
};

export default photosService;
