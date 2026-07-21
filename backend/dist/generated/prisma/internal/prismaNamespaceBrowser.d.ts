import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly Order: 'Order';
    readonly Analytics: 'Analytics';
    readonly ConversationAnalytics: 'ConversationAnalytics';
    readonly AgentLog: 'AgentLog';
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: 'ReadUncommitted';
    readonly ReadCommitted: 'ReadCommitted';
    readonly RepeatableRead: 'RepeatableRead';
    readonly Serializable: 'Serializable';
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const OrderScalarFieldEnum: {
    readonly id: 'id';
    readonly sessionId: 'sessionId';
    readonly items: 'items';
    readonly subtotal: 'subtotal';
    readonly tax: 'tax';
    readonly total: 'total';
    readonly smsSent: 'smsSent';
    readonly emailSent: 'emailSent';
    readonly status: 'status';
    readonly placedAt: 'placedAt';
};
export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum];
export declare const AnalyticsScalarFieldEnum: {
    readonly id: 'id';
    readonly conversations: 'conversations';
    readonly turns: 'turns';
    readonly ordersPlaced: 'ordersPlaced';
    readonly toolCalls: 'toolCalls';
    readonly successfulToolCalls: 'successfulToolCalls';
    readonly failedToolCalls: 'failedToolCalls';
    readonly promptTokens: 'promptTokens';
    readonly completionTokens: 'completionTokens';
    readonly totalLatency: 'totalLatency';
    readonly totalCost: 'totalCost';
    readonly updatedAt: 'updatedAt';
};
export type AnalyticsScalarFieldEnum = (typeof AnalyticsScalarFieldEnum)[keyof typeof AnalyticsScalarFieldEnum];
export declare const ConversationAnalyticsScalarFieldEnum: {
    readonly id: 'id';
    readonly sessionId: 'sessionId';
    readonly promptTokens: 'promptTokens';
    readonly completionTokens: 'completionTokens';
    readonly totalTokens: 'totalTokens';
    readonly latency: 'latency';
    readonly turns: 'turns';
    readonly toolCalls: 'toolCalls';
    readonly startedAt: 'startedAt';
    readonly endedAt: 'endedAt';
    readonly createdAt: 'createdAt';
};
export type ConversationAnalyticsScalarFieldEnum = (typeof ConversationAnalyticsScalarFieldEnum)[keyof typeof ConversationAnalyticsScalarFieldEnum];
export declare const AgentLogScalarFieldEnum: {
    readonly id: 'id';
    readonly sessionId: 'sessionId';
    readonly type: 'type';
    readonly message: 'message';
    readonly toolName: 'toolName';
    readonly toolArguments: 'toolArguments';
    readonly toolResponse: 'toolResponse';
    readonly success: 'success';
    readonly latency: 'latency';
    readonly promptTokens: 'promptTokens';
    readonly completionTokens: 'completionTokens';
    readonly createdAt: 'createdAt';
};
export type AgentLogScalarFieldEnum = (typeof AgentLogScalarFieldEnum)[keyof typeof AgentLogScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: 'asc';
    readonly desc: 'desc';
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const JsonNullValueInput: {
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
};
export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: import("@prisma/client-runtime-utils").DbNullClass;
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const QueryMode: {
    readonly default: 'default';
    readonly insensitive: 'insensitive';
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const JsonNullValueFilter: {
    readonly DbNull: import("@prisma/client-runtime-utils").DbNullClass;
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
    readonly AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
export declare const NullsOrder: {
    readonly first: 'first';
    readonly last: 'last';
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
