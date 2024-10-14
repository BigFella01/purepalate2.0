import UpdateRecipe from "@/components/update-recipe";
import prisma from "@/db";

export default async function EditRecipe({
  params,
}: {
  params: { recipeId: number };
}) {
  const recipeToEdit = await prisma.createdRecipe.findUnique({
    where: {
      id: Number(params.recipeId),
    },
  });

  return (
    <div className="px-8 py-8 my-8 max-w-[1024px] w-full mx-auto">
      <p className="text-center font-bold text-orange-700 uppercase my-8">
        Update {recipeToEdit?.title} recipe
      </p>
      <UpdateRecipe
        recipeId={Number(params.recipeId)}
        prefilledTitle={recipeToEdit?.title!}
        prefilledIngredients={recipeToEdit?.ingredients!}
        prefilledInstructions={recipeToEdit?.instructions!}
        prefilledSummary={recipeToEdit?.summary!}
        prefilledCookTime={recipeToEdit?.cookTime!}
        prefilledPrepTime={recipeToEdit?.prepTime!}
        prefilledServings={recipeToEdit?.servings!}
      />
    </div>
  );
}
