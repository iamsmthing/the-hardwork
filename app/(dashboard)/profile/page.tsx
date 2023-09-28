import Card from "@/components/Card";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";

const format = (date: string | number | Date) => {
  return new Date(date).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getUserId = async () => {
  const user = await getUserFromCookie(cookies());
  return user?.id;
};

const getUserProfile = async () => {
  const userId = await getUserId();
  if (userId) {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        tasks: true,
        projects: true,
      },
    });
    return user;
  }
};

export default async function Page() {
  const data = await getUserProfile();
  console.log("user data:", data);
  return (
    <Card className="w-full h-5/6 mt-4 ml-4 mr-4 bg-slate-800 text-white">
      <p className="text-3xl text-zinc-200 font-bold">Profile</p>
      <div className="flex  content-center   justify-center h-4/5">
        <div className="flex flex-col gap-6 w-3/5  p-5 rounded-xl ">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold">
              First Name: {data?.firstName}
            </h1>
            <h1 className="text-2xl font-bold">Last Name: {data?.lastName}</h1>
          </div>

          <div className="flex justify-between">
            <h1 className="text-2xl font-bold">E-mail Id: {data?.email}</h1>
          </div>
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold">
              Created at: {format(data?.createdAt)}
            </h1>
          </div>
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold">
              No. of Tasks: {data?.tasks.length}
            </h1>
            <h1 className="text-2xl font-bold">
              No. of Projects: {data?.projects.length}
            </h1>
          </div>
        </div>
      </div>
    </Card>
  );
}
