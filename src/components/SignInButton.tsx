import Image from "next/image";
import GoogleIcon from "@/images/google.svg";
import { signInAction } from "@/lib/actions";

function SignInButton() {
  return (
    <form action={signInAction}>
      <button className="flex items-center gap-6 border border-primary-300 px-10 py-4 text-lg font-medium">
        <Image src={GoogleIcon} alt="Google logo" height="24" width="24" />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}

export default SignInButton;
