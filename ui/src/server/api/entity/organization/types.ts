import { datetimeSchema, idSchema, makeNullableString, makeRequiredString } from '@/lib/zod';
import { z } from 'zod';

/**
 * Schema definition for an organization.
 *
 * This schema defines the structure of an organization object and its validations.
 *
 * Properties:
 * - `id`: A unique identifier for the organization, validated by the `idSchema`.
 * - `created_at`: The timestamp indicating when the organization was created, validated by the `datetimeSchema`.
 * - `updated_at`: The timestamp indicating the last update to the organization's data, validated by the `datetimeSchema`.
 * - `name`: The name or title of the organization. This is a required string field and may include additional validations for the input string.
 * - `description`: An optional field that provides additional information about the organization. This can be a nullable string.
 */
export const organizationSchema = z.object({
  id: idSchema,
  created_at: datetimeSchema,
  updated_at: datetimeSchema,
  name: makeRequiredString('Title'),
  description: makeNullableString(),
});
/**
 * Represents an array schema that validates a collection of organization objects.
 * Each item in the array must conform to the `organizationSchema`.
 * Utilized for enforcing validation and structure in an array of organizations.
 */
export const organizationArraySchema = z.array(organizationSchema);
/**
 * Represents an organization with specific properties validated by the organizationSchema.
 *
 * This type is used to define and enforce the structure and expected data for an organization
 * based on the provided schema. It ensures consistency and type safety when working with
 * organization-related data throughout the application.
 */
export type Organization = z.infer<typeof organizationSchema>;

/**
 * A TypeScript type definition for Organizations, inferred from the `organizationArraySchema` schema.
 *
 * Represents an array of organization objects that adhere to the structure and constraints
 * defined in the `organizationArraySchema` using the Zod library.
 *
 * This type is used to provide strong typing for data structures related to organizations
 * and ensure compliance with the schema throughout the application.
 */
export type Organizations = z.infer<typeof organizationArraySchema>;
/**
 * Represents the data transfer object used for creating an organization.
 * This type defines the structure required for providing input data
 * when creating a new organization entity within the system.
 */
export type OrganizationCreateDto = {};
/**
 * Represents the data transfer object (DTO) for updating an organization.
 *
 * This type is used to encapsulate the properties required to update
 * an organization's details in the system. It typically contains fields
 * for attributes such as name, address, contact information, and other
 * configurable settings relevant to the organization.
 *
 * The structure of the DTO ensures that only the necessary and valid
 * data is transmitted for the update operation.
 *
 * Note: The specific properties included in this DTO depend on the
 * context and requirements of the application.
 */
export type OrganizationUpdateDto = {};
/**
 * Represents a Data Transfer Object (DTO) used for patching or updating an organization.
 * This type allows partial updates by including only the fields that need to be modified.
 *
 * OrganizationPatchDto is commonly used in APIs where partial updates to an organization's
 * data are required, adhering to the JSON Patch principles.
 *
 * Fields provided in this DTO will override the corresponding attributes in the target organization.
 */
export type OrganizationPatchDto = {};
/**
 * Represents the schema for paginated responses related to organizations.
 *
 * This type defines the structure of paginated data returned by endpoints
 * that deal with retrieving multiple organizations. It includes information
 * about pagination metadata (such as the current page, total items, and items
 * per page) alongside the actual array of organization data.
 *
 * OrganizationPaginationSchema is useful for enabling efficient traversal
 * and handling of large datasets by breaking them into manageable chunks.
 */
export type OrganizationPaginationSchema = {};
/**
 * Represents a Data Transfer Object (DTO) for bulk deletion of organizations.
 * This type is used to encapsulate the data required for performing bulk delete operations on organizations.
 */
export type OrganizationBulkDeleteDto = {};
