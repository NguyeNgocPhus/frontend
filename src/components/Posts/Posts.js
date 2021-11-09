import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../actions/postAction";
import Spinner from "../Layout/Spinner";
// import CommentForm from "../PostDetail/CommentForm";
import PostForm from "./PostForm";
import PostItem from "./PostItem";

const Posts = () => {
  const loading = useSelector((state) => state.posts.loading);
  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();
  // console.log(posts);
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);
  return loading ? (
    <Spinner></Spinner>
  ) : (
    <Fragment>
      <div className="post bg-white p-1 my-1">Posts</div>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome to the community
      </p>
      <PostForm></PostForm>
      {posts.length > 0 ? (
        <div className="posts">
          {posts.map((post) => {
            return <PostItem key={post._id} post={post}></PostItem>;
          })}
        </div>
      ) : (
        <h3>Not Found Posts</h3>
      )}
    </Fragment>
  );
};

export default Posts;
