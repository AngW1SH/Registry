import { Checkbox } from "@/shared/ui/Checkbox";
import { TextInput } from "@/shared/ui/TextInput";
import { FC } from "react";

interface LoginProps {
  className?: string;
}

const Login: FC<LoginProps> = ({ className = "" }) => {
  return (
    <form className={"bg-background rounded-xl py-10 px-20 " + className}>
      <h1 className="text-5xl text-[#A3AED0] text-center">Sign in</h1>
      <div className="pt-20" />
      <TextInput
        id="login"
        placeholder="Enter your username"
        label="Username"
      />
      <div className="pt-7" />
      <TextInput
        id="password"
        placeholder="Enter your password"
        label="Password"
      />
      <div className="pt-11" />
      <Checkbox id="remember" className="text-[#A3AED0]" label="Remember me" />
      <div className="pt-10" />
      <button className="py-3 px-14 text-[#551FFF] mx-auto block font-medium bg-[#F3F0FF] rounded-lg">
        Confirm
      </button>
    </form>
  );
};

export default Login;
