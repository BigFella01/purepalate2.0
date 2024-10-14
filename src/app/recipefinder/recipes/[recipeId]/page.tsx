import { auth } from "@/app/auth";
import NutritionTable from "@/components/nutrition-table";
import RecipePreview from "@/components/recipe-preview";
import prisma from "@/db";

const API_KEY = process.env.SPOONACULAR_KEY;

interface Ingredient {
  id: number;
  aisle: string;
  image: string;
  consistency: string;
  name: string;
  nameClean: string;
  original: string;
  originalName: string;
  amount: number;
  unit: string;
}

interface NutritionFact {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds: number;
}

export default async function RecipeDetails({
  params,
}: {
  params: { recipeId: string };
}) {
  const res = await fetch(
    `https://api.spoonacular.com/recipes/${params.recipeId}/information?apiKey=${API_KEY}&includeNutrition=true`
  );
  const data = await res.json();
  const recipes = await prisma.savedRecipe.findMany();
  const session = await auth();
  function stripHTMLTags(str: string) {
    return str.replace(/<[^>]*>/g, "");
  }
  const splitInstructions = stripHTMLTags(data.instructions).split(".");
  const trimmedInstructions = splitInstructions
    .filter((string) => string !== "")
    .map((string) => {
      return string.trim();
    });
  const nutrients: NutritionFact[] = data?.nutrition?.nutrients;

  return (
    <section className="px-10 py-6 max-w-[1024px] w-full mx-auto">
      <h3 className="text-center font-bold text-orange-700 uppercase">
        {data.title}
      </h3>
      <div className="flex justify-center">
        <RecipePreview
          id={data.id}
          imgSrc={data.image}
          title={data.title}
          recipes={recipes}
          session={session}
          showTitle={false}
        />
      </div>

      <div className="mt-4 mb-12">
        <h3 className="text-center font-bold mb-4 text-orange-700">Summary</h3>
        <p className="leading-relaxed">{stripHTMLTags(data.summary)}</p>
      </div>

      <div className="mb-24">
        <h3 className="text-center font-bold mb-4 text-orange-700">
          Ingredients
        </h3>
        <ul className="list-disc loading-relaxed">
          {data.extendedIngredients.map((ingredient: Ingredient) => {
            return (
              <li key={ingredient.id} className="mb-2">
                {ingredient.amount} {ingredient.unit} {ingredient.originalName}
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
          {trimmedInstructions.map((instruction, index) => {
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
        <NutritionTable nutrients={nutrients} dailyPercentage={true} />
      </div>
    </section>
  );
}
