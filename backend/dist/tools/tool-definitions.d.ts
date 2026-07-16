export declare const toolDefinitions: ({
    type: string;
    function: {
        name: string;
        description: string;
        parameters: {
            type: string;
            properties: {
                query?: never;
                id?: never;
                modifiers?: never;
                itemId?: never;
                cartItemId?: never;
                quantity?: never;
                orderId?: never;
            };
            required: never[];
        };
    };
} | {
    type: string;
    function: {
        name: string;
        description: string;
        parameters: {
            type: string;
            properties: {
                query: {
                    type: string;
                    description: string;
                };
                id?: never;
                modifiers?: never;
                itemId?: never;
                cartItemId?: never;
                quantity?: never;
                orderId?: never;
            };
            required: string[];
        };
    };
} | {
    type: string;
    function: {
        name: string;
        description: string;
        parameters: {
            type: string;
            properties: {
                query?: never;
                id: {
                    type: string;
                    description: string;
                };
                modifiers?: never;
                itemId?: never;
                cartItemId?: never;
                quantity?: never;
                orderId?: never;
            };
            required: string[];
        };
    };
} | {
    type: string;
    function: {
        name: string;
        description: string;
        parameters: {
            type: string;
            properties: {
                query?: never;
                id?: never;
                itemId: {
                    type: string;
                    description: string;
                };
                quantity: {
                    type: string;
                    description: string;
                };
                modifiers: {
                    type: string;
                    description: string;
                    items: {
                        type: string;
                        properties: {
                            groupId: {
                                type: string;
                            };
                            optionId: {
                                type: string;
                            };
                        };
                        required: string[];
                    };
                };
                cartItemId?: never;
                orderId?: never;
            };
            required: string[];
        };
    };
} | {
    type: string;
    function: {
        name: string;
        description: string;
        parameters: {
            type: string;
            properties: {
                query?: never;
                id?: never;
                modifiers?: never;
                itemId: {
                    type: string;
                    description: string;
                };
                cartItemId?: never;
                quantity?: never;
                orderId?: never;
            };
            required: string[];
        };
    };
} | {
    type: string;
    function: {
        name: string;
        description: string;
        parameters: {
            type: string;
            properties: {
                query?: never;
                id?: never;
                modifiers?: never;
                itemId?: never;
                cartItemId: {
                    type: string;
                    description: string;
                };
                quantity: {
                    type: string;
                    description: string;
                };
                orderId?: never;
            };
            required: string[];
        };
    };
} | {
    type: string;
    function: {
        name: string;
        description: string;
        parameters: {
            type: string;
            properties: {
                query?: never;
                id?: never;
                modifiers?: never;
                itemId?: never;
                cartItemId?: never;
                quantity?: never;
                orderId: {
                    type: string;
                    description: string;
                };
            };
            required: string[];
        };
    };
})[];
