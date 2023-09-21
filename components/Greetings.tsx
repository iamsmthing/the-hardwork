import { getUserFromCookie } from "@/lib/auth";
import { cookies } from "next/headers";
import Button from "./Card";
import { delay } from "@/lib/async";
import Card from "./Card";

interface User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}
const getData = async () => {
  await delay(5000);
  const user = await getUserFromCookie(cookies());
  console.log(user);
  return user;
};

const Greetings = async () => {
  const user: User | null = await getData();
  if (!user) {
    return <div>....Loading</div>;
  }

  return (
    <Card className="w-full py-4 relative">
      <div className="mb-4">
        <h1 className="text-3xl text-gray-700 font-bold mb-4">
          Hello, {user.firstName.split(" ")[0]}!
        </h1>
        <h4 className="text-xl text-gray-400">
          Check your daily tasks and schedule
        </h4>
      </div>
      <div>
        <Button size="small" className="bg-blue-600">
          Today&apos;s Schedule
        </Button>
      </div>
    </Card>
  );
};

export default Greetings;
