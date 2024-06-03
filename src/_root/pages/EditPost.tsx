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
    <div className="flex flex-1 justify-center items-center">
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-custom font-bold text-2xl mb-4">Anuncie aqui!</h2>
  
      <PostForm action="Update" post={post} />
  
      {user.id === post?.creator.$id && (
        <div className="flex">
        <Button
          onClick={handleDeletePost}
          variant="ghost"
          className={`ghost_details-delete_btn ${
            user.id !== post?.creator.$id ? "hidden" : ""
          }`}
        >
          <img
            src={"/assets/icons/delete.svg"}
            alt="delete"
            width={24}
            height={24}
            className="text-custom"
          />
        </Button>
      </div>
      )}
    </div>
  </div>
  );
};

export default EditPost;
