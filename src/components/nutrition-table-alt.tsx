interface NutritionInfoObject {
  name: string;
  calories: number;
  serving_size_g: number;
  fat_total_g: number;
  fat_saturated_g: number;
  protein_g: number;
  sodium_mg: number;
  potassium_mg: number;
  cholesterol_mg: number;
  carbohydrates_total_g: number;
  fiber_g: number;
  sugar_g: number;
}

export default function NutritionTableAlt({
  nutrients,
}: {
  nutrients: NutritionInfoObject[];
}) {
  const totalCalories = nutrients.reduce((accumulator, item) => {
    return (accumulator += item.calories);
  }, 0);

  const totalFat = nutrients.reduce((accumulator, item) => {
    return (accumulator += item.fat_total_g);
  }, 0);

  const totalSaturatedFat = nutrients.reduce((accumulator, item) => {
    return (accumulator += item.fat_saturated_g);
  }, 0);

  const totalProtein = nutrients.reduce((accumulator, item) => {
    return (accumulator += item.protein_g);
  }, 0);

  const totalSodium = nutrients.reduce((accumulator, item) => {
    return (accumulator += item.sodium_mg);
  }, 0);

  const totalPotassium = nutrients.reduce((accumulator, item) => {
    return (accumulator += item.potassium_mg);
  }, 0);

  const totalCholesterol = nutrients.reduce((accumulator, item) => {
    return (accumulator += item.cholesterol_mg);
  }, 0);

  const totalCarbs = nutrients.reduce((accumulator, item) => {
    return (accumulator += item.carbohydrates_total_g);
  }, 0);

  const totalFiber = nutrients.reduce((accumulator, item) => {
    return (accumulator += item.fiber_g);
  }, 0);

  const totalSugar = nutrients.reduce((accumulator, item) => {
    return (accumulator += item.sugar_g);
  }, 0);

  const nutritionTableInfo = {
    calories: totalCalories.toFixed(2),
    totalFat: `${totalFat.toFixed(2)}g`,
    saturatedFat: `${totalSaturatedFat.toFixed(2)}g`,
    protein: `${totalProtein.toFixed(2)}g`,
    sodium: `${totalSodium.toFixed(2)}mg`,
    potassium: `${totalPotassium.toFixed(2)}mg`,
    cholesterol: `${totalCholesterol.toFixed(2)}mg`,
    carbohydrates: `${totalCarbs.toFixed(2)}g`,
    fiber: `${totalFiber.toFixed(2)}g`,
    sugar: `${totalSugar.toFixed(2)}g`,
  };

  return (
    <div className="shadow-lg w-full height-[400px] rounded-2xl p-4">
      <div className="flex justify-between bg-gray-100 text-gray-500 font-semibold p-4 rounded-2xl">
        <p>NAME</p>
        <p>AMOUNT</p>
      </div>
      <div className="flex justify-between p-4">
        <p>Calories</p>
        <p>{nutritionTableInfo.calories}</p>
      </div>
      <div className="flex justify-between p-4">
        <p>Total fat</p>
        <p>{nutritionTableInfo.totalFat}</p>
      </div>
      <div className="flex justify-between p-4">
        <p>Saturated fat</p>
        <p>{nutritionTableInfo.saturatedFat}</p>
      </div>
      <div className="flex justify-between p-4">
        <p>Protein</p>
        <p>{nutritionTableInfo.protein}</p>
      </div>
      <div className="flex justify-between p-4">
        <p>Sodium</p>
        <p>{nutritionTableInfo.sodium}</p>
      </div>
      <div className="flex justify-between p-4">
        <p>Potassium</p>
        <p>{nutritionTableInfo.potassium}</p>
      </div>
      <div className="flex justify-between p-4">
        <p>Cholesterol</p>
        <p>{nutritionTableInfo.cholesterol}</p>
      </div>
      <div className="flex justify-between p-4">
        <p>Carbohydrates</p>
        <p>{nutritionTableInfo.carbohydrates}</p>
      </div>
      <div className="flex justify-between p-4">
        <p>Fiber</p>
        <p>{nutritionTableInfo.fiber}</p>
      </div>
      <div className="flex justify-between p-4">
        <p>Sugar</p>
        <p>{nutritionTableInfo.sugar}</p>
      </div>
    </div>
  );
}
