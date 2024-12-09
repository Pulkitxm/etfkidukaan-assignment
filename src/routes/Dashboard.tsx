import { AuthContext } from "@/context/auth";
import { useContext } from "react";

export default function Home() {
  const { user } = useContext(AuthContext);
  return <div>{user?.email}</div>;
}
