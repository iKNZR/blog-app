import { formatISO9075 } from "date-fns";
import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const PostPage = () => {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);

  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((postInfo) => setPostInfo(postInfo))
      .catch((error) =>
        console.log(
          "There was a problem with the fetch operation: " + error.message
        )
      );
  }, []);

  if (!postInfo) return <div>Loading...</div>;

  return (
    <>
      <div className="post-page">
        <h1>{postInfo.title}</h1>
        <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
        <div className="author">by @{postInfo.author.username}</div>
        {userInfo.id === postInfo.author._id && (
          <div className="edit-row">
            <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
              ✍️Edit this post
            </Link>
          </div>
        )}
        <div className="image">
          <img
            src={`http://localhost:4000/${postInfo.cover}`}
            alt={postInfo.title}
          />
        </div>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: postInfo.content }}
        />
      </div>
    </>
  );
};

export default PostPage;
