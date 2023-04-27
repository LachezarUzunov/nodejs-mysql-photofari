import React, { useEffect, useState } from "react";
import classes from './SinglePhoto.module.css';
import Spinner from "../../components/layout/Spinner";
import { toast } from "react-toastify";

import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getSinglePhoto, reset } from "../../features/photos/photosSlice";
import { addComment } from "../../features/comments/commentSlice";

import { storage } from "../../firebase";
import { listAll, ref, getDownloadURL } from "firebase/storage";
import SingleComment from "../../components/comment/SingleComment";

const SinglePhoto = () => {
    const dispatch = useDispatch();
    const [commentInput, setCommentInput] = useState('')
    const [activeUser, setActiveUser] = useState(false);
    const { id } = useParams();
    const [image, setImage ] = useState();
    const [imageListRef, setImageListRef] = useState();

    const { user } = useSelector((state) => state.auth);
    const { photo, isPhotoSuccess, isPhotoLoading, isPhotoError, photoMessage } = useSelector(
        (state) => state.photo
    );

    const { comments, isCommentSuccess, isCommentError, isCommentLoading, commentMessage } =
    useSelector((state) => state.comment);

    const title = photo.title ? photo.title : '';

    useEffect(() => {
        setImageListRef(
            ref(storage, `${photo.user_id}/${title.split(' ').join('')}/`)
        );
    }, [title, photo.user_id]);

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
        if (user) {
            setActiveUser(user)
        }
    }, [user])

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

    const isOwner = activeUser.id === photo.user_id;

    const commentInputHandler = (e) => {
        setCommentInput(e.target.value);
    }

    const onCommentSubmit = () => {

        if(commentInput.length < 5) {
            toast.error('Коментарът трябва да е с дължина от поне 5 символа!')
            return;
        }
        const commentData = {
            photo_id: id,
            comment: commentInput
        }

        dispatch(addComment(commentData));
    }

    if (isPhotoLoading) {
        return <Spinner />
    }

    return (
        <section className={classes.article}>
            <article className={classes.photo__box}>
                <div className={classes.pic}>
                    <img src={image} alt={title}/>
                    <h1>{title}</h1>
                    <h2>{photo.description}</h2>
                    <div>
                        {isOwner || activeUser.isAdmin ? (
                            <button className="primaryBtn">Изтрий</button>
                        ) : null}
                    </div>
                </div>
                {activeUser ? (
                    <div>
                        <textarea
                        className={classes.comment}
                        onChange={commentInputHandler} 
                        placeholder="Добави коментар..."
                        value={commentInput}
                        rows='4'
                        />
                        <button onClick={onCommentSubmit} className="primaryBtn">Добави коментар</button>

                    </div>
                ) : null}

                {comments.length > 1 ? (
                    comments.map((comment) => (
                        <SingleComment comment={comment} key={comment.comment_id}/>
                    ))
                ) : <p>Все още няма коментари към тази снимка</p>
                }
                <SingleComment />
            </article>
        </section>
    )
}

export default SinglePhoto;