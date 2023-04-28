import React from "react";

const SingleComment = ({comment}) => {

    return (
        <div>
            {comment ? (
                <p>{comment.comment}</p>
            ) : null}
        </div>
    )
}

export default SingleComment;