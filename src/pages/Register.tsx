import { RiGoogleLine } from "@remixicon/react";

interface Props {
  signInWithGoogle: () => void;
}

export default function Register({signInWithGoogle}: Props ) {
  return (
    <div className=" w-full h-full flex flex-col align-middle justify-center place-items-center py-20">
      <div className=" flex flex-col text-center space-y-2">
        <h3> Register User </h3>
        <button onClick={signInWithGoogle} className=" flex flex-row gap-1">
          <RiGoogleLine />
          Sign-up with GOOGLE
        </button>
      </div>
    </div>
  );
}
