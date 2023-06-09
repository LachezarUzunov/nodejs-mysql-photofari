import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./SmallPic.module.css";
import { storage } from "../../firebase";
import { listAll, ref, getDownloadURL } from "firebase/storage";
import { useDispatch } from "react-redux";
import { deletePhoto } from "../../features/photos/photosSlice";

const SmallPic = ({ title, userId, photo, user, onDelete }) => {
  const [image, setImage] = useState();

  const imageListRef = ref(storage, `${userId}/${title.split(" ").join("")}/`);
  console.log(photo._id)
  useEffect(() => {
    listAll(imageListRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImage(url);
        });
      });
    });
  }, []);

  const onPhotoDelete = () => {
    onDelete(photo._id)
  }

  return (
    <section className={classes.article}>
      <article className={classes.image_section}>
        <div className={classes.picsList}>
          <img className={classes.smallPic} src={image} alt={title}></img>
          <h2>{title}</h2>
          <div>
            <div className={classes.btnDiv}>
              <Link className="primaryBtn" to={`/photos/${photo._id}`}>
                ВИЖ ПОВЕЧЕ
              </Link>
              {user && user.isAdmin ? (
                <button onClick={onPhotoDelete} className="btnAdmin">Изтрий</button>
              ) : null}
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};

export default SmallPic;
