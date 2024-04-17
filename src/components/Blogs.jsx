import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import BlogDetails from "./BlogDetails";

export default function Blogs() {
  const { posts, loading } = useContext(AppContext);

  return (
    <div className="w-full h-full flex flex-col gap-y-1 items-center justify-center mb-[70px]">
      {loading ? (
        <div className="min-h-[80vh] w-full flex justify-center items-center">
          <p className="text-center font-bold text-3xl">Loading</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="min-h-[80vh] w-full flex justify-center items-center">
          <p className="text-center font-bold text-3xl">No Blogs Found !</p>
        </div>
      ) : (
        posts.map((post) => (
          //So, for each post or blog in posts array(list) using map() function we are creating/rendering this card/card component 
          //<BlogDetails/> which shows each blog or post in UI
          <BlogDetails key={post.id} post={post}/>
        ))
      )}
    </div>
  );
}
