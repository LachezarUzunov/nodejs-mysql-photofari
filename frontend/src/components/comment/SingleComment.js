import React from "react";
import classes from './SingleComment.module.css'

const SingleComment = ({comment, isAdmin}) => {
    console.log(isAdmin)
    return (
        <article className={classes.comment}>
            <div>
                {comment ? (
                    <p>{comment.comment}</p>
                 ) : null}
            </div>
            {isAdmin ? (
                  <div>
                  <button className="primaryBtn">Изтрий</button>
              </div>
            ) : null}
        </article>
        
    )
}

export default SingleComment;