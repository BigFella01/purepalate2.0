"use client";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";

interface DataFormProps {
  handleUrlData: (data: string[]) => void;
}

export default function RecipeSearch({ handleUrlData }: DataFormProps) {
  const [query, setQuery] = useState<string>("");
  const [selectedCuisines, setSelectedCuisines] = useState<
    string[] | undefined
  >(undefined);
  const [selectedDiets, setSelectedDiets] = useState<string[] | undefined>(
    undefined
  );
  const [selectedIntolerances, setSelectedIntolerances] = useState<
    string[] | undefined
  >(undefined);
  const [selectedTypes, setSelectedTypes] = useState<string[] | undefined>(
    undefined
  );
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const cuisines = [
    "African",
    "Asian",
    "American",
    "British",
    "Cajun",
    "Caribbean",
    "Chinese",
    "Eastern European",
    "European",
    "French",
    "German",
    "Greek",
    "Indian",
    "Irish",
    "Italian",
    "Japanese",
    "Jewish",
    "Korean",
    "Latin American",
    "Mediterranean",
    "Mexican",
    "Midde Eastern",
    "Nordic",
    "Southern",
    "Spanish",
    "Thai",
    "Vietnamese",
  ];

  const diets = [
    "glutenfree",
    "ketogenic",
    "vegetarian",
    "vegan",
    "pescetarian",
    "paleo",
    "primal",
    "whole30",
  ];

  const types = [
    "maincourse",
    "sidedish",
    "dessert",
    "appetizer",
    "salad",
    "bread",
    "breakfast",
    "soup",
    "beverage",
    "sauce",
    "marinade",
    "fingerfood",
    "snack",
    "drink",
  ];

  const intolerances = [
    "dairy",
    "egg",
    "gluten",
    "grain",
    "peanut",
    "seafood",
    "sesame",
    "shellfish",
    "soy",
    "sulfite",
    "treenut",
    "wheat",
  ];


  function handleSetCuisine(cuisineIndex: string) {
    const cuisinesInArray = cuisineIndex
      .split("")
      .filter((char) => char !== ",")
      .map((char) => {
        return Number(char);
      })
      .map((num) => {
        return cuisines[num];
      });

    setSelectedCuisines(cuisinesInArray);
  }

  function handleSetDiet(dietIndex: string) {
    const dietsInArray = dietIndex
      .split("")
      .filter((char) => char !== ",")
      .map((char) => {
        return Number(char);
      })
      .map((num) => {
        return diets[num];
      });

    setSelectedDiets(dietsInArray);
  }

  function handleSetIntolerance(intoleranceIndex: string) {
    const intolerancesInArray = intoleranceIndex
      .split("")
      .filter((char) => char !== ",")
      .map((char) => {
        return Number(char);
      })
      .map((num) => {
        return intolerances[num];
      });

    setSelectedIntolerances(intolerancesInArray);
  }

  function handleSetType(typeIndex: string) {
    const typesInArray = typeIndex
      .split("")
      .filter((char) => char !== ",")
      .map((char) => {
        return Number(char);
      })
      .map((num) => {
        return types[num];
      });

    setSelectedTypes(typesInArray);
  }

  function removeFromSelectedCuisines(cuisine: string) {
    const filteredSelectedCuisines = selectedCuisines?.filter(
      (selectedCuisine) => {
        return selectedCuisine !== cuisine;
      }
    );
    if (filteredSelectedCuisines?.length === 0) {
      setSelectedCuisines(undefined);
    } else setSelectedCuisines(filteredSelectedCuisines);
  }

  function removeFromSelectedDiets(diet: string) {
    const filteredSelectedDiets = selectedDiets?.filter((selectedDiet) => {
      return selectedDiet !== diet;
    });
    if (filteredSelectedDiets?.length === 0) {
      setSelectedDiets(undefined);
    } else setSelectedDiets(filteredSelectedDiets);
  }

  function removeFromSelectedIntolerances(intolerance: string) {
    const filteredSelectedIntolerances = selectedIntolerances?.filter(
      (selectedIntolerance) => {
        return selectedIntolerance !== intolerance;
      }
    );
    if (filteredSelectedIntolerances?.length === 0) {
      setSelectedIntolerances(undefined);
    } else setSelectedIntolerances(filteredSelectedIntolerances);
  }

  function removeFromSelectedTypes(type: string) {
    const filteredSelectedTypes = selectedTypes?.filter((selectedType) => {
      return selectedType !== type;
    });
    if (filteredSelectedTypes?.length === 0) {
      setSelectedTypes(undefined);
    } else setSelectedTypes(filteredSelectedTypes);
  }

  function handleSearch() {
    const queryFormattedForUrl = query ? `&query=${query}` : "";

    const cuisinesFormattedForUrl = selectedCuisines
      ? selectedCuisines.map((cuisine) => `&cuisine=${cuisine}`).toString()
      : "";

    const dietsFormattedForUrl = selectedDiets
      ? selectedDiets.map((diet) => `&diet=${diet}`).toString()
      : "";
    const intolerancesFormattedForUrl = selectedIntolerances
      ? selectedIntolerances
          .map((intolerance) => `&intolerance=${intolerance}`)
          .toString()
      : "";
    const typesFormattedForUrl = selectedTypes
      ? selectedTypes.map((type) => `&type=${type}`).toString()
      : "";
    const urlParams = [
      queryFormattedForUrl,
      cuisinesFormattedForUrl,
      dietsFormattedForUrl,
      intolerancesFormattedForUrl,
      typesFormattedForUrl,
    ];
    handleUrlData(urlParams);
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-[1024px] mb-12 mx-auto">
      <Input
        placeholder="Find recipes based on title"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className="pr-0"
        endContent={
          <>
            <Button
              size="sm"
              variant="bordered"
              className="text-orange-700 bg-transparent"
              onPress={onOpen}
            >
              <FaFilter />
            </Button>
            <Button
              size="sm"
              variant="bordered"
              className="text-orange-700 bg-transparent ml-2"
              type="submit"
              onClick={() => handleSearch()}
            >
              <FaSearch />
            </Button>
            <Modal isOpen={isOpen} placement="auto" onOpenChange={onOpenChange}>
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader>Filter recipes</ModalHeader>
                    <ModalBody>
                      <Select
                        label="Cuisine"
                        selectionMode="multiple"
                        onChange={(e) => {
                          handleSetCuisine(e.target.value);
                        }}
                      >
                        {cuisines.map((cuisine, index: number) => {
                          return <SelectItem key={index}>{cuisine}</SelectItem>;
                        })}
                      </Select>
                      <Select
                        label="Diet"
                        selectionMode="multiple"
                        onChange={(e) => handleSetDiet(e.target.value)}
                      >
                        {diets.map((diet, index) => {
                          return <SelectItem key={index}>{diet}</SelectItem>;
                        })}
                      </Select>
                      <Select
                        label="Intolerance"
                        selectionMode="multiple"
                        onChange={(e) => handleSetIntolerance(e.target.value)}
                      >
                        {intolerances.map((intolerance, index) => {
                          return (
                            <SelectItem key={index}>{intolerance}</SelectItem>
                          );
                        })}
                      </Select>
                      <Select
                        label="Type"
                        selectionMode="multiple"
                        onChange={(e) => handleSetType(e.target.value)}
                      >
                        {types.map((type, index) => {
                          return <SelectItem key={index}>{type}</SelectItem>;
                        })}
                      </Select>
                    </ModalBody>
                    <ModalFooter>
                      <Button variant="light" onPress={onClose}>
                        Close
                      </Button>
                      <Button
                        variant="light"
                        onPress={onClose}
                        onClick={() => handleSearch()}
                      >
                        Search
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </>
        }
      />
      {selectedCuisines && (
        <div className="flex gap-4">
          <p>Cuisines: </p>
          {selectedCuisines?.map((cuisine, index) => {
            return (
              <div
                className="bg-red-600 text-white px-4 rounded-full flex align-center gap-2"
                key={index}
              >
                {cuisine}
                <button onClick={() => removeFromSelectedCuisines(cuisine)}>
                  <TiDeleteOutline />
                </button>
              </div>
            );
          })}
        </div>
      )}
      {selectedDiets && (
        <div className="flex gap-4">
          <p>Diets: </p>
          {selectedDiets?.map((diet, index) => {
            return (
              <div
                onClick={() => removeFromSelectedDiets(diet)}
                className="bg-red-600 text-white px-4 rounded-full flex align-center gap-2"
                key={index}
              >
                {diet}
                <button onClick={() => removeFromSelectedDiets(diet)}>
                  <TiDeleteOutline />
                </button>
              </div>
            );
          })}
        </div>
      )}
      {selectedIntolerances && (
        <div className="flex gap-4">
          <p>Intolerances: </p>
          {selectedIntolerances?.map((intolerance, index) => {
            return (
              <div
                onClick={() => removeFromSelectedIntolerances(intolerance)}
                className="bg-red-600 text-white px-4 rounded-full flex align-center gap-2"
                key={index}
              >
                {intolerance}
                <button
                  onClick={() => removeFromSelectedIntolerances(intolerance)}
                >
                  <TiDeleteOutline />
                </button>
              </div>
            );
          })}
        </div>
      )}
      {selectedTypes && (
        <div className="flex gap-4">
          <p>Types: </p>
          {selectedTypes?.map((type, index) => {
            return (
              <div
                onClick={() => removeFromSelectedTypes(type)}
                className="bg-red-600 text-white px-4 rounded-full flex align-center gap-2"
                key={index}
              >
                {type}
                <button onClick={() => removeFromSelectedTypes(type)}>
                  <TiDeleteOutline />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
