import { RiGoogleLine } from "@remixicon/react";
import { Link } from "react-router-dom";

interface Props {
  signInWithGoogle: () => void;
}

export default function Login({signInWithGoogle}: Props ) {
  return (
    <div className=" w-full h-full flex flex-col align-middle justify-center place-items-center py-20">
      <div className=" flex flex-col text-center space-y-2">
        <h2>Welcome Back</h2>
        <p>Sign in to get the most outta Blogr</p>
        <form action="submit"></form>
        <h4>OR</h4>
        <button onClick={signInWithGoogle} className=" flex flex-row gap-1">
          <RiGoogleLine />
          Sign-up with GOOGLE
        </button>
        <p>
          Don't have an account?
          {"  "}
          <span className=" border-b-2 border-black">
            <Link to={"/register"}>Signup</Link>
          </span>
        </p>
      </div>
    </div>
  );
}
