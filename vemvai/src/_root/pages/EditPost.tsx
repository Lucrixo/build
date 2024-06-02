import PostForm from "@/components/forms/PostForm";
import Loader from "@/components/shared/Loader";
import { useGetPostById } from "@/lib/react-query/queriesAndMutations";
import { useParams } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || '');

  if(isPending) return <Loader/>


  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="justify-start">
          <h2 className=" h3-bold">Anuncie aqui!</h2>
        </div>


        <PostForm action="Update" post={post}/>
      </div>
    </div>
  );
};

export default EditPost;