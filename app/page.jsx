import Login1 from "./components/Login1";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";



export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/homepage");

  return (
    <main className="w-[390px] h-[844px] flex flex-col justify-center items-center">
      <Login1 />
      
    </main>
  );
}
