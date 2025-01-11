"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex max-md:flex-col items-center bg-red-400 h-screen w-full">
      {/* <HomeBanner /> */}
      <div className="text-6xl flex items-center bg-gradient-to-br  from-sky-300 to-sky-500 h-full w-full">
        <h1 className="text-white text-4xl md:text-5xl xl:text-7xl px-10 font-bold max-md:text-center">
          Hospital food delivery management
        </h1>
      </div>
      {/* redirect buttons ---------------------------------------------- */}
      <div className="bg-white h-full max-md:w-full w-[40%] flex items-center justify-center px-5">
        <div className="flex flex-col gap-5">
          <span
            onClick={() => router.push("/dashboard")}
            className="py-2 px-16 bg-gray-200 rounded-full text-2xl border border-black/30 cursor-pointer hover:bg-gray-300 font-bold mb-16"
          >
            Dashboard
          </span>
          {/* login and register -------------------- */}
          <span
            onClick={() => router.push("/login")}
            className="py-1 px-16 text-center bg-green-400 rounded-md text-2xl border border-black/50 cursor-pointer hover:bg-gray-300"
          >
            Login
          </span>
          <span
            onClick={() => router.push("/register")}
            className="py-1 px-16 text-center bg-blue-500 text-white rounded-md text-2xl border border-black/50 cursor-pointer hover:bg-blue-700"
          >
            Register
          </span>
        </div>
      </div>
    </div>
  );
}
