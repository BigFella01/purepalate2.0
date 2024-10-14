"use client";

import { addToFavorites } from "@/app/helpers/actions";
import { Button, Image } from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import { useState } from "react";
import { IoIosHeart } from "react-icons/io";
import { SavedRecipe } from "@prisma/client";
import { UpdateSession } from "next-auth/react";
import { Session } from "next-auth";

interface ClientSession {
  data: Session | null;
  status: "authenticated" | "unauthenticated" | "loading";
  update: UpdateSession;
}

interface PreviewProps {
  id: number;
  imgSrc: string;
  title: string;
  showTitle: boolean;
  isCreated?: boolean;
  recipes?: SavedRecipe[];
  session?: ClientSession | Session | null;
}

export default function RecipePreview({
  id,
  imgSrc,
  title,
  showTitle,
  isCreated,
  recipes,
  session,
}: PreviewProps) {
  const [src, setSrc] = useState(imgSrc);
  const [isLiked, setIsLiked] = useState<
    | {
        id: string;
        recipeId: number;
        userEmail: string;
        title: string;
        image: string;
      }
    | undefined
    | boolean
  >(
    recipes?.find((recipe) => {
      if (session) {
        if ("data" in session) {
          return (
            recipe.recipeId === id &&
            recipe.userEmail === session?.data?.user?.email
          );
        } else {
          return (
            recipe.recipeId === id && recipe.userEmail === session?.user?.email
          );
        }
      }
    })
  );

  const addToFavoritesWithId = addToFavorites.bind(null, { id, imgSrc, title });

  const isLikedStyles = {
    color: "#000",
    fontSize: "1.5rem",
    transition: "all 200ms linear",
  };
  const normalStyles = {
    transition: "all 200ms linear",
  };

  return (
    <div>
      <div className="relative">
        <Image
          src={src}
          fallbackSrc="https://theme-assets.getbento.com/sensei/aa5fa78.sensei/assets/images/catering-item-placeholder-704x520.png"
          alt="dish"
          className="mb-2 w-[400px] h-[200px] object-cover"
          onError={() =>
            setSrc(
              "https://theme-assets.getbento.com/sensei/aa5fa78.sensei/assets/images/catering-item-placeholder-704x520.png"
            )
          }
        />
        {session && (
          <form action={addToFavoritesWithId}>
            <Button
              type="submit"
              isIconOnly
              color="danger"
              aria-label="like"
              className="absolute top-2 right-2 z-10"
              onClick={() => setIsLiked(!isLiked)}
            >
              <IoIosHeart style={isLiked ? isLikedStyles : normalStyles} />
            </Button>
          </form>
        )}
      </div>

      <Link
        href={isCreated ? `/myrecipes/${id}` : `/findrecipe/recipes/${id}`}
        underline="hover"
        className="flex flex-col text-black relative"
      >
        {showTitle && title}
      </Link>
    </div>
  );
}
