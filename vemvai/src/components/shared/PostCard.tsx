import { useUserContext } from "@/context/AuthContext";
import { multiFormatDateString } from "@/lib/utils";
import { Models } from "appwrite";
import { Link } from "react-router-dom";

type PostCardProps = {
  post: Models.Document;
};
const PostCard = ({ post }: PostCardProps) => {
  const { user } = useUserContext();

  if (!post.creator) return;
  return (
    <div className="post-card">
      <div className="flex-between justify-center h-20">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.creator.$id}`}>
            <img
              src={
                post?.creator?.imageUrl ||
                "/assets/icons/profile-placeholder.svg"
              }
              alt="creator"
              className="w-12 lg:h-12 rounded-full"
            />
          </Link>
          <div className="flex flex-col ">
            <p className="font-semibold text-custom ">{post.creator.name}</p>
            <div className="text-custom flex intems-center flex-row  ap-2">
              <p className="text-custom text-xs ">
                {multiFormatDateString(post.$createdAt)}
              </p>
            </div>
          </div>
          <Link
            to={`/update-post/${post.$id}`}
            className={`${user.id !== post.creator.$id && "hidden"}`}
          >
            <img
              src="/assets/icons/edit.svg"
              alt="edit"
              width={20}
              height={20}
            />
          </Link>
        </div>
      </div>
      <Link to={`/posts/${post.$id}`} className="block relative">
        <img
          src={post.imageUrl || "/assets/icons/profile-placeholder.svg"}
          className="post-card_img"
          alt="post image"
        />
        <div className="absolute inset-0 flex flex-col justify-between p-4 bg-black bg-opacity-50 transition-opacity opacity-0 hover:opacity-100">
          <div>
            <p className="text-white text-sm mb-1">{post.caption}</p>
            <p className="text-white text-sm mb-1">{post.location}</p>
            <ul className="flex flex-wrap gap-1">
              {post.tags.map((tag: string) => (
                <li key={tag} className="text-white text-xs">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
