import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center items-center my-6 md:my-10">
      <SignUp />
    </div>
  );
}
