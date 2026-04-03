import {
  createPaginationSchema,
  datetimeSchema,
  idSchema,
  itemRegulatoryMetadataSchema,
  itemSchema,
  itemSourceSchema,
  makeNullableString,
  makeOptionalString,
  makeRequiredString,
} from '@/lib/zod';
import { z } from 'zod';
/**
 * Schema definition for an alert object.
 *
 * This schema defines the structure and validation rules for an alert entity, including its properties and associated data types.
 *
 * Properties:
 * - `id`: A unique identifier for the alert.
 * - `created_at`: The timestamp when the alert was created.
 * - `updated_at`: The timestamp when the alert was last updated.
 * - `title`: The title of the alert, required.
 * - `alert_type`: The type/category of the alert.
 * - `content_type`: The type of content associated with the alert.
 * - `description`: An optional description providing additional details about the alert.
 * - `risk_level`: The risk level associated with the alert, optional.
 * - `status`: The current status of the alert.
 * - `due_date`: An optional due date specifying when action for the alert is expected.
 * - `effective_date`: An optional date indicating when the alert becomes effective.
 * - `detected_at`: The date and time when the alert was detected.
 * - `completed_at`: An optional timestamp indicating when the alert was resolved or completed.
 * - `regulatory_metadata`: Optional metadata related to regulatory compliance.
 * - `assigned_to`: The identifier of the entity or individual assigned to the alert, optional.
 * - `assigned_at`: The time when the alert was assigned, optional.
 * - `last_updated_by`: The identifier of the entity or individual who last updated the alert, optional.
 * - `source`: The source of the alert information.
 */
export const alertSchema = z.object({
  id: idSchema,
  created_at: datetimeSchema,
  updated_at: datetimeSchema,
  title: makeRequiredString('Title'),
  alert_type: itemSchema,
  content_type: itemSchema,
  description: makeNullableString(),
  risk_level: itemSchema.nullable(),
  status: itemSchema,
  due_date: datetimeSchema.nullable(),
  effective_date: datetimeSchema.nullable(),
  detected_at: datetimeSchema,
  completed_at: datetimeSchema.nullable(),
  regulatory_metadata: itemRegulatoryMetadataSchema.nullable(),
  assigned_to: idSchema.nullable(),
  assigned_at: datetimeSchema.nullable(),
  last_updated_by: idSchema.nullable(),
  source: itemSourceSchema,
});
/**
 * Defines a schema for validating an array of alerts.
 *
 * This variable leverages the `z.array` method from the Zod library to enforce
 * that its value must be an array where every element conforms to the `alertSchema` schema.
 *
 * It ensures that all elements of the array adhere to the structure and constraints
 * outlined in the `alertSchema`. Any array that does not pass this validation will throw an error.
 *
 * This variable is commonly used for data validation where multiple alert objects need
 * to be verified against the specified alert structure.
 */
export const alertArraySchema = z.array(alertSchema);
/**
 * Schema for validating the patch operation on an alert object.
 *
 * Defines the structure and validation rules for updating an existing alert,
 * where all fields are optional and some may contain nullable values.
 * This schema ensures that the provided data adheres to the expected formats and types.
 *
 * Properties:
 * - status: A required string representing the status of the alert.
 * - assigned_to: An optional nullable field representing the identifier of the user assigned to the alert.
 * - regulatory_metadata: An optional nullable field for the regulatory metadata related to the alert.
 *
 * All properties in this schema are optional due to the application of the `.partial()` method.
 */
export const patchAlertSchema = z.object({
  status: makeOptionalString(),
  assigned_to: idSchema.nullable().optional(),
  regulatory_metadata: itemRegulatoryMetadataSchema.nullable().optional(),
});
/**
 * Schema definition for bulk delete alert operation.
 *
 * This schema validates the structure of the data required for a bulk delete
 * operation. It ensures that the input is an object containing a mandatory
 * field:
 *
 * - `ids`: An array of identifiers that must include at least one ID.
 *
 * The `ids` array must conform to the validation rules defined in the
 * `idSchema`, and it cannot be empty.
 */
