import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";


const Home = () => {
  const { data: posts, isPending: isPostLoading } = useGetRecentPosts();
  console.log(posts);

  const recyclableMaterials = [
    {
      title: 'Papel',
      description: 'O papel é um material facilmente reciclável e pode ser decomposto em até 2 a 5 meses.',
    },
    {
      title: 'Plástico',
      description: 'O plástico é um material de decomposição lenta que pode levar centenas de anos para se decompor completamente.',
    },
    {
      title: 'Vidro',
      description: 'O vidro é um material reciclável infinitamente e pode ser reciclado repetidamente sem perder sua qualidade.',
    },
    {
      title: 'Metal',
      description: 'O metal é altamente reciclável e pode ser derretido e reutilizado várias vezes.',
    },
    {
      title: 'Orgânico',
      description: 'Resíduos orgânicos, como restos de comida e folhas, podem ser compostados para produzir adubo orgânico.',
    },
  ];



  return (
    <div className="flex flex-1">
      <div className="home-container  mx-10">
      <div className="mt-8 mx-10">
          <h2 className="text-2xl font-bold mb-4">Vamos relembrar!</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-40">
            {recyclableMaterials.map((material, index) => (
              <div key={index} className="p-4 border rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                <h3 className="text-xl font-semibold mb-2">{material.title}</h3>
                <p className="text-gray-700">{material.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="home-posts">
          <h2 className="text-custom text-center text-2xl font-bold mb-4">Anúncios</h2>
          {isPostLoading && !posts ? (
            <Loader />
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts?.documents.map((post: Models.Document) => (
                <li key={post.$id} className="flex justify-center">
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
