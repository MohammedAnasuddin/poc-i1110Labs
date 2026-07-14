import type { MenuCategory, ModifierGroup, MenuItem } from "./menu.types.js";

export const categories: MenuCategory[] = [
  {
    id: "pizza",
    name: "Pizza",
  },
  {
    id: "burger",
    name: "Burger",
  },
  {
    id: "combo",
    name: "Combo Meal",
  },
  {
    id: "side",
    name: "Sides",
  },
  {
    id: "drink",
    name: "Drinks",
  },
  {
    id: "dessert",
    name: "Desserts",
  },
];

const pizzaSizeModifier: ModifierGroup = {
  id: "pizza-size",

  name: "Choose Size",

  required: true,

  minSelections: 1,

  maxSelections: 1,

  options: [
    {
      id: "small",
      name: "Small",
      priceDelta: 0,
    },
    {
      id: "medium",
      name: "Medium",
      priceDelta: 4,
    },
    {
      id: "large",
      name: "Large",
      priceDelta: 8,
    },
  ],
};

const crustModifier: ModifierGroup = {
  id: "pizza-crust",

  name: "Choose Crust",

  required: false,

  minSelections: 0,

  maxSelections: 1,

  options: [
    {
      id: "thin",

      name: "Thin Crust",

      priceDelta: 0,
    },
    {
      id: "stuffed",

      name: "Stuffed Crust",

      priceDelta: 3,
    },
  ],
};

const extraCheeseModifier: ModifierGroup = {
  id: "extra-cheese",

  name: "Extra Cheese",

  required: false,

  minSelections: 0,

  maxSelections: 1,

  options: [
    {
      id: "extra-cheese-yes",

      name: "Yes",

      priceDelta: 2,
    },
  ],
};

const burgerPattyModifier: ModifierGroup = {
  id: "burger-patty",

  name: "Choose Patty",

  required: true,

  minSelections: 1,

  maxSelections: 1,

  options: [
    {
      id: "beef",

      name: "Beef",

      priceDelta: 0,
    },
    {
      id: "chicken",

      name: "Chicken",

      priceDelta: 0,
    },
    {
      id: "veggie",

      name: "Veggie",

      priceDelta: 0,
    },
  ],
};


const sideModifier: ModifierGroup = {
  id: "combo-side",
  name: "Choose a Side",
  required: true,
  minSelections: 1,
  maxSelections: 1,
  options: [
    {
      id: "fries",
      name: "French Fries",
      priceDelta: 0,
    },
    {
      id: "onion-rings",
      name: "Onion Rings",
      priceDelta: 1,
    },
  ],
};


const drinkModifier: ModifierGroup = {
  id: "combo-drink",
  name: "Choose a Drink",
  required: true,
  minSelections: 1,
  maxSelections: 1,
  options: [
    {
      id: "coke",
      name: "Coca-Cola",
      priceDelta: 0,
    },
    {
      id: "sprite",
      name: "Sprite",
      priceDelta: 0,
    },
    {
      id: "water",
      name: "Water",
      priceDelta: 0,
    },
  ],
};


const comboBurgerModifier: ModifierGroup = {
  id: "combo-burger",

  name: "Choose a Burger",

  required: true,

  minSelections: 1,

  maxSelections: 1,

  options: [
    {
      id: "combo-cheeseburger",

      name: "Classic Cheeseburger",

      priceDelta: 0,

      modifierGroups: [burgerPattyModifier],
    },

    {
      id: "combo-crispy",

      name: "Crispy Chicken Burger",

      priceDelta: 0,

      modifierGroups: [burgerPattyModifier],
    },
  ],
};

const burgerCombo: MenuItem = {
  id: "burger-combo",

  categoryId: "combo",

  name: "Burger Combo",

  description:
    "Choose a burger, side, and drink for the perfect meal.",

  basePrice: 15.99,

  available: true,

  modifierGroups: [
    comboBurgerModifier,
    sideModifier,
    drinkModifier,
  ],
};













const margheritaPizza: MenuItem = {
  id: "margherita-pizza",
  categoryId: "pizza",
  name: "Margherita Pizza",
  description: "Classic pizza with mozzarella, tomatoes, and fresh basil.",
  basePrice: 10.99,
  available: true,
  modifierGroups: [
    pizzaSizeModifier,
    crustModifier,
    extraCheeseModifier,
  ],
};

const pepperoniPizza: MenuItem = {
  id: "pepperoni-pizza",
  categoryId: "pizza",
  name: "Pepperoni Pizza",
  description: "Pepperoni, mozzarella cheese, and tomato sauce.",
  basePrice: 12.99,
  available: true,
  modifierGroups: [
    pizzaSizeModifier,
    crustModifier,
    extraCheeseModifier,
  ],
};

const veggieSupremePizza: MenuItem = {
  id: "veggie-supreme-pizza",
  categoryId: "pizza",
  name: "Veggie Supreme Pizza",
  description: "Loaded with onions, olives, mushrooms, peppers, and tomatoes.",
  basePrice: 11.99,
  available: true,
  modifierGroups: [
    pizzaSizeModifier,
    crustModifier,
    extraCheeseModifier,
  ],
};


const classicCheeseburger: MenuItem = {
  id: "classic-cheeseburger",
  categoryId: "burger",
  name: "Classic Cheeseburger",
  description: "Grilled burger with cheese, lettuce, tomato, and onion.",
  basePrice: 8.99,
  available: true,
  modifierGroups: [burgerPattyModifier],
};

const crispyChickenBurger: MenuItem = {
  id: "crispy-chicken-burger",
  categoryId: "burger",
  name: "Crispy Chicken Burger",
  description: "Crispy fried chicken with lettuce and mayo.",
  basePrice: 9.49,
  available: true,
  modifierGroups: [burgerPattyModifier],
};


const coke: MenuItem = {
  id: "coke",
  categoryId: "drink",
  name: "Coca-Cola",
  description: "330ml chilled Coca-Cola.",
  basePrice: 2.49,
  available: true,
  modifierGroups: [],
};

const sprite: MenuItem = {
  id: "sprite",
  categoryId: "drink",
  name: "Sprite",
  description: "330ml chilled Sprite.",
  basePrice: 2.49,
  available: true,
  modifierGroups: [],
};


const frenchFries: MenuItem = {
  id: "french-fries",
  categoryId: "side",
  name: "French Fries",
  description: "Golden crispy fries.",
  basePrice: 3.49,
  available: true,
  modifierGroups: [],
};


export const menuItems: MenuItem[] = [
  margheritaPizza,
  pepperoniPizza,
  veggieSupremePizza,

  classicCheeseburger,
  crispyChickenBurger,

  coke,
  sprite,

  frenchFries,

  burgerCombo,
];