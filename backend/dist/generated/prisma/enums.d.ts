export declare const OrderStatus: {
    readonly PLACED: 'PLACED';
    readonly FAILED: 'FAILED';
};
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
export declare const LogType: {
    readonly USER: 'USER';
    readonly LLM: 'LLM';
    readonly TOOL: 'TOOL';
    readonly ORDER: 'ORDER';
    readonly ERROR: 'ERROR';
};
export type LogType = (typeof LogType)[keyof typeof LogType];
