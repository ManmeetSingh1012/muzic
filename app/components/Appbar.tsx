"use client";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

// use client is the things that run on the browser not on the cloud.

export function Appbar() {
  const session = useSession();

  return (
    <div className="flex justify-between">

        <div>
            Muzic
        </div>
      <div>
        
        {session.data?.user && <button className="m-2 p-2 bg-blue-400" onClick={()=>signOut}>signOut</button>}
        {!session.data?.user && <button className="m-2 p-2 bg-blue-400" onClick={()=>signIn()}>signIn  </button>}

      </div>
    </div>
  );
}
