import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "@mantine/core";
import { useDispatch } from "react-redux";
import { logoutUserAction } from "@/context/user-slice/slice";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const dispatch = useDispatch();
  return (
    <div>
      <p>Dashboard</p>
      <Button onClick={()=>{dispatch(logoutUserAction())}}>Logout</Button>
    </div>
  )
}
