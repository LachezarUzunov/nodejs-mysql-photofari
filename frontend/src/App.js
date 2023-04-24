import "./App.css";

// Setting up React Toastify for notifications
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Routes, Route } from "react-router-dom";

// Layout components
import MainNavigation from "./components/layout/MainNavigation";
import Footer from "./components/layout/Footer";

import Home from "./screens/home/Home";
import Photos from "./screens/photos/Photos";
import Profiles from "./screens/users/Profiles";
import Contacts from "./screens/contacts/Contacts";
import PrivateRoute from "./components/PrivateRoute";
import AddPhotos from "./screens/photos/AddPhotos";

function App() {
  return (
    <main className="main__app">
      <MainNavigation />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/photos" element={<Photos />}></Route>
        <Route path="/profiles" element={<Profiles />}></Route>
        <Route path="/contacts" element={<Contacts />}></Route>
        <Route path="/add" element={<PrivateRoute />}>
          <Route path="/add" element={<AddPhotos />} />
        </Route>

        {/* <Route path="/my-profile" element={<Contacts />}></Route> */}
      </Routes>

      <Footer />
      <ToastContainer />
    </main>
  );
}

export default App;
