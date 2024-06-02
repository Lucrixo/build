import PostForm from "@/components/forms/PostForm";
import React from "react";

const CreatePost = () => {
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="justify-start">
          <h2 className=" h3-bold">Anuncie aqui!</h2>
        </div>
        <PostForm />
      </div>
    </div>
  );
};

export default CreatePost;
