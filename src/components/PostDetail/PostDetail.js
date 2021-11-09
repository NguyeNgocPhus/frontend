import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import Spinner from "../Layout/Spinner";
import { getPost } from "../../actions/postAction";
import PostItem from "../Posts/PostItem";
import CommentForm from "./CommentForm";
import CommentDetail from "./CommentDetail";

const PostDetail = () => {
  const post = useSelector((state) => state.posts.post);
  const loading = useSelector((state) => state.posts.loading);
  const { id } = useParams();
  const dispatch = useDispatch();
  // console.log(id);
  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, id]);

  return loading || post === null ? (
    <Spinner></Spinner>
  ) : (
    <>
      <Link to="/posts">Back to Post</Link>
      <PostItem post={post}></PostItem>
      <CommentForm postId={id}></CommentForm>
      {post.comments.length > 0 ? (
        post.comments.map((comment) => {
          return (
            <CommentDetail
              key={comment._id}
              comment={comment}
              postId={post._id}
            ></CommentDetail>
          );
        })
      ) : (
        <p>Not comment</p>
      )}
    </>
  );
};

export default PostDetail;
