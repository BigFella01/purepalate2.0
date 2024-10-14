import { redirect } from "next/navigation";
import { auth } from "../auth";
import BuildRecipe from "@/components/build-recipe";

export default async function CreateRecipe() {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }
  return (
    <div className="px-8 py-8 my-8 max-w-[1024px] w-full mx-auto">
      <p className="text-center font-bold text-orange-700 uppercase my-8">Create a recipe</p>
      <BuildRecipe />
    </div>
  );
}

// When the user clicks on the edit button, they will be redirected to
// the 'editrecipe/id' page. When this page loads, it will render the 
// BuildRecipe component prefilled with the values from the recipeId in]
// the url. Once the user is done editing their recipe, we will invoke
// the server action updateRecipe. It will be very similar to the 
// createRecipe server action. 