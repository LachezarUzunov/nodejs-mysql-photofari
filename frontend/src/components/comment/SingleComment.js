import React from "react";
import classes from './SingleComment.module.css'

const SingleComment = ({comment}) => {

    return (
        <article className={classes.comment}>
            <div>
                {comment ? (
                    <p>{comment.comment}</p>
                 ) : null}
            </div>
        </article>
        
    )
}

export default SingleComment;