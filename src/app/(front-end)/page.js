import ThemeToggleBtn from "@/components/common/ThemeToggleBtn";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/options";

const Home = async () => {
  const session = await getServerSession(authOptions);
  console.log("session", session);
  return (
    <>
      <ThemeToggleBtn />
      <Button> click me</Button>
    </>
  );
};
export default Home;
