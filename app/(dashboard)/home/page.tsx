import Greetings from "@/components/Greetings";
import GreetingsSkeleton from "@/components/GreetingsSkeleton";
import HomePageTaskCard from "@/components/HomePageTaskCard";
import NewProject from "@/components/NewProject";
import ProjectCard from "@/components/ProjectCards";
import { delay } from "@/lib/async";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";

const getData = async () => {
  const user = await getUserFromCookie(cookies());
  const projects = await db.project.findMany({
    where: {
      ownerId: user?.id,
    },
    include: {
      tasks: true,
    },
  });
  return { projects };
};

export default async function Page() {
  const { projects } = await getData();
  console.log(projects);
  return (
    <div className="h-full w-full overflow-y-auto pr-6 ">
      <div className=" h-full  items-stretch justify-center min-h-[content]">
        <div className="flex-1 grow flex">{/** greetings here */}</div>
        <div className="flex flex-2 grow items-center flex-wrap mt-3 -m-3  ml-4 ">
          <Suspense fallback={<GreetingsSkeleton />}>
            <Greetings />
          </Suspense>

          {projects.map((project: { id: any }) => (
            <div className="w-1/3 p-3" key={project.id}>
              <Link href={`/project/${project.id}`}>
                <Suspense
                  fallback={
                    <div className="items-center justify-center">
                      Loading Project.......
                    </div>
                  }
                >
                  <ProjectCard key={project.id} project={project} />
                </Suspense>
              </Link>
            </div>
          ))}

          <div className="w-1/3 p-3">
            <NewProject />
          </div>
        </div>
        <div className="mt-6 ml-4  flex-2 grow w-full flex">
          <div className="w-full mb-3">
            <HomePageTaskCard />
          </div>
        </div>
      </div>
    </div>
  );
}
