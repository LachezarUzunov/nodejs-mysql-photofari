import React, { useEffect } from "react";
import classes from './Dashboard.module.css';

import { useSelector, useDispatch } from "react-redux";
import { deletePhoto, getLastTen, reset } from "../../features/photos/photosSlice";
import Spinner from "../../components/layout/Spinner";
import SmallPic from "../home/SmallPic";
import { getLastFive } from "../../features/auth/authSlice";

const Dashboard = () => {
    const dispatch = useDispatch();

    const { users, user } = useSelector((state) => state.auth);
    const { photos, isPhotoLoading, isPhotoSuccess } = useSelector(
        (state) => state.photo
      );
        console.log(users)
    useEffect(() => {
        dispatch(getLastFive())
    }, [dispatch])

    useEffect(() => {
        dispatch(getLastTen());
      }, [dispatch]);

      useEffect(() => {
        if (isPhotoSuccess) {
          dispatch(reset());
        }
    }, [isPhotoSuccess, dispatch]);

      const onDelete = (id) => {
        dispatch(deletePhoto(id))
      //  dispatch(reset);
      }
    
      if (isPhotoLoading) {
        return <Spinner />;
      }

    return (
        <section className={classes.main}>
            <section className={classes.last__five}>
                <h2 className={classes.last__five_heading}>Последни 5 регистрирани потребители</h2>
            </section>
            <section className={classes.last__five}>
                <h2 className={classes.last__five_heading}>Последни 5 добавени снимки</h2>
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
                onDelete={onDelete}
              ></SmallPic>
            ))
          : null}
      </article>
            </section>
            
        </section>
    )
}

export default Dashboard;