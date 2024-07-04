import { useContext } from "react";
import { AppContext } from "../helpers/Context";
import Loader from "../loader/Loader";

export default function MyPosts() {
  const { loading } = useContext(AppContext);
  if (loading) {
    return (
      <div className=" w-full h-full flex flex-col align-middle justify-center place-items-center items-center py-20">
        <Loader />
      </div>
    );
  }
  return (
    <div className=" w-full h-full flex flex-col align-middle justify-start place-items-middle py-48 sm:py-32 items-center">
      <div>
        <h2 className=" font-bold">Your posts, You can def make much more.</h2>
      </div>
      <div>

      </div>
    </div>
  );
}
