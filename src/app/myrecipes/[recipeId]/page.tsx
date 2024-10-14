//@ts-nocheck

import { deleteRecipe } from "@/app/helpers/actions";
import ImgWithFallback from "@/components/img-with-fallback";
import NutritionTableAlt from "@/components/nutrition-table-alt";
import RedirectButton from "@/components/redirect-button";
import prisma from "@/db";
import { Button } from "@nextui-org/react";

const API_KEY = process.env.API_NINJA_KEY;

export default async function RecipeDetails({
  params,
}: {
  params: { recipeId: number };
}) {
  const recipe = await prisma.createdRecipe.findUnique({
    where: {
      id: Number(params.recipeId),
    },
  });
  const ingredients = JSON.parse(recipe?.ingredients!);
  const instructions = JSON.parse(recipe?.instructions!);
  const res = await fetch(
    `https://api.api-ninjas.com/v1/nutrition?X-Api-Key=${API_KEY}&query=${ingredients
      .toString()
      .replaceAll(",", " and ")}`
  );
  const data = await res.json();
  const deleteRecipeWithId = deleteRecipe.bind(null, Number(params.recipeId));

  return (
    <section className="px-10 py-6 max-w-[1024px] w-full mx-auto">
      <h3 className="text-center font-bold text-orange-700 uppercase my-8">
        {recipe?.title}
      </h3>
      <div className="flex justify-center">
        <ImgWithFallback srcProp={recipe?.imageUrl!} />
      </div>
      <div className="flex gap-2 justify-end mb-20">
        <RedirectButton name="Edit recipe" id={params.recipeId} />
        <form action={deleteRecipeWithId}>
          <Button color="danger" type="submit">
            Delete recipe
          </Button>
        </form>
      </div>

      <div className="flex justify-center bg-slate-100 p-4 rounded-2xl text-center mb-28">
        <div className="flex flex-col w-[30%]">
          <h3 className="font-bold text-orange-700">Prep time:</h3>
          <p>{recipe?.prepTime} minutes</p>
        </div>
        <div className="flex flex-col w-[30%]">
          <h3 className="font-bold text-orange-700">Cook time:</h3>
          <p>{recipe?.cookTime} minutes</p>
        </div>
        <div className="flex flex-col w-[30%]">
          <h3 className="font-bold text-orange-700">Servings: </h3>
          <p>{recipe?.servings}</p>
        </div>
      </div>

      <div className="mt-4 mb-12">
        <h3 className="text-center font-bold mb-4 text-orange-700">Summary</h3>
        <p className="leading-relaxed">{recipe?.summary}</p>
      </div>

      <div className="mb-24">
        <h3 className="text-center font-bold mb-4 text-orange-700">
          Ingredients
        </h3>
        <ul className="list-disc loading-relaxed">
          {ingredients.map((ingredient: string, index: number) => {
            return (
              <li key={index} className="mb-2">
                {ingredient}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-4 mb-24">
        <h3 className="text-center font-bold mb-4 text-orange-700">
          Instructions
        </h3>
        <ol className="list-decimal loading-relaxed">
          {instructions.map((instruction: string, index: number) => {
            return (
              <li key={index} className="mb-2">
                {instruction}
              </li>
            );
          })}
        </ol>
      </div>
      <div className="my-4">
        <h3 className="text-center font-bold mb-4 text-orange-700">
          Nutrition Information
        </h3>
        <NutritionTableAlt nutrients={data} />
      </div>
    </section>
  );
}
