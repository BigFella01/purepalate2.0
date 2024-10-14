export default function About() {
  const headerStyles = "font-bold text-lg mb-4";
  const spanStyles = "font-semibold";
  const textStyles = "mb-8";
  return (
    <div className="px-8 py-12 max-w-[1024px] w-full mx-auto leading-7">
      <h2 className={headerStyles}>About This Website</h2>{" "}
      <p className={textStyles}>
        Welcome to PurePalate 2.0—your go-to hub for delicious recipes,
        comprehensive nutrition information, and innovative recipe builders
        designed to make your culinary journey as enjoyable and effortless as
        possible.
      </p>{" "}
      <h2 className={headerStyles}>Purpose</h2>{" "}
      <p className={textStyles}>
        The purpose of this web application is to empower you with the tools and
        knowledge to create meals that are not only tasty but also tailored to
        your nutritional needs. We believe that cooking should be a joyous and
        fulfilling experience, and we are here to make that a reality for
        everyone, whether you're a seasoned chef or just starting out.
      </p>{" "}
      <h2 className={headerStyles}>What We Offer</h2>{" "}
      <p className={textStyles}>
        <span className={spanStyles}>1. Mouthwatering Recipes:</span> Our
        collection features a diverse array of recipes, from quick weeknight
        dinners to elaborate gourmet dishes. Each recipe is crafted to cater to
        a variety of tastes and dietary preferences, ensuring you find the
        perfect match for your needs.
      </p>
      <p className={textStyles}>
        <span className={spanStyles}>2. In-Depth Nutrition Information:</span>{" "}
        We provide detailed nutritional breakdowns for all our recipes, so you
        can make informed choices that align with your health goals. Whether
        you're tracking macros, managing dietary restrictions, or simply aiming
        for balanced nutrition, we've got you covered.
      </p>{" "}
      <p className={textStyles}>
        <span className={spanStyles}>3. Custom Recipe Builders:</span> Our
        innovative recipe builders allow you to create and modify recipes based
        on your personal tastes and dietary requirements. Input your preferred
        ingredients, adjust portion sizes, and let our tools generate a recipe
        that is uniquely yours.
      </p>{" "}
      <p className={textStyles}>
        Thank you for visiting PurePalate 2.0. Here’s to flavorful meals and a
        healthier, happier you!
      </p>
    </div>
  );
}
