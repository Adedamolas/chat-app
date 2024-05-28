import { useContext } from "react";
import { AppContext } from "../helpers/Context";
import { Authors } from "../types/types";

export default function Author() {
  const { loading, setLoading, authors } = useContext(AppContext);

  return (
    <section className=" py-40 sm:py-32 px-32 flex flex-col items-start space-y-10">
      <div>
        <h2 className=" font-bold">Authors</h2>
      </div>
      <div className=" grid grid-cols-1 sm:grid-cols-2 gap-20 justify-between">
        {authors.map((author: Authors) => {
          return(
            <div key={author.id} className=" flex flex-row items-center p-5 bg-gray-100 rounded-lg gap-5">
              <img src= {author.profile_img ?? "default profile_img"} alt= {author.name} className=" rounded-full w-7 h-7 sm:w-14 sm:h-14" />
              <h3 className=" font-md text-base sm:text-lg">
                {author.name}
              </h3>
            </div>
          )
        })}
      </div>
    </section>
  );
}
