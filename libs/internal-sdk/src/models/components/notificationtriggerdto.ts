/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { safeParse } from "../../lib/schemas.js";
import { ClosedEnum } from "../../types/enums.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";
import {
  NotificationTriggerVariable,
  NotificationTriggerVariable$inboundSchema,
  NotificationTriggerVariable$Outbound,
  NotificationTriggerVariable$outboundSchema,
} from "./notificationtriggervariable.js";

/**
 * Type of the trigger
 */
export const Type = {
  Event: "event",
} as const;
/**
 * Type of the trigger
 */
export type Type = ClosedEnum<typeof Type>;

export type NotificationTriggerDto = {
  /**
   * Type of the trigger
   */
  type: Type;
  /**
   * Identifier of the trigger
   */
  identifier: string;
  /**
   * Variables of the trigger
   */
  variables: Array<NotificationTriggerVariable>;
  /**
   * Subscriber variables of the trigger
   */
  subscriberVariables?: Array<NotificationTriggerVariable> | undefined;
};

/** @internal */
export const Type$inboundSchema: z.ZodNativeEnum<typeof Type> = z.nativeEnum(
  Type,
);

/** @internal */
export const Type$outboundSchema: z.ZodNativeEnum<typeof Type> =
  Type$inboundSchema;

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace Type$ {
  /** @deprecated use `Type$inboundSchema` instead. */
  export const inboundSchema = Type$inboundSchema;
  /** @deprecated use `Type$outboundSchema` instead. */
  export const outboundSchema = Type$outboundSchema;
}

/** @internal */
export const NotificationTriggerDto$inboundSchema: z.ZodType<
  NotificationTriggerDto,
  z.ZodTypeDef,
  unknown
> = z.object({
  type: Type$inboundSchema,
  identifier: z.string(),
  variables: z.array(NotificationTriggerVariable$inboundSchema),
  subscriberVariables: z.array(NotificationTriggerVariable$inboundSchema)
    .optional(),
});

/** @internal */
export type NotificationTriggerDto$Outbound = {
  type: string;
  identifier: string;
  variables: Array<NotificationTriggerVariable$Outbound>;
  subscriberVariables?: Array<NotificationTriggerVariable$Outbound> | undefined;
};

/** @internal */
export const NotificationTriggerDto$outboundSchema: z.ZodType<
  NotificationTriggerDto$Outbound,
  z.ZodTypeDef,
  NotificationTriggerDto
> = z.object({
  type: Type$outboundSchema,
  identifier: z.string(),
  variables: z.array(NotificationTriggerVariable$outboundSchema),
  subscriberVariables: z.array(NotificationTriggerVariable$outboundSchema)
    .optional(),
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace NotificationTriggerDto$ {
  /** @deprecated use `NotificationTriggerDto$inboundSchema` instead. */
  export const inboundSchema = NotificationTriggerDto$inboundSchema;
  /** @deprecated use `NotificationTriggerDto$outboundSchema` instead. */
  export const outboundSchema = NotificationTriggerDto$outboundSchema;
  /** @deprecated use `NotificationTriggerDto$Outbound` instead. */
  export type Outbound = NotificationTriggerDto$Outbound;
}

export function notificationTriggerDtoToJSON(
  notificationTriggerDto: NotificationTriggerDto,
): string {
  return JSON.stringify(
    NotificationTriggerDto$outboundSchema.parse(notificationTriggerDto),
  );
}

export function notificationTriggerDtoFromJSON(
  jsonString: string,
): SafeParseResult<NotificationTriggerDto, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => NotificationTriggerDto$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'NotificationTriggerDto' from JSON`,
  );
}
