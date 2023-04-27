import React, { useEffect, useState } from "react";
import classes from './SinglePhoto.module.css';
import Spinner from "../../components/layout/Spinner";
import { toast } from "react-toastify";

import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getSinglePhoto, reset } from "../../features/photos/photosSlice";

import { storage } from "../../firebase";
import { listAll, ref, getDownloadURL } from "firebase/storage";

const SinglePhoto = () => {
    const dispatch = useDispatch();
    const [activeUser, setActiveUser] = useState(false);
    const { id } = useParams();
    const [image, setImage ] = useState();
    const [imageListRef, setImageListRef] = useState();

    const { user } = useSelector((state) => state.auth);
    const { photo, isPhotoSuccess, isPhotoLoading, isPhotoError, photoMessage } = useSelector(
        (state) => state.photo
    );

    const title = photo.title ? photo.title : '';

    useEffect(() => {
        setImageListRef(
            ref(storage, `${photo.user}/${title.split(' ').join('')}/`)
        );
    }, [title, photo.user]);

    useEffect(() => {
        listAll(imageListRef).then((res) => {
            res.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImage(url)
                })
            })
        })
    }, [imageListRef])

    useEffect(() => {
        return () => {
            if (isPhotoSuccess) {
                dispatch(reset())
            }
        }
    }, [isPhotoSuccess, dispatch])

    useEffect(() => {
        if (isPhotoError) {
            toast.error(photoMessage)
        }

        dispatch(getSinglePhoto(id))

        // eslint-disable-next-line
    }, [isPhotoError, photoMessage, id])

    const isOwner = activeUser.id === photo.user;

    if (isPhotoLoading) {
        return <Spinner />
    }

    return (
        <section className={classes.article}>
            <article>
                <div className={classes.pic}>
                    <img src={image} alt={title}/>
                    <h1>{title}</h1>
                    <h2>{photo.description}</h2>
                    <div>
                        {isOwner || user.isAdmin ? (
                            <button className="primaryBtn">Изтрий</button>
                        ) : null}
                    </div>
                </div>
            </article>
        </section>
    )
}

export default SinglePhoto;