import { userApi } from "@/entities/User/model/userApi";
import { Checkbox } from "@/shared/ui/Checkbox";
import { TextInput } from "@/shared/ui/TextInput";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  className?: string;
}

const Login: FC<LoginProps> = ({ className = "" }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [useLoginMutation, { isSuccess }] = userApi.useLoginMutation();

  const handleConfirm = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (name && password) {
      await useLoginMutation({ username: name, password }).unwrap();
    }
  };

  useEffect(() => {
    if (isSuccess) navigate(import.meta.env.VITE_BASE_URL!);
  }, [isSuccess]);

  return (
    <form className={"bg-background rounded-xl py-10 px-20 " + className}>
      <h1 className="text-5xl text-[#A3AED0] text-center">Sign in</h1>
      <div className="pt-20" />
      <TextInput
        id="login"
        placeholder="Enter your username"
        value={name}
        onChange={(e) => setName(e.target.value)}
        label="Username"
      />
      <div className="pt-7" />
      <TextInput
        id="password"
        placeholder="Enter your password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="Password"
      />
      <div className="pt-11" />
      <Checkbox id="remember" className="text-[#A3AED0]" label="Remember me" />
      <div className="pt-10" />
      <button
        onClick={handleConfirm}
        className="py-3 px-14 text-[#551FFF] mx-auto block font-medium bg-[#F3F0FF] rounded-lg"
      >
        Confirm
      </button>
    </form>
  );
};

export default Login;
