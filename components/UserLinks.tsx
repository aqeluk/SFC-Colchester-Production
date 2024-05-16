import { UserCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useUser, UserButton } from "@clerk/nextjs";

const UserLinks = () => {
  const { isLoaded, isSignedIn } = useUser();

  return (
    <>
      {!isLoaded || !isSignedIn ? (
        <button className="text-xl font-bold text-sfc-blue hover:text-blue-900 md:transform md:transition md:hover:scale-105">
          <Link href="/sign-in">
            <div className="flex items-center justify-center relative">
              <UserCircleIcon className="h-8 w-8" aria-hidden="true" />
            </div>
            <span className="hidden lg:inline">SIGN IN</span>
          </Link>
        </button>
      ) : (
        <UserButton />
      )}
    </>
  );
};

export default UserLinks;
