import { useAppDispatch } from "@/app/store";
import { userSlice } from "@/entities/User";
import { useLogoutMutation } from "@/entities/User/model/userApi";
import { TextWithIcon } from "@/shared/ui/TextWithIcon";
import { FC, ReactElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface LogoutProps {
  icon: ReactElement;
  children: string;
}

const Logout: FC<LogoutProps> = ({ icon, children }) => {
  const dispatch = useAppDispatch();

  const [logout, { isSuccess }] = useLogoutMutation();
  const navigate = useNavigate();

  const handleClick = async () => {
    logout();
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(userSlice.actions.clearUser());
      navigate(import.meta.env.VITE_BASE_URL! + "login");
    }
  }, [isSuccess]);

  return (
    <TextWithIcon
      onClick={handleClick}
      className="group-hover:text-primary transition-[color]"
      icon={icon}
    >
      {children}
    </TextWithIcon>
  );
};

export default Logout;
