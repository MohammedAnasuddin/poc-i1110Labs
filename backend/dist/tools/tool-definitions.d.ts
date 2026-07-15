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
                selection?: never;
                cartItemId?: never;
                quantity?: never;
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
                selection?: never;
                cartItemId?: never;
                quantity?: never;
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
                selection?: never;
                cartItemId?: never;
                quantity?: never;
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
                selection: {
                    type: string;
                    description: string;
                };
                cartItemId?: never;
                quantity?: never;
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
                selection?: never;
                cartItemId: {
                    type: string;
                    description: string;
                };
                quantity?: never;
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
                selection?: never;
                cartItemId: {
                    type: string;
                    description: string;
                };
                quantity: {
                    type: string;
                    description: string;
                };
            };
            required: string[];
        };
    };
})[];
