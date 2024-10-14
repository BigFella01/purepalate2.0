import RecipePreview from "@/components/recipe-preview";
import prisma from "@/db";
import { auth } from "../auth";

export default async function MyRecipes() {
  const savedRecipes = await prisma.savedRecipe.findMany();
  const createdRecipes = await prisma.createdRecipe.findMany();
  const session = await auth();

  return (
    <div className="px-8 py-8 my-8 max-w-[1024px] w-full mx-auto">
      {savedRecipes.length > 0 && (
        <>
          <h2 className="text-center font-bold text-orange-700 uppercase my-8">
            Saved Recipes
          </h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-8">
            {savedRecipes.map((recipe) => {
              return (
                <RecipePreview
                  key={recipe.recipeId}
                  id={recipe.recipeId}
                  imgSrc={recipe.image}
                  isCreated={false}
                  title={recipe.title}
                  showTitle={true}
                  recipes={savedRecipes}
                  session={session}
                />
              );
            })}
          </div>
        </>
      )}
      {createdRecipes.length > 0 && (
        <>
          <h2 className="text-center font-bold text-orange-700 uppercase my-8">
            Created Recipes
          </h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-8">
            {createdRecipes.map((recipe) => {
              return (
                <RecipePreview
                  key={recipe.id}
                  id={recipe.id}
                  imgSrc={recipe.imageUrl}
                  isCreated={true}
                  title={recipe.title}
                  showTitle={true}
                />
              );
            })}
          </div>
        </>
      )}
      {savedRecipes.length === 0 && createdRecipes.length === 0 && (
        <p>You have not saved or created any recipes.</p>
      )}
    </div>
  );
}
