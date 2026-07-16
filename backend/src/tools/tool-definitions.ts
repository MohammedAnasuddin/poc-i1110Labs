export const toolDefinitions = [
  {
    type: "function",

    function: {
      name: "list_menu",

      description:
        "Retrieve the complete restaurant menu. Use this only when the user asks to see the entire menu.",

      parameters: {
        type: "object",

        properties: {},

        required: [],
      },
    },
  },

  {
    type: "function",

    function: {
      name: "search_menu",

      description:
        "Search the menu for matching items. If multiple items are returned, do not choose one automatically. Ask the customer to select one.",

      parameters: {
        type: "object",

        properties: {
          query: {
            type: "string",

            description: "Search query.",
          },
        },

        required: ["query"],
      },
    },
  },
  {
    type: "function",

    function: {
      name: "get_menu_item",

      description: "Retrieve a menu item by its ID.",

      parameters: {
        type: "object",

        properties: {
          id: {
            type: "string",
            description: "The menu item ID.",
          },
        },

        required: ["id"],
      },
    },
  },
  {
    type: "function",

    function: {
      name: "view_cart",

      description: "Retrieve the customer's current shopping cart.",

      parameters: {
        type: "object",

        properties: {},

        required: [],
      },
    },
  },
  {
    type: "function",

    function: {
      name: "add_to_cart",

      description:
        "Add a menu item to the customer's cart. IMPORTANT: Only call this tool after ALL required modifiers have been collected from the customer. If any required modifier is missing, ask the customer first. Never guess required modifier values.",

      parameters: {
        type: "object",

        properties: {
          itemId: {
            type: "string",
            description:
              "The exact menu item ID returned by search_menu, list_menu or get_menu_item.",
          },

          quantity: {
            type: "number",
            description: "Number of items to add.",
          },

          modifiers: {
            type: "array",
            description:
              "Selected modifier choices. Each modifier must contain the modifier group ID and the selected option ID returned by the menu tools.",

            items: {
              type: "object",

              properties: {
                groupId: {
                  type: "string",
                },

                optionId: {
                  type: "string",
                },
              },

              required: ["groupId", "optionId"],
            },
          },
        },

        required: ["itemId", "quantity", "modifiers"],
      },
    },
  },
  {
    type: "function",

    function: {
      name: "remove_from_cart",

      description: "Remove an item from the customer's cart.",

      parameters: {
        type: "object",

        properties: {
          itemId: {
            type: "string",
            description:
              "The exact menu item ID returned by search_menu, list_menu or get_menu_item.",
          },
        },

        required: ["itemId"],
      },
    },
  },
  {
    type: "function",

    function: {
      name: "update_quantity",

      description: "Update the quantity of an item in the cart.",

      parameters: {
        type: "object",

        properties: {
          cartItemId: {
            type: "string",
            description: "The cart item ID.",
          },

          quantity: {
            type: "number",
            description: "The new quantity.",
          },
        },

        required: ["cartItemId", "quantity"],
      },
    },
  },
  {
    type: "function",

    function: {
      name: "clear_cart",

      description: "Remove all items from the customer's cart.",

      parameters: {
        type: "object",

        properties: {},

        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "place_order",
      description:
        "Convert the customer's current cart into a completed order. Use this when the customer wants to checkout or place the order.",
      parameters: {
        type: "object",
        properties: {},
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_orders",
      description:
        "Retrieve all previous orders for the current customer session.",
      parameters: {
        type: "object",
        properties: {},
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_order",
      description: "Retrieve a specific order by its order ID.",
      parameters: {
        type: "object",
        properties: {
          orderId: {
            type: "string",
            description: "The order ID.",
          },
        },
        required: ["orderId"],
      },
    },
  },
];
