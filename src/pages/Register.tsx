import { RiGoogleLine } from "@remixicon/react";

interface Props {
  signInWithGoogle: () => void;
}

export default function Register({ signInWithGoogle }: Props) {
  return (
    <div className=" w-full h-full flex flex-col align-middle justify-center place-items-center py-20">
      <div className=" flex flex-col text-center space-y-2">
        <h3> Join Blogr </h3>
        <button onClick={signInWithGoogle} className=" flex flex-row gap-1">
          <RiGoogleLine />
          Sign-up with GOOGLE
        </button>
        <p>
          Already have an account? <a href="/login">Sign-in</a>{" "}
        </p>
      </div>

      <div>
        <p>Click "Sign-up" to agree to Blogr's</p>
        <a href={"/"}>Terms of service</a>
        <p>and acknowledge that Blogr's</p>
        <a href="/">Privacy Policy</a>
        <p>applies to you.</p>
      </div>
    </div>
  );
}
