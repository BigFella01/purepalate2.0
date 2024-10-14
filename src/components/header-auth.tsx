"use client";

import {
  Avatar,
  Button,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthContent() {
  const session = useSession();
  if (session?.status === "loading") {
    return null;
  } else if (session.data?.user) {
    console.log(session.data.user.image)
    return (
      <Popover placement="left">
        <PopoverTrigger>
          <Avatar
            className="cursor-pointer"
            src={session.data.user.image || ""}
          />
        </PopoverTrigger>
        <PopoverContent>
          <div className="p-4 flex flex-col gap-4">
            <Link href="/myrecipes" className="text-orange-700">
              My Recipes
            </Link>
            <Button onClick={() => signOut()}>Sign Out</Button>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  return <Button onClick={() => signIn()}>Sign In</Button>;
}
