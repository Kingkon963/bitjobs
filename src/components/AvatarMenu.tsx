import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

function AvatarMenu() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <div className="relative">
      <button className="avatar" onClick={() => setOpen(!open)}>
        <div className="w-12 rounded-full shadow-lg focus:shadow-none">
          {session?.user.image && <img src={session?.user.image} alt={session.user.name || ""} />}
          {!session?.user.image && (
            <span className="flex h-full w-full items-center justify-center bg-base-content text-lg text-base-200">
              {session?.user.name && session.user.name[0]}
            </span>
          )}
        </div>
      </button>
      {open && (
        <ul className="menu absolute top-full left-1/2 w-max -translate-x-full border bg-base-100">
          <div className="border-b py-2 px-5 text-center">
            <h3 className="font-bold">{session?.user.name}</h3>
            <h6 className="text-sm">{session?.user.email}</h6>
          </div>

          <li onClick={() => signOut()}>
            <a>Sign out</a>
          </li>
        </ul>
      )}
    </div>
  );
}

export default AvatarMenu;
