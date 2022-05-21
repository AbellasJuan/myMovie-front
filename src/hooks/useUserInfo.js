import { useContext } from "react";
import userContext from "../contexts/userContext";

export default function useUserInfo() {
  return useContext(userContext);
}