import {
  createPaginationSchema,
  datetimeSchema,
  idSchema,
  itemSchema,
  makeNullableString,
  makeOptionalString,
  makeRequiredBoolean,
  makeRequiredString,
  makeUrlSchema,
  optionalUuidFromEmpty,
} from '@/lib/zod';
import { z } from 'zod';
/**
 * Represents the schema definition for a data source, describing its structure and validation rules.
 *
 * @typedef {object} sourceSchema
 * @property {idSchema} id - The unique identifier for the data source.
 * @property {datetimeSchema} created_at - The timestamp indicating when the data source was created.
 * @property {datetimeSchema} updated_at - The timestamp indicating when the data source was last updated.
 * @property {string} name - The name of the data source.
 * @property {string} base_url - The base URL of the data source.
 * @property {string|null} description - A nullable description of the data source.
 * @property {itemSchema|null} jurisdiction - The nullable jurisdiction tied to the data source.
 * @property {Array<itemSchema>|null} content_types - A nullable array of content types associated with the data source.
 * @property {boolean} monitoring_enabled - Indicates whether monitoring is enabled for the data source.
 * @property {itemSchema} monitoring_frequency - The frequency setting for monitoring the data source.
 * @property {datetimeSchema|null} last_monitoring_started_at - The nullable timestamp when the last monitoring started.
 * @property {datetimeSchema|null} last_monitoring_completed_at - The nullable timestamp when the last monitoring was completed.
 * @property {number} pages_count - An optional count of pages within the data source.
 * @property {number} obligations_count - An optional count of obligations related to the data source.
 * @property {number} alerts_count - An optional count of alerts linked to the data source.
 */
export const sourceSchema = z.object({
  id: idSchema,
  created_at: datetimeSchema,
  updated_at: datetimeSchema,
  name: makeRequiredString('Name'),
  base_url: makeUrlSchema('Base URL'),
  description: makeNullableString(),
  jurisdiction: itemSchema.nullable(),
  content_types: z.array(itemSchema).nullable(),
  monitoring_enabled: makeRequiredBoolean('Monitoring'),
  monitoring_frequency: itemSchema,
  last_monitoring_started_at: datetimeSchema.nullable(),
  last_monitoring_completed_at: datetimeSchema.nullable(),
  pages_count: z.number(),
  obligations_count: z.number(),
  alerts_count: z.number(),
});
/**
 * A schema definition for source list items derived from the `sourceSchema`.
 * This schema specifically omits certain fields that are not relevant for list items.
 * Omitted fields:
 * - pages_count
 * - obligations_count
 * - alerts_count
 */
export const sourceListItemShema = sourceSchema.omit({
  pages_count: true,
  obligations_count: true,
  alerts_count: true,
});
/**
 * A schema definition representing an array of items, where each item
 * adheres to the structure and validation rules defined by the
 * `sourceListItemSchema`.
 *
 * The schema ensures that the input is of array type and validates
 * each element within the array against the `sourceListItemSchema`.
 *
 * This can be utilized for validating and structuring array data with
 * consistent formatting for each element.
 */
export const sourceArraySchema = z.array(sourceListItemShema);
/**
 * Schema definition for creating a source.
 *
 * This variable defines the structure and validation rules for creating
 * a source in the application. The schema uses zod for validation,
 * ensuring compliance with expected data shapes and constraints.
 *
 * Properties:
 * - `name`: A required field that validates a URL-friendly string for the source name.
 * - `base_url`: A required field for validating the base URL of the source.
 * - `description`: An optional field that allows a nullable string for an additional source description.
 * - `jurisdiction_id`: An optional UUID field, allowing empty or null values, representing the related jurisdiction.
 * - `content_types`: An optional array of required strings, with a minimum of one element. Represents content types associated with the source.
 * - `monitoring_enabled`: An optional boolean value indicating whether monitoring for the source is enabled.
 * - `monitoring_frequency`: An optional required string schema for specifying the frequency of source monitoring.
 */
export const createSourceSchema = z.object({
  name: makeRequiredString('Name'),
  base_url: makeUrlSchema('Base URL'),
  description: makeNullableString().optional(),
  jurisdiction_id: optionalUuidFromEmpty.optional(),
  content_types: z.array(makeRequiredString('Content type')).min(1, 'At least one content type is required').optional(),
  monitoring_enabled: makeRequiredBoolean('Monitoring').optional(),
  monitoring_frequency: makeOptionalString('Monitoring frequency'),
});

/**
 * Schema definition for the `patchSourceSchema` variable using `zod`. This schema
 * is utilized for validating and shaping data related to patching a source.
 *
 * It defines the structure and constraints for the following fields:
 * - `name` (optional): A string field with a minimum length of 1, marked as optional.
 * - `description` (optional): A nullable string field that is also optional.
 * - `content_types` (optional): An optional, nullable array of strings with at least one required value.
 * - `monitoring_enabled` (optional): An optional boolean field.
 * - `monitoring_frequency` (optional): An optional string field.
 */
export const patchSourceSchema = z.object({
  name: makeOptionalString('Name'),
  description: makeNullableString().optional(),
  content_types: z.array(makeRequiredString('Content type')).min(1, 'At least one content type is required').optional(),
  monitoring_enabled: makeRequiredBoolean('Monitoring').optional(),
  monitoring_frequency: makeOptionalString('Monitoring frequency'),
});
/**
 * Schema definition for bulk patch source input.
 *
 * The `bulkPatchSourceSchema` is a Zod object schema that validates the structure of input data
 * required for bulk patching operations. This schema ensures that the input contains:
 *
 * - An array of IDs, which is validated using a separate `idSchema` and must contain at least one ID.
 * - A Boolean field indicating whether monitoring is enabled, which is required and validated
 *   using a helper method to enforce strict Boolean values.
 *
 * This schema is designed to validate payloads where multiple entities can be patched simultaneously
 * while enforcing required constraints. Improperly structured data or missing required fields
 * will result in validation errors.
 */
export const bulkPatchSourceSchema = z.object({
  ids: z.array(idSchema).min(1, 'At least one id is required'),
  monitoring_enabled: makeRequiredBoolean('Monitoring'),
});

/**
 * Represents the schema for validating the input used in bulk delete operations.
 *
 * The schema expects an object containing the following properties:
 * - `ids`: An array of identifiers, where at least one identifier is mandatory.
 *
 * This schema ensures that the `ids` array adheres to the specified validation rules.
 */
export const bulkDeleteSourceSchema = z.object({
  ids: z.array(idSchema).min(1, 'At least one id is required'),
});

/**
 * Defines the schema used for managing pagination of source items.
 *
 * The `sourcePaginationSchema` is generated by applying the `createPaginationSchema`
 * function, which takes in the `sourceListItemSchema` to establish the expected
 * structure for paginated data of the source list.
 *
 * This schema is typically used to facilitate handling paginated data in a uniform
 * manner, ensuring compliance with the expected format of source list items.
 *
 * @type {Object} sourcePaginationSchema
 */
export const sourcePaginationSchema = createPaginationSchema(sourceListItemShema);

/**
 * Represents the inferred TypeScript type from the provided Zod schema `sourceSchema`.
 *
 * `Source` is used to encapsulate the structure and constraints defined by the `sourceSchema`.
 * This type is automatically derived using Zod's `infer` utility, ensuring type safety and
 * alignment with the schema's validation rules.
 *
 * @typedef {z.infer<typeof sourceSchema>} Source
 */
export type Source = z.infer<typeof sourceSchema>;
/**
 * Represents an item in the source list, inferred from the sourceListItemSchema.
 * This type is used to define the structure and expected properties of items
 * within the source list.
 */
export type SourceListItem = z.infer<typeof sourceListItemShema>;
/**
 * Represents the Sources type, which is inferred from the `sourceArraySchema`
 * defined using `zod` schema validation.
 *
 * The `Sources` type reflects the structured schema for an array of sources
 * as described by the `sourceArraySchema`, ensuring type safety and adherence
 * to the expected source data format.
 *
 * This type can be used to validate and enforce consistent handling of source
 * data across the codebase.
 */
export type Sources = z.infer<typeof sourceArraySchema>;
/**
 * Represents the data transfer object (DTO) used for creating a new source.
 *
 * This type is inferred from the `createSourceSchema`. It ensures
 * that the data adheres to the defined schema rules for a source creation request.
 *
 * The `SourceCreateDto` is typically used when validating input data
 * or transferring information related to creating a source in the system.
 *
 * It serves as a contract that defines the structure and types of
 * the source creation data.
 */
export type SourceCreateDto = z.infer<typeof createSourceSchema>;
/**
 * Represents a data transfer object (DTO) for updating a source.
 * This type encapsulates the properties and data required to perform
 * an update operation on a specific source entity in the system.
 */
export type SourceUpdateDto = {};
/**
 * Represents a Data Transfer Object (DTO) for updating or patching a source entity.
 * This type is inferred from the validation schema `patchSourceSchema` using Zod.
 * It outlines the structure of the data allowed for partial updates to a source entity.
 */
export type SourcePatchDto = z.infer<typeof patchSourceSchema>;
/**
 * Represents a Data Transfer Object (DTO) for performing bulk patch operations on a source.
 * This type is inferred from the `bulkPatchSourceSchema` schema definition.
 * It is used to define the structure and constraints of the data required for the bulk patch operation.
 */
export type SourceBulkPatchDto = z.infer<typeof bulkPatchSourceSchema>;
/**
 * A data transfer object representing the structure required for bulk deletion
 * of sources. This type is inferred from the `bulkDeleteSourceSchema` schema.
 *
 * This DTO is utilized to validate and enforce the expected input format
 * for batch deletion processes in the application.
 */
export type SourceBulkDeleteDto = z.infer<typeof bulkDeleteSourceSchema>;
