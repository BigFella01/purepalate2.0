"use client";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function RedirectButton({
  name,
  id,
}: {
  name: string;
  id: number;
}) {
  const router = useRouter();
  return (
    <Button onClick={() => router.push(`/editrecipe/${id}`)}>{name}</Button>
  );
}
