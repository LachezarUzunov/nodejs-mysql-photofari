import React, { useState, useEffect } from "react";
import classes from "./AddPhotos.module.css";

import { toast } from "react-toastify";
import Spinner from "../../components/layout/Spinner";
import { useNavigate } from "react-router-dom";

// Importing Firebase upload functions
import { storage } from "../../firebase";
import { ref, uploadBytes } from "firebase/storage";

// Getting redux hooks
import { useSelector, useDispatch } from "react-redux";

import { v4 } from "uuid";
import { reset, uploadPhoto } from "../../features/photos/photosSlice";

const AddPhotos = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    pic: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { title, description, pic } = formData;
  const { user } = useSelector((state) => state.auth);
  const { isPhotoSuccess, isPhotoError, isPhotoLoading, photoMessage } =
    useSelector((state) => state.photo);

  useEffect(() => {
    if (isPhotoError) {
      toast.error(photoMessage);
    }

    if (isPhotoSuccess) {
      toast.success("Снимката е качена успешно");
      navigate("/");
    }
    // dispatch(reset());
  }, [photoMessage, isPhotoError, isPhotoSuccess, navigate, dispatch]);

  const titleInputHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      title: e.target.value,
    }));
  };

  const descInputHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      description: e.target.value,
    }));
  };

  const handlePhotoUpload = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      pic: e.target.files[0],
    }));
  };

  if (isPhotoLoading) {
    return <Spinner />;
  }

  const onSubmit = (e) => {
    e.preventDefault();

    if (pic === null) {
      return;
    }

    const imagePath = `${user.id}/${title.split(" ").join("")}/${
      pic.name + v4()
    }`;

    const imageRef = ref(storage, imagePath);
    uploadBytes(imageRef, pic).then((res) => {
      console.log(res);
    });

    const photoData = {
      title,
      description,
      photo: imagePath,
    };

    dispatch(uploadPhoto(photoData));
    dispatch(reset());
  };

  return (
    <section className="main">
      <form className={classes.form} onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Задай заглавие/име на твоята снимка"
          name="title"
          id="title"
          value={title}
          onChange={titleInputHandler}
          required
        />

        <p className={classes.white}>
          Добави описание или кратка информация за снимката. Например - къде е
          заснета, каква техника е използвана или друга мисъл, която искаш да
          споделиш.
        </p>
        <textarea
          className={classes.textArea}
          name="preparation"
          id="preparation"
          cols="8"
          rows="8"
          value={description}
          onChange={descInputHandler}
          required
        ></textarea>

        <div className={classes.upload__button}>
          <label className="input__file_label" htmlFor="pic">
            Добави снимка
          </label>
          <input
            style={{ display: "none" }}
            type="file"
            accept=".png, .jpg, .jpeg"
            name="pic"
            id="pic"
            filename="pic"
            onChange={handlePhotoUpload}
            required
          />
        </div>

        <button className="primaryBtn">Публикувай</button>
      </form>
    </section>
  );
};

export default AddPhotos;
