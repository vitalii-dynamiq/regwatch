import {
  createPaginationSchema,
  datetimeSchema,
  idSchema,
  idValidationSchema,
  makeEmailSchema,
  makeOptionalString,
  makeRequiredString,
} from '@/lib/zod';
import { organizationSchema } from '@/server/api/entity/organization/types';
import { z } from 'zod';

/**
 * Defines the schema for a user object.
 *
 * This schema includes:
 * - `id`: Unique identifier for the user, validated by `idSchema`.
 * - `created_at`: Timestamp indicating when the user was created, validated by `datetimeSchema`.
 * - `updated_at`: Timestamp indicating the last update to the user, validated by `datetimeSchema`.
 * - `email`: User's email address. This field is nullable and optional, validated by `makeEmailSchema`.
 * - `first_name`: User's first name. This field is nullable and optional, validated by `makeRequiredString('First name')`.
 * - `last_name`: User's last name. This field is nullable and optional, validated by `makeRequiredString('Last name')`.
 * - `organization`: Associated organization for the user. This field is nullable and optional, validated by `organizationSchema`.
 */
export const userSchema = z.object({
  id: idSchema,
  created_at: datetimeSchema,
  updated_at: datetimeSchema,
  email: makeEmailSchema().nullable().optional(),
  first_name: makeOptionalString('First name').nullable(),
  last_name: makeOptionalString('Last name').nullable(),
  organization: organizationSchema.nullable().optional(),
});

/**
 * Represents a schema definition for an array of user objects.
 *
 * This variable leverages `z.array` to enforce that the data conforms
 * to an array structure, where each element adheres to the `userSchema` definition.
 *
 * Utilizes Zod's schema validation functionalities to ensure structured
 * and validated user data in an array format. The schema validates that:
 * - Each element in the array must strictly follow the rules defined by `userSchema`.
 *
 * Typically used in scenarios where an array of user-related data needs to be validated,
 * such as handling multiple user inputs, batch API responses, or processing user collections.
 */
export const userArraySchema = z.array(userSchema);

/**
 * Defines the schema for creating a user.
 * It validates the structure and specific requirements of the user object.
 *
 * - `email`: A required field that ensures the provided value is a valid email schema.
 * - `first_name`: An optional field for the user's first name, validated as a required string if provided.
 * - `last_name`: An optional field for the user's last name, validated as a required string if provided.
 */
export const createUserSchema = z.object({
  email: makeEmailSchema(),
  first_name: makeOptionalString('First name'),
  last_name: makeOptionalString('Last name'),
});

/**
 * Represents a schema for partially updating user information.
 * The schema allows for the optional inclusion of `first_name`
 * and `last_name` properties, which must be strings if provided.
 */
export const patchUserSchema = z.object({
  first_name: makeOptionalString('First name'),
  last_name: makeOptionalString('Last name'),
});

/**
 * Represents the schema for paginated user data that extends the properties
 * of the user schema and includes pagination-related properties.
 *
 * This schema is typically used to handle paginated results for user-related
 * data retrieval, simplifying the management of pagination metadata and user
 * data within the same structure.
 *
 * @type {Object} userPaginationSchema
 */
export const userPaginationSchema = createPaginationSchema(userSchema);
/**
 * Represents a User object type inferred from the `userSchema`.
 *
 * This type defines the structure of a user based on validation and parsing rules
 * specified in the `userSchema`, which could include properties such as name, email,
 * age, or any other attributes defined in the schema.
 *
 * The `User` type ensures type safety and reflects the schema's structure,
 * providing a standardized representation of a user entity across the codebase.
 */
export type User = z.infer<typeof userSchema>;
/**
 * Represents a type alias `Users` which is inferred from the schema definition of `userArraySchema`.
 *
 * This type describes the structure of a collection of users, as validated by the Zod schema.
 * It is useful for ensuring type safety and consistency when dealing with user data.
 */
export type Users = z.infer<typeof userArraySchema>;
/**
 * Represents the structure for paginated user data based on the provided schema.
 *
 * The `UsersPagination` type is derived from `userPaginationSchema` using the `z.infer` method.
 * It ensures that the type adheres to the validation rules defined in the schema,
 * typically including properties such as user data, pagination details like current page,
 * items per page, and total items count.
 *
 * This type is primarily used to manage and validate paginated user-related data in applications.
 */
export type UsersPagination = z.infer<typeof userPaginationSchema>;
/**
 * Represents the data transfer object for creating a user.
 *
 * This type is inferred from the `createUserSchema` schema definition.
 * It is used to ensure that all data provided when creating a user
 * adheres to the rules and constraints defined in the schema.
 *
 * The `UserCreateDto` serves as a contract for the shape and
 * structure of data required to create a user in the system.
 */
export type UserCreateDto = z.infer<typeof createUserSchema>;
/**
 * Defines the UserUpdateDto type.
 *
 * This type is used to encapsulate the data that can be updated for a user.
 * It serves as a Data Transfer Object (DTO) for user update-related operations.
 *
 * This type is typically utilized in contexts where user details need to be updated
 * via APIs, services, or other modules in the application.
 */
export type UserUpdateDto = {};
/**
 * UserPatchDto is a TypeScript type derived from the schema defined by `patchUserSchema`.
 * This type is used for updating user details and represents a partial update object,
 * ensuring that only the fields needing changes are provided while adhering to the defined schema.
 *
 * It is typically utilized for PATCH operations in scenarios where not all user fields are
 * being modified, and only specific fields are updated based on the input provided.
 */
export type UserPatchDto = z.infer<typeof patchUserSchema>;
/**
 * Represents a Data Transfer Object (DTO) for deleting a user.
 * This type is inferred from the `idValidationSchema` and is used to ensure
 * that the required user ID conforms to the defined validation schema
 * when attempting to delete a user.
 *
 * The schema typically includes constraints to validate the correctness
 * and format of the user ID.
 */
export type UserDeleteDto = z.infer<typeof idValidationSchema>;
