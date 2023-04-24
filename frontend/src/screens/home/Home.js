import React, { useState, useEffect } from "react";
import Register from "./Register";
import classes from "./Home.module.css";
import Login from "./Login";

// import redux hoods
import { useSelector, useDispatch } from "react-redux";
import { getLastTen, reset } from "../../features/photos/photosSlice";
import Spinner from "../../components/layout/Spinner";
import SmallPic from "./SmallPic";

const Home = () => {
  const [regComponent, setRegComponent] = useState(true);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { photos, isPhotoLoading, isPhotoSuccess } = useSelector(
    (state) => state.photo
  );

  useEffect(() => {
    dispatch(getLastTen());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      if (isPhotoSuccess) {
        dispatch(reset());
      }
    };
  }, [isPhotoSuccess, dispatch]);
  console.log(photos);
  if (isPhotoLoading) {
    return <Spinner />;
  }

  const onComponentChange = (prop) => {
    setRegComponent(prop);
  };
  return (
    <section className={classes.main}>
      <h1 className={classes.heading}>ПОСЛЕДНИ 10 ПУБЛИКАЦИИ</h1>
      <article className={classes.pics}>
        {photos
          ? photos.map((photo) => (
              <SmallPic
                key={photo._id}
                title={photo.title}
                user={photo.user}
                description={photo.description}
                photo={photo}
              ></SmallPic>
            ))
          : null}
      </article>

      {!user && (
        <div>
          {regComponent ? (
            <Register onComponentChange={onComponentChange} />
          ) : (
            <Login onComponentChange={onComponentChange} />
          )}
        </div>
      )}
    </section>
  );
};

export default Home;
