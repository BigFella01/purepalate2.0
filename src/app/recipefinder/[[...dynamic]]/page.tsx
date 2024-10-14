"use client";

import RecipePreview from "@/components/recipe-preview";
import RecipeSearch from "@/components/recipe-search";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getRecipes } from "../../helpers/actions";
import useSWR from "swr";
import Error from "@/components/error";
import { Spinner } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import RecipeSearchIngs from "@/components/recipe-search-ings";

const API_KEY = "30497d627dd546aca9766de5b385709a"

interface Recipe {
  id: number;
  title: string;
  image: string;
  imageType: string;
}

interface RecipeFromDatabase {
  id: string;
  recipeId: number;
  userEmail: string;
  title: string;
  image: string;
}

export default function FindRecipe() {
  const [recipes, setRecipes] = useState<RecipeFromDatabase[] | undefined>(
    undefined
  );
  const [endpoint, setEndpoint] = useState<string>(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=25&addRecipeInformation=true`
  );
  const [query, setQuery] = useState<string | undefined>(undefined);

  const session = useSession();
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data, error, isLoading } = useSWR(endpoint, fetcher);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    async function init() {
      const fetchedRecipes = await getRecipes();
      setRecipes(fetchedRecipes);

      if (pathname.split("/").length > 2) {
        const urlParams = pathname.split("/")[2];
        const queryFromParams = urlParams.split("=")[1];
        setQuery(queryFromParams);
        if (queryFromParams?.includes("+")) {
          setEndpoint(
            `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}&number=50&ignorePantry=true${urlParams}`
          );
        } else {
          setEndpoint(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=50&addRecipeInformation=true${urlParams}`
          );
        }
      }
    }
    init();
  }, [pathname]);

  function handleUrlData(urlParams: string[] | string) {
    if (Array.isArray(urlParams)) {
      if (urlParams[0].includes("query")) setQuery(urlParams[0].split("=")[1]);
      const paramsFormattedForURL = urlParams
        .filter((param) => param !== "")
        .toString()
        .replace(",", "");
      router.push(`/recipefinder/${paramsFormattedForURL}`);
      setEndpoint(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=10&addRecipeInformation=true${paramsFormattedForURL}`
      );
    } else if (typeof urlParams === "string") {
      const paramsFormattedForURL = urlParams.replace(" ", "");
      router.push(`/findrecipe/${paramsFormattedForURL}`);
      setEndpoint(
        `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}&number=100&ignorePantry=true&addRecipeInformation=true${paramsFormattedForURL}`
      );
    }
  }

  function Data() {
    if (data) {
      if ("results" in data) {
        return data?.results?.map((result: Recipe) => {
          return (
            <RecipePreview
              key={result.id}
              id={result.id}
              imgSrc={result.image}
              title={result.title}
              showTitle={true}
              recipes={recipes}
              session={session}
            />
          );
        });
      } else {
        return data?.map((result: Recipe) => {
          return (
            <RecipePreview
              key={result.id}
              id={result.id}
              imgSrc={result.image}
              title={result.title}
              showTitle={true}
              recipes={recipes}
              session={session}
            />
          );
        });
      }
    }
  }

  const stylesForData =
    "grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-8";
  const stylesForLoadingOrError = "flex justify-center align-center";

  return (
    <div className="px-8 py-8 my-8 max-w-[1024px] w-full mx-auto">
      <RecipeSearch handleUrlData={handleUrlData} />
      <RecipeSearchIngs handleUrlData={handleUrlData} />
      <h3 className="font-bold text-center mb-8 text-orange-700">
        {query && `Search results for '${query.replaceAll("+", " ")}'`}
        {!query && endpoint?.length > 125 && ""}
        {!query && endpoint?.length <= 125 && "Random recipes"}
      </h3>
      <div className={data ? stylesForData : stylesForLoadingOrError}>
        <Data />
        {isLoading && (
          <Spinner className="w-[50px] h-[50px] md:w-[100px] md:h-[100px] lg:w-[150px] lg:h-[150px]" />
        )}
        {error && (
          <Error errorMessage="There was a problem retrieving this recipe information. Try resubmitting your search!" />
        )}
      </div>
    </div>
  );
}
