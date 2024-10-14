"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Link,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { usePathname } from "next/navigation";
import AuthContent from "./header-auth";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeRouteClass = "text-orange-700";
  const inactiveRouteClass = "text-black";
  const menuItems = [
    { path: "/recipefinder", name: "Recipe Finder" },
    { path: "/createrecipe", name: "Create Recipe" },
    { path: "/about", name: "About" },
  ];

  const cuisinesInNav = [
    "African",
    "Asian",
    "American",
    "Cajun",
    "Caribbean",
    "Chinese",
    "German",
    "Greek",
    "Indian",
    "Italian",
    "Japanese",
  ];

  const dietsInNav = [
    "gluten free",
    "ketogenic",
    "vegetarian",
    "vegan",
    "pescetarian",
    "paleo",
  ];

  const typesInNav = [
    "main course",
    "side dish",
    "dessert",
    "appetizer",
    "salad",
    "bread",
    "breakfast",
  ];

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="z-20"
    >
      <NavbarContent className="md:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="md:hidden pr-3" justify="center">
        <NavbarBrand>
          <Link
            className={`${
              pathname === "/" ? activeRouteClass : inactiveRouteClass
            } font-bold`}
            href="/"
            onPress={() => setIsMenuOpen(!isMenuOpen)}
          >
            Pure Palate 2.0
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden md:flex gap-4" justify="center">
        <Link
          className={`${
            pathname === "/" ? activeRouteClass : inactiveRouteClass
          } font-bold`}
          href="/"
          onPress={() => setIsMenuOpen(!isMenuOpen)}
        >
          Pure Palate 2.0
        </Link>

        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={<MdOutlineKeyboardArrowDown />}
              >
                Recipes
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu>
            {typesInNav.map((type, index) => {
              return (
                <DropdownItem key={index}>
                  <Link
                    className="text-black"
                    href={`/recipefinder/&type=${type.replace(" ", "")}`}
                  >
                    {type}
                  </Link>
                </DropdownItem>
              );
            })}
          </DropdownMenu>
        </Dropdown>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={<MdOutlineKeyboardArrowDown />}
              >
                Diets
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu>
            {dietsInNav.map((diet, index) => {
              return (
                <DropdownItem key={index}>
                  <Link
                    className="text-black"
                    href={`/recipefinder/&diet=${diet.replace(" ", "")}`}
                  >
                    {diet}
                  </Link>
                </DropdownItem>
              );
            })}
          </DropdownMenu>
        </Dropdown>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={<MdOutlineKeyboardArrowDown />}
              >
                Cuisines
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu>
            {cuisinesInNav.map((cuisine, index) => {
              return (
                <DropdownItem key={index}>
                  <Link
                    className="text-black"
                    href={`/recipefinder/&cuisine=${cuisine}`}
                  >
                    {cuisine}
                  </Link>
                </DropdownItem>
              );
            })}
          </DropdownMenu>
        </Dropdown>

        <NavbarItem>
          <Link
            className={
              pathname === "/recipefinder"
                ? activeRouteClass
                : inactiveRouteClass
            }
            href="/recipefinder"
            onPress={() => setIsMenuOpen(!isMenuOpen)}
          >
            Recipe Finder
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            className={
              pathname === "/createrecipe"
                ? activeRouteClass
                : inactiveRouteClass
            }
            href="/createrecipe"
            onPress={() => setIsMenuOpen(!isMenuOpen)}
          >
            Create Recipe
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link
            className={
              pathname === "/about" ? activeRouteClass : inactiveRouteClass
            }
            href="/about"
            onPress={() => setIsMenuOpen(!isMenuOpen)}
          >
            About
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <AuthContent />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="mt-8">
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 m-0 bg-transparent data-[hover=true]:bg-transparent text-md"
                endContent={<MdOutlineKeyboardArrowDown />}
              >
                Recipes
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu>
            {typesInNav.map((type, index) => {
              return (
                <DropdownItem key={index}>
                  <Link
                    className="text-black"
                    href={`/recipefinder/&type=${type.replace(' ', '')}`}
                  >
                    {type}
                  </Link>
                </DropdownItem>
              );
            })}
          </DropdownMenu>
        </Dropdown>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent text-md"
                endContent={<MdOutlineKeyboardArrowDown />}
              >
                Diets
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu>
            {dietsInNav.map((diet, index) => {
              return (
                <DropdownItem key={index}>
                  <Link
                    className="text-black"
                    href={`/recipefinder/&diet=${diet.replace(' ', '')}`}
                  >
                    {diet}
                  </Link>
                </DropdownItem>
              );
            })}
          </DropdownMenu>
        </Dropdown>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent text-md"
                endContent={<MdOutlineKeyboardArrowDown />}
              >
                Cuisines
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu>
            {cuisinesInNav.map((cuisine, index) => {
              return (
                <DropdownItem key={index}>
                  <Link
                    className="text-black"
                    href={`/recipefinder/&cuisine=${cuisine}`}
                  >
                    {cuisine}
                  </Link>
                </DropdownItem>
              );
            })}
          </DropdownMenu>
        </Dropdown>

        {menuItems.map((item, index) => {
          return (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className={
                  pathname === item.path ? activeRouteClass : inactiveRouteClass
                }
                href={item.path}
                onPress={() => setIsMenuOpen(!isMenuOpen)}
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          );
        })}
      </NavbarMenu>
    </Navbar>
  );
}