export const bulkDeleteAlertSchema = z.object({
  ids: z.array(idSchema).min(1, 'At least one id is required'),
});
/**
 * Represents the pagination schema tailored for alert data.
 *
 * This variable is constructed by combining a base pagination schema with the
 * specific schema for alert items. It defines the structure, rules, and constraints
 * for paginated alert records.
 *
 * It is utilized to manage and validate paginated payloads specifically containing
 * alert data, ensuring consistency and proper formatting.
 *
 * @type {Object}
 */
export const alertPaginationSchema = createPaginationSchema(alertSchema);
/**
 * Represents an Alert type inferred from the given `alertSchema`.
 * This type is used to define the structure and validation rules for an alert object.
 *
 * The `Alert` type ensures that any object conforms to the schema specified by `alertSchema`.
 *
 * @typedef {Object} Alert
 */
export type Alert = z.infer<typeof alertSchema>;
/**
 * Represents the inferred type for alert data based on the provided alertArraySchema.
 * This type is generated using the Zod validation library and corresponds to the structure
 * defined by the schema.
 *
 * The Alerts type is used to ensure type safety and consistency when working with alert
 * data in the application, adhering to the rules and formats specified in the schema.
 */
export type Alerts = z.infer<typeof alertArraySchema>;
/**
 * Represents a Data Transfer Object (DTO) used for creating an alert.
 * The `AlertCreateDto` acts as a structure to hold and transfer the data
 * needed when initializing or creating a new alert within the system.
 * This type is typically utilized in scenarios where information related
 * to an alert creation request needs to be standardized for consumption by
 * the backend or other system components.
 *
 * This DTO ensures a predictable format and facilitates communication by
 * defining the required and optional properties associated with creating
 * an alert. Consumers of this type should ensure the passed data complies
 * with the structure and constraints defined in the type annotations.
 *
 * Note: Additional type-specific validations or constraints might need to
 * be enforced at runtime in the implementation to maintain data integrity.
 */
export type AlertCreateDto = {};
/**
 * Represents a Data Transfer Object (DTO) for updating alerts.
 * This type is used to encapsulate the data required for updating an alert.
 * Typically utilized in alert management systems to modify alert properties.
 */
export type AlertUpdateDto = {};
/**
 * Represents the data transfer object for patching an alert.
 * This type is inferred from the schema `patchAlertSchema` which defines the structure
 * and constraints for the alert patch payload.
 *
 * It is used to update or modify specific attributes of an alert without requiring all properties
 * to be provided, as defined by the schema.
 */
export type AlertPatchDto = z.infer<typeof patchAlertSchema>;
/**
 * AlertPaginationSchema is a TypeScript type derived from the validation schema
 * `alertPaginationSchema` which is defined using the Zod library. This type
 * represents the structure and constraints of the data used for alert pagination.
 *
 * It is specifically designed to ensure that the data conforms to the
 * requirements of `alertPaginationSchema`, which could include constraints
 * such as required fields, specific value types, or any other rules defined
 * in the schema.
 *
 * You can utilize AlertPaginationSchema to define and validate the shape of
 * objects adhering to the alert pagination data model.
 *
 * The type is inferred from the Zod schema at `alertPaginationSchema`.
 */
export type AlertPaginationSchema = z.infer<typeof alertPaginationSchema>;
/**
 * Represents a data transfer object for bulk deleting alerts.
 *
 * This type is derived from the validation schema `bulkDeleteAlertSchema`,
 * ensuring that the structure adheres to the defined rules and constraints.
 *
 * Use this type whenever you need to handle the payload for bulk alert deletion operations.
 */
export type AlertBulkDeleteDto = z.infer<typeof bulkDeleteAlertSchema>;
