import { Login } from "@/features/Login";
import { FC } from "react";

interface LoginPageProps {}

const LoginPage: FC<LoginPageProps> = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Login className="max-h-[80%] w-[40%]" />
    </div>
  );
};

export default LoginPage;
