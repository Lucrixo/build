import PostForm from "@/components/forms/PostForm";

const CreatePost = () => {
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="justify-start">
          <h2 className=" h3-bold">Anuncie aqui!</h2>
        </div>
        <PostForm action="Create"/>
      </div>
    </div>
  );
};

export default CreatePost;
