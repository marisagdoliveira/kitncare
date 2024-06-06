import Login1 from "./components/Login1";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";



export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/homepage");

  return (
    <main className="bg-zinc-700">
      <Login1 />
      
    </main>
  );
}
