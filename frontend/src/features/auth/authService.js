const API_URL = "http://localhost:5000/api/users";

// Register user
const register = async (profileData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(profileData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 400) {
    throw new Error("Акаунт с такъв имейл вече съществува");
  }

  if (response.status === 201) {
    const user = await response.json();
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  }
};

// Login user
const login = async (user) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 401) {
    throw new Error("Невалидни логин детайли");
  }
  if (response.status === 200) {
    const user = await response.json();
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  }
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
