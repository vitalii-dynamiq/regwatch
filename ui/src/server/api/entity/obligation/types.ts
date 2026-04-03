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
  optionalStringFromEmpty,
  optionalUuidFromEmpty,
  requiredUuid,
} from '@/lib/zod';
import { z } from 'zod';
/**
 * Schema definition for an obligation entity using Zod.
 *
 * This schema validates the structure of an obligation object and ensures that all required fields are present
 * and adhere to their designated data types or schema definitions.
 *
 * Properties:
 * - `id`: Unique identifier for the obligation. Must conform to the `idSchema`.
 * - `created_at`: Timestamp indicating when the obligation was created. Must comply with `datetimeSchema`.
 * - `updated_at`: Timestamp indicating the last update to the obligation. Must comply with `datetimeSchema`.
 * - `title`: The title of the obligation. This is a required string, created using the `makeRequiredString` function.
 * - `obligation_type`: Indicates the type of obligation. Must conform to `itemSchema` and is nullable.
 * - `content_type`: Specifies the content type of the obligation. Must conform to `itemSchema`.
 * - `description`: A nullable string containing additional details about the obligation. Created using `makeNullableString`.
 * - `risk_level`: Represents the risk level associated with the obligation. Must conform to `itemSchema` and is nullable.
 * - `status`: The status of the obligation. Must conform to `itemSchema`.
 * - `due_date`: Indicates the due date of the obligation. Must comply with `datetimeSchema` and is nullable.
 * - `effective_date`: Specifies the effective date of the obligation. Must comply with `datetimeSchema` and is nullable.
 * - `completed_at`: Timestamp indicating when the obligation was completed. Must comply with `datetimeSchema` and is nullable.
 * - `regulatory_metadata`: Metadata related to regulatory information for the obligation. Must conform to `itemRegulatoryMetadataSchema` and is nullable.
 * - `assigned_to`: The ID of the user or entity assigned to the obligation. Must conform to `idSchema` and is nullable.
 * - `assigned_at`: Timestamp indicating when the obligation was assigned. Must comply with `datetimeSchema` and is nullable.
 * - `last_updated_by`: The ID of the user who last updated the obligation. Must conform to `idSchema` and is nullable.
 * - `source`: Specifies the source of the obligation. Must conform to `itemSourceSchema`.
 */
export const obligationSchema = z.object({
  id: idSchema,
  created_at: datetimeSchema,
  updated_at: datetimeSchema,
  title: makeRequiredString('Title'),
  obligation_type: itemSchema.nullable(),
  content_type: itemSchema,
  description: makeNullableString(),
  risk_level: itemSchema.nullable(),
  status: itemSchema,
  due_date: datetimeSchema.nullable(),
  effective_date: datetimeSchema.nullable(),
  completed_at: datetimeSchema.nullable(),
  regulatory_metadata: itemRegulatoryMetadataSchema.nullable(),
  assigned_to: idSchema.nullable(),
  assigned_at: datetimeSchema.nullable(),
  last_updated_by: idSchema.nullable(),
  source: itemSourceSchema,
});
/**
 * Represents a schema for validating an array of obligations.
 *
 * `obligationArraySchema` is a Zod schema that enforces the structure and validation
 * rules for an array of objects, where each object must conform to the predefined
 * `obligationSchema`.
 *
 * It ensures that only arrays containing valid obligation objects, as defined by the
 * `obligationSchema`, are considered valid.
 *
 * This schema is useful for validating collections of obligation data within an application.
 */
export const obligationArraySchema = z.array(obligationSchema);
/**
 * Schema for creating an obligation object.
 *
 * The `createObligationSchema` defines the required and optional fields
 * necessary for the creation of an obligation entity.
 *
 * - `source_id` - A required UUID identifying the source of the obligation.
 * - `alert_id` - An optional UUID that can be null or empty, representing the associated alert.
 * - `title` - A required string field specifying the title of the obligation.
 * - `obligation_type` - An optional nullable string indicating the type/category of the obligation.
 * - `content_type` - A required string field representing the type of content.
 * - `description` - A nullable string field describing the obligation.
 * - `risk_level` - A required string specifying the risk level of the obligation.
 * - `due_date` - A nullable string field detailing the obligation's due date.
 * - `effective_date` - A nullable string denoting the date when the obligation becomes effective.
 * - `assigned_to` - An optional UUID that can be null or empty, representing the assigned user or entity.
 * - `regulatory_metadata` - A nullable schema indicating associated regulatory metadata.
 */
export const createObligationSchema = z.object({
  source_id: requiredUuid('Source'),
  alert_id: optionalUuidFromEmpty.nullable().optional(),
  title: makeRequiredString('Title'),
  obligation_type: optionalStringFromEmpty.nullable().optional(),
  content_type: makeRequiredString('Content type'),
  description: makeNullableString().optional(),
  risk_level: makeRequiredString('Risk level'),
  due_date: makeNullableString().optional(),
  effective_date: makeNullableString().optional(),
  assigned_to: optionalUuidFromEmpty.nullable().optional(),
  regulatory_metadata: itemRegulatoryMetadataSchema.nullable().optional(),
});
/**
 * Schema for patching an obligation entity. This schema defines the structure
 * and validation rules for obligation properties that can be updated.
 *
 * Fields:
 * - `title`: A required string field representing the title of the obligation.
 * - `description`: An optional nullable string field representing the description of the obligation.
 * - `risk_level`: A required string field specifying the risk level for the obligation.
 * - `content_type`: A required string field representing the type of content for the obligation.
 * - `status`: An optional nullable string field indicating the current status of the obligation.
 * - `assigned_to`: An optional nullable UUID field for assigning a specific entity or user to the obligation.
 * - `due_date`: An optional nullable string field representing the due date of the obligation.
 * - `effective_date`: An optional nullable string field specifying the effective date of the obligation.
 * - `regulatory_metadata`: An optional nullable object that contains regulatory metadata associated with the obligation.
 */
