import Posts from "../components/Posts";

export default function Stories() {
  return (
    <section className=" py-24 flex flex-col space-y-10 px-8">
      <div className=" px-24 font-bold">
        <h2>Posts</h2>
      </div>
      <>
        <Posts />
      </>
    </section>
  );
}
