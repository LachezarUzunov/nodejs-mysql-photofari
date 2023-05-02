import React, { useEffect } from "react";
import classes from './Dashboard.module.css';

import { useSelector, useDispatch } from "react-redux";
import { getLastTen, reset } from "../../features/photos/photosSlice";
import Spinner from "../../components/layout/Spinner";
import SmallPic from "../home/SmallPic";

const Dashboard = () => {
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
    
      if (isPhotoLoading) {
        return <Spinner />;
      }

    return (
        <section className={classes.main}>
            <section>
                <h2>Последни 5 регистрирани потребители</h2>
            </section>
            <section>
                <h2>Последни 5 добавени снимки</h2>
                <article className={classes.pics}>
        {photos
          ? photos.slice(0, 5).map((photo) => (
              <SmallPic
                key={photo._id}
                title={photo.title}
                userId={photo.user}
                description={photo.description}
                photo={photo}
                user={user}
              ></SmallPic>
            ))
          : null}
      </article>
            </section>
            
        </section>
    )
}

export default Dashboard;