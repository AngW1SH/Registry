import { useAppDispatch, useAppSelector } from "@/app/store";
import { useEffect } from "react";
import { fetchUserThunk } from "../model/userSlice";
import { useNavigate } from "react-router-dom";

export const useForceUser = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user.user);

  const initializeUser = async () => {
    if (user) return;

    const result = await dispatch(fetchUserThunk());

    if (!result.payload) {
      navigate(import.meta.env.VITE_BASE_PATH + "login");
    }
  };

  useEffect(() => {
    initializeUser();
  }, [user]);
};
