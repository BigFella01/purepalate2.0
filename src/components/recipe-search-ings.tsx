"use client";

import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaSearch } from "react-icons/fa";

interface DataFormProps {
  handleUrlData: (data: string) => void;
}

export default function RecipeSearchIngs({ handleUrlData }: DataFormProps) {
  const [query, setQuery] = useState<string>();

  function handleSearch() {
    if (query?.length === 0) return;
    const splitQuery = query?.split(",");
    if (splitQuery?.length === 1) {
      toast.error("Ingredients must be seperated by commas");
    } else {
      const editedQuery = splitQuery
        ?.slice(1)
        .map((ing) => {
          return "+" + ing.replace(" ", "");
        })
        .join(",");
      const formattedQuery = `&ingredients=${splitQuery![0]},` + editedQuery;
      handleUrlData(formattedQuery);
    }
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-[1024px] mb-12 mx-auto">
      <Input
        placeholder="Find recipes based on certain ingredients"
        onChange={(e) => setQuery(e.target.value)}
        endContent={
          <Button
            size="sm"
            variant="bordered"
            className="text-orange-700 bg-transparent"
            type="submit"
            onClick={() => handleSearch()}
          >
            <FaSearch />
          </Button>
        }
      />
    </div>
  );
}
