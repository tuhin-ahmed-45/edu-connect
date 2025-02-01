
import { doSocialLogin } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const SocialLogins = () => {
  return (
    <>
      <div className="text-center text-sm mt-3 text-gray-700">
        or Signup with
      </div>
      <form action={doSocialLogin} className="grid grid-cols-2 gap-2 mt-2">
        <Button
          variant="ghost"
          className="border flex justify-center items-center"
          size="lg"
          name="action"
          value="google"
        >
          <FcGoogle className="text-xl" />
        </Button>

        <Button
          className="border flex justify-center items-center"
          type="submit"
          name="action"
          value="github"
          variant="ghost"
          size="lg"
        >
          <FaGithub className="text-xl" />
        </Button>
      </form>
    </>
  );
};

export default SocialLogins;
