import React from "react";

function PostItem(props) {
    const {name, userId, id, title, body} = props;

    return(
        <div>
            <h2>{name} posted:</h2>
            <h3>{title}</h3>
            <p>{body}</p>
            <p><small>Post id {id}, User id {userId}</small></p>
        </div>
    )
}

export default PostItem;