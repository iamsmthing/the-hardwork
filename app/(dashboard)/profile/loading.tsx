import Card from "@/components/Card";

export default function PageLoader() {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <Card className="block justify-center content-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
        <h1 className="text-black">Loading </h1>
      </Card>
    </div>
  );
}
