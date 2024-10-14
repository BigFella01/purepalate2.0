"use client";

import { createRecipe } from "@/app/helpers/actions";
import { Button, Input, Textarea } from "@nextui-org/react";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { TiDeleteOutline } from "react-icons/ti";

export default function BuildRecipe() {
  const [title, setTitle] = useState<string>("");
  const [titleError, setTitleError] = useState<boolean>(false);
  const [currentIngredient, setCurrentIngredient] = useState<string>("");
  const [addedIngredients, setAddedIngredients] = useState<string[]>([]);
  const [addedIngredientsError, setAddedIngredientsError] =
    useState<boolean>(false);
  const [currentInstruction, setCurrentInstruction] = useState<string>("");
  const [addedInstructions, setAddedInstructions] = useState<string[]>([]);
  const [addedInstructionsError, setAddedInstructionsError] =
    useState<boolean>(false);
  const [summary, setSummary] = useState<string>("");
  const [summaryError, setSummaryError] = useState<boolean>(false);
  const [prepTime, setPrepTime] = useState<string>("");
  const [prepTimeError, setPrepTimeError] = useState<boolean>(false);
  const [cookTime, setCookTime] = useState<string>("");
  const [cookTimeError, setCookTimeError] = useState<boolean>(false);
  const [servings, setServings] = useState<string>("");
  const [servingsError, setServingsError] = useState<boolean>(false);
  const [urlForDatabase, setUrlForDatabase] = useState<
    string | ArrayBuffer | null
  >(null);

  function handleSetIngredients(action: string, newIngredient: string) {
    if (action === "add") {
      setAddedIngredients((oldIngredients) => [
        ...oldIngredients,
        newIngredient,
      ]);
      setCurrentIngredient("");
    } else if (action === "remove") {
      setAddedIngredients((oldIngredients) =>
        oldIngredients.filter(
          (currentIngredient) => currentIngredient !== newIngredient
        )
      );
    }
  }
  function handleSetInstructions(action: string, newInstruction: string) {
    if (action === "add") {
      setAddedInstructions((oldInstructions) => [
        ...oldInstructions,
        newInstruction,
      ]);
      setCurrentInstruction("");
    } else if (action === "remove") {
      setAddedInstructions((oldInstructions) =>
        oldInstructions.filter(
          (currentInstruction) => currentInstruction !== newInstruction
        )
      );
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const formData = new FormData();
    if (title !== "") {
      formData.set("title", title);
    } else {
      setTitleError(true);
    }

    if (addedIngredients.length > 0) {
      formData.set("ingredients", JSON.stringify(addedIngredients));
    } else {
      setAddedIngredientsError(true);
    }

    if (addedInstructions.length > 0) {
      formData.set("instructions", JSON.stringify(addedInstructions));
    } else {
      setAddedInstructionsError(true);
    }

    if (summary.length > 0) {
      formData.set("summary", summary);
    } else {
      setSummaryError(true);
    }

    if (prepTime.length > 0) {
      formData.set("prepTime", prepTime);
    } else {
      setPrepTimeError(true);
    }

    if (cookTime.length > 0) {
      formData.set("cookTime", cookTime);
    } else {
      setCookTimeError(true);
    }

    if (servings.length > 0) {
      formData.set("servings", servings);
    } else {
      setServingsError(true);
    }

    formData.set("imageUrl", urlForDatabase as string);

    const result = await createRecipe(formData);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Recipe created!");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <Input
        type="text"
        label="Title"
        placeholder="Recipe title"
        onChange={(e) => setTitle(e.target.value)}
        isInvalid={titleError}
        errorMessage="You must add a title for your recipe"
        value={title}
      />

      <Input
        type="text"
        label="Ingredients"
        placeholder="Add ingredients to your recipe"
        onChange={(e) => setCurrentIngredient(e.target.value)}
        value={currentIngredient}
        isInvalid={addedIngredientsError}
        errorMessage="You must add at least one ingredient for your recipe"
        endContent={
          <Button
            onClick={() =>
              currentIngredient.length > 0 &&
              handleSetIngredients("add", currentIngredient)
            }
            className="bg-transparent"
          >
            Add
          </Button>
        }
      />

      {addedIngredients.length > 0 && (
        <ul className="list-disc py-4 px-6">
          {addedIngredients.map((ingredient, index) => {
            return (
              <li key={index} className="relative">
                {ingredient}
                <button
                  onClick={() => handleSetIngredients("remove", ingredient)}
                  className="absolute top-1/2 translate-y-[-50%] ml-1 text-red-600"
                >
                  <TiDeleteOutline />
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <Input
        type="text"
        label="Instructions"
        placeholder="Add instruction to your recipe"
        onChange={(e) => setCurrentInstruction(e.target.value)}
        value={currentInstruction}
        isInvalid={addedInstructionsError}
        errorMessage="You must add at least one instruction for your recipe"
        endContent={
          <Button
            onClick={() =>
              currentInstruction.length > 0 &&
              handleSetInstructions("add", currentInstruction)
            }
            className="bg-transparent"
          >
            Add
          </Button>
        }
      />

      {addedInstructions.length > 0 && (
        <ol className="list-decimal py-4 px-6">
          {addedInstructions.map((instruction, index) => {
            return (
              <li key={index} className="relative">
                {instruction}
                <button
                  onClick={() => handleSetInstructions("remove", instruction)}
                  className="absolute top-1/2 translate-y-[-50%] ml-1 text-red-600"
                >
                  <TiDeleteOutline />
                </button>
              </li>
            );
          })}
        </ol>
      )}
      <Textarea
        label="Summary"
        placeholder="Enter your recipe summary"
        className="w-full"
        onChange={(e) => {
          setSummary(e.target.value);
        }}
        value={summary}
        isInvalid={summaryError}
        errorMessage="You must add a summary for your recipe"
      />

      <Input
        placeholder="Add prep time in minutes"
        label="Prep time"
        type="number"
        onChange={(e) => setPrepTime(e.target.value)}
        value={prepTime}
      />
      <Input
        label="Cook time"
        placeholder="Add cook time in minutes"
        type="number"
        onChange={(e) => setCookTime(e.target.value)}
        value={cookTime}
      />
      <Input
        label="Servings"
        placeholder="Add amount of servings"
        type="number"
        onChange={(e) => setServings(e.target.value)}
      />

      <div className="flex flex-col">
        <label htmlFor="image">Upload image</label>
        <input
          id="image"
          type="file"
          accept="image/*"
          className="mb-8"
          onChange={(e) => {
            const imgFile = e.target.files?.[0]!;
            const reader = new FileReader();
            reader.addEventListener("load", () => {
              setUrlForDatabase(reader.result);
            });
            reader.readAsDataURL(imgFile);
          }}
        />
      </div>

      <Button color="primary" type="submit">
        Create Recipe
      </Button>
    </form>
  );
}

// Hhjhy363@sw^hg4
