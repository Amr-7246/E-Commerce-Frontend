"use client";

import { useUserInfoContext } from "@/context/users/userInfoContext";

export default function Page() {
  const { UserInfo : user } = useUserInfoContext()
  return (
    <div className="min-h-[80vh] w-[80%] rounded-xl flex items-center shadow-2xl flex-col bg-gradient-to-br from-gray-900 via-black/50 to-stone-800 p-6 border border-stone-700">
        <div className="border-b border-stone-600 p-3 w-full flex justify-between mb-5 items-center">
          <h1 className="text-3xl font-bold text-sky-500 mb-2">{user?.name ?? "Anonymous "}</h1>
        </div>

        {/* Extra Data */}
        <div className="w-full">
          <h2 className="text-xl font-semibold text-teal-500 mb-4">User Info:</h2>
          <ul className="text-stone-500 space-y-2">
            <li>Role: <span className="text-sky-600">{user?.name ?? "Unknown"}</span></li>
            <li>Age: <span className="text-sky-600">{user?.name ?? "Not specified"}</span></li>
            <li>Email: {user?.email ?? "No email found"}</li>
          </ul>
        </div>
    </div>
  );
}
