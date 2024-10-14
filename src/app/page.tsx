import { Card, CardBody, CardHeader, Divider, Link } from "@nextui-org/react";
import styles from "./styles.module.css";

export default async function Home() {
  return (
    <div className="w-full mx-auto">
      <div className={`${styles.backgroundMain} border-b`}>
        <div className="max-w-[1024px] px-6 py-24 md:px-12 md:py-42 text-center border-gray-300 mx-auto">
          <h1 className="font-light text-4xl">
            Thousands of delicious recipes at your disposal with ingredients,
            instructions, and in-depth nutrition information.
          </h1>
          <Link
            className="text-white mt-6 outline-1 outline-orange-700 bg-orange-700 p-4 rounded-2xl hover:text-orange-700 hover:bg-white transition ease-in-out duration-200 my-8"
            href="/recipefinder"
          >
            Find recipes
          </Link>
        </div>
      </div>

      <div className={`${styles.backgroundCards} border-b`}>
        <div className="max-w-[1024px] px-6 py-24 md:px-12 md:py-42 text-center border-gray-300 mx-auto">
          <h1 className="font-light text-4xl text-white">
            Build your own recipe with automatic nutrition information.
          </h1>
          <Link
            className="text-white mt-6 outline-1 outline-orange-700 bg-orange-700 p-4 rounded-2xl hover:text-orange-700 hover:bg-white transition ease-in-out duration-200 my-8"
            href="/createrecipe"
          >
            Create recipe
          </Link>
        </div>
      </div>
      <div className={`${styles.backgroundMain} border-b`}>
        <div className="max-w-[1024px] px-6 py-24 md:px-12 md:py-42 border-gray-300 mx-auto flex flex-col sm:flex sm:flex-row gap-4">
          <Card className="w-full sm:w-[30%]">
            <CardHeader className="uppercase text-lg font-bold text-orange-700">
              Nutrition
            </CardHeader>

            <CardBody>
              The details are important. You deserve to know them. All recipes
              come with macro and micronutrient information
            </CardBody>
          </Card>
          <Card className="w-full sm:w-[30%]">
            <CardHeader className="uppercase text-lg font-bold text-orange-700">
              Flavor
            </CardHeader>

            <CardBody>
              Countless delicious recipes. You don't have to eat tacos every
              Tuesday.
            </CardBody>
          </Card>
          <Card className="w-full sm:w-[30%]">
            <CardHeader className="uppercase text-lg font-bold text-orange-700">
              Flexibility
            </CardHeader>

            <CardBody>Numerous diets, cuisines, and meal types.</CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Home page will be laid out as follows:

// top section will have a graphic on the right hand side,
// with text and button on the left (Find Recipes)

// middle section will have a graphic on the left hand side,
// with text and button on the right (Create Recipe)

// bottom section will have a card system with the three
// main advantages of the app
