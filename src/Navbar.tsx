import { RiSearch2Line } from "@remixicon/react";
import { auth } from "./firebase-config";

interface Props {
  isAuth: boolean;
  signUserOut: () => void;
}
export default function Navbar({ isAuth, signUserOut }: Props) {
  return (
    <nav className=" flex flex-row w-full justify-between items-center list-none py-3 text-xl px-32 fixed top-0 backdrop-blur-md z-10">
      <div className=" flex flex-row gap-5 items-baseline">
        <h2>Blogr</h2>
        <ul className=" flex flex-row items-center justify-center">
          <a href={"/"} className=" p-3 rounded-full">
            <li>Home</li>
          </a>
          <a href={"create-post"} className=" p-3 rounded-full">
            <li>Create-Post</li>
          </a>
          <a href={"posts"} className=" p-3 rounded-full">
            <li>Posts</li>
          </a>
          <a href={"authors"} className=" p-3 rounded-full">
            <li>Authors</li>
          </a>
        </ul>
      </div>
      <div className=" flex flex-row gap-5 items-center">
        <span>
          <RiSearch2Line />
        </span>
        {!isAuth && (
          <>
            <a href={"login"} className="rounded-full">
              <li>Login</li>
            </a>
          </>
        )}
        {isAuth && (
          <>
            <button onClick={signUserOut}>Sign Out</button>
          </>
        )}
        <img
          width={"50px"}
          height={"50px"}
          className=" rounded-full"
          src={auth.currentUser?.photoURL ?? undefined}
          alt="profile_pic"
        />
      </div>
    </nav>
  );
}
