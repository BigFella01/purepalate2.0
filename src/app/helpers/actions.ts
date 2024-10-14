"use server";

import prisma from "@/db";
import { auth } from "../auth";
import { redirect } from "next/navigation";

const API_KEY = "30497d627dd546aca9766de5b385709a";



export async function addToFavorites({
  id,
  imgSrc,
  title,
}: {
  id: number;
  imgSrc: string;
  title: string;
}) {
  try {
    const session = await auth();

    const currentUser = await prisma.user.findUnique({
      where: {
        id: session?.user?.id,
      },
    });

    const matchedRecipe = await prisma.savedRecipe.findFirst({
      where: {
        userEmail: currentUser?.email!,
        recipeId: id,
      },
    });

    if (matchedRecipe) {
      const deletedRecipe = await prisma.savedRecipe.deleteMany({
        where: {
          userEmail: currentUser?.email!,
          recipeId: id,
        },
      });

      if (!deletedRecipe) {
        throw new Error("Recipe could not be removed from favorites.");
      }
    } else {
      const newRecipe = await prisma.savedRecipe.create({
        data: {
          recipeId: id,
          userEmail: session?.user?.email!,
          title: title,
          image: imgSrc,
        },
      });
    }
  } catch (error) {
    return {
      error: "Something went wrong!",
    };
  }
}

export async function getRecipes() {
  const recipes = await prisma.savedRecipe.findMany();
  return recipes;
}

export async function createRecipe(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const ingredients = formData.get("ingredients") as string;
    const instructions = formData.get("instructions") as string;
    const summary = formData.get("summary") as string;
    const imageUrl = formData.get("imageUrl") as string;
    const prepTime = formData.get("prepTime") as string;
    const cookTime = formData.get("cookTime") as string;
    const servings = formData.get("servings") as string;

    const session = await auth();

    const currentUser = await prisma.user.findUnique({
      where: {
        id: session?.user?.id,
      },
    });

    if (currentUser) {
      const createdRecipe = await prisma.createdRecipe.create({
        data: {
          userEmail: currentUser?.email!,
          title,
          ingredients,
          instructions,
          summary,
          imageUrl,
          prepTime,
          cookTime,
          servings,
        },
      });
    }
  } catch (error) {
    return {
      error: `Something went wrong! Your recipe could not be created.`,
    };
  } finally {
    redirect("/myrecipes");
  }
}

export async function updateRecipe(id: number, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const ingredients = formData.get("ingredients") as string;
    const instructions = formData.get("instructions") as string;
    const summary = formData.get("summary") as string;
    const imageUrl = formData.get("imageUrl") as string;
    const session = await auth();

    const currentUser = await prisma.user.findUnique({
      where: {
        id: session?.user?.id,
      },
    });

    if (currentUser) {
      const updatedRecipe = await prisma.createdRecipe.update({
        where: {
          id: id,
        },
        data: {
          userEmail: currentUser?.email!,
          title,
          ingredients,
          instructions,
          summary,
          imageUrl,
        },
      });
    }
  } catch (error) {
    return {
      error: "Something went wrong! Your recipe could not be updated.",
    };
  } finally {
    redirect("/myrecipes");
  }
}

export async function deleteRecipe(id: number) {
  try {
    const deletedRecipe = await prisma.createdRecipe.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    return {
      error: "Something went wrong! Your recipe could not be deleted.",
    };
  } finally {
    redirect("/myrecipes");
  }
}
