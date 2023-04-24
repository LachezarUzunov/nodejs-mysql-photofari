import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./SmallPic.module.css";
import { storage } from "../../firebase";
import { listAll, ref, getDownloadURL } from "firebase/storage";

const SmallPic = ({ title, user, description, photo }) => {
  const [image, setImage] = useState();

  const imageListRef = ref(storage, `${user}/${title.split(" ").join("")}/`);

  useEffect(() => {
    listAll(imageListRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImage(url);
        });
      });
    });
  }, []);

  return (
    <section className={classes.article}>
      <article className={classes.image_section}>
        <div className={classes.picsList}>
          <img className={classes.smallPic} src={image} alt={title}></img>
          <h2>{description}</h2>
          <div>
            <div className={classes.btnDiv}>
              <Link className="primaryBtn" to={`/photos/${photo._id}`}>
                ВИЖ ПОВЕЧЕ
              </Link>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};

export default SmallPic;
