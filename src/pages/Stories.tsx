import { useContext } from "react";
import Posts from "../components/Posts";
import { AppContext } from "../helpers/Context";
import Loader from "../loader/Loader";

export default function Stories() {
  const {loading} = useContext(AppContext)
    if (loading) {
      return (
        <div className=" w-full h-full flex flex-col align-middle justify-center place-items-center items-center py-20">
          <Loader />
        </div>
      );
    }
  return (
    <section className=" py-24 flex flex-col space-y-10 px-8">
      <div className=" px-14 font-bold">
        <h2>Posts</h2>
      </div>
      <>
        <Posts />
      </>
    </section>
  );
}
