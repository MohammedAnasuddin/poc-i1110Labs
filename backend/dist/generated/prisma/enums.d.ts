export declare const OrderStatus: {
    readonly PLACED: 'PLACED';
    readonly FAILED: 'FAILED';
};
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
