"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toolDefinitions = void 0;
exports.toolDefinitions = [
    {
        type: "function",
        function: {
            name: "list_menu",
            description: "Retrieve the restaurant menu.",
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
            description: "Search the restaurant menu.",
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
            description: "Add a menu item to the customer's cart.",
            parameters: {
                type: "object",
                properties: {
                    selection: {
                        type: "object",
                        description: "The selected menu item with modifiers.",
                    },
                },
                required: ["selection"],
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
                    cartItemId: {
                        type: "string",
                        description: "The cart item ID.",
                    },
                },
                required: ["cartItemId"],
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
                required: [
                    "cartItemId",
                    "quantity",
                ],
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
];
//# sourceMappingURL=tool-definitions.js.map