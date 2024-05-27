import { RiGoogleLine } from "@remixicon/react";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../helpers/Context";

interface Props {
  signInWithGoogle: () => void;
}

export default function Login({ signInWithGoogle }: Props) {
  const { isAuth } = useContext(AppContext);
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (isAuth) {
  //     navigate("/");
  //   }
  // }, []);
  return (
    <div className=" w-full h-full flex flex-col align-middle justify-center place-items-center py-20">
      <div className=" flex flex-col text-center space-y-2">
        <h2>Welcome Back</h2>
        <p>Sign in to get the most outta Blogr</p>
        <h4>OR</h4>
        <button onClick={signInWithGoogle} className=" flex flex-row gap-1">
          <RiGoogleLine />
          Sign-in with GOOGLE
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
