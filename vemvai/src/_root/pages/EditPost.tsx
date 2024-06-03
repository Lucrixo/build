import PostForm from "@/components/forms/PostForm";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useUserContext } from "@/context/AuthContext";
import { useDeletePost, useGetPostById } from "@/lib/react-query/queriesAndMutations";
import { useNavigate, useParams } from "react-router-dom";



const EditPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || "");
  const { user } = useUserContext();

  const { mutate: deletePost } = useDeletePost();

  const handleDeletePost = () => {
    deletePost({ postId: id!, imageId: post?.imageId });
    navigate('/home');
    return toast({title: 'Deletado com sucesso!'})
  };
  if (isPending) return <Loader />;
  

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="justify-start">
          <h2 className=" h3-bold">Anuncie aqui!</h2>
        </div>

        <PostForm action="Update" post={post} />

        <Button
          onClick={handleDeletePost}
          variant="ghost"
          className={`ghost_details-delete_btn ${
            user.id !== post?.creator.$id && "hidden"
          }`}
        >
          <img
            src={"/assets/icons/delete.svg"}
            alt="delete"
            width={24}
            height={24}
          />
        </Button>
      </div>
    </div>
  );
};

export default EditPost;
