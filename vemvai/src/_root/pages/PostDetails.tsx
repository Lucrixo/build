import { useParams, Link, useNavigate } from "react-router-dom";

import { multiFormatDateString } from "@/lib/utils";
import {
  useDeletePost,
  useGetPostById,
} from "@/lib/react-query/queriesAndMutations";
import { Button } from "@/components/ui/button";
import Loader from "@/components/shared/Loader";
import { useUserContext } from "@/context/AuthContext";
import { toast } from "@/components/ui/use-toast";

const PostDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || "");
  const { user } = useUserContext();

  const { mutate: deletePost } = useDeletePost();

  const handleDeletePost = () => {
    deletePost({ postId: id!, imageId: post?.imageId });
    navigate("/");
    return toast({ title: "Deletado com sucesso!" });
  };
  return (
<div className="post_details-container">
  <div className="max-w-5xl w-full flex justify-between items-center mb-4">
    <Button
      onClick={() => navigate(-1)}
      variant="ghost"
      className="shad-button_ghost"
    >
      <img
        src={"/assets/icons/back.svg"}
        alt="back"
        width={24}
        height={24}
        className="mr-2"
      />
      <p className="small-medium lg:base-medium">Back</p>
    </Button>

    {isPending || !post ? (
      <Loader />
    ) : (
      <div className="flex items-center gap-4">
        <Link
          to={`/update-post/${post?.$id}`}
          className={`${user.id !== post?.creator.$id && "hidden"}`}
        >
          <img
            src={"/assets/icons/edit.svg"}
            alt="edit"
            width={24}
            height={24}
          />
        </Link>

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
    )}
  </div>

  {!isPending && post && (
    <div className="post_details-card flex items-start">
      <img
        src={post?.imageUrl}
        alt="creator"
        className="post_details-img w-1/3 mr-6"
      />

      <div className="post_details-info">
        <div className="flex items-center gap-3">
          <img
            src={
              post?.creator.imageUrl ||
              "/assets/icons/profile-placeholder.svg"
            }
            alt="creator"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="base-medium lg:body-bold text-light-1">
              {post?.creator.name}
            </p>
            <div className="flex gap-1 flex-col text-light-3">
              <p className="subtle-semibold lg:small-regular">
                {multiFormatDateString(post?.$createdAt)}
              </p>
              <p className="subtle-semibold lg:small-regular">
                {post?.location}
              </p>
            </div>
          </div>
        </div>

        <hr className="border w-full border-dark-4/80 mt-4 mb-6" />

        <div className="small-medium lg:base-regular">
          <p>{post?.caption}</p>
          <ul className="flex gap-1 mt-2">
            {post?.tags.map((tag: string, index: number) => (
              <li
                key={`${tag}${index}`}
                className="text-light-3 small-regular"
              >
                #{tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )}
</div>
  );
};

export default PostDetails;