export const patchObligationSchema = z.object({
  title: makeOptionalString('Title'),
  description: makeNullableString().optional(),
  risk_level: makeOptionalString('Risk level'),
  content_type: makeOptionalString('Content type'),
  status: makeNullableString().optional(),
  assigned_to: optionalUuidFromEmpty.nullable().optional(),
  due_date: makeNullableString().optional(),
  effective_date: makeNullableString().optional(),
  regulatory_metadata: itemRegulatoryMetadataSchema.nullable().optional(),
});
/**
 * Schema definition for bulk deleting obligations.
 *
 * This variable defines the structure of the expected data when performing
 * a bulk delete operation on obligations. It validates that at least one
 * identifier is provided, ensuring the operation has a target.
 *
 * The `ids` field is an array of identifiers that must adhere to the `idSchema`
 * and contain at least one element.
 */
export const bulkDeleteObligationSchema = z.object({
  ids: z.array(idSchema).min(1, 'At least one id is required'),
});
/**
 * A schema definition for paginating obligation data.
 *
 * The `obligationPaginationSchema` leverages the existing `obligationSchema` to
 * provide a structure for paginated data. It includes properties for
 * pagination metadata such as total pages, current page, and items per page,
 * along with an array of obligation objects based on `obligationSchema`.
 *
 * This schema is useful for managing and organizing large datasets
 * of obligations into a paginated format for improved performance
 * and user experience.
 *
 * It is intended to standardize the format of paginated obligation results
 * in applications, ensuring consistency across various implementations.
 */
export const obligationPaginationSchema = createPaginationSchema(obligationSchema);
/**
 * Type definition for Obligation.
 *
 * `Obligation` represents the inferred TypeScript type derived from the
 * provided Zod schema, `obligationSchema`. It defines the structure and validation
 * rules for data conforming to the schema.
 *
 * Ensure that any data assigned to this type adheres to the rules specified
 * in `obligationSchema`, which ensures accurate type-safety and schema validation.
 */
export type Obligation = z.infer<typeof obligationSchema>;

/**
 * Represents the type definition for Obligations derived from the `obligationArraySchema` validation schema.
 * This type is inferred using the Zod library and is used to enforce structure and validation rules
 * for an array of obligations.
 *
 * It ensures that the structure of obligations adheres to the constraints defined
 * in the `obligationArraySchema`, which may include properties, types, and specific format rules.
 *
 * This type is typically used in contexts where obligations need to be handled, validated,
 * and processed consistently according to a predefined schema.
 */
export type Obligations = z.infer<typeof obligationArraySchema>;
/**
 * ObligationCreateDto represents the structure of data required to create an obligation.
 * It is derived from the `createObligationSchema` using Zod's inference.
 *
 * This type is used to ensure type safety and validation when creating new obligation objects.
 */
export type ObligationCreateDto = z.infer<typeof createObligationSchema>;
/**
 * Represents a Data Transfer Object (DTO) for updating obligations.
 * This type is used to encapsulate the necessary details required
 * to perform an update operation on an obligation entity.
 *
 * The structure of this DTO should align with the data expected
 * during the update process, which may include fields such as
 * obligation status, due dates, or other relevant attributes.
 *
 * The exact properties of this type depend on the application requirements
 * and the specific attributes of the obligation that are updatable.
 */
export type ObligationUpdateDto = {};
/**
 * Represents a data transfer object (DTO) for updating an obligation.
 * This type is derived from the `patchObligationSchema` using Zod inference.
 * It is used to define the structure and constraints of data required
 * when performing partial updates to an obligation resource.
 */
export type ObligationPatchDto = z.infer<typeof patchObligationSchema>;
/**
 * ObligationPaginationSchema represents the TypeScript type inferred
 * from the Zod schema `obligationPaginationSchema`. This type is used
 * to define the shape of paginated obligation data returned from the
 * corresponding API or data source.
 *
 * It is typically used to ensure the structure of paginated data
 * adheres to the expected schema during type-checking and validation.
 *
 * The actual structure of the schema can include properties such as
 * pagination information, the list of obligations, and other metadata,
 * depending on how `obligationPaginationSchema` is defined.
 */
export type ObligationPaginationSchema = z.infer<typeof obligationPaginationSchema>;
/**
 * Represents the data transfer object for bulk deletion of obligations.
 *
 * This type is inferred from the bulkDeleteObligationSchema and is used to validate
 * and ensure the integrity of data related to bulk deletion operations for obligations.
 *
 * It contains the necessary fields required to perform a bulk delete action
 * based on the specific schema.
 */
export type ObligationBulkDeleteDto = z.infer<typeof bulkDeleteObligationSchema>;
