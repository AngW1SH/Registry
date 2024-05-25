import { useAppDispatch } from "@/app/store";
import { fetchUserThunk } from "@/entities/User";
import { Login } from "@/features/Login";
import { LoadingCircle } from "@/shared/ui/LoadingCircle";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginPageProps {}

const LoginPage: FC<LoginPageProps> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [checkedUser, setCheckedUser] = useState(false);

  useEffect(() => {
    async function checkUser() {
      const result = await dispatch(fetchUserThunk());

      if (result?.payload) {
        navigate(import.meta.env.VITE_BASE_PATH);
      }

      setCheckedUser(true);
    }

    checkUser();
  }, []);

  if (!checkedUser) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <LoadingCircle />
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Login className="max-h-[80%] w-[40%]" />
    </div>
  );
};

export default LoginPage;
