## v0.5.12 - 2025-12-10

### Features
- alert
  - update schemas to use optional string utility
  ([0a67c67](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/0a67c6729d47cc74aba32610b5e9efdddf04a03c)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-12-10. Replaced `makeRequiredString` with `makeOptionalString` in `patchAlertSchema` for `status` field. This change ensures consistent handling of optional string fields and aligns with updated validation practices, improving schema flexibility.

- obligation
  - update schemas to use optional string utility
  ([554525d](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/554525d42469dafd39379be514433495cda30629)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-12-10. Replaced `makeRequiredString` with `makeOptionalString` in obligation-related schemas to improve validation flexibility. This enhances consistency and aligns with recent updates in schema handling practices.

- source
  - update schemas to use optional string utility
  ([0b7c8c1](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/0b7c8c17504d1a417760970e7cd392e8e5caeeeb)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-12-10. Updated `sourceSchema` and `patchSourceSchema` to use `makeOptionalString` for flexible handling
of optional string fields and consistency with recent validation updates. This replaces
`makeRequiredString` where appropriate to align with best practices.

- user
  - update schemas to use optional string utility
  ([1307ef5](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/1307ef5768c3f1db22c27fe44b030246ed057de1)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-12-10. Replaced `makeRequiredString` with the newly introduced `makeOptionalString` in user-related
schemas, ensuring consistent handling of optional string fields. This aligns with the updated
validation approach and improves flexibility for `first_name` and `last_name` properties.

- zod
  - add optional string utility with transformation
  ([520f720](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/520f720933c4783169311aef76a2f8ccbfdb294d)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-12-10. Added a new `makeOptionalString` function to provide schema validation for optional strings. The function trims input, transforms empty strings into `undefined`, and allows flexibility in validation using labels.

### Chores
- changelog
  - update for 0.5.11 release
  ([bf1f839](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/bf1f8390ddd248a278f6dd18dc80652ab4fede86)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-12-05. Updated `CHANGELOG.md` to include detailed entries for version 0.5.11. Documented chore updates related to dependency adjustments, the release process, and version metadata. This ensures release notes remain consistent and track all relevant updates.

- deps
  - update pnpm-lock.yaml dependencies
  ([fdf2f52](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/fdf2f526ce0d9276e98ddc57f59c12c3d689ec60)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-12-05. Updated `pnpm-lock.yaml` to reflect the latest package adjustments and dependency updates. Primary changes include updating React to version `19.2.1` across various packages and upgrading Radix UI, react-hook-form, and TypeScript-related dependencies for compatibility and performance improvements. Removed outdated entries and resolved integrity hashes to maintain package stability and consistency.
  - update pnpm-lock.yaml with package adjustments
  ([ed89690](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/ed89690e7dbf794aef016b723da986161458ddd6)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-12-04. Updated `pnpm-lock.yaml` to reflect changes in React's version dependency, transitioning from `19.1.1` to `19.0.1`. Various library versions were updated to maintain compatibility, ensure stability, and resolve potential conflicts. Updated `sharp` dependencies across multiple platforms to `0.34.5` for improved performance. Removed unused entries including `color` and outdated dependencies

- release
  - 0.5.12
  ([c84b746](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/c84b746e21de4ab4ecdcca7f9b65a46b97c50639)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-12-10.


## v0.5.11 - 2025-12-04

### Chores
- changelog
  - update for 0.5.10 release
  ([d065467](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/d065467fc6196cdecc18d2cc97c5fbe4ea603a6f)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-27. Added detailed entries for version 0.5.10, including features, refactoring, and chore updates. Documented new scripts for production deployment and cleanup, type additions for improved validation, schema updates, and various refactor tasks improving maintainability and clarity.

- deps
  - update pnpm-lock.yaml with package adjustments
  ([280d04d](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/280d04db36bd29db878b8f7ae0098be57cdbe7a6)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-12-04. Updated `pnpm-lock.yaml` to reflect changes in React's version dependency, transitioning from `19.1.1` to `19.0.1`. Various library versions were updated to maintain compatibility, ensure stability, and resolve potential conflicts. Updated `sharp` dependencies across multiple platforms to `0.34.5` for improved performance. Removed unused entries including `color` and outdated dependencies to 19.1.2 in `pnpm-lock.yaml`. Adjusted other dependencies to ensure compatibility with the new React version, including updating associated libraries such as `@radix-ui`, `react-hook-form`, and others. These updates enhance stability and resolve potential dependency conflicts.

- release
  - 0.5.11
  ([f7170e9](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/f7170e998effd88a7c25bae082868cfc35820db6)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-12-04.


## v0.5.10 - 2025-10-27

### Features
- scripts
  - add utilities for production deploy and cleanup
  ([bce313e](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/bce313e91458b3ba6e0bca346dc61f186a903044)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-27. Added new scripts to enhance workflow efficiency and maintainability. The new `deploy:prod` script simplifies production deployment with Vercel, and `find:unused:components` helps identify unused components in the codebase.

- types
  - add `Search` type based on `searchSchema`
  ([80301a3](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/80301a34bc9d33cc2b69414bf75cdff28fb62846)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-21. Added a new `Search` type inferred from the previously introduced `searchSchema` for consistent type validation in search-related logic. This ensures alignment between schema definitions and type usage.

- utils
  - add search schema for input validation
  ([431b1f3](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/431b1f30a7e68f9cff3ff75718d1da0b73450290)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-21. Added a new `searchSchema` in `src/lib/zod/utils.ts` to handle validation for search inputs. This schema ensures trimmed strings and mandates a minimum of 1 character for non-empty searches. Optional empty strings are also handled gracefully.

### Refactoring
- constants
  - clean up unused import
  ([3f764b8](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/3f764b814589cd7f5cbb056c792e547ba3213532)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-21. Removed the `SearchParams` import in `resolveNormalizedSearchParams.ts` as it was not in use. This improves code readability and eliminates unnecessary imports.
  - remove unnecessary blank line
  ([8473363](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/8473363f57f08b72a523d85852d32ebe6845f436)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-21. Removed an unused blank line in `src/lib/constants/common.ts` to ensure code consistency and adherence to formatting standards.
  - remove unused profile dropdown options
  ([7afaae8](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/7afaae8e20484985c12c0452c9918597d8c9fc80)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-21. Removed the `themes` and `languages` constants from `src/lib/constants/profileDropdownOptions.ts` as they are no longer used in the codebase. This cleanup reduces unnecessary code and improves maintainability.
  - remove unused searching constants
  ([4214ed6](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/4214ed6747b93bf773fa9331b8a47958fe421a31)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-21. The `SEARCHING` constant, defined in `src/lib/constants/searching.ts`, has been removed as it is no longer utilized in the codebase. This cleanup reduces redundant code and improves maintainability.
  - remove unused source content types
  ([0b2c2dc](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/0b2c2dcf428196c5a29f53fc3077f6231b80d0a2)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-21. The `SOURCE_CONTENT_TYPES` constant, defined in `src/lib/constants/sourceContentTypes.ts`, has been removed as it is no longer utilized in the codebase. This cleanup eliminates redundant code and improves maintainability.
  - remove unused toast messages
  ([a223761](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a2237612c4ec5c636dd57d7651590781e214cacd)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-21. The `TOAST_MESSAGES` constant, located in `src/lib/constants/toast.ts`, has been fully removed as it is no longer in use. This cleanup reduces redundant code and improves maintainability of the codebase.

- schemas
  - remove unused `searchSchema`
  ([c50871c](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/c50871cdc61d46123f55665a6128903e69efa6e7)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-21. The `searchSchema` and its associated type `SearchFormData` were removed as they are no longer utilized in the codebase. This cleanup eliminates redundant code and improves maintainability.

- search
  - optimize input handling logic
  ([64e3997](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/64e3997a548ec4dfc352e4cc44cdbb767d98098e)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-21. The search input handling logic was refactored for better maintainability and performance. Key changes included renaming variables for clarity, extracting repeated logic to reusable functions, and simplifying state updates. Additionally, the debounce delay for inputs was updated from 400ms to 200ms for a more responsive search experience.

- utils
  - remove unused utility functions
  ([ef52ca9](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/ef52ca968df4408136554724f39883ca2ef68f73)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-21. Removed the `getBaseUrl` and `errorToast` functions from `src/lib/utils.ts` as they are no longer in use. This cleanup reduces redundant code, ensuring better maintainability and clarity.

### Chores
- release
  - 0.5.10
  ([50834e4](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/50834e475dd01ad5756e5f70a3027d2f4b64c474)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-27.
  - update changelog for 0.5.9
  ([d4d7595](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/d4d75953ee37b0a22d784fbf48534b119e3b087c)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-20. Updated `CHANGELOG.md` with detailed log entries for version 0.5.9. Documented changes include new features, bug fixes, schema updates, and API modifications. Added context for breaking changes, enhancements, and update patterns across multiple modules and components.


## v0.5.9 - 2025-10-20
### ⚠️ BREAKING CHANGE
- Removed `createAlert` and `updateAlert` services

### Features
- alert
  - enhance schema definitions and type annotations
  ([c5bc45f](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/c5bc45f79f92e344d77f41f6341ccb28764ac335)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-17. Improved schema validation and added detailed JSDoc comments for alert-related entities. Enhanced type annotations using Zod's inference capabilities and refactored reusable schema logic for better maintainability. These changes improve code documentation, clarity, and enforce stricter validation rules.

- alerts
  - add editable textarea for regulatory metadata
  ([f2384fb](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/f2384fba05dbaa13a098f7a9c0137ef5ca000aa0)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-20. Introduced `AlertEditableFieldTextareaRegulatoryMetadata` component to manage editable
regulatory metadata fields for alerts. This allows users to modify regulatory details via
a textarea with validation and mutation integration.
  - display regulatory metadata in alert details
  ([121fed6](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/121fed6cf32676ce6849445dd3fc866de6d3effa)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-20. Added support for displaying and editing regulatory metadata fields in Alert Details. Regulatory metadata is now mapped dynamically, with empty or null values filtered out. Integrated the `AlertEditableFieldTextareaRegulatoryMetadata` component for editing metadata and utilized the `formatFieldLabel` helper to format metadata field labels.

- badge-risk
  - support numeric risk values
  ([23acca1](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/23acca119048ce3134dffd03c6b9b0d8665403fb)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-20. Extended `RiskBadgeProps` to accept risk values as either strings or numbers. Updated the value normalization logic to convert the `risk` prop to a string before applying transformations. This enhances flexibility for scenarios where numeric risk levels are used.

- deps
  - update pnpm-lock dependencies
  ([8f6a898](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/8f6a898b0a3c08282dea99548f1e1a9ce1c9a7f3)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-18. Updated `pnpm-lock.yaml` to include new dependencies and versions for development efficiency and improved testing capabilities. Added support for `vitest` and updated additional dependencies, ensuring compatibility and enhancing project toolchain.

- docs
  - add `ALERT_ID` to HTTP client config example
  ([89360e5](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/89360e5be4861c74958dd65194d79228e9c653a8)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-20. Added the `ALERT_ID` field to the development environment HTTP client configuration example. This provides clarity on required configuration fields for alert-related API integration.
  - add `OBLIGATION_ID` to HTTP client config example
  ([b54312c](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/b54312cb68a90b62ce0d2240e06853364d52dca1)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-20. Added the `OBLIGATION_ID` field to the development environment HTTP client configuration example. This enhances the clarity of required configuration fields for developers working with obligations API.
  - add `SOURCE_ID` to HTTP client config example
  ([de12700](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/de12700155c40c018133ffe7d5669d5f45909628)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-20. Added the `SOURCE_ID` field to the development environment HTTP client configuration example. This update ensures that developers have clear guidelines on all required fields for APIs reliant on source identification.
  - add alerts API HTTP request examples
  ([167ea7c](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/167ea7c670bfa0d57b218c470a73f6958645e9f6)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-20. Added HTTP request examples for managing alerts via the Alerts API. Examples include GET (list, by ID), PATCH (update), DELETE (single, bulk), and available assets retrieval. This provides developers with clear guidance on how to interact with the Alerts API for regulatory alerts.
  - add dashboard widgets API request example
  ([5e4c85b](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/5e4c85b7e882cd88c578a03c505c53075023cd8f)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-20. Added documentation for a GET request example to fetch dashboard widgets. This example includes headers for `Accept` and `Authorization`, aiding developers in structuring API calls for dashboard widgets.
  - add regulatory obligations API examples
  ([37657c8](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/37657c8a2f8aff4eea1d14f24944e557d36393bc)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-20. Added HTTP request examples for the regulatory obligations API to enhance developer experience. The examples include POST (create), GET (list, by ID), PATCH (update), and DELETE (single, bulk) requests, along with filtering and pagination capabilities.
  - add sources API HTTP request examples
  ([a7cdf15](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a7cdf151bab2323153e0c8fcbf7100554dbe1353)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-20. Added HTTP request examples for managing regulatory sources via the Sources API. Examples include POST (create), GET (list, by ID, assets, pages), PATCH (update, bulk update monitoring), and DELETE (single, bulk). This provides developers with structured guidance for interacting with the Sources API.
  - add users API HTTP request examples
  ([4f2a4d5](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/4f2a4d57f78c96e19d3fe169490531276210020c)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-20. Added documentation with HTTP request examples for the users API. Included examples for creating a user, fetching user details, and updating authenticated user information. This addition helps developers understand API request structure and usage.
  - split HTTP client example configs and update .gitignore
  ([736b7d0](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/736b7d01b268dc3ce8e1c44aa6da4a97166738e0)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-20. Separated the HTTP client example configurations into distinct files for better organization. Removed the `TOKEN` field from the general example config and moved it to a private example file. Updated `.gitignore` to exclude new private config files from version control.

- editable-field
  - add disabled state to button
  ([de589ef](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/de589ef6ee0bc0b8e628a334feeb9fe38fee4064)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-20. Added support for a `disabled` prop to the editable button within `EditableFieldTextarea`. This prevents editing when the button is disabled, improving the component's flexibility for various use cases.

- filters
  - reintroduce search components for filters
  ([d7910ff](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/d7910ff5f51d41bde01242a0628c003c68226202)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-20. Reinstated `ObligationFilterSearch` and `AlertFilterSearch` in their respective filter components to restore search functionality. These components, previously removed due to backend constraints, are now functional and integrated into the filter layouts.

- obligations
  - add editable textarea for regulatory metadata
  ([fb806e6](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/fb806e611685e8aebbae8a08e7fdc416da094411)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-20. Introduced `ObligationEditableTextareaRegulatoryMetadata` component to enable editing of regulatory metadata for obligations. This component includes validation and mutation integration, following a similar pattern to the alerts module for consistency.
  - display regulatory metadata in obligation details
  ([67f89b3](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/67f89b33b955c744b7617fe2c80e8ae8341e7531)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-20. Mapped and displayed regulatory metadata fields dynamically in Obligation Details component. Filtered out null, undefined, or empty values from the metadata. Integrated the `ObligationEditableTextareaRegulatoryMetadata` component for editing these fields. Utilized the `formatFieldLabel` helper function to format the metadata field labels.

- pagination
  - improve validation for totalPages handling
  ([f2498bd](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/f2498bd5b5a8332dcf7e06d1fda16d1a64e23f45)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-20. Enhanced the validation logic for `totalPages` in the Pagination component to ensure proper handling of invalid or edge case values. This includes returning `null` when `totalPages` is undefined, null, not a number, or less than/equal to 1. Adjusted related calculations to enforce type safety and prevent unexpected errors.
  - refine validation for totalPages
  ([dbb555c](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/dbb555c6037595d29df0f111709658b004a855fc)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-20. Enhanced validation logic in TablePaginationControls to better handle edge cases for `totalPages`. The component now checks for null, undefined, or invalid values, ensuring it returns null in such scenarios.

- queries
  - add mutation to patch alert metadata
  ([dbcf640](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/dbcf6408d2946371e52e0e7b513ecf85c9095772)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-20. Introduced `usePatchAlertRegulatoryMetaData` to enable updating regulatory metadata for alerts. The function includes error handling, success and error notifications, and query invalidations to maintain cache consistency.
  - add mutation to patch obligation metadata
  ([f3c5ff9](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/f3c5ff99c451e4750072b55bf90a93623d32808d)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-20. Implemented `usePatchObligationRegulatoryMetaData` to support updating regulatory metadata for obligations. The function incorporates error handling, success/error notifications, and invalidates relevant queries to maintain cache consistency. This follows a similar pattern to the patch functionality for alert metadata.

- scripts
  - add `test` script and `vitest` dependency
  ([8543551](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/8543551932bd6d8094ee633dbf2c81998e8ddf32)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-18. Introduced a new `test` script for running tests using `vitest`. Added `vitest` as a development dependency to support the testing framework. This addition enables streamlined and consistent test execution across the project.

- types
  - add and integrate organization schemas
  ([268368f](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/268368fc3e6053c41b56762ec62192b0a017c58e)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-20. Added schemas and types for organizations to standardize validation and type safety across the application. Removed the unused `updateUserSchema` and refactored related user schemas for clarity and extensibility. Linked users to organizations via the new `organizationSchema`.
  - refactor schemas to improve consistency
  ([d50b555](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/d50b555911a0805531a16fd5708fa4da0dec5b1e)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-20. Updated schema definitions and integrations to align with API expectations, improving type validation and consistency. Replaced `jurisdictionsSchema` with `itemJurisdictionsSchema` in `sourceAssetSchema`. Adjusted mutation functions for bulk operations to use updated types. Refined `createSourceSchema` by replacing `makeUrlSchema` with `makeRequiredString`.

- ui
  - add organization switcher component
  ([7ecd5fc](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/7ecd5fc872411034a57a2fc52a151c41d821abd7)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-20. Implemented the `OrganizationSwitcher` component to improve organization selection in the sidebar. The component provides a dropdown menu for viewing and switching between organizations tied to a user. Added UI elements for mobile and desktop views and placeholder handlers for functionality.
  - integrate organization switcher in AppSidebar
  ([9031cd8](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/9031cd874856be12056b87caef7f250c3463935b)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-20. Added the `OrganizationSwitcher` component to the `AppSidebar` for improved organization
management. This integration allows users to switch between organizations within the sidebar,
enhancing the UI's functionality and clarity. Separators were added for better visual separation.

- utils
  - add helper to format field labels
  ([280ed6c](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/280ed6c45c2ad42d8024ebe38950099accc89009)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-20. Introduced a `formatFieldLabel` utility function to standardize and format field labels by converting
underscored strings to a user-friendly format. This includes capitalizing the first word and converting
subsequent words to lowercase.

### Bug Fixes
- alert-details
  - ensure IDs are cast to strings
  ([d4c8673](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/d4c86735249d5e8ff7d858aec89b6b7306f6e513)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-20. Updated `AlertEditableFieldSelect` to cast `status` and `assigned_to` IDs to strings. This prevents potential type mismatches when passing these values to child components.
  - ensure safe mapping for options arrays
  ([8b3e8ee](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/8b3e8ee7c985faa7e05406c5de55d86411ee922c)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-20. Updated the `statusOptions` and `usersOptions` mappings to cast IDs to strings and added fallback empty arrays when sources are undefined. This prevents potential crashes due to null or undefined statuses and users.
  - handle missing risk level gracefully
  ([db72ed9](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/db72ed98a9bf22c428f5527edac0d8a9b0a15462)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-20. Addressed an issue where the Alert Details component attempted to render the "Risk" field even when the `risk_level` was null or undefined. Wrapped the relevant field in a conditional check to ensure it only renders when `risk_level` exists.

- alert-filter
  - cast ID values to strings
  ([d5a218b](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/d5a218b0f39360f405476d1cf5836f1f53b43647)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-20. Updated the mapping logic for filter dropdown options to cast all ID values to strings. This ensures consistent data types are passed to the dropdown components, preventing potential type mismatches and runtime issues.

- obligation-details
  - cast IDs to strings and ensure safe array defaults
  ([4adcfbf](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/4adcfbf25f5faf4e145f6be53a1d539f1b3b784c)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-20. Updated mapping logic for dropdown options in Obligation Details to cast all ID values to strings. Added fallback empty arrays where necessary to prevent potential crashes due to null or undefined data sources.

- obligation-filter
  - cast ID values to strings
  ([3083f3c](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/3083f3c92a99917ae63244459cf6fb8654fe46a7)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-20. Updated dropdown option mappings to ensure all ID values are cast to strings. This improves type consistency and prevents potential runtime issues when handling dropdown data.

- obligation-form
  - cast IDs to strings and add safe defaults
  ([831074b](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/831074bba512833b7e2a2fa10bdbb927dd715041)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-20. Updated dropdown option mappings in ObligationFormCreate to cast all ID values to strings. Added fallback empty arrays to handle undefined or null data sources, improving type safety and preventing potential runtime errors.
  - cast IDs to strings and ensure safe mappings
  ([3496fdc](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/3496fdc63f39b8fdc27b3b3c852ebe617552bf7e)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-20. Updated the `ObligationFormCreateWithAlert` component to cast all ID-related fields to strings and added a fallback for `usersOptions` to handle undefined or empty user lists. This improves type consistency and prevents runtime issues caused by null or undefined values.
  - cast IDs to strings and remove unused field
  ([e4486cd](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/e4486cdf13d318e9006bc2bb4ae3c72f2e225e0d)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-20. Updated `ObligationFormUpdate` to cast all ID-related fields to strings, ensuring type consistency. Removed unused "Obligation type" field and added fallback empty arrays for dropdown options to prevent runtime errors caused by undefined or null data.

- profile-form
  - cast email to string in defaultValue
  ([7fcef30](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/7fcef30a67fa1a7ef1bf7099e5d72d08f911abd4)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-20. Updated the `defaultValue` assignment for the email field in `ProfileFormUpdate` to ensure it is cast to a string. This prevents potential runtime issues stemming from `undefined` or non-string values in the `me.email` property.

- source-filter
  - cast ID values to strings
  ([b2b2090](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/b2b2090e9bacfe724ad631aeb785c0b10c853313)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-20. Updated the mapping logic for dropdown options in `SourceFilterDropdown` to cast all ID values to strings. This ensures consistent data types and prevents runtime issues caused by type mismatches when handling dropdown data.

- source-forms
  - cast IDs to strings and add safe defaults
  ([938a38a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/938a38a21abca7a374a73e0551c275710fa76d31)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-20. Updated `SourceFormUpdate` and `SourceFormCreate` components to cast all ID-related fields to strings. Added fallback empty arrays for dropdown options to ensure safe and consistent mappings, preventing runtime issues caused by undefined or null data.

- ui
  - adjust sidebar header spacing for improved styling
  ([4cac5e7](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/4cac5e7dba4c5d4b4676ad7785c70284f276a0cf)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-20. Updated the `SidebarHeader` component to include a `-mb-[1px]` margin adjustment. This aligns the design, ensuring the component renders seamlessly without unintended spacing or visual glitches.

### Refactoring
- alert
  - update patchAlertSchema to enhance flexibility
  ([43740ea](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/43740ea40108e8e7c1733445d387875daa196ab4)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-18. Updated `patchAlertSchema` to make all properties optional by utilizing `.optional()` on individual fields. This change improves schema flexibility, better aligns with the intended usage, and removes reliance on the `.partial()` method, streamlining validation logic.
  - update schema and service for bulk delete operations
  ([179fba6](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/179fba621974f88b948887c636940c420d5854e1)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-18. Enhanced the bulk delete operation by introducing a dedicated schema and DTO for validation and type safety. Replaced `idValidationSchema` with the new `bulkDeleteAlertSchema` to ensure input consistency and enforce minimum requirements for bulk deletions. Updated services and repository to align with the revised schema logic.
  - remove unused alert schemas and services
  ([afc4fb2](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/afc4fb25af38b72be5a9311bb4b984d4db8fa1a7)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-17. Removed the unused `createAlertSchema`, `updateAlertSchema`, and related service methods, including `useCreateAlert`, `useUpdateAlert`, and their associated logic. Streamlined the alert module by focusing on essential schemas and services to improve maintainability and clarity.

- alert-assets
  - update itemSchema import path
  ([d21a80b](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/d21a80bff9c026ea2e126c1b7874a0f2dba1c842)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-17. Reorganized the import of `itemSchema` to align with the revised directory structure. Updated the import path from `@/server/api/_shared/schemas` to `@/lib/zod` for consistency with recent refactorings and modular organization improvements.

- alerts
  - replace `BaseFilters` with `SearchParamsQuery`
  ([78b0253](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/78b0253f0097922c7c21ecc7c41e3644dcdfd430)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-18. Replaced `BaseFilters` type with `SearchParamsQuery` in `SourceFilterSearchProps` to align with updated search parameter structures. This ensures improved type consistency and compatibility with the rest of the application.
  - update id type in editable field props
  ([601ff34](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/601ff3449ec7a7b03a35ff36d078c357af8825ae)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-18. Replaced `Id` type with `Alert['id']` in `AlertEditableFieldSelectProps` to improve type safety and align with the updated Alert entity structure. This ensures better consistency with recent type updates across the codebase.

- api
  - update post router import path
  ([6bd6de1](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/6bd6de13558af5be3160e9b641939d4f4e12de90)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-18. Aligned the `postRouter` import path with the new project directory structure for improved organization. This change reflects recent entity-based reorganization within the `api` directory.

- changelog
  - update references to `factoryCrudService`
  ([1dc3d48](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/1dc3d48e04399ced313ae69dbcc08a8c3e9dc722)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-20. Updated references in the changelog to reflect the renaming of `createCrudService` to `factoryCrudService`. This ensures consistency and aligns with recent refactoring across service files.

- constants
  - update and reorder search parameters
  ([acd2c95](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/acd2c950ea2179f706dda35b6690afd878a55ba6)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-18. Reorganized and added new entries to search parameter constants. Improved readability by grouping alphabetically for consistency and maintenance ease. Enabled the handling of additional query types like `alertId`, `obligationId`, and more.

- crud-service
  - rename `createCrudService` to `factoryCrudService`
  ([af269df](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/af269dfb43175457c132b942ab8ba1afc0684d60)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-20. Renamed the `createCrudService` function to `factoryCrudService` in `crudService.ts`. This change reflects the function's purpose more accurately and aligns with naming conventions used across the codebase.
  - update schema imports and query types
  ([ea45dbb](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/ea45dbba861cd70b8b129b14378566edd761a062)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-18. Replaced `id` schema imports with `idValidationSchema` from `@/lib/zod`, promoting consistency with the updated structure. Updated the type of query parameters from `PaginationRequest` to `SearchParamsQuery` for enhanced type alignment and clarity in pagination handling.

- mocks
  - update id parameter types in mock functions
  ([1d86698](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/1d866986a748f6d37762accca3127acf8505c094)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-18. Replaced generic `Id` type with specific `id` property types within `makeMockObligation` and `makeMockPost` functions. This change enhances type safety and aligns with the recent removal of unused shared types (`Id`).

- obligation
  - update bulk delete schema and DTO
  ([8c7a9f5](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/8c7a9f5fc052e2d7b81cba53e99166cfff20f256)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-18. Replaced `idValidationSchema` with `bulkDeleteObligationSchema` to validate bulk deletions more effectively. Introduced `ObligationBulkDeleteDto` for structured and type-safe data handling. Refactored related services, repository, and query methods to align with the new validation schema and improve consistency.
  - remove unused schemas and services
  ([a389795](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a38979572f9b35b8c9bb7597bd4bf1cbaa0abbe7)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-17. Eliminated `updateObligationSchema` along with its related service methods and hooks such as `useUpdateObligation`. Simplified the obligation module by focusing on essential functionalities and improved maintainability through consistent type updates.

- obligation-assets
  - update itemSchema import path
  ([9eae077](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/9eae0774497300083c9bd85b5b72fa84594bb1b4)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-17. Updated the `itemSchema` import path to reflect its new location under `@/lib/zod`. This aligns with recent directory structure changes and improves module consistency.

- obligations
  - align filter props with search params
  ([aa74425](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/aa74425cbbd166768a8dd3f11ae75735df3de2aa)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-18. Replaced `BaseFilters` type with `SearchParamsQuery` in `ObligationFilterProps`. This update ensures better type alignment and consistency with the application's search parameter structure, improving maintainability and compatibility with related components.
  - replace `BaseFilters` with `SearchParamsQuery`
  ([7f9bac1](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/7f9bac1016f834f45fdacdf63490e94ef3b3b201)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-18. Substituted the `BaseFilters` type with `SearchParamsQuery` in `ObligationFilterProps`. This update aligns filter properties with the revised search parameter standards, ensuring better type consistency and compatibility across the codebase.
  - update filter props to use search params
  ([d1b5f39](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/d1b5f394da027d6cd2ee51b0f3569e019549dacf)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-18. Replaced `BaseFilters` type with `SearchParamsQuery` in `ObligationFilterProps`. This change aligns filter properties with the updated search parameters, ensuring consistency and better type compatibility across the application.
  - update id type in editable field props
  ([5dc5a5a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/5dc5a5a4dd3fa7774649f8d3b2fc54d19945deb9)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-18. Replaced `Id` type with `Obligation['id']` in `ObligationEditableFieldDatepickerProps` to improve type safety and maintain consistency with the updated structure of the obligation entity. This change ensures better alignment with recent type updates across the codebase.
  - update id type in editable field props
  ([a21652b](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a21652bda2bbdbb3f0c64441e094fe562a4712b3)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-18. Replaced `Id` type with `Obligation['id']` in `ObligationEditableFieldSelectProps` to improve type safety and align with the updated obligation entity structure. This change ensures consistency with recent type updates throughout the codebase.

- pagination
  - update `paginationSchema` import path
  ([72a2e8c](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/72a2e8c128864886c0f7f407301ebbc04960c2ed)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-18. Aligned `paginationSchema` import path from `@/server/api/_shared/schemas` to `@/lib/zod`, ensuring consistency with the updated location of schema utilities. This change improves maintainability and adheres to the revised project structure.

- post
  - update idSchema import path
  ([a8788e1](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a8788e1c9ae3b7e27abcb4b476399c9b29b0ddf2)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-18. Reorganized the `idSchema` import to reference `@/lib/zod`, aligning with recent directory structure changes. Improved maintainability by streamlining schema references and ensuring consistency across the codebase.
  - update idSchema import path
  ([6372cce](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/6372cce4d791a9571705d74ae0435174d37dc78b)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-18. Reorganized the `idSchema` import to reference `@/lib/zod`, aligning with recent directory structure changes. Improved maintainability by streamlining schema references and ensuring consistency across the codebase.
  - rename variable and update references
  ([a7af347](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a7af347645152234481bd861244907ab465f2a62)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-17. Renamed the `post` variable to `routers` for consistency with the file structure and naming conventions. Updated all variable references to reflect the new name and maintain functionality without changes to the logic.

- post-services
  - remove unused id schema
  ([049d168](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/049d168801ffbc6b3c629600f5fb76e011f7f269)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-20. Removed the `idValidationSchema` property from `post-services` as it was no longer being used. This simplifies the validation schema configuration and eliminates unnecessary code.

- repository
  - update pagination and id types
  ([1dd98f5](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/1dd98f57ca2d5496ff8abbc49bdbda77c720802e)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-18. Replaced `PaginationRequest` with `SearchParamsQuery` in `getAllWithPagination` for better type alignment. Updated `Id` type import to use the revised `@/lib/zod` structure, ensuring consistency across the codebase with recent changes.
  - update types in baseRepository
  ([07a909d](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/07a909df116b0e3f900162c7103ac3b593788def)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-18. Replaced `PaginationRequest` with `SearchParamsQuery` in `getAllWithPagination` method to improve type alignment. Updated `Id` type import to reference `@/lib/zod`, ensuring consistency with the revised structure.

- search-params
  - update `normalizeSearchParams` types
  ([1258d81](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/1258d81fbbb994a773dbfdddda0f2dcadf0c763a)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-18. Updated the type definition of the `params` argument in `normalizeSearchParams` from `SearchParamsProps` to `SearchParamsQuery`. This change aligns with recent type adjustments across the codebase and enhances clarity and type safety.

- services
  - replace `createCrudService` with `factoryCrudService`
  ([5280ed9](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/5280ed94860089cc7f11afcc7c67e6f222ab42a8)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-20. Updated all service files to replace the use of `createCrudService` with `factoryCrudService`. This change aligns with the recently renamed function to reflect its purpose more accurately and maintain consistency across the codebase.

- shared-schemas
  - remove unused schema definitions
  ([c97e995](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/c97e995e61f23fd9ed3082697713f1761275cf49)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-18. Deleted obsolete schema utilities and definitions to streamline the codebase and improve maintainability. These schemas were no longer in use and have been replaced by reusable utilities in other parts of the application.

- shared-types
  - remove unused type definitions
  ([0134a12](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/0134a12fec8fa641877d9e8f8138983a07c0204d)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-18. Removed unused type definitions such as `Id`, `SearchParamsProps`, `PaginationRequest`, and `BaseFilters` from the shared types file. This change is part of streamlining the codebase by eliminating redundant or deprecated types to improve maintainability and clarity.

- source
  - replace custom schema with reusable utilities
  ([2173a53](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/2173a5345a0fe67703a7f48716a7367459d2a589)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-18. Replaced `requiredBooleanSchema` and `requiredStringSchema` with reusable functions like `makeRequiredBoolean` and `makeRequiredString` for improved maintainability and consistency. Updated schema definitions to align with recent enhancements in validation logic.
  - update schemas, queries, and services
  ([2426e87](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/2426e874a97d89e36f16420fc2e8c63696e9e2d9)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-18. Enhanced type safety and validation by replacing custom schema logic with reusable methods such as `makeNullableString` and `makeRequiredBoolean`. Deprecated and removed `updateSourceSchema` and its associated services in favor of the existing patch logic. Streamlined queries and services to focus on essential operations while introducing bulk operations for better efficiency.

- source-assets
  - update itemSchema import path
  ([233a851](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/233a851d3ef12fff54b536c7eec1b75374dc8baf)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-18. Replaced the `itemSchema` import path with the updated location under `@/lib/zod`. This change aligns with recent directory structure updates, promoting consistency across the codebase.

- source-filter
  - update prop types to align with search params
  ([17bbc4e](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/17bbc4e43795dc9dbe58a3a853b1ceecac3018d2)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-18. Replaced `BaseFilters` with `SearchParamsQuery` in `SourceFilterSearchProps` to improve type alignment and consistency. This change ensures better compatibility with the updated search parameter types across the codebase.

- source-pages
  - update schemas and replace deprecated imports
  ([5c77707](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/5c777076be2357e2b056e20eb64c70d85b7c42ef)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-18. Migrated schema definitions to use reusable utility functions such as `makeRequiredBoolean` and `makeRequiredString` for consistency and maintainability. Updated references from `@/server/api/_shared/schemas` to `@/lib/zod`, aligning with the refactoring of shared schema utilities. Removed unused `sourcePageIdValidationSchema` and adjusted services accordingly for simplified logic.

- stores
  - update `createSelectableStore` type constraints
  ([0750d9a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/0750d9acf3889b0e68078c54328e0396b3e1ec5a)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-20. Updated the type constraints for the generic `createSelectableStore` function to use `{ id: Id }` instead of `WithId`. This simplifies type dependencies and aligns the store with the updated `Id` type from `zod`.

- table-head-checkbox
  - update `Id` type import path
  ([0c97720](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/0c9772017917ca1a9dc94768787541dbb7abdc90)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-18. Aligned the `Id` type import path with its consolidated definition in `src/lib/zod`. This ensures consistency with the updated schema utilities and aligns the component’s type usage across the codebase.

- table-row-checkbox
  - update `Id` type import path
  ([a7851ab](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a7851ab7a2d4ef5094318bc4e1dabf784cefbf9d)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-18. Aligned the `Id` type import path with the updated location in `src/lib/zod`, improving consistency across the codebase. This aligns the component's type usage with the consolidated schema utilities.

- types
  - update `Id` and `WithId` type usage
  ([e0878e4](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/e0878e4706313c89cfe78ef1af6e1ef878bea143)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-18. Aligned the `Id` type import path with the updated definition in `@/lib/zod`. Replaced the `WithId` type with an inline type definition, improving maintainability and consistency with the codebase's type structure.

- user
  - update schemas and queries for consistency
  ([a9a2c85](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a9a2c85d71292ac2fdcf0e8651bea54659553d85)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-18. Refactored user schemas to utilize reusable utilities such as `makeEmailSchema`, `makeRequiredString`, and `makeRequiredBoolean` for improved maintainability and standardization. Replaced deprecated schema imports with those from `@/lib/zod`. Simplified queries and removed redundant methods, aligning them with updated schema logic.

- zod
  - update `paginationSchema` to support nullable fields
  ([113a109](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/113a1092902a1695b3ccab0c0e0d7daeb9b9c247)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-20. Updated the `paginationSchema` in `src/lib/zod/utils.ts` to support nullable and optional values for `totalItems` and `totalPages`, and nullable values for `page` and `pageSize`. This change improves flexibility when handling incomplete pagination data, ensuring schema compatibility with a wider range of input scenarios.
  - add reusable schema utilities and entities
  ([0ee07a4](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/0ee07a4cc6bbc870eee4a42032eacbbf4cb3287a)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-18. Introduced reusable schema definitions and utility functions to standardize validation logic across the application. This includes base schemas (e.g., `idSchema`, `uuidSchema`), field-specific schemas (e.g., `makeEmailSchema`, `makePasswordSchema`), and pagination utilities. Additionally, added initial schemas for entities like `itemSchema` and `itemSourceSchema`.

### Tests
- zod
  - add unit tests for schema utilities
  ([8eac423](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/8eac423a6de784022cb30e5c1fa0634815b1df5d)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-18. Added comprehensive unit tests for schema utilities in `src/lib/zod`. The tests cover multiple schemas, including `idStringSchema`, `idNumberSchema`, `uuIdSchema`, `idSchema`, `makeRequiredString`, and more. This ensures proper validation, error handling, and compatibility across various scenarios.

### Chores
- changelog
  - update changelog for v0.5.8 release
  ([8193aac](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/8193aac239577fe1102e4576f6f0fa033eb33592)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-16. Added detailed entries for version 0.5.8, summarizing new features, refactoring efforts,
and component renaming to improve consistency and clarity. This update aligns with the
project's structured component design and better organizes the changelog for future reference.

- docs
  - add example HTTP client config and update .gitignore
  ([7fa83d2](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/7fa83d2ae1bd5b004eeaef6915e4b302c22d0162)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-20. Added a new example configuration file for the HTTP client to serve as a template for environment-specific settings. Updated `.gitignore` to exclude the corresponding production configuration file from version control.

- release
  - 0.5.9
  ([f394555](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/f394555349b14213c480f943de2fefb7fe2baaf4)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-20.


## v0.5.8 - 2025-10-16

### Features
- apps
  - add AppSidebarMenuItem component
  ([4efcfbb](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/4efcfbbfd2a78c7c4c5ba4aff6686a4cb0d6973c)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-16. Introduced the `AppSidebarMenuItem` component to manage and display individual sidebar menu items. This includes handling collapse/expand states, tooltip integration, and enterprise feature modals for certain disabled items. The addition enhances sidebar functionality and aligns with the updated structured component design.
  - add AppSidebarUserNavigation component
  ([b8dac42](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/b8dac42eb93a00d3765f0c730bd70b95f11bd69d)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-16. Added the `AppSidebarUserNavigation` component to manage and display user-specific navigation
options in the sidebar. This includes leveraging dropdown menus for better organization and
navigation. The component improves user experience and aligns with the new structured sidebar
design.
  - add AppSignOut component
  ([ad40b85](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/ad40b85f1842c3cc5551f7be9da5bf41ac756506)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-16. Introduced the `AppSignOut` component to handle user sign-out actions with a confirmation dialog. This aligns with the structured naming convention and improves usability by providing a clear sign-out process.

- constants
  - add PROFILE_PAGE constant
  ([8f0f357](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/8f0f3578a12315a0dac047cfa3da7aa8dcbfde7d)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-16. Added `PROFILE_PAGE` to the common constants for easier route management and consistency across the application. This new constant serves as a reference for the profile page URL.
  - add user navigation items
  ([29aabd5](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/29aabd5cfe698bd66202bb29f6d7dda1acab2cd5)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-16. Added `userNavigationItems` to include specific options for user-related actions such as profile navigation and member invitations. This update helps segment navigation items for better structure and functionality.

### Refactoring
- apps
  - rename Logo component to AppLogo
  ([3b56d54](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/3b56d545f7a82ceffe08b8493d7c8114ff71881b)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-16. Renamed the `Logo` component to `AppLogo` to adhere to structured naming conventions. This change ensures better clarity and consistency across the codebase.
  - rename Logo component to AppLogo
  ([cd34f93](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/cd34f935c32d49465425e4c1a2d874ef4b4900fc)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-16. Updated the `AppSidebarHeader` component to use the renamed `AppLogo` component, ensuring alignment with the project's structured naming conventions. This change improves clarity and consistency across the codebase.
  - rename SignInProviders component
  ([bee0540](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/bee05402a1fa71315933588fb27b52e6077c2053)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-16. Renamed the `SignInProviders` component to `AppSingInProvider` to improve naming consistency and better reflect its purpose. Updated associated type imports to align with the new structure.
  - rename SignOutButton component
  ([33b79f2](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/33b79f23ebed312253f9bfb2cf361f28d704cfbf)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-16. Renamed the `SignOutButton` component to `AppSignOutButton` to improve naming consistency and better align with the project's structured naming conventions.
  - rename UserNavigationInfo component
  ([7131e79](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/7131e79a0e1c7b0bd09925d6aea508daf194860c)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-16. Renamed `UserNavigationInfo` component to `AppSidebarUserNavigationInfo` to align with updated naming conventions for better clarity and consistency across the application. Updated associated type imports to match the new structure.
  - simplify AppSidebarContent with AppSidebarMenuItem
  ([9bf5bd1](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/9bf5bd12cd50f6537764669dda6e760f4089f685)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-16. Replaced redundant logic in the `AppSidebarContent` component by utilizing the new `AppSidebarMenuItem` component. This change removes repetitive code handling menu item states and enterprise feature modals, streamlining the implementation and aligning with the updated structured component design.
  - update AppSidebarFooter to use AppSidebarUserNavigation
  ([e44e2ba](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/e44e2baceae7bad7b160f58395f700f0e281e042)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-16. Replaced `UserNavigation` with `AppSidebarUserNavigation` in the `AppSidebarFooter` component. This adheres to the updated naming conventions and aligns with the structured sidebar component design. The `useSidebar` hook was also removed as it is no longer needed with the updated user navigation component.
  - update NotFound component to use templates
  ([5fca3c2](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/5fca3c26458c0c694bba1cdb0b306bd9c190525f)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-16. Replaced the `NotFound` import from `organisms` to `templates` across multiple `NotFoundPage` components. This aligns the codebase with the updated component structure for improved clarity and consistency.
  - update SignIn component to use AppSingInProviderAuth0
  ([898786d](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/898786d79bc4abca3878663e24f3b55b489f511d)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-16. Replaced the `SingInWithAuth0` component with the renamed `AppSingInProviderAuth0` in the main page. This aligns with the updated structured naming conventions for better clarity and consistency.

- auth
  - rename component for clarity
  ([e2370b9](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/e2370b9e33a6f4458212717c31a0030f0ee03a87)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-16. Renamed the `SingInWithAuth0` component to `AppSingInProviderAuth0` to better align with its function and improve naming consistency in the codebase. This change ensures clarity and adheres to standardized naming conventions.

- not-found
  - move component to templates directory
  ([39ee4d9](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/39ee4d9f50611daaead83f4112a14f13f0b154e3)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-16. Moved the `NotFound` component from the `organisms` directory to the `templates` directory to better align with the project's component structure and hierarchy.

- user-navigation
  - remove deprecated component
  ([fe23e1a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/fe23e1ad2b2e868a58f3b0245d9b763f9241d837)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-16. Removed the `UserNavigation` component and its associated `types` file from the project. This component is no longer in use and its functionality has been supplanted by newer implementations better aligned with project standards.

### Chores
- changelog
  - improve body normalization and issue linking
  ([dbff787](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/dbff7877e9743c280c3e5e43b84868b0f12714bc)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-14. Enhanced the changelog configuration to normalize commit body content and ensure issue references are converted to links. This includes stripping unnecessary sections such as "Files impacted" and trailing details, while maintaining clean formatting
  - update changelog for v0.5.7
  ([2f25e14](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/2f25e140bfa0a1b82a049b384c7837505e035248)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-14. Added detailed entries for version 0.5.7. Highlights include new features such as the `DataTableWithActionWrapper` component, improved handling of normalized search and route parameters, and a production deployment script. Refactoring tasks include simplifying table components and removing unused search components. This update ensures a comprehensive overview of the changes.

- release
  - 0.5.8
  ([099d9c8](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/099d9c85c7a8053acd33053615c7c9050b8d41cc)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-16.


## v0.5.7 - 2025-10-14

### Features
- lib
  - add helper to resolve normalized search params
  ([a0405fb](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a0405fb700bd46fe7ba17d6ab70f55f684fc48f5)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-24. Introduced `resolveNormalizedSearchParams` as a utility to handle asynchronously resolved `searchParams` with default values. This reduces duplication across server components that use Next.js search parameters, ensuring consistency and simplifying param resolution.

- routes
  - add types and normalize route params
  ([64aeeb3](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/64aeeb3fa2301a4e2aa6a1530c92526d232eb5f0)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-24. Introduced types for route parameters in private routes, improving type safety and maintainability. Replaced `normalizeSearchParams` with `resolveNormalizedParams` and `resolveNormalizedSearchParams` for better handling of asynchronous route params. Updated functions to utilize query keys for consistency.

- scripts
  - add production deployment script
  ([1d21a18](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/1d21a1899d893e8521b5ea97883123a932ab2f77)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-07. Introduced a new script `deploy:prod` in `package.json` for streamlined production deployments. This script leverages Vercel CLI to pull settings, build the project, and perform a prebuilt deployment to the production environment. It simplifies the deployment workflow and ensures consistency.

- sources
  - add default pageSize to query params
  ([7ae6c29](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/7ae6c29aaedaa4ffc4148d5f84c6dd1b2fee19ae)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-13. Updated the `normalizeSearchParams` logic to include a default `pageSize` of 50.
This ensures consistent pagination behavior and improves data retrieval efficiency.

- templates
  - add DataTableWithActionWrapper component
  ([316ffc6](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/316ffc6ea6197b70c248b30a250f1d0434d43778)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-14. Introduced the `DataTableWithActionWrapper` component to provide a structured wrapping
layer for `DataTableWithActions`. This improves reusability and ensures consistent
presentation across the application.

- ui
  - add cursor pointer to Tooltip triggers
  ([f8f1ff8](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/f8f1ff8cc5ea9aaad5078799cf10bd00728f8429)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-24. Enhanced the `TableCellTitleAndLink` component by adding the `cursor-pointer` class to the `Tooltip` trigger elements for `title` and `url`. This improves the user's experience by clearly indicating clickable elements.
  - add cursor pointer to Tooltip triggers
  ([08e3a16](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/08e3a16d45ddc524df5ad921149dc96d9e701cd3)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-24. Enhanced the `TableCellTitleAndLink` component by adding the `cursor-pointer` class to the `Tooltip` trigger elements for `title` and `url`. This improves the user's experience by clearly indicating clickable elements.
  - improve Tooltip formatting for readability
  ([7c28783](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/7c28783273ec113df1d94c2c3b770ef8cc9f08e5)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-24. Enhanced the `Tooltip` in the `TableCellTitleAndLink` component by formatting its attributes. This change improves readability and maintains consistent styling for the codebase.

### Refactoring
- filters
  - remove unused search components
  ([8c02721](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/8c0272115df885efb2e1d64554669af1b21a984b)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-14. Commented out `ObligationFilterSearch` and `AlertFilterSearch` components as they are no longer supported by the backend endpoint. This change prevents unnecessary rendering and aligns the UI with current backend functionality.

- input-search
  - simplify URL navigation logic
  ([9c8727c](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/9c8727c268e068b5d75d022dfa4962ef2c4904c3)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-14. Refactored the `InputSearch` component to streamline URL navigation by replacing redundant `buildUrl` logic with a dedicated `navigate` function. Improved state naming for clarity and enhanced code readability.

- tables
  - replace `DataTableWithActions` with wrapper
  ([650fe1a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/650fe1a002208629b71c19f388d749aee0825996)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-14. Replaced the `DataTableWithActions` component with the new `DataTableWithActionWrapper` for consistent presentation and improved reusability. This simplifies table implementations across the application.

- ui
  - improve readability in TableCellTitleAndLink
  ([f05ca02](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/f05ca024f445ff2bda9bd6fc4efe7ea8e9c00c78)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-07. Refactored JSX to wrap `title` and `url` elements for better readability and clarity. Each conditionally rendered element is now spread across multiple lines.

### Chores
- changelog
  - update changelog for v0.5.6
  ([ad4c4c6](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/ad4c4c6bd78e4da0242c32dedc9110404472de19)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-13. Added entries for v0.5.6 release, including details on new features, bug fixes, refactoring, and chores. This update provides a comprehensive overview of recent enhancements and changes for better tracking of progress.

- release
  - 0.5.7
  ([3f02243](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/3f02243363457d381f1b89ba5024fbc1754e4b6f)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-14.


## v0.5.6 - 2025-10-13

### Features
- docs
  - update README with deployment and script details
  ([59d1da7](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/59d1da7edcf96428262d8880e0fef4ebbd4b02db)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-13. Enhanced the README with additional deployment instructions and new utility scripts. Added details about the `deploy:prod` and `find:unused:components` scripts, Vercel CLI requirements, and updated folder structure to include the `scripts` directory. These changes aim to provide better guidance for contributors and streamline project setup.

### Bug Fixes
- obligations
  - fix create obligation validation
  ([572011c](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/572011ca4241f1417c40989e828196c7cfbe38b2)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-10-10.
  - fix obligation create form fields styles
  ([434f264](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/434f264e1b642687494a08e6a97acdbb2f3f6168)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-10-10.
  - fix obligation details selects
  ([76af84a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/76af84a2db7cdcdadd023b854ebd5097988354f8)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-10-10.
  - remove edit obligation sheet
  ([7341ae5](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/7341ae5b3139b3b7523537fda0affdd1de95194c)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-10-10.
  - remove obligations tabs and add status filter
  ([a540820](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a54082077d8d225c0788b87146e552535839fed6)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-10-10.

- sources
  - change field for pages monitored table
  ([18641ba](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/18641ba939126709a4217d027331041e9b379cd4)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-10-10.
  - fix create source validation
  ([e1c09e0](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/e1c09e0a11e18d774fa7f159c6a7b8cfcd5d04ca)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-10-10.
  - fix jurisdiction id validation
  ([229fe0c](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/229fe0cc54ba5e984482a2f751088747e2f27ced)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-10-10.
  - fix sources forms
  ([dc7e128](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/dc7e128ebdedca769bc5b7ee69e43f443a5dab83)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-10-10.

- ui
  - change disabled navigation items
  ([b3fea1e](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/b3fea1e11d0e6b05370062ee3443bfa89889bf2b)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-10-10.
  - fix tables on mobile
  ([22a5c3d](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/22a5c3d31d27280fc082499b26a26a373e50d55f)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-10-10.
  - refactor form field checkbox group component
  ([28504e5](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/28504e5c0b0d0a65886596c95375857e04d44011)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-10-10.
  - remove letter from dashboard subtitle
  ([c77c4f4](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/c77c4f4bf1047409dc4de4298e8196de0e1b61f4)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-10-10.

### Refactoring
- alerts
  - extract types and improve param handling
  ([37c48d0](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/37c48d022da99b3f3ae35caf024e543f6c5d5247)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-09. Centralized type definitions for `AlertPage`, `AlertId`, and `AlertPageProps` into a dedicated `types.ts` file to enhance type reuse and maintainability. Updated `AlertPage` logic to integrate the new types, simplifying parameter parsing and ensuring consistent usage throughout.

- obligations
  - extract types and streamline param handling
  ([343abf4](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/343abf4b0223882cf03c4dc9db17dd5f6031b7d1)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-09. Centralized type definitions for `ObligationPage` and related parameters into a dedicated `types.ts` file to improve maintainability and type clarity. Updated `ObligationPage` logic by integrating these types to simplify parameter parsing and ensure consistent usage.

### Chores
- changelog
  - update changelog for v0.5.5
  ([57f85ed](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/57f85edd562601f5d1993815b29965652d0ce8bb)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-09. Updated the CHANGELOG.md file to include details about version v0.5.5. Added notes on new features, bug fixes, refactoring tasks, and chores completed in this release to provide a comprehensive record of recent updates.

- release
  - 0.5.6
  ([cf7ea33](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/cf7ea33ee6c75705047c87abf763549a6f67ef51)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-13.


## v0.5.5 - 2025-10-09

### Features
- ui
  - add custom navigation items with modals
  ([db42d82](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/db42d8249647b4d305a6ca765e513a295fe6b3d0)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-10-08.
  - create universal link as button component
  ([a901025](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a901025dfc18b3ce4b7fe0bc153902cfe8c7a41c)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-10-08.

### Bug Fixes
- ui
  - fix dashboard skeletons
  ([5c5eb0f](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/5c5eb0fcb25b65cca62b98944e0ecfeadee8d44f)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-10-08.
  - fix showing assigned users for alerts and obligations
  ([2b3dc84](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/2b3dc84e1e35a6b7da2a05846ab854e02be5037f)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-10-08.

### Refactoring
- alerts
  - remove unused variable
  ([d9b79e8](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/d9b79e804087d8aaf8347bacc1dd87e67ed00970)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-09. Removed the `_assignedUserDisplay` variable from the `AlertDetails` component as it was unused. This simplification improves code clarity and maintains consistency with recent updates across related components.
  - remove unused variable and redundant prop
  ([2394e1a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/2394e1abde40397e50bfa70049c741d12d8d0da4)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-09. Removed the unused `_assignedUserDisplay` variable and the redundant `readOnlyValue` prop from the `AlertDetails` component to streamline and simplify the code. This change aligns with previous updates to related components, maintaining consistency across the codebase.

- details
  - remove unused variables and streamline logic
  ([5897ebc](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/5897ebc71ee4e8ab8a6464651020fe02da3bdd08)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-09. Removed commented-out code and unused variables from `ObligationDetails` to improve readability and maintainability. Updated `assignedUserName` usage to simplify the component's render logic.

- editable-select
  - remove redundant readOnlyValue prop
  ([77f9b90](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/77f9b90d414234ceab5a0fd4aebe35ba8b2839b0)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-09. Replaced the `readOnlyValue` prop with existing usage of `children` in `EditableFieldSelect`. Simplified the logic for determining the default value displayed in read-only mode, aligning with React's standard practices and improving maintainability.
  - replace readOnlyValue with children
  ([b137f28](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/b137f280e27928e3576a58954fea8344412e4fdd)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-09. Updated the EditableFieldSelect prop type to use `children` instead of `readOnlyValue`, improving flexibility in rendering content. This change aligns with common React patterns, allowing more dynamic component usage.

- pages
  - streamline data fetching and hydration logic
  ([a018ca1](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a018ca1e73f9433d8243f5b4bfac922e68d6c0af)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-09. Refactored Alert and Obligation pages to simplify logic, centralize parameter parsing, and consolidate query hydration into reusable configurations. Replaced redundant hydration logic with a shared `QueryClient` instance, improving maintainability and consistency across these pages.

### Chores
- changelog
  - update changelog for v0.5.4
  ([6708d23](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/6708d235e28bdbd3ee00fae1210b91239dd6a410)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-07. Updated the changelog to document all changes introduced in version 0.5.4. This includes breaking changes, new features like bulk actions, Auth0 integration, and dashboard enhancements, as well as various bug fixes and refactors.

- release
  - 0.5.5
  ([fdb5c26](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/fdb5c26b0a5b10c62094d186e94e1342c7fff5cd)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-09.


## v0.5.4 - 2025-10-07
### ⚠️ BREAKING CHANGE
- New and adjusted API endpoints and schemas may impact existing integrations.

### Features
- alerts
  - add bulk delete functionality
  ([1c3c644](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/1c3c644d918d05306dfa62d831b2b330c2a77c54)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-07. Introduced `bulkDeleteAlert` method to enable deletion of multiple alerts in a single operation. This enhancement improves the efficiency of managing alerts by allowing batch deletions. Included ID validation to ensure proper input handling.
  - add bulk delete method to repository
  ([b8de9ce](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/b8de9ce63ba6560d72134eeefa805206ba371a8e)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-07. Extended `Repository` class with a new `bulkDelete` method to support batch deletion of alerts. This feature enhances API interactions by enabling efficient removal of multiple alerts in a single operation. The method utilizes the fetcher's `delete` functionality with a data payload.
  - add useBalkDeleteAlert hook for bulk deletions
  ([5808b66](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/5808b66503dacf7cb8f8f99148b6b601d15f2b33)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-07. Added a new `useBalkDeleteAlert` React hook to enable bulk deletion of alerts with integrated success and error handling. The hook leverages the `bulkDeleteAlert` method and invalidates the related queries to update the state. Toast notifications were included to enhance user experience with feedback on operation success or failure.
  - enhance assignee display on alert pages
  ([93a2d85](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/93a2d85084fb7d7fe5322cf0f74010af97e68d82)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-07. Introduced logic to display the assignee's full name on alert detail pages by mapping user data from the fetched pagination list. Updated the `AlertEditableFieldSelect` component to use the formatted assignee name as the default value, improving clarity for users.
  - integrate bulk delete in AlertTableRowSelected
  ([b2883b2](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/b2883b2a91e3b69515c3600ec0c99997f08b251a)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-07. Replaced individual alert deletion logic with `useBalkDeleteAlert` for bulk operations. Simplified the delete logic by removing the `executeBatch` helper and directly calling the `deleteAsync` method with selected alert IDs. Streamlined callback dependencies for clarity and efficiency.

- api
  - add bulk patch and delete for sources
  ([eba2f1d](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/eba2f1dc6f7107fb7d0cdae94100503c9c6ef775)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-07. Introduced `bulkPatchSource` and `bulkDeleteSource` methods to handle bulk operations for sources. These provide enhanced functionality for updating or deleting multiple source entries efficiently.
  - add bulk patch and delete hooks for sources
  ([8c101e1](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/8c101e1076521ad5dce7fb229529b13fdd2147fa)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-07. Introduced `useBalkPatchMonitoringSource` and `useBalkDeleteSource` React hooks for bulk operations on source entities. These hooks enhance user experience by enabling efficient bulk patching and deletion with integrated success/error handling.
  - add bulk patch and delete methods to repository
  ([994178c](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/994178c7fabe1b5bf7b4110905e32c5cf9f747ed)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-07. Implemented `bulkPatch` and `bulkDelete` methods in the `Repository` class to support bulk operations for sources. These enhancements improve efficiency when updating or deleting multiple source entities.
  - add id field to itemSourceSchema
  ([db8b34f](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/db8b34f27f7d448b99692db234a3d3ae623122f4)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-07. Extended the `itemSourceSchema` in the shared API schemas by including the `id` field. This enables schema validation for objects requiring an `id` property, improving data integrity and type safety.
  - make counts in source schema optional
  ([b7fe8d3](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/b7fe8d379decd8206c5d4beb4310c61c8cfe23ab)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-07. Updated the `sourceSchema` to allow `pages_count`, `obligations_count`, and `alerts_count` as optional fields. This change improves flexibility when handling incomplete or partial data.

- auth
  - replace custom SignIn components with Auth0 integration
  ([337dc55](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/337dc55ef89e6225cd1a2d4885a829414ebc08db)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-07. Replaced the custom sign-in UI and components with the Auth0 authentication integration. This simplifies the sign-in process and aligns the project with centralized authentication logic.

- constants
  - add dashboardWidgets to query keys
  ([95eba25](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/95eba25eae8883645db77ba2b0ae5e0e08058a9b)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-07. Added `dashboardWidgets` to `QUERY_KEYS` in `queryKeys.ts`. This new key supports consistent identification and manipulation of dashboard widget-related queries across the application.

- dashboard
  - add chart into dashboard
  ([f83a245](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/f83a24509d59e15a32849d6eeaced0f513cbb9ac)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-10-07.
  - add queries, services, and types for widgets
  ([103f11f](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/103f11f9c6c1996d86b1ec950ab3cba97f072f20)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-07. Introduced core structure for handling dashboard widgets including queries, services, and types. This setup enables fetching and schema validation of dashboard widgets from the API for consistent data handling.

- fetcher
  - support data payload for delete requests
  ([329143a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/329143ac3cc99fa00fb9b4ccb2debe358ef5ed55)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-07. Enhanced the `delete` method to accept a data payload alongside URL and options. This modification allows greater flexibility for API interactions requiring parameters in DELETE requests.

- obligations
  - add bulk delete method to repository
  ([a5b4fe6](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a5b4fe636262da7ec0333e957caf527839e5d7b0)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-07. Added a `bulkDelete` method to the `Repository` class to support batch deletion of obligations. This enhancement improves efficiency by enabling removal of multiple obligations in a single operation. The method uses the fetcher's `delete` functionality with a data payload containing obligation IDs.
  - add bulk delete method to services
  ([18c0645](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/18c0645f25fbc000c5011e56944dae69ae2d8542)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-07. Introduced `bulkDeleteObligation` method to support batch deletion of obligations. This feature includes ID validation to ensure correct input handling and improves efficiency in managing multiple obligations. It utilizes the repository's `bulkDelete` function for streamlined operations.
  - add redirect after obligation creation
  ([f1d785d](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/f1d785dc6bac988e6b5547750ed144f2993d0024)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-07. Implemented a redirect to the newly created obligation's detail page upon successful creation. The `router.replace` method now navigates users to the specific obligation detail page, improving user experience by providing immediate access to the created obligation.
  - add useBalkDeleteObligation hook for bulk deletions
  ([7df538b](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/7df538b14ac97f0bb50adbfce5be95a1afdde9cd)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-07. Introduced `useBalkDeleteObligation` React hook to enable bulk deletion of obligations. This hook provides success and error handling with toast notifications for user feedback. It leverages the `bulkDeleteObligation` service method and invalidates relevant queries to ensure state consistency.
  - add useBalkDeleteObligation hook for bulk deletions
  ([83e6b9a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/83e6b9afb0916303c0f7734876b72bc2e364d641)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-07. Introduced `useBalkDeleteObligation` React hook to enable bulk deletion of obligations. This hook provides success and error handling with toast notifications for user feedback. It leverages the `bulkDeleteObligation` service method and invalidates relevant queries to ensure state consistency.

- openapi
  - extend API with bulk and detailed operations
  ([0f98aae](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/0f98aae34f9f2affc7f18982d91b466c0a0e17f2)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-07. Added support for bulk operations and enhancements in source, alert, and obligation APIs. Introduced endpoints for bulk update, delete, and detailed operations like patch and get source pages for better API usability.

**

- read-only-field
  - integrate Tooltip for field description
  ([136e450](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/136e450537259c8915b7133c37eac7605034d3e6)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-07. Replaced the raw description text with a Tooltip component in the FormFieldReadOnly molecule. This enhances user experience by providing a cleaner UI and improving the discoverability of additional information through the tooltip interaction.

- sources
  - integrate bulk actions for monitoring and deletion
  ([46991d2](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/46991d2816332a192ccac091eafc6ba5b5ae0f60)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-07. Implemented bulk monitoring and deletion functionality for source entities using new hooks `useBalkPatchMonitoringSource` and `useBalkDeleteSource`. Improved user experience by enabling efficient management of multiple selected sources.

- widgets
  - replace pagination hooks with dashboardWidgets
  ([3879925](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/38799259994570f4d4a2959d964f2b18d79e9c2b)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-07. Replaced `useObligationsPagination` and `useSourcesPagination` hooks with the centralized `useDashboardWidgets` hook for both `ObligationWidgetCount` and `SourceWidgetMonitoredSources` components. This aligns widget data fetching with the new dashboard widgets system, simplifying code and improving consistency.

### Bug Fixes
- alerts
  - fix editing alert details
  ([9267433](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/9267433c90a426566ae89d39961c00b308f41029)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-10-07.

- dashboard
  - add dashboard skeletons
  ([36b6fe4](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/36b6fe40ccba2988e4613b2992e7e040f13c7e40)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-10-07.
  - remove unused loading component
  ([afa736c](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/afa736c5d227ba7aba3017da816438a8e36bfd24)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-07. The `loading.tsx` component under the `dashboard` directory was removed as it is no longer used in the application. This cleanup reduces unnecessary files, maintaining codebase simplicity and reducing confusion.

- obligations
  - add obligation table empty state for dashboard
  ([b0c3ffc](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/b0c3ffcf7ad8cf8194529d0aa241ae5e69144708)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-10-07.
  - fix editing obligation details
  ([243765a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/243765aac47de0f8ea9ec9cacb674fb70eb5871c)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-10-07.
  - fix editing obligation details fields
  ([14cee1e](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/14cee1eadf4976b264fdbb2805524cf4a9332d01)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-10-07.
  - update query invalidation logic
  ([f889dc6](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/f889dc63f5b02dcb176ed7a03e784a86e1940f07)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-07. Removed obligation-specific invalidation in favor of broader query targeting. This adjustment ensures that the data fetched for obligations remains consistent and updated across multiple contexts. Invalidated both `obligation` and `obligations` query keys.
  - update tooltip styling for better UX
  ([9698099](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/969809975353d7576f6996e555b6cc53c87c97ea)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-07. The `className` prop was added to the `Tooltip` component with the `cursor-pointer` style to improve interactivity and provide a clearer indication that the tooltip is clickable.
  - update tooltip styling for better UX
  ([c33b83b](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/c33b83b3251fa6b52286c6d96b7dcf0a4066bcbe)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-07. The `className` prop was added to the `Tooltip` component with the `cursor-pointer` style to improve interactivity and provide a clearer indication that the tooltip is clickable.

- queries
  - generalize query invalidation logic
  ([f96a548](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/f96a548a0a480cdf3bf28a9a5aa04b2dff0d3e52)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-07. Replaced entity-specific query invalidation (e.g., `QUERY_KEYS.source, id`) with more general keys. This ensures that related data remains consistently updated across all contexts and reduces the risk of stale data in the UI. Invalidated both singular and plural query keys for all types.

- sources
  - fix source pages and alerts
  ([541d595](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/541d59566d33355425d3edfd5ce60497d5618443)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-10-07.

- ui
  - add cursor pointer to modal close button
  ([3fa0983](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/3fa09836efa7bdd0f33932d18ffa1a34af13e165)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-10-07.
  - add cursor pointers
  ([d920c95](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/d920c952403db9d5467ec8f43090ea0a786b634b)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-10-07.
  - add sheet footer into all forms
  ([e66bd59](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/e66bd596861eb198f27add80623d7cf081e506e6)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-10-07.
  - change title
  ([ba1a21b](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/ba1a21b9787357ebca977a88840c031b2ac73b18)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-10-07.
  - fix colors of checkbox and sheet footer
  ([5bb2250](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/5bb2250518d107052b9ecdd7352211bbb370ee5b)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-10-07.

### Refactoring
- api
  - rename unused mutation callback parameter
  ([fef597a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/fef597ac59273405d154be12ef7f88c2ebefc1eb)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-07. Replaced unused `data` parameter with `_data` in `onSuccess` callbacks for alert and obligation mutations. This clarifies the intent and prevents unused variable warnings during linting.

- components
  - extract and use DialogContent component
  ([384e027](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/384e027daa88ed1695a85d95fb684ad85c9c17e9)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-07. Extracted `DialogContent` into its own reusable component under `atoms/Dialog`. Updated `Modal` component to leverage this new abstraction, enhancing code reusability and consistency in dialog content rendering across the application.
  - standardize Button imports across components
  ([3167629](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/3167629796897ca46c15c70b378fb09f176edb46)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-07. Replaced `Button` imports from `@/ui/button` with imports from `@/components/atoms/Button` to align with the updated project structure. This change promotes consistency across the application by using the designated component path.

- dashboard
  - remove unused compliance score elements
  ([83a4612](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/83a46126ead607c1a6a7b8797ece9ee37e7671d0)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-07. Removed unnecessary visual elements from the compliance score dashboard page to improve UI clarity and simplicity. This streamlines the design by removing secondary information and focusing on key data points.

- fetcher
  - set cache policy to 'no-store'
  ([ed18486](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/ed1848655f95aa811906ed7af7255509096dbacf)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-07. Commented out the cache option derived from `options?.cache` in favor of defaulting
to 'no-store' explicitly for experimental purposes. This change aims to simplify
cache behavior and support investigation efforts.

- obligations
  - remove unused source field and hook
  ([f607438](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/f60743829fa07d22349330bfd2eba6ef65108678)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-07. Removed `source_id` form field and its corresponding data fetching (`useSourcesPagination` hook) from the `ObligationFormCreateWithAlert` component. The `source_id` field now uses default data from `data.source.id`, simplifying the implementation and reducing unnecessary API calls.

- sources
  - remove unused code and optimize hooks usage
  ([f5ecfc2](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/f5ecfc2f6732bf9c9b88fcf726a93eb2552b1875)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-07. Cleaned up unused imports, variables, and helper functions in `SourceTableRowSelected` component. Optimized dependency arrays for callbacks to ensure efficient rendering and logic execution. Updated to use bulk delete hook with simplified logic.

### Chores
- changelog
  - update changelog for version 0.5.3
  ([81886d0](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/81886d022fec7ea43a1cf0cd54dacb6798d405c7)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-06. Updated the changelog with details of changes introduced in version 0.5.3, including new UI updates, logo additions, and improvements to the Tooltip usage within specific components.

- metadata
  - update application metadata text formatting
  ([cd6170a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/cd6170a4b7cdddeb725b97e6adc52a3767cf55ef)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-07. Updated text formatting in metadata fields to enhance consistency with the application branding. Adjusted both `title` and `description` fields to reflect "RegWatch" without spaces for improved coherence.

- release
  - 0.5.4
  ([a88c559](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a88c5590b278ba3282bba070545d2f2b8f5ccec8)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-07.


## v0.5.3 - 2025-10-06

### Features
- ui
  - add new favicon
  ([7767c7e](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/7767c7eb6d8d9c1a5fc70b4fb14a4e4080a0ef05)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-10-03.
  - add new logos
  ([9435451](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/9435451f239babc9426581860555b6424e4cfcd9)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-10-03.
  - update Tooltip usage in TableCellTitleAndLink
  ([a8f51de](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a8f51de8913aacd2227f1a7ee004fcb7ee064420)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-24. Updated the `Tooltip` in the `TableCellTitleAndLink` component to utilize the `asChild` prop. This change improves the structure and ensures compatibility when wrapping custom child elements. Enhanced the consistency of Tooltip rendering across `title` and `url` fields.

### Bug Fixes
- alerts
  - move create obligation button to alert details page
  ([62b91b5](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/62b91b533ca42b8c5b95ccad386a254c82278498)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-10-03.

- sources
  - add ui updates for source pages page
  ([70edca9](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/70edca97ce50266b06d482ab2c1080f215dd4282)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-10-03.

- ui
  - add cursor pointers
  ([ef57269](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/ef57269f756ec01a9f7853413ed42eb1625d0182)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-10-03.
  - add interactive colors
  ([7bb1a5e](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/7bb1a5ea44d6cdbf3ff908f424808008cd18d5df)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-10-03.
  - change navigation order
  ([4205475](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/4205475fd4bc024f1b8b098a975b937b18b41173)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-10-03.
  - fix badges, sheets titles, source table headers, obligation forms titles
  ([9bbdd91](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/9bbdd91218d3a4a37fda75d47920b88b7a88f9a6)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-10-03.
  - fix dashboard compliance score
  ([c6a7004](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/c6a70046741705391cdf3b1b2ad1325e392d841c)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-10-03.
  - fix dashboard urgent alerts
  ([5a9d15b](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/5a9d15ba91cd50a2640e20143fbcee84f863b3d9)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-10-03.
  - fix logos
  ([40cd4af](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/40cd4af362136847a9136ae00bd925ce2053120c)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-10-03.
  - fix table cell title and link component
  ([85a7c0d](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/85a7c0d1316de02d3751b2ab024427f3014fbf75)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-10-03.
  - remove profile navigation items
  ([3ab47d8](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/3ab47d8f652183637ef1f3d1e9df4247ed8602e9)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-10-03.
  - remove unused imports
  ([052f7d3](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/052f7d3239b2dd0094f6b01bd53b2189c1054ac2)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-10-03.

### Chores
- changelog
  - update changelog for version 0.5.2
  ([7ea4942](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/7ea49428380add55996fba9c529ad4aca09b599b)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-24. Updated the changelog with entries for features, fixes, refactoring, and other updates introduced in version 0.5.2. This includes details on pagination improvements, dynamic data integration, and UI enhancements.

- release
  - 0.5.3
  ([674af92](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/674af9277b901d22dd3b29ad1a31e619b7fd5cd3)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-10-06.


## v0.5.2 - 2025-09-24

### Features
- api
  - add CRUD service for source pages
  ([efd5faf](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/efd5faff4108468c66f1fccad16ed97f728be1c6)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-24. Introduced a CRUD service to manage source pages, including support for pagination and schema-based validation. This service standardizes data handling for source pages and streamlines API interaction.

- app
  - use constants for legal pages links
  ([21bb521](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/21bb521340c2d97494c5f9b066026493e09264df)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-24. Replaced hardcoded URLs for "Terms of Service" and "Privacy Policy" with constants. This improvement ensures maintainability and consistency of links across the application.

- constants
  - add sourcePages key to queryKeys
  ([9fbd273](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/9fbd2735e635d4431b331685d8da9dea85aa78f2)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-24. Added a new `sourcePages` key to the `queryKeys` object. This update provides a dedicated key for handling queries related to source pages, aligning with recently introduced features and services for source pages.

- pages
  - add pagination and optimize source page rendering
  ([076667b](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/076667bd47e8d81ce5e444df1f8cd553458f04a6)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-24. Integrated dynamic pagination controls into the SourcePage rendering logic using `SourcePageTablePaginationControls`. Updated the `SourcePagesTable` component to accept `searchParams` for live data fetching and rendering. Improved search parameter normalization and ensured better server-side data integration.

- search-params
  - add isRegulatory query parameter
  ([44d9133](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/44d91333142fedffda5f2272527eb6142292c8c8)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-24. Added a new `isRegulatory` field to the search parameters in `constants/searchParams.ts`. This addition allows better filtering capabilities by enabling support for regulatory-specific queries. It enhances flexibility when constructing query strings for filtering data.

- shared-schemas
  - extend schemas with new utilities
  ([3147039](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/314703993cef72027272a60a2e43fd7da68e8f65)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-24. Updated shared schemas to enhance validation flexibility and consistency. Introduced `idUnionSchema` for uniform ID validation and `requiredBooleanSchema` for required boolean fields. Extended `urlSchema` with length constraints. Updated `itemSchema` to use `idUnionSchema` for better reusability and readability.

- source
  - refactor source schemas for consistency
  ([c03db8e](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/c03db8e3e67d8b984cee4ecd97562a136967f035)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-24. Refactored source-related schemas to ensure better consistency and maintainability. Consolidated repeated schema definitions by reusing `itemSchema` and `requiredBooleanSchema`. Added fields to `sourceSchema` for improved data structure. Updated schemas for `createSource`, `updateSource`, and pagination to reflect the changes.

- ui
  - add className prop to TableCellLink component
  ([15ae28b](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/15ae28b6c7c3d33f33d3ce9b096436356812f881)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-24. Enhanced the `TableCellLink` component by introducing an optional `className` prop. This change allows users to apply custom styles directly to the rendered `NextLink` element, improving flexibility and reusability of the component.
  - add SourcePageTablePaginationControls component
  ([4bea489](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/4bea489c1ddab9da348e586216dac62fa76b5570)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-24. Introduced the `SourcePageTablePaginationControls` component to manage table pagination controls for source pages. This component integrates `useSourcePagesPagination` for fetching paginated data and dynamically generates pagination controls based on the current search parameters. Improves UI modularity and reusability for pagination functionality.
  - add Tooltip to TableCellTitleAndLink
  ([badf523](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/badf523393939dce6e83fe8201e91967929303b9)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-24. Enhanced the `TableCellTitleAndLink` component by wrapping `title` and `url` fields inside a `Tooltip`. Allows users to see full content on hover for better accessibility and usability. Updated the `title` type to accommodate `null` and optional values.

- widgets
  - integrate dynamic source data in widgets
  ([d8c583b](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/d8c583b84242a4809f8ad755427b41c7b5e0ba88)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-24. Enhanced widgets to display real-time data by integrating dynamic source information. Replaced static placeholder values with actual `obligations_count`, `alerts_count`, and `pages_count` fetched from the source API. This ensures accurate and up-to-date information is reflected in the UI.

### Bug Fixes
- ui
  - update TooltipTrigger `cursor-pointer` to `cursor-help`
  ([e97d949](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/e97d9496cf53ddc8718f7959529911cc3967e3f3)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-24. Updated the `TooltipTrigger` component in the Tooltip to replace the `cursor-pointer` class with `cursor-help`. This change enhances the user experience by providing a cursor style that better aligns with the component's tooltip functionality.

 Files

### Refactoring
- api
  - enhance CRUD service with custom list item type
  ([ece3fc1](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/ece3fc147ca5b879899661343cd9c5b02c345635)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-24. Refactored the `createCrudService` function to support a customizable list item type (`TListItem`). Updated the service to handle lists and pagination responses using this new type, enabling more tailored data structures. Updated the `sourceService` to omit specific fields in its list response for better flexibility.

- crud-service
  - make schema validation optional for create, update, and patch methods
  ([dc06ac8](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/dc06ac85db3df7501a802f9e99fa79da92c199dc)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-24. Updated the `createCrudService` function to allow optional schema validation for `create`, `update`, and `patch` operations. Added checks to bypass validation if the respective schema is not defined. This change improves flexibility in CRUD service customization.

- repositories
  - change access modifiers for methods
  ([58e9b0e](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/58e9b0e3a3d3fcd5a2bbb662383acf98ae7f26be)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-24. Updated the `request` and `buildUrl` methods in `BaseRepository` from `private` to `protected`. These changes allow subclasses to utilize and extend the methods, improving flexibility and reusability.

- source
  - extract reusable list item schema
  ([a6509a7](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a6509a73a37a91287b0d5bd73beaada2a8496669)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-24. Separated repeated omissions for `pages_count`, `obligations_count`, and `alerts_count` into a new reusable `sourceListItemShema`. Applied this schema in array and pagination definitions for improved clarity and maintainability. Introduced a new type `SourceListItem` for better type definition.

- source-assets
  - replace schema reference for jurisdictions
  ([c173021](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/c173021b019d6408c80aeb6634ff1f40cf6cf72c)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-24. Updated `jurisdictionsSchema` to use `itemSchema` instead of `jurisdictionItemSchema` for shape reuse. This change ensures consistency and reduces redundancy in schema definitions.

- ui
  - integrate live data in SourcePagesTable
  ([d2e46c9](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/d2e46c9f689348fae2735f8e345e525822d62718)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-24. Replaced test data with real paginated data fetched using `useSourcePagesPagination`. Refactored the `SourcePagesTable` component to accept `searchParams` as a prop and utilize server-side data. Updated table columns to align with the new data structure, including changes to `alerts_count` and addition of `is_regulatory`. Removed unused `SourcePage` and related test data for cleanup and maintainability.
  - remove unused imports from obligations page
  ([13f8bb7](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/13f8bb7ed66f00f82df5ac4539dddc9591b2ea5a)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-24. Removed unused imports to improve readability and maintain code cleanliness. This change eliminates unnecessary dependencies.
  - simplify SourceRiskBadge component
  ([0a8ce66](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/0a8ce660710d6a17fb65880db4c3736b9161b6ed)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-24. Removed unused `SourcePage` type and unnecessary `data` prop from `SourceRiskBadge`. Updated the component to use a static 'high' risk value, improving clarity and reducing unnecessary complexity in the code.
  - update filters in SourcePageFilter component
  ([77ef19b](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/77ef19bd98c7ffbddcdb3c8a816b474e4d3d4e73)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-24. Replaced static filters with dynamic ones by using the `isRegulatory` key from `SearchParams`. Updated the `FilterDropdown` to use the current path (`pathname`) as the `href` value to ensure accurate URL construction. Removed the unused `InputSearch` component for cleanup.
  - update Source type to SourceListItem in pagination controls
  ([64afd27](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/64afd27d10b09e71bce057da8cf964536e393f73)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-24. Replaced the usage of `Source` type with `SourceListItem` in `SourceTablePaginationControls`. This aligns the component with the updated type definitions and improves consistency across the codebase.
  - update Source type to SourceListItem in SourceTable
  ([ca07038](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/ca07038c9d30f553c0d2d548ed88bbf908b2ec66)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-24. Replaced the usage of `Source` type with the newly introduced `SourceListItem` type. This aligns the component with the updated data structure and improves maintainability.
  - update SourcePageTableCellPageName data handling
  ([2f8e85a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/2f8e85aa8403ba1aacbd147d67b8210c20f02c9e)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-24. Removed the redundant check for `data.page` and replaced the usage of `data.page` with `data.title` for the `TableCellTitleAndLink` component. Updated imports to reflect the new `SourcePage` type location for consistency.

### Chores
- changelog
  - update changelog for version 0.5.1
  ([d0920d4](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/d0920d46c9a7cf44b07b154d3d9d4079cf85c7df)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-23. Updated the changelog to include details for version `0.5.1`. The update documents the introduction of dynamic metadata generation for pages and the release-related tasks for `0.5.1`, enhancing transparency for the development changes.

- release
  - 0.5.2
  ([d45a320](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/d45a32032f5366cbe9693f0cc6a797f3510d1de6)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-24.


## v0.5.1 - 2025-09-23

### Features
- metadata
  - add dynamic metadata generation for pages
  ([ee40534](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/ee40534ca4554923deb9de9462fbc6fc7d77f808)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-23. Implemented dynamic metadata support for various pages to improve SEO and user experience. Added `generateMetadata` functions to fetch page-specific title and description. Updated static metadata declarations for layouts and static pages.

### Chores
- release
  - 0.5.1
  ([f859022](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/f859022f753ef0311f1693059eb89423babeb648)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-23.
  - update changelog for version 0.5.0
  ([89eae90](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/89eae905200e3c43b59226d17729c34e0a2442d2)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-23. Updated the changelog to include changes for version `0.5.0`. Notable additions include enhancements, refactors, and bug fixes across multiple components, such as alert table links, breadcrumbs, dashboard widgets, tooltip fixes, and the modularization of `AppSidebar`.


## v0.5.0 - 2025-09-23
### ⚠️ BREAKING CHANGE
- `AppSidebar` has been modularized.

### Features
- alerts
  - add link cell component for alert table
  ([d30480f](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/d30480f879a4294e354ceaea07fafbe859831b96)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-23. Introduced a new `SourcePageAlertTableCellLink` component to enhance clickability and navigation within the alert table. Integrated the component into the `SourcePageAlertTable` for improved structure and user experience.
  - create components for showing alerts users
  ([6fde950](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/6fde95050c91e5aa4fa44b9f0e5a3cd7f175e3a5)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-22.
  - replace SourceTableCellSourceName with TableCellTitleAndLink
  ([695b9bc](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/695b9bcca7a47b295bb159390627c3d614ce312e)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-22. Replaced the `SourceTableCellSourceName` component with the more flexible and reusable `TableCellTitleAndLink` component in `AlertTableCellSource`. Added additional null checks for improved robustness when accessing `source` and `source.name`.
  - add AlertWidgetUrgentList component
  ([93797ad](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/93797add3b6d210f624fd887de2817e42d3433c6)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-19. Introduced the `AlertWidgetUrgentList` component to display a list of urgent alerts. The component utilizes the `useAlertsPagination` hook to fetch and paginate alerts, and integrates the `AlertRiskBadge` for visual emphasis on alert risk levels. This lays the groundwork for presenting urgent alerts in a concise, accessible format.
  - add links to alert details in urgent list
  ([00ffb84](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/00ffb841b3dddceeb4390fa3749e1a6b1f9c6f62)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-19. Linked each alert in the `AlertWidgetUrgentList` component to its detailed page using the `NextLink` component. This enhances navigation by allowing users to directly access individual alert details from the widget.
  - create alert table cell source component
  ([926f0a2](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/926f0a2c20c2ec19b887423faab4df7e23aceefd)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-17.
  - replace hardcoded URLs with constant
  ([c01c409](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/c01c40931476025940261309942602d5aa22fbc6)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-17. Updated various components in the Alerts module to use the `ALERTS_PAGE` constant instead of hardcoded `/alerts` URL paths. This improves maintainability and reduces the risk of breaking changes when updating routes.

- api
  - remove `regwatch_swagger.yaml` configuration
  ([8ed3945](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/8ed39453b924f10728a393e469405580fa25bd6b)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-22. Deleted the `regwatch_swagger.yaml` file from the repository. This file is no longer necessary and its removal helps to clean the codebase and reduce redundant configurations.
  - remove unused `sources` route implementation
  ([53c7a69](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/53c7a697e63ec1bd03ff67708fa96d2af68280dc)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-22. Deleted the `sources` route handler from the API. The functionality provided by this route is no longer needed, and its removal helps declutter the codebase and improves maintainability.

- app
  - remove unused data.json file
  ([077eb04](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/077eb04b2c9cd5fb5e702ca721b2bba09a441a3a)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-22. The `data.json` file was deleted from the repository. This file is no longer necessary and was not being used by any part of the application. Its removal declutters the codebase and ensures better maintainability.
  - remove unused legal pages
  ([d9a8031](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/d9a80311dd4677cf63f399cc6f239e53d4d026d0)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-22. Deleted the `/privacy-policy` and `/terms-of-service` pages as they are no longer needed. The functionality is now handled via redirects configured in `next.config.js`, ensuring centralized management of redirection logic.

- auth
  - remove unused signOut import in template
  ([ce249d5](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/ce249d576aeab38eff7d74832b21bc410d1f7a68)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-22. Removed the commented-out import for `signOut` from the template file as it was redundant. The active import for `signOut` from `next-auth/react` is already in use.

- breadcrumbs
  - enhance segment handling and add contextual logic
  ([92e9b46](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/92e9b4632ba5b1d429e2fbe629284d717185a983)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-18. Improved the Breadcrumbs component by refining the handling of route segments. Introduced contextual logic to support dynamic segment-based navigation for sources, obligations, and alerts. This ensures more accurate and meaningful breadcrumb trails.
  - add breadcrumbs component for navigation
  ([72f0a72](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/72f0a72ad37923b69c6368cf85b0cdcac7eb525a)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-17. Introduced a new `Breadcrumbs` component to display the current path and layout segments. This enhances user navigation by providing a clearer context of the current page location within the app's structure.

- ci
  - add Qodana configuration for code analysis
  ([b5d302c](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/b5d302c12582383999f315a1f852d6927e3c6c7b)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-19. Added `qodana.yaml` to configure static analysis and quality gates for the project. This integration sets up `jetbrains/qodana-js:2025.2` as the linter and defines optional parameters such as inspection profiles,

- components
  - add TableCellTitleAndLink component
  ([1eaad91](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/1eaad915fb91a3680d5e1b4cc77548f2bd0a97fb)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-22. Introduced a new `TableCellTitleAndLink` component to render a title alongside an optional link. This component ensures flexibility and reusability in displaying tabular cell content.
  - enhance Tooltip with configurable placement
  ([7eb0794](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/7eb0794e3f98c8fe3c3c005ad277a280140a7429)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-22. Enhanced the `Tooltip` component by adding a `side` prop to allow configurable tooltip placement. Updated the `DataTableWithActions` to simplify tooltip trigger rendering by directly passing the text.
  - refactor Tooltip implementation
  ([18d9401](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/18d940156f51ba14c56a8b9e50d5704e42075b83)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-22. Introduced a new `Tooltip` component under `components/molecules` to centralize tooltip behavior and improve reusability. Replaced usage of the previous `Tooltip` implementation in all relevant components.
  - add WidgetCard component
  ([8fc698d](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/8fc698d22395ac778c1afe605c125d1d0b8fcf80)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-19. Introduced a new `WidgetCard` component for reusable card-based widgets. This component allows for consistent styling and structure across widgets, including a title with an optional icon, child content area, and an optional external link.

- config
  - add redirects for privacy and terms pages
  ([cd81684](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/cd8168421fe3ed56996e02e07bc269ea7f8981d9)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-22. Introduced `redirects` configuration in `next.config.js` to create permanent redirects for the `/privacy-policy` and `/terms-of-service` routes. These routes now point to the respective URLs defined in the `WEBFLOW_SITE` environment variable. This change improves user navigation and centralizes redirect logic.

- constants
  - centralize obligations page URL in constants
  ([05e856a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/05e856a9c8fd0e6d4e14ace026cbc7117a38cfa0)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-22. Replaced hardcoded '/obligations' URLs with the `OBLIGATIONS_PAGE` constant across the codebase to improve maintainability and reduce duplication.
  - add ALERTS_PAGE constant
  ([27c5a9e](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/27c5a9e8e9e1d2424a327361d847aab94bf02449)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-17. Added `ALERTS_PAGE` constant to represent the route for the alerts page. Updated the export statement to include the new constant, ensuring it is accessible across the codebase where required.

- dashboard
  - add Compliance Score widget to dashboard
  ([8dbdeb3](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/8dbdeb32cca205dac36a269787758ef2bafeb6c8)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-19. Created a new Compliance Score widget for the dashboard to visualize compliance health. The widget includes a circular progress chart, improvement metrics, and detailed obligation statistics (upcoming/overdue). Enhances user understanding of compliance trends.
  - add Monitored Sources widget to dashboard
  ([37acf7b](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/37acf7b2dd3c4ce9741adfdc7138d103c2493172)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-19. Introduced a new Monitored Sources widget to the dashboard. This enhances the visibility of monitored sources by utilizing the `SourceWidgetMonitoredSources` component. A radar icon is displayed alongside the widget title for improved user experience.
  - add Obligations widget to dashboard
  ([95abdac](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/95abdac0b1df8d800ee53bcc0d3fa68c399cd4f1)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-19. Added a new Obligations widget to the dashboard to provide visibility into obligations-related data. The widget includes an icon alongside the title and integrates the `ObligationWidgetCount` component for displaying obligations statistics effectively.
  - add Urgent Alerts widget to dashboard
  ([4e3f0b6](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/4e3f0b6234f9127ab20d3646003eb69bc02beb94)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-19. Introduced a new Urgent Alerts widget to the dashboard for enhanced visibility of critical alerts. The widget includes an icon for emphasis, a link to the Alerts page, and integrates the `AlertWidgetUrgentList` component for displaying urgent alert information effectively.
  - enhance layout and structure
  ([1d6af14](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/1d6af14f6429f2354760e5721590cae01dccc87f)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-19. Updated the dashboard layout to improve the display of compliance data. Introduced a new page layout that organizes key information such as obligations, monitored sources, compliance score, and urgent alerts into distinct, responsive grid sections for better clarity and usability. Replaced `DashboardContent` with updated widgets to provide a more focused overview.

- env
  - enforce usage of `env` module for environment variables with validation
  ([876a2ff](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/876a2ff882b54c3a690ab543096df52c84eb63b4)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-19. Centralized and standardized the use of the `env` module for accessing environment variables throughout the application. Replaced direct `process.env` references with `env` module imports to ensure consistent behavior, improved type safety, and simplified environment variable management. Updated related schemas for stricter validation and added defaults where applicable.

- fetcher
  - enable experimental `force-cache` option for GET requests
  ([8598040](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/8598040c6d25cb71c54776ea3d03be6e8a633637)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-18. Enhanced the `get` method in the fetcher utility to include a `cache: 'force-cache'` option. This adjustment is experimental and aims to leverage aggressive caching for performance optimization.

- helpers
  - add buildSearchParamsQuery utility
  ([1c26556](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/1c2655628a5dd1f12255b29668493b766b591fca)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-17. Introduced a helper function `buildSearchParamsQuery` to map API query parameters to internal keys. This enhances reusability and ensures consistent handling of search parameters across the codebase.

- legal
  - redirect privacy policy and terms pages
  ([39ab96a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/39ab96a3836a0313d412a47df22639e78fabbee8)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-19. Replaced static content on Privacy Policy and Terms of Service pages with server-side redirects to their respective pages hosted on Webflow. This ensures that the latest content is always displayed without requiring code updates when changes are made.

- obligations
  - replace SourceTableCellSourceName with TableCellTitleAndLink
  ([6ed8a4a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/6ed8a4a65e7a2432f9fcbdaac51797b1775f0026)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-22. Replaced the `SourceTableCellSourceName` component with the reusable `TableCellTitleAndLink` component in `ObligationTableCellSource`. Added additional null checks for `source` and `source.name` to improve robustness.
  - add ObligationWidgetCount component
  ([553b2c6](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/553b2c694979afc7b2d4fd589f28a989f00e0d6f)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-19. Introduced the `ObligationWidgetCount` component to display the count of obligations along with additional metrics. The component uses the `useObligationsPagination` hook to fetch and process obligations data, providing a concise and responsive UI that includes statistical indicators such as percentage changes and resolution stats. This enhances data visibility on obligations.
  - add ObligationWidgetTable component
  ([f11f765](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/f11f765cb021dbc6ae4bf45b63541596569ce21f)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-19. Introduced the `ObligationWidgetTable` component to display a detailed table of obligations with sorting, actions, and pagination support. It integrates various obligation-specific cells such as status badges, risk levels, and assigned users, enabling an organized and user-friendly presentation of obligations data.
  - create editable field datepicker
  ([c85899b](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/c85899bbea3a66e547c021f948a66c8c746a7522)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-17.
  - create obligation editable field datepicker
  ([a5de28f](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a5de28fc5cd3667eefca25ecae822ed5f62ab263)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-17.
  - create obligation table cell source component
  ([d05348e](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/d05348ed10dfc93557ad3d20d60786062a0c7a25)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-17.

- profile
  - refactor and enhance profile components
  ([ae3adf4](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/ae3adf4a6375c0d561c708aaedb760773a6be0a2)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-18. Refactored profile components for improved modularity and maintainability. Introduced reusable components and updated naming conventions to align with the project's naming consistency. Enhanced user feedback with toast notifications for profile actions.

 Key Changes:
- Removed `ProfileSettings` component, merging functionality directly into `profile/page.tsx`.
- Added `InfoRow` component for consistent display of labeled data points.
- Updated naming for profile-related components (`ProfileCardAvatar`, `ProfileCardInformation`, etc.).
- Implemented toast notifications for success and error scenarios in user-related queries.

- scripts
  - add script to find unused components
  ([2805cce](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/2805cce459f8d1efefc0cda8cb114a6d10c18bfd)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-19. Added a new script to identify unused components within the `src/components` directory. The script scans all source files to determine if components are used, improving maintainability by making it easier to detect and remove unused code.

- shared
  - migrate shared utilities to _shared directory
  ([f03221e](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/f03221ee59336f7efb7b857afab7be566953c29f)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-22. Moved the contents of `shared` to a new `_shared` directory as part of a reorganization effort. This change improves module separation and aligns with updated project standards.

- sources
  - add tooltip to source name cell
  ([50fa774](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/50fa774bb932d240639c5c64870cc49cde82e39a)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-22.
  - create component for source content types
  ([6f2e987](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/6f2e9878b61edd43a80838952f85962125ecbf38)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-22.
  - replace SourceTableCellSourceName with TableCellTitleAndLink
  ([a9478a2](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a9478a2e2de85386f1f515442b760e93ddf2bbf7)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-22. Replaced the `SourceTableCellSourceName` component with the more reusable `TableCellTitleAndLink` in `SourceTableCellLink`. Added an additional null check for `data.id` and `data.name` to improve robustness when rendering links.
  - add SourceWidgetMonitoredSources component
  ([f9f72b7](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/f9f72b7dc74aa2e885b465e443004446f66ab300)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-19. Introduced the `SourceWidgetMonitoredSources` component to display monitored sources. This component fetches source data using the `useSourcesPagination` hook and provides a concise overview of monitoring-enabled sources. The UI includes total source count, percentage change, and active source ratio, enhancing data visibility for monitored sources.
  - add custom cell for name with url
  ([1494ed3](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/1494ed31c2d931cbda4fc78de66d6133487b552b)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-17.
  - create universal source name table cell component
  ([e9809cf](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/e9809cf10fe7a09e7c7dd4b25c61ce5ad72766db)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-17.

- stores
  - refactor store logic using shared utility
  ([cc6d84f](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/cc6d84f95e9f2d4d7b26e5ce401b4c233f338633)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-22. Replaced repetitive store implementations with a shared `createSelectableStore` utility. This change reduces code duplication and centralizes logic for better maintainability.

- ui
  - add tooltip for table text cells
  ([96aaf0a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/96aaf0af6d82158dec5e3c915d1f80b9b0145a2c)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-22.
  - create footer component
  ([8fdcb9e](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/8fdcb9e480e6cdc7f5c59bfd490276f668941095)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-22.
  - show footer component
  ([5457ca7](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/5457ca724e02b3c38d70b9e97c18d3f4af10e9e3)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-22.
  - add choosing theme functionality
  ([acafdbc](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/acafdbcbd36df60e01b0cabcfb98d53b3eb0cd9e)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-19.
  - add collapsed sidebar
  ([a1de670](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a1de67021021aff4c8871632c6b6b2255f148373)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-19.
  - add dark theme for alert dropdown action
  ([fbac707](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/fbac70797571124f16a5aed3e10907b7d80c3b49)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-19.
  - add dark theme for alerts table
  ([3d28b08](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/3d28b086d40f55cef32c1de8e35a3f272501a9e6)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-19.
  - add dark theme for compare changes viewer
  ([a75fd29](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a75fd2968d21ac1f14db4c497652c6067e25f2ef)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-19.
  - add dark theme for dashboard
  ([1449d3f](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/1449d3fb5f7e47e74a6558937d29e82d4a9de45f)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-19.
  - add dark theme for obligation dropdown action
  ([75a5b4f](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/75a5b4faef1235a01f5af493a6298d8c1f069810)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-19.
  - add dark theme for obligations table
  ([e0ca017](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/e0ca017130db8f3ae77f0dea1db77f154e919780)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-19.
  - add dark theme for sources dropdown action
  ([f7bbbe1](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/f7bbbe185fcb6a16580925916f790a0fe5048bd6)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-19.
  - add dark theme for sources page alerts dropdown action
  ([2b01f52](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/2b01f52ac1d45b1615ff2efdd3e4b09937c037b9)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-19.
  - add dark theme for sources page dropdown action
  ([624d89b](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/624d89bddb8e88a9a3db3e6defa4a8a8b1aaac19)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-19.
  - add dark theme for sources pages alerts table
  ([3a1938d](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/3a1938dd659dc47644323523646789c21a8b467d)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-19.
  - add dark theme for sources pages table
  ([3e4fa0a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/3e4fa0afce8136b2a82d2b59546f18c6a1704da6)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-19.
  - add dark theme for sources table
  ([2db6037](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/2db60376b4786191f78c8b4e1f2b361c9ad35de3)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-19.
  - add profile appearance tab and fix tabs ui
  ([c320d41](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/c320d41bccc2483db518123522dec2a3a32524cd)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-19.
  - add theme provider
  ([3b25199](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/3b25199736b1c02fe8a1a5e7ffdb554d16fc21b3)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-19.
  - create tailwind config
  ([6621741](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/6621741dc1f48e56ebbd3537aedc77816deed09c)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-19.
  - add Breadcrumbs component to AppHeader
  ([5c4d692](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/5c4d692b29cb5088e42f6dc46c062104d6dc11eb)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-17. Enhanced navigation by introducing a Breadcrumbs component in the AppHeader. Breadcrumbs dynamically display the current navigation hierarchy, filtering out router-specific group folders and handling route segments contextually based on the page type.
  - pass dynamic pathname prop to dropdown actions
  ([a0fe04c](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a0fe04c13a40e85e3aecb724ab11536c991d8e98)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-17. Enhanced dropdown actions by making the pathname dynamic in the SourcePages dropdown components. This ensures better reusability and contextual navigation based on the page routing.

### Bug Fixes
- alerts
  - fix tooltip in alerts titles
  ([02a5f6e](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/02a5f6ef2163aeb3ac0cda771699f41abb7b8834)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-23.
  - add tooltip to alerts title cell
  ([eedb75d](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/eedb75deebdd0527844e15a97e7b42ad56a382b3)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-22.
  - change styles for tooltip
  ([6c2e057](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/6c2e0577f7c0973cddd3d4ed1a0742d59f493699)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-22.
  - show alerts users names
  ([96a0ee3](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/96a0ee38fcf47418c623af70daa9f75ae9658487)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-22.
  - show formatted dates
  ([1642325](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/1642325e727094b74cf1c972a94f4e403b79ae4f)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-22.
  - refactor alert table cell link
  ([112acb8](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/112acb8ade312e6d5c7a591cd467cdd3e2ae2a08)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-17.
  - refactor alerts table
  ([db98d54](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/db98d54e511b4dd7186bf2642d2ad7272b64882d)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-17.
  - refactor alerts table
  ([209106d](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/209106d8b9aa3b289f17b13d8d5d485717a53e90)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-17.
  - remove unused import
  ([4bf0f5c](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/4bf0f5cce300e66ffda7a34a70fa9b7a96e83e0b)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-17.
  - use ALERTS_PAGE constant for pagination link
  ([41e16b5](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/41e16b5c40ac70cd0fed7c9c73de5396c46c3f73)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-17. Replaced the hardcoded `/alerts` link in `AlertTablePaginationControls` with the `ALERTS_PAGE` constant. This improves maintainability and ensures consistent usage of defined constants across the codebase.

- breadcrumbs
  - add ui for breadcrumbs
  ([dbe0221](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/dbe02214be8ffb66a90fdec17d4c75d3c4dfa9aa)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-18.
  - remove unused imports
  ([8d53d69](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/8d53d69e5630c699aee5595bd4e6b440043a5769)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-18.

- dashboard
  - fix ui of dashboard components
  ([eaaeb33](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/eaaeb33d3225ff2c2a851baee8bef8383b86fec9)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-19.

- obligations
  - fix tooltip in obligations titles
  ([af00ad0](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/af00ad042da037a832eea30405ecb329fb0f81ad)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-23.
  - add tooltip to title cell
  ([a905604](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a905604aab376e62b4762739b526bec8f837b8fd)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-22.
  - show formatted dates
  ([44fcd0b](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/44fcd0b19dacf4364b8b3c8c0df1bddda64ce954)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-22.
  - add editing dates into obligation details, fix content types
  ([6c8e853](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/6c8e85389f6e40bb2fd7c58067e37d5d244cc4d1)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-17.
  - change content types functionality in create form
  ([675f365](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/675f3651b0eaf81bb0646c9fa56880a45813189c)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-17.
  - change content types functionality in update form, fix types
  ([45d3582](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/45d3582aacc7d405ed8309f833807888327c5109)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-17.
  - change fields in obligations table
  ([9c8eace](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/9c8eace565ccbbc609062dbfd8ea7b7cf4b286b6)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-17.
  - refactor obligations table
  ([261b226](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/261b226d84eb251d886b5bdda3205df7d0900bb5)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-17.

- profile
  - fix ui in profile page
  ([674716b](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/674716b0f584a0ed1bfc7afab2648471f26decde)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-18.

- sources
  - fix tooltip for source content types
  ([5bbebf2](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/5bbebf2a5a0337ddec0d907febae9f1d13701ffa)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-23.
  - show tooltip for source description
  ([0ef35d5](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/0ef35d52234945fdefe5c362b236d6f48a642e76)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-23.
  - show content types in sources table
  ([2b6791b](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/2b6791bd3a5271df39a5b0b9eb6a5f5a95507d39)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-22.
  - change size of checkbox column
  ([66b86bc](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/66b86bc1ddd2cfa4c4a75799b5e48c99dab95791)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-17.
  - refactor source table cell link
  ([6b06e8f](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/6b06e8f8b80881d5e64176d1eb18a6d3c5156b99)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-17.
  - refactor sources table
  ([9f730ff](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/9f730ffe840a0d79fae2a9d717041c73b661804d)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-17.

- ui
  - fix tooltip in table with actions
  ([600db28](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/600db28a24c1cbac28505ed9b9b6bd2a6d47a4df)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-23.
  - fix search inputs for mobile version
  ([fb37252](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/fb37252f27ffb139356ed936d9be25b523d551b8)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-22.
  - fix titles sizes
  ([81a43d8](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/81a43d8ae5bd4bcc6b53a35d436b921c0ca93c15)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-22.
  - refactor data format helper
  ([923de71](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/923de71a2df2f5b82691f140e5a099ed5f85c002)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-22.
  - remove duplicated components
  ([8645b1d](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/8645b1d2a12bcde4b831f31c7818bc8560c3bb59)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-22.
  - show formatted date in editable field datepicker
  ([afd0164](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/afd0164df9465e21750346e9f86ffadc16462a34)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-22.
  - show selected rows in proper places
  ([2b59f64](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/2b59f640448d7865f95842adfd8f8894b06cd6fd)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-22.
  - add background for sign in page
  ([c8eb1db](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/c8eb1db1a3fffcba6a60ab5b764ae0fd5ccab74b)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-19.
  - fix pagination on mobile version
  ([86e3e13](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/86e3e139832c220ba77ac7412c8c9a6cb6da7042)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-19.
  - fix source page details
  ([3e8760b](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/3e8760bc8143bed7f82d602aafd8e1cf21798900)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-19.
  - add inline label prop into form field datepicker
  ([2de0dd2](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/2de0dd231b2af7e30bf8daa181a146e0b39b1c5c)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-17.
  - add truncate and max width to all texts in table cells
  ([ebf1c51](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/ebf1c51f0941fee8607acf670204add52918a06f)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-17.
  - fix obligation types for patch
  ([872ef77](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/872ef77453bc17bff7afffdf10e3d22c8f0f8255)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-17.

### Refactoring
- alerts
  - remove unused AlertEditableFieldTextarea component
  ([e7d361c](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/e7d361c95b4bfeb6265353c0358f75c7ec13c473)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-23. Deleted the `AlertEditableFieldTextarea` component and its associated types as it was no longer in use. This helps clean up the codebase by eliminating redundant code.
  - remove unused AlertStatusBadge component
  ([e0f05b0](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/e0f05b0f075bacfdee5d4ebd97872783ed90345b)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-23. Deleted the `AlertStatusBadge` component as it was no longer being utilized. This improves the maintainability of the codebase by eliminating redundant code.
  - rename `SourcePageAlerts` to `SourcePageAlert`
  ([1a9003b](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/1a9003ba14d5589f4fa234833eb7a3d18548c0f8)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-23. Renamed the `SourcePageAlerts` type to `SourcePageAlert` in the alert table implementation for improved naming clarity and consistency. Updated all relevant imports, type references, and table configurations.
  - rename alert badge components for consistency
  ([9c04424](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/9c04424b4d94d0fe0b2d3d4241283200c7818d55)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-23. Renamed `AlertRiskBadge` to `AlertBadgeRisk` and `AlertStatusBadge` to `AlertBadgeStatus` for improved naming clarity and consistency across alert components. Updated all relevant imports, usages, and the changelog to reflect these changes.
  - remove unused editable field components
  ([c5b60a1](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/c5b60a1f6898042a1156887905b30296176e1a98)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-19. The `AlertEditableFieldTextarea` component and its associated references were removed as they are no longer in use. Simplified code by cleaning up commented sections and consolidating the usage of `FormFieldReadOnly` for displaying non-editable fields.

- avatar-uploader
  - remove unused component and types
  ([ebfb27f](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/ebfb27f59d217ae14742908fb4dd94611a753d44)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-23. Deleted the `AvatarUploader` component along with its associated `types.ts`. These elements were no longer utilized in the project, and their removal streamlines the codebase, enhancing maintainability.

- card-delete
  - remove unused component and types
  ([df37044](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/df370440828ebd5cd65695a63a12ebb717f15d28)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-23. Deleted the `CardDelete` component and its associated `types.ts` file as they are no longer utilized in the codebase. This cleanup reduces unnecessary code, streamlining the codebase and improving maintainability.

- card-document
  - remove unused component
  ([1e10348](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/1e10348a0f70f50b47b81e846daa89cd9bea3f5f)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-23. Deleted the `CardDocument` component as it is no longer utilized in the codebase. This cleanup helps to streamline the codebase, reduce unnecessary files, and improve overall maintainability.

- changelog
  - fix incorrect component name
  ([465cdd5](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/465cdd5ac5937f7dedffb96c275e384a2df22db0)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-23. Corrected the name of the "PostCreateForm" component to "PostFormCreate" in the changelog for alignment with the actual component naming. This ensures accuracy and consistency in the documentation.
  - fix typos in component references
  ([1277698](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/1277698715b4583e39561ed492497ff59239b5e6)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-23. Updated `CHANGELOG.md` to correct naming inconsistencies for components. These changes align the changelog entries with recent renaming refactors and ensure proper reference to the updated component names.
  - update component names for consistency
  ([da48fa4](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/da48fa4df3b874473a23368f9508d14a62da7b10)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-23. Adjusted component names in the changelog to reflect recent renaming changes: `NavUser` to `UserNavigation` and `NavUserInfo` to `UserNavigationInfo`. This ensures that the changelog aligns with the updated component structure and naming conventions.

- components
  - rename and standardize component names
  ([249fdc9](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/249fdc95b66612e058defce7312a738d2e497b13)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-22. Renamed several components to enhance naming consistency and align with a unified naming convention across the codebase. Updated relevant imports and usage throughout the application.
  - replace StatCard with WidgetCard
  ([b849d67](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/b849d67bb514880f6ad54176b25a583d0c448d34)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-22. Replaced the `StatCard` component with an updated and more versatile `WidgetCard` component. The new component improves flexibility and reusability by streamlining prop structure and adopting an enhanced design. This change aligns the component's structure with modern conventions and simplifies its usage.
  - restructure paths and typings for Checkbox and Logo
  ([da3c3a6](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/da3c3a6a754a48d0d66acebdb5be47fcaf95362e)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-22. Updated the import paths for `Logo` and `LogoImage` components to reflect their reclassification into more appropriate directories based on their usage. Introduced a dedicated types file for `Checkbox` and updated its prop typings to enhance type safety and improve maintainability.
  - remove LatestPost component
  ([82bcb6d](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/82bcb6dc0d8c28c32b2e0508ebd7bc380ae1f36c)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-19. The `LatestPost` component was removed from the codebase as it was no longer in use. This cleanup step helps to declutter the project, making it more maintainable and reducing unused code.

- dashboard
  - remove deprecated DashboardContent component
  ([e34e741](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/e34e741014404c34879ebf0004ead8d491b294f5)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-22. The `DashboardContent` component was removed as it is no longer needed. This change simplifies the codebase while ensuring unused and outdated components are cleaned up.

- data-table
  - enhance type safety in sorting logic
  ([6200fa4](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/6200fa4cebdef88c1a8a56e89fcd4654c2190f8d)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-17. Updated sorting logic to include `undefined` as a valid value in the `OrderBy` type, enhancing type safety and usability. Adjusted related helper functions to handle the new type definition and ensure filtering behaves as expected.
  - improve sorting logic and readability
  ([a6410a7](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a6410a74b82c1eccb0e0eace34de87c63f129e0c)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-17. Reorganized and simplified sorting logic in `DataTableWithActions`. Replaced the existing `createOrderByValue` function with new reusable helper functions `sortedItems` and `orderByToString` for better code clarity and maintainability. Introduced typed sorting-related functions like `toggleSortDirection` and `makeSortDirection` and adjusted `handleSort` to use the new logic.

- editable-field
  - remove unused component and types
  ([485326a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/485326a12e7e382208ee3a220658e20b16354078)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-23. Deleted the `EditableField` component along with its subcomponents (`ButtonsPanel` and `EditFieldButton`) and associated types. These elements were no longer utilized in the codebase, and their removal helps streamline the codebase and improve maintainability.

- filter-dropdown
  - rename component and types
  ([6a999e0](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/6a999e08dbd340c83ef94240b4aa1f4594812638)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-23. Renamed `FilterOptionDropdown` to `FilterDropdownOption` and updated related type definitions for improved naming clarity and consistency with the component structure. This aligns the naming convention with other components in the codebase.
  - update component reference
  ([2ef9d94](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/2ef9d94399cf2e10d25dd46c4ea60c61a5581856)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-23. Replaced the `FilterOptionDropdown` component with `FilterDropdownOption` for better clarity and naming consistency. This change ensures alignment with the component structure and improves semantic readability.
  - use helper for query building
  ([e2543e4](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/e2543e4af2c6dde05a8d6b94a5321332a6609e1f)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-17. Replaced inline logic for building search params queries with the reusable `buildSearchParamsQuery` utility. This improves code readability and centralizes the query-building logic, enhancing consistency across the application.

- footer
  - dynamic rendering of footer links
  ([d11a3cc](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/d11a3ccef7641782d138e31d11e8c0b2b8ce4bac)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-23. Replaced hardcoded footer links with a dynamic list generated from the `footerNavigationItems` constant. This improves flexibility and maintainability by allowing footer links to be easily updated or modified through a single source of truth.
  - rename and replace NavUser component
  ([9e9d86e](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/9e9d86e4c1cd9b41cfb82b144de2e8efa5977e6a)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-23. Replaced `NavUser` with `UserNavigation` in the `AppSidebarFooter` component to align with updated naming conventions and the refactored component structure. This change enhances consistency and code maintainability across the project.

- form
  - remove FormFieldInput component
  ([788853b](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/788853b3f126fe6cca0f01b133e6e7f0577f8ded)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-19. Removed the `FormFieldInput` component and its associated types to declutter the codebase. This component was deemed redundant or replaced with alternative solutions, simplifying future maintenance and reducing unnecessary complexity.

- header
  - comment out unused notification button
  ([25f0dc4](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/25f0dc455687d70076ff0726ec14467bb41c21c0)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-23. Removed the rendering of the notification button in `AppHeader` as per a customer request. The commented-out code can be reintegrated if needed in the future, ensuring a clean and responsive header layout.

- logo
  - replace hardcoded link with constant
  ([627bacc](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/627bacc6718105f2172560072c7d529bc57ae11d)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-23. Updated the `Logo` component to use the `DASHBOARD_PAGE` constant instead of a hardcoded `/dashboard` URL. This change helps centralize and standardize the handling of shared constants, improving maintainability and reducing duplication.

- nav-user-info
  - remove unused type definitions
  ([27d51d1](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/27d51d14278f54336188bdaeb477a58726bd03c6)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-23. Deleted `NavUserInfoProps` type definition as it was no longer in use. This cleanup reduces unnecessary code and improves maintainability.

- navigation
  - add footer navigation items
  ([08fab16](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/08fab16aa6c6cd31e5c75894e3a2ffcd15830874)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-23. Introduced `footerNavigationItems` to include dynamic links for "Privacy Policy" and "Terms of Service" in the footer. Modified `NavigationItem` type to include optional `icon` and `target` properties, enabling more flexible configurations.

- obligation-update
  - remove unused code
  ([ca115a3](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/ca115a3784a512f36010c8a711248b059604b6cc)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-17. Removed commented-out code related to alerts and other unused mapping logic in `ObligationFormUpdate` to improve readability and maintainability. The updated implementation ensures that only relevant code remains, reducing potential confusion for developers.

- obligations
  - remove commented code block
  ([f32765c](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/f32765ca7b630abc152aaffb8ea8e30ece16e7f5)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-23. Deleted a commented-out code block related to assignment and progress details in `ObligationDetails`. This cleanup improves the readability and maintainability of the file by removing unused elements.
  - remove unused badge status component
  ([f43930d](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/f43930d82ee30d512622d9dcc52a60ab70700acb)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-23. Deleted the `ObligationBadgeStatus` component and its associated types as they are no longer utilized in the codebase. This cleanup reduces unnecessary code and improves maintainability by removing unused elements.
  - remove unused editable field component
  ([a1013fc](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a1013fce8b8ac37da297a3be5c327e6eea58f1ee)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-23. Deleted the `ObligationEditableFieldInput` component and its associated types as they are no longer utilized in the codebase. This cleanup reduces unnecessary code and enhances maintainability by removing unused elements.
  - rename ObligationRiskBadge component
  ([e5a89ab](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/e5a89ab9be6b6d5b2f28a4229b469670887004c5)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-23. Renamed the `ObligationRiskBadge` component to `ObligationBadgeRisk` to align with consistent naming practices across the codebase. This improves clarity and adheres to established naming conventions.
  - rename ObligationStatusBadge component
  ([17a7e7c](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/17a7e7ca80e5f6cb5162fe883719a9c518a545a3)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-23. Renamed the `ObligationStatusBadge` component to `ObligationBadgeStatus` to align with consistent naming conventions within the project structure. This change improves clarity and adheres to the standard naming pattern across components.
  - update risk badge component usage
  ([db16ead](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/db16eadca6272c1fccad203b6812475aee9513ec)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-23. Replaced the `ObligationRiskBadge` with `ObligationBadgeRisk` in `ObligationWidgetTable` to align with the updated naming conventions. This change enhances consistency and adherence to the project's standard naming patterns.
  - update risk badge component usage
  ([0663d4f](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/0663d4f65bc67df053da4efbb76b778bc0477cee)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-23. Replaced the usage of `ObligationRiskBadge` with `ObligationBadgeRisk` in `ObligationTable`. This change aligns with recent renaming for consistent naming conventions across the codebase, improving clarity and maintainability.
  - rename table cell components for clarity
  ([b2af98f](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/b2af98feced8cfd713137c54ec0379a2be053973)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-17. Renamed table cell components in the Obligations module to improve naming consistency and better reflect their usage. Updated all related imports and component references throughout the codebase.

- pagination
  - move TablePaginationControls to molecules
  ([3be0695](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/3be06959a70567b1757edcbef34251c967e13ed5)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-17. Moved `TablePaginationControls` from the `organisms` folder to the `molecules` folder to better reflect its role as a lower-level reusable component. Updated all relevant imports across different components for consistency.

- posts
  - remove obsolete post components
  ([0dc944a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/0dc944ace09d4221578e959db4f91db3c7c5fdde)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-23. Removed unused components related to post handling, including forms for creating, updating, and patching posts, as well as supporting components for deletion and displaying posts. This cleanup enhances codebase maintainability and removes redundant code.

- profile
  - remove unused profile card components
  ([1549945](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/15499457a0367b4c4931dc3aa88f71625aa0ccee)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-23. Removed `ProfileCardAvatar` and `ProfileCardDelete` components since they are no longer referenced or used in the codebase. Updated the `ProfileTabContent` to remove commented code associated with these components. This cleanup simplifies the profile codebase and enhances maintainability.

- qodana
  - remove unused imports and redundant components
  ([7661b82](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/7661b82389d4bb0df8c0f45ca65f5d3121a61af9)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-19. Removed unused imports and redundant components across the codebase to improve maintainability and reduce clutter. This change ensures cleaner and more focused components, following best practices.

- sidebar
  - conditionally render icon component
  ([2c1a0bd](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/2c1a0bd07ade5a6a79a692f297681ac31e0777ff)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-23. Updated the `AppSidebar` component to conditionally render the `icon` only if it exists. This ensures better handling of cases where the `icon` property might be undefined, preventing potential rendering errors.
  - split AppSidebar into modular components
  ([3e91c03](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/3e91c038f6429cc9a5aad364756f4e7c064122af)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-23. Decoupled the `AppSidebar` into separate reusable components: `AppSidebarHeader`, `AppSidebarContent`, and `AppSidebarFooter`. This improves code reusability, readability, and maintainability by adhering to a modular structure.

- source-pages
  - replace page cell component with updated implementation
  ([2f89551](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/2f89551d28a381d8e05eded36578f00dd36a02cc)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-23. Replaced `TableCellTitleAndLink` with a new `SourcePageTableCellPageName` component to improve structure and readability of the page column in the `SourcePageTable`. Updated the table's action configuration to leverage the new component for rendering page links more effectively.

- sourcepagealerts
  - update import paths for renaming
  ([c0bd289](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/c0bd2891b73e94dfc759ef68c67e9d99409dd97e)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-23. Updated import paths in `SourcePageAlertsTable` to reflect the renamed folder structure. This aligns with recent naming conventions to improve consistency.

- sourcepages
  - correct import path for SourcePageAlertsTable
  ([d1a8a55](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/d1a8a55f3b8d8d48ff6324d3dec7936a657674d8)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-23. Updated the import path for `SourcePageAlertsTable` in `SourcePageDetails` to match the renamed folder structure. This change ensures the component resolves correctly and aligns with recent naming standardization efforts.
  - fix typo in folder name for dropdown action
  ([2c83c48](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/2c83c488ba6bedf736450819f767448ce32f70fe)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-23. The folder name `SourcePageDropdownActions` was corrected to `SourcePageDropdownAction` to ensure consistency with component naming standards and proper resolution of the corresponding component.
  - fix typo in import path for dropdown action
  ([ea687f6](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/ea687f6af1ba2db0703a17479f5d0be55324a99a)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-23. Updated the import path for `SourcePageDropdownAction` in `SourcePageTable` to correct a typo. The change ensures proper resolution of the component and aligns with recent standardizations across the codebase.
  - inline SourcePagesMonitored component
  ([0916dfd](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/0916dfd9e9874732caf467bcc7126184c917b8a9)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-23. Removed the `SourcePagesMonitored` component and inlined its logic directly within the `page.tsx` file. This simplifies the structure and reduces unnecessary component layers.
  - remove PageTitleCell component
  ([4c94f2c](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/4c94f2c5a6aa4756cfb993a505bf49e945932eb3)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-23. The `PageTitleCell` component was deleted as it is no longer in use. This aligns with the ongoing effort to transition to the reusable `TableCellTitleAndLink` component, which offers greater flexibility and consistency in rendering titles and URLs.
  - rename SourcePageAlertsDropdownActions folder
  ([d843aef](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/d843aef4e64b6e511401ffe2cade581bb9fd867f)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-23. Renamed the `SourcePageAlertsDropdownActions` folder to `SourcePageAlertDropdownAction` to align with singular naming conventions and recent refactor efforts. This change ensures consistency and improves clarity in component structure.
  - rename SourcePageAlertsFilters to SourcePageAlertFilter
  ([aa539b0](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/aa539b0eeaf777b2d37ee9dc9d939ad1f2fb7f11)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-23. Updated the `SourcePageAlertsFilters` component to `SourcePageAlertFilter` to maintain consistency with singular naming conventions across the codebase. This change ensures alignment with recent efforts to standardize component naming practices.
  - rename SourcePagesFilters to SourcePagesFilter
  ([cee4632](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/cee4632be46dfc2b45137e7479d3a741179a8ee1)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-23. Renamed the `SourcePagesFilters` component to `SourcePagesFilter` to maintain consistency with singular naming conventions across the codebase. This change aligns with recent refactor efforts to standardize component naming.
  - rename SourcePagesTable to SourcePageTable
  ([bcd771a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/bcd771adc7d819b295d4bed20a8a76a9e51ffcb8)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-23. Renamed `SourcePagesTable` component and its related files to `SourcePageTable` to align with
existing naming conventions. Updated all relevant import paths and references. Replaced the
deprecated `PageTitleCell` component with the reusable `TableCellTitleAndLink`.
  - update import path for SourcePageTable
  ([d182989](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/d182989e80800a7c6dd504859ffa625195cc0a4f)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-23. Renamed `SourcePagesTable` to `SourcePageTable` in the import path of `SourcePageMonitored` component. This change aligns with the recent refactor to adopt consistent naming conventions across the codebase.
  - update TableCellTitleAndLink usage
  ([3c92002](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/3c920023722160e49df38fc48f1069fbc92e3302)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-23. Replaced the `custom` property content in the `SourcePageTable` configuration to use `TableCellTitleAndLink` with explicit `title=''` and `url={null}` values. This ensures that default values are explicitly provided.

- sources
  - update type import in SourceRiskBadge
  ([6bd26b7](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/6bd26b7eacd3ba4e84ac9ef50c2de45d21584bf1)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-23. Updated the type import for `SourcePage` in `SourceRiskBadge` component to fix the import path. Added a TODO comment questioning the necessity of this type in the specific context.
  - remove SourceTableCellSourceName component
  ([4de9c31](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/4de9c3111728aa51346640c2d91933c8e6e4b1fb)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-22. Removed the `SourceTableCellSourceName` component from the codebase as it is no longer in use. This aligns with the recent changes where the component was replaced by the reusable `TableCellTitleAndLink` component in multiple areas to enhance flexibility and maintainability.
  - replace Statistic layout with individual widgets
  ([d4bf02a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/d4bf02aaf74eb6099aabd829bbabf8d58e644328)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-22. Reorganized the `Statistic` page for sources by replacing the single statistic layout with individual widgets for "Monitored Pages," "Detected Alerts," and "New Obligations." This change abstracts each statistic into its own component, improving modularity and maintainability.
  - rename `SourceNameTableCell` for clarity
  ([f0600e7](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/f0600e73dc7654ad536ff69764a111f0065103ef)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-17. Renamed the `SourceNameTableCell` component to `SourceTableCellSourceName` to improve naming consistency across components and enhance clarity in its intended use. Adjusted all related imports and references to accommodate the new name.

- tooltip
  - simplify tooltip usage and update styles
  ([cdc13fe](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/cdc13fe89341ada5ae0fe0a857e1ad4c8cd68b93)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-23. Simplified the `Tooltip` component usage by removing unnecessary `p` tags within the `triggerElement` and children. Added an optional `asChild` prop to `Tooltip` for better customization when wrapping elements and adjusted the default styles for consistent truncation and display.

- types
  - update import paths for type definitions
  ([3035d8a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/3035d8ac0eb9e475c0d9bd9027d057ae49e4ebf0)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-22. Reorganized type definition import paths to use absolute imports instead of relative ones. This change improves consistency, readability, and maintainability of the codebase by adhering to a unified import strategy.

- ui
  - standardize Title component styles
  ([a136ceb](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a136ceb9a8739875036496a9350ec362f99a5de8)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-22. Updated the `Title` component styles by removing repeated `font-semibold` declarations across various components and centralizing the font styling within the `Title` component itself. This change ensures consistency and reduces redundancy in style definitions.

- user-navigation
  - rename and restructure components
  ([a8d32a0](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a8d32a081f0aed721644e54b5d7d5e12d93aebc8)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-23. Renamed `NavUser` to `UserNavigation` and `NavUserInfo` to `UserNavigationInfo`, aligning with the updated structure and naming conventions. Introduced separate `types.ts` files for new components to maintain clarity and ensure scalability. This refactor improves consistency and facilitates better component organization.

### Documentation
- readme
  - update README with project details
  ([b181aef](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/b181aef3ca0ee46f27ca8021484079d149f8c15f)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-19. Updated the README file to include comprehensive project details such as framework, tech stack, setup instructions, environment variables, scripts, project structure, and release workflow. The updated README serves as clear documentation for developers, aiding in onboarding and maintenance.

### Chores
- release
  - 0.5.0
  ([1cb8473](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/1cb84730a423a1ea280cd3bd97bbda28279f3be7)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-23.
  - 0.4.3
  ([88bd464](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/88bd4648e8931881f3e04ff7d384bac6131b2f5b)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-18.
  - update CHANGELOG for v0.4.2
  ([e5f5764](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/e5f5764f640e081a944183ff59fb7a53599377f8)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-16. Updated the CHANGELOG to include all the features, fixes, and refactoring changes introduced in version 0.4.2. This includes pagination controls, new filter options for alerts and obligations, query caching improvements, and various bug fixes.


## v0.4.2 - 2025-09-16

### Features
- alerts
  - add pagination controls for alerts
  ([9e33eed](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/9e33eedfb148f1de595e168c8e6246c3181c6f0b)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-16. Introduced `AlertTablePaginationControls` component to handle dynamic pagination for the Alerts table. This component utilizes the `useAlertsPagination` hook to fetch and render paginated data based on search parameters. It enhances modularity and reusability by centralizing pagination logic.
  - add source and content type filters
  ([7a6f457](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/7a6f457276d227fc94994501afc37229b8deda8a)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-16. Enhanced the Alerts filter dropdown by introducing new options for "Sources" and "Content types." These filters support multi-select and provide better granularity in the alert data displayed.

- api
  - centralize query keys using QUERY_KEYS constant
  ([6aaf7a6](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/6aaf7a678d31f9d61b14820afaffb570187c08d9)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-16. Centralized the query keys across API services by replacing hardcoded strings with the `QUERY_KEYS` constant. This improves maintainability and consistency, reducing the chance of errors when changing or extending query keys in the future.
  - improve source queries and caching logic
  ([31e0f9b](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/31e0f9bf797ca64763c6e3011845d8f4434a9897)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-15. Enhanced source queries with better cache normalization and management using React Query. Added specific invalidations for refined cache updates. Replaced logging with user-friendly toasts for operations like create, update, patch, and delete, improving UX and visibility.

- constants
  - add new query params for filtering
  ([95eba9f](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/95eba9f0cf75f440b8d9f2c03f337c9e61bc6c9d)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-16. Added `sourceIn` and `contentTypeIn` to the `searchParams` constants for improved flexibility in handling query-based filtering. These parameters support multiple values, enhancing the versatility of API requests.

- obligations
  - add pagination controls for obligations
  ([611d766](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/611d76609ecadd840942a07954a9e1f58d5837fc)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-16. Implemented `ObligationTablePaginationControls` component to handle dynamic pagination for the Obligations table. This component leverages the `useObligationsPagination` hook to retrieve and render paginated data based on search parameters. It enhances modularity and reusability by offloading pagination-related logic into a dedicated component.
  - add source and content type filters
  ([c2c4b63](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/c2c4b638eb5d2c59f1d66fe74b20e272476162fc)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-16. Enhanced the Obligation filter dropdown by adding "Sources" and "Content types" as new filter options.
These options support multi-select for sources and single select for content types, providing better filtering
flexibility and granularity.

- rest
  - add entity helpers for query data management
  ([65290f0](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/65290f0ccdd0caac2b3e1e53643d895b7ee32566)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-15. Added utility functions `entityKey` and `upsertEntities` to streamline managing entity-specific
query data in applications using React Query. These helpers enable consistent entity key
generation and efficient upsert operations on cached query data, supporting better state
management and reducing redundant code.

- sources
  - add pagination controls for SourcesTable
  ([41c22b5](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/41c22b59cdea1ef9eb1a34a4b54cec15ece42fee)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-16. Introduced `SourceTablePaginationControls` component to handle dynamic pagination in `SourcesTable`. This component utilizes the `useSourcesPagination` hook to fetch and display paginated data based on search parameters. It improves modularity and reusability by extracting pagination logic into a separate component.

- table
  - enhance sorting and actions handling
  ([73a9675](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/73a96750b0b4c502b5f69ade37f21695a9209e0a)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-16. Refactored `DataTableWithActions` to improve sorting logic, enhance reusability, and simplify URL query handling. Implemented helper functions for manipulating sort icons, URL parameters, and order-by values, ensuring clearer and more maintainable code.

### Bug Fixes
- alerts
  - remove redundant disabled attribute from Delete button
  ([f9bc1cb](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/f9bc1cb9c61fc340175290fca97be7ecdd3d62cb)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-16. Removed the redundant `disabled` attribute from the Delete button in the `AlertDropdownAction` component. The button already gains its state from other logic, making the attribute unnecessary. This change streamlines the button's code and ensures cleaner implementation.

- obligations
  - remove redundant disabled attribute
  ([de8b803](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/de8b80320d6ee0b6cd56e907720d669ec5877c13)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-16. Removed the unnecessary `disabled` attribute from the Delete button in the `ObligationDropdownAction` component. The button's state is already managed through existing logic, making the attribute redundant and improving code clarity.
  - remove unnecessary error toast
  ([b7eab47](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/b7eab47f5a3bec36315bab17112768ca900f832e)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-16. Removed the redundant error toast in the `ObligationButtonDelete` component's `handleDelete` function. The error message was unnecessary as error handling is already managed appropriately elsewhere.

- sources
  - remove redundant disabled attribute
  ([07eff0b](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/07eff0b232a538b9b742726898ddccd9a6e8c69e)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-16. Removed the unnecessary `disabled` attribute from the Delete button in the `SourceDropdownAction` component. The button's state is already handled by existing logic, making the attribute redundant and improving code clarity.
  - remove redundant success toast
  ([cf74062](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/cf74062478cc86fb4e98ae95a8c3e9c88ef17467)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-16. Removed an unnecessary success toast in the `SourceDeleteButton` component's `handleDelete` function. The toast message was redundant as user feedback is already handled through existing logic.

### Refactoring
- alerts
  - replace generic pagination controls and data
  ([a200a21](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a200a21fc8395854417551d99769c32417aff667)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-16. Replaced `TablePaginationControls` with `AlertTablePaginationControls` in the Alerts list view to align with the dynamic pagination approach used in similar components. Removed unused `pagination` logic and adjusted `AlertTable` to rely on `searchParams` for fetching dynamic data.
  - replace useDeleteObligation with useDeleteAlert
  ([1c27f17](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/1c27f17af7590ee790c2f79e9a6238ef2b81607d)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-16. Updated the `AlertButtonDelete` component to use the `useDeleteAlert` hook instead of the `useDeleteObligation` hook. This aligns with the naming conventions and the appropriate hook for deleting alerts.
  - use dynamic pagination in AlertTable
  ([861e88c](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/861e88c7922c38538844639a4620f58ce92803fa)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-16. Updated the `AlertTable` to fetch paginated data dynamically using the `useAlertsPagination` hook. Replaced the static `data` prop with `searchParams`, enabling dynamic population of `data` based on the pagination response. This aligns the component with the pattern used in other tables and improves scalability and maintainability.

- api
  - remove unused constant in source queries
  ([494ca3b](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/494ca3b71d496b2032486fb4b017a070b334288a)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-16. Removed the unused `PAGINATION` constant import from the `queries.ts` file in the `source` API directory. This cleanup ensures the file contains only relevant dependencies, improving readability and maintainability.

- obligations
  - replace TablePaginationControls in list view
  ([fc8a46d](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/fc8a46df7cd5eea370856ce16be298c6411c5725)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-16. Replaced the generic `TablePaginationControls` with the specific `ObligationTablePaginationControls` in the Obligations list page. Simplified the component by removing unused `pagination` logic and updated `ObligationsTable` to rely on `searchParams` for dynamic data handling.
  - use dynamic pagination in ObligationsTable
  ([4c8638d](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/4c8638d80044b90b1b020300fdf340008e74dc03)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-16. Updated `ObligationsTable` to dynamically fetch data using the `useObligationsPagination` hook. Replaced the static `data` prop with `searchParams` and adjusted the component to use the pagination response. This improves scalability and aligns with existing pagination logic in other components.
  - use query keys constants in hydration
  ([8af8b74](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/8af8b74f496d156afa8561a3da7d86cf5d39273b)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-16. Replaced hardcoded query key strings in `ObligationPage` with `QUERY_KEYS` constants. This ensures consistency across the application and prevents potential issues caused by typos or mismatches in query keys.

- sources
  - replace hardcoded query keys with constants
  ([9ebd113](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/9ebd113c1474c6f5af949a4ed682134ff434f7a3)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-16. Replaced hardcoded query key strings in `SourcePage` with `QUERY_KEYS` constants. This change ensures consistency in query key usage and reduces potential errors caused by typographical mistakes.
  - replace old pagination control
  ([bb548ad](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/bb548ad7fa31467d8024a047f211c586540d951a)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-16. Replaced `TablePaginationControls` with `SourceTablePaginationControls` in the `SourcePage` component to better integrate with the updated dynamic pagination logic. Removed unused `pagination` data handling, simplifying the component’s structure.
  - use pagination in SourcesTable
  ([cde6b6e](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/cde6b6eb9a48fdf8d555d180af62b714fd5e7cae)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-16. Replaced static data handling in `SourcesTable` with dynamic pagination using the `useSourcesPagination` hook. This allows the component to fetch and display paginated data based on search parameters, improving flexibility and scalability.
  - simplify createHydration args structure
  ([556c745](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/556c745bab953d1b3d76684617932ae6a50d0e39)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-15. Refactored the `createHydration` function call in the `sources` page to streamline arguments by combining configuration options into a single object. This change improves readability and consistency across the codebase.
  - simplify createHydration args structure
  ([d4f2473](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/d4f2473c490b471dd31790e539e01a0d7182cc05)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-15. Refactored the `createHydration` function call in the `sources` page to streamline arguments by combining configuration options into a single object. This change improves readability and consistency across the codebase.

- table
  - simplify column ordering logic
  ([86632dd](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/86632dd3cc8f9751c1d295945674a3910725d390)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-16. Commented out unused `columnOrder` logic in `DataTableWithActions` and replaced its usage with an empty array. This change addresses the current lack of need for column ordering, simplifying the component's code.
  - update import style for DataTableWithActions
  ([7093422](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/70934228bd7919a97fe07ff89e6730600a4094cd)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-16. Replaced default imports with named imports for `DataTableWithActions` across multiple components. This aligns with the updated export strategy, ensuring consistency and preventing potential import/export issues.

### Chores
- release
  - 0.4.2
  ([33e28fa](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/33e28fac0db27097dab3daa05ca8afc189d98db3)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-16.
  - update CHANGELOG for v0.4.1
  ([abd088c](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/abd088cd13ca37e571b0c675317d504d721a7396)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-16. Added CHANGELOG entries for v0.4.1, detailing new features, bug fixes, refactorings, and breaking changes. Highlighted enhancements such as multi-select filtering, navigation improvements, updated constants, and UI refinements. Noted the replacement of `sortField` and `sortDirection` with `params` using `orderBy`.


## v0.4.1 - 2025-09-15
### ⚠️ BREAKING CHANGE
- now expects `params` with `orderBy` instead of `sortField` and `sortDirection`.

### Features
- alert-dialog
  - add disabled state to trigger button
  ([acd79e2](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/acd79e23a248cbc1cc9dbe120fe3bb0b968363ca)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-15. Added the `disabled` prop to the trigger button in the AlertDialog component, allowing control over the button's disabled state. This improves customization and ensures alignment with various use cases where disabling the button is necessary.

- alert-dropdown
  - disable delete button in dropdown action
  ([0abdcee](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/0abdceebb42f2def2313ec9b71f1245d3a016687)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-15. Disabled the "Delete" button in the AlertDropdownAction component to prevent potentially unintended deletions. This improves the overall user experience by ensuring that the button is inactive when needed.

- alert-table
  - add cell link and href for improved navigation
  ([344f80a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/344f80a836ddd81bbbc9e1de9447bf70d633710c)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-15. Integrated `AlertTableCellLink` into the table's "Title" column to allow dynamic navigation. The column now supports cell-specific links to improve user workflow. Additionally, added `href='/alerts'` to the table for base URL routing compatibility.

- alerts-page
  - refactor description fields for alerts
  ([e2f3241](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/e2f32413864e1cdb544861532b8c78b4641a1990)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-15. Removed and restructured description fields on the alerts detail page to improve layout consistency and code maintainability. Deprecated editable fields were replaced or commented out in favor of a read-only format, aligning with updated application requirements.

- app-header
  - comment out notification bell button
  ([8bea717](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/8bea717e67a3396dde375abdce4fcfa48afc73be)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-15. Commented out the notification bell button in the AppHeader component. This adjustment simplifies the header layout and removes the button's unused functionality. The change helps streamline the UI and avoids potential user confusion regarding unavailable features.

- constants
  - add SOURCES_PAGE constant
  ([218af6a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/218af6a0e76d0e9a2bb0b8567db0cea94ad1c82d)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-16. Added `SOURCES_PAGE` constant to common exports for improved path management consistency. This ensures better reusability and centralization of route definitions used across the application.
  - add SearchParams mapping for API queries
  ([70a8a63](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/70a8a63734ff969a591a319cede260b3beb4a217)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-15. Introduced a `SearchParams` object to centralize API key mappings, making query handling more reusable and consistent. Additionally, defined `SearchParamsQuery` and related type aliases to standardize query parameter typing across the codebase.
  - add sources and sourceAssets query keys
  ([9d80fc3](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/9d80fc3ecd7d7aafa32e2a9a431e498e3147f7fe)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-15. Extended the `QUERY_KEYS` object with new keys: `sources` and `sourceAssets`. These additions enhance query key mappings, improving consistency and organization within the constants module.

- filter-dropdown
  - enable multi-select option
  ([d59166f](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/d59166f15773b19ca8f4bba191aaa8700ff11fcf)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-16. Updated the `multiple` property in the FilterDropdown component for the dropdown options to `true`. This allows users to select multiple values, improving the flexibility of the filtering functionality.
  - optimize URL sync and prevent redundant pushes
  ([7745028](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/7745028385794132623f0384ee2b41979619833b)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-16. Enhanced URL syncing in the FilterDropdown component by normalizing and comparing URLs to avoid redundant router pushes. Introduced a `normalizeUrl` utility to standardize query parameter order, ensuring deterministic comparisons. Added a ref to track the last pushed URL, preventing unnecessary state updates and improving overall component efficiency.
  - re-enable jurisdiction filter
  ([287e953](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/287e95344454ef4635dd57585fd2cbfffc72cf10)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-16. Restored the jurisdiction filter in the FilterDropdown component with support for multi-select functionality. Corrected the key name for the jurisdiction search parameter to ensure accurate query handling and alignment with server expectations.

- obligation-dropdown
  - disable delete button in dropdown action
  ([8f0a087](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/8f0a0870a74b69da0393fd7dfd90b1c0e535dae6)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-15. Disabled the "Delete" button in the ObligationDropdownAction component to prevent unintended deletions. This update improves the user experience by ensuring the button is inactive when necessary.

- obligation-table
  - add cell link and href for navigation
  ([8250e2f](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/8250e2f19e94fd289b70db96dafb3a745bef53ea)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-15. Integrated `ObligationTableCellLink` into the "Title" column of the obligations table to enable dynamic navigation to specific obligation detail pages. Additionally, added `href='/obligations'` to the table for improved routing consistency and enhanced user experience.
  - add cell link for obligations navigation
  ([d291e8e](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/d291e8e0ff0b28bdfafaff8c4cfa0a9739916d15)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-15. Integrated `ObligationTableCellLink` to wrap obligation titles with links, allowing navigation to detailed obligation views. This improves user experience by enabling direct access to specific obligation pages from the table.

- obligations
  - add ID to obligation source schema
  ([fad114b](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/fad114b05aa8a770fd6ca1cef71ecd54c2d45fba)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-16. Enhanced the obligation source schema by including an `id` field. This ensures each source can be uniquely identified, improving consistency and traceability across the application.
  - link source name to source details page
  ([3f8cffe](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/3f8cffe1895a2a8b715f8bc2ef5cc4406849db83)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-16. Added functionality to make the "Source name" field in the Obligation Details component clickable, linking directly to the corresponding source details page. This enhances user navigation and provides quick access to source information.
  - connect data and add patch functionality
  ([20e456e](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/20e456e58e5e94c9f679be6ab722b8047115e847)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-15.
  - create obligation editable field input component
  ([ae32f11](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/ae32f11db2d856dde5bf51307941a292680d2703)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-15.
  - create obligation editable field select component
  ([e5aebb4](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/e5aebb48dda0c824bab87ce16b2c4bb58890e4b1)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-15.
  - create obligation editable field textarea component
  ([7b9cc7a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/7b9cc7a9d7b2b7f91dae9c67bb9891145e404b74)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-15.
  - create obligation patch schema and add types
  ([32aea72](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/32aea720ad512f2e0cc164953155526b570f24ca)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-15.

- posts-table
  - add default href to table rows
  ([338f0e9](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/338f0e93d4b5bbbaec2631f8425d1230707658c7)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-16. Added `href='/posts'` to rows in the Posts table to enable default linking behavior. This ensures rows are interactive and provide navigation functionality even without custom links, aligning with consistent UI behavior.

- source-alerts-table
  - add default href to table rows
  ([9f645a9](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/9f645a9ffe0a471d2ecde067763d677e9bea23e4)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-16. Added `href="#"` to rows in SourcePageAlertsTable to enable basic linking behavior. This ensures rows are interactive even when no custom links are provided, enhancing UI consistency.

- source-dropdown
  - disable delete button in dropdown
  ([396f832](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/396f832f0ae1dfcea25700cd2be4254f62ee80d9)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-15. Disabled the "Delete" button in the Source Dropdown Action component to prevent unintended interactions. This change improves the user experience by ensuring the button is inactive.

- source-filter
  - set multiple to false in dropdown
  ([41fa517](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/41fa517e416548b7106ab605906c0689d071abee)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-16. Changed the `multiple` property in SourceFilterDropdown from `true` to `false`. This ensures only a single selection is allowed, simplifying the user interaction and aligning with the intended behavior.
  - disable jurisdictions filter
  ([4128c83](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/4128c838ec46248bd6bda8601634f5e9575d7065)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-15. Commented out the jurisdictions filter in the source filter dropdown to streamline filtering options. This change reduces complexity and focuses on filters that are currently more relevant for users.

- source-form
  - update default monitoring settings
  ([2425e51](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/2425e51bef558de85efa112938e351bba9ee97b5)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-15. Updated the default value of `monitoring_frequency` in the source creation form to 'daily,' ensuring consistency across configurations. Removed the "Monitor Source" switch, simplifying the monitoring configuration for sources.

- source-table
  - add default href prop to table rows
  ([fbbdce8](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/fbbdce8d37635538e2d90f3c533f763479e4aa04)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-16. Added a default `href="#"` property to the SourcePagesTable component rows, enabling basic link behavior. This ensures table rows have consistent navigation functionality even when custom links are not defined.
  - disable monitor switch and delete button
  ([2a02924](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/2a0292434089f7acb5c9bc29dfad025e5dcfb252)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-16. Disabled the monitor toggle switch and the delete button in the SourceTableRowSelected component. This ensures the respective actions are inactive to prevent unintended user interactions and maintains state consistency.
  - add link to source table cell
  ([b049161](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/b049161a3e166ca2fb28439bb7552d79a4974f3c)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-15. Created `SourceTableCellLink` to render source names as clickable links that navigate to their respective detail pages. This improves user navigation and aligns with the pattern used in other tables such as obligations and alerts.
  - integrate cell links for navigation
  ([c143734](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/c14373447e8d26fb93b6c940e741879709482ccc)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-15. Added `SourceTableCellLink` to render source names as clickable links, improving navigation to specific source detail pages. Included `href='/sources'` for standardized base URL routing in the source table, aligning with navigational patterns in other tables.
  - update header and comment out column
  ([53283e9](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/53283e9e0700964158c30dab57b508ac563ed710)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-15. Renamed the "Last Monitoring Completed" header to "Last monitoring date" for improved clarity. Commented out the "Last Monitoring Started" column per customer request, simplifying the data displayed in the table.

- sources
  - centralize SOURCE_PAGE usage with constant
  ([4e5732e](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/4e5732e7cc7ec58523a5c14fea8404d6c57bd3a5)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-16. Replaced hardcoded `/sources` paths throughout the application with the centralized `SOURCES_PAGE` constant. This ensures consistency, improves maintainability, and aligns with the established approach for path management.

- table-cell-link
  - add link wrapper for table cells
  ([cdb2de3](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/cdb2de31dda93a9eb50af7fe93f9e9cd167abd3b)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-15. Introduced a new `TableCellLink` component to wrap table cell content with a link. This allows content inside table cells to navigate to a specified URL dynamically, improving reusability and routing consistency. If no `href` is provided, the component defaults to rendering its children as-is.
  - add link wrapper for table cells
  ([36a8562](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/36a85629f5912586fa0963b399ccb2219bdbd119)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-15. Introduced a new `TableCellLink` component to wrap table cell content with a link. This allows content inside table cells to navigate to a specified URL dynamically, improving reusability and routing consistency. If no `href` is provided, the component defaults to rendering its children as-is.

- table-row
  - disable delete trigger button
  ([0f438cf](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/0f438cf6e4e9f0ad13063972c5a308c0379c35cd)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-16. Added the `disabled` attribute to the trigger button within the ObligationTableRowSelected component. This prevents the "Delete" action from being active, improving control and reducing the risk of unintended deletions.

- ui
  - add custom loadings
  ([48a7fd7](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/48a7fd75b7af86c89849d494de244a2b36b037d6)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-16.
  - create details page skeleton
  ([b19d9a1](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/b19d9a1a96ebe33f4791ddf85c068453198454b4)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-16.
  - create table skeleton
  ([276f658](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/276f6584c7a312b7e114f51bbd53467abfa08dd4)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-16.
  - create editable field input
  ([58df770](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/58df7708f6f836c20a03e3659cf46fce18bf2814)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-15.

### Bug Fixes
- alerts
  - fix source label
  ([bc1c3d6](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/bc1c3d61da149a0a76ba53ab5e92029c0b16ce8e)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-15.
  - remove unused import
  ([93b3059](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/93b3059c2dc99e696395e78b877e18edc22246fc)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-15.

- auth
  - simplify token validation logic
  ([925459c](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/925459caca4fafcb97ac1793afcf715f8d2cbfeb)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-12. Refactored the token validation function to streamline the checks for expiration and token presence. Removed redundant variables and logic, ensuring improved readability and maintainability. There are no changes to functionality.

- constants
  - correct search parameter key for jurisdiction
  ([2428b2c](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/2428b2c0b88eb2fc4cf204b98c9d9e80ea671de8)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-16. Updated the `jurisdictionName` key in `SearchParams` to use `juristiction__in`. This resolves an issue with incorrect parameter naming, ensuring proper query handling and functionality.

- nav-user-info
  - remove grayscale filter from avatar
  ([59244ac](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/59244ac450e1fb095c4f6660e1df250ce565fce3)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-15. Removed the grayscale filter from the avatar in the navigation user info component. This ensures the user's avatar is displayed in full color, improving UI aesthetics and providing a better visual experience.

- obligations
  - fix users order
  ([9de0a88](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/9de0a88287c7608bb21d56e1c1b7f532f296a5a8)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-16.

- ui
  - fix source id page
  ([8efd08f](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/8efd08fcc4a7be90c6c63b2a45b98aa0a7e62a53)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-16.
  - fix select fields styles
  ([9853869](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/9853869ca1a37cff56a4bf5689b2c38e698edb18)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-12.

### Refactoring
- alert
  - remove unused urlSchema import
  ([3b4c8ee](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/3b4c8eed913a55d7b09d20ccab70740e4e4b7404)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-12. Eliminated the unused `urlSchema` import from the alert types file. This cleanup reduces unnecessary imports, improving code maintainability and adherence to best practices.

- alerts
  - remove unused fetchUsers import
  ([7963827](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/79638270867d70902ecabe260f31d55df3efa56f)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-12. Removed the unused `fetchUsers` import from the `alerts` page. This cleanup improves code maintainability and readability by eliminating redundant imports.
  - remove unused import from types
  ([39047ee](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/39047eef68dd9db6c3540ee91361981b5136969b)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-12. Eliminated the unused `EditableFieldTextareaProps` import from the `AlertEditableFieldSelect` types file. This cleanup improves code maintainability and readability by reducing unnecessary imports.
  - remove unused obligation import
  ([6fb1922](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/6fb1922a049cd9cfce3ff773b49ecca4f3c3db5f)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-12. Removed the unused `Obligation` import from the `AlertRiskBadge` component. This cleanup improves code maintainability and clarity by eliminating redundant imports.

- alerts-page
  - normalize search params for consistency
  ([533036c](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/533036c990d17f997c71d6552b9777e7c09d5202)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-15. Replaced individual pagination-related fields with a unified `searchParams` object, utilizing the `normalizeSearchParams` helper for better consistency and maintainability. Updated data fetching logic to use `QUERY_KEYS` and `normalizedParams` for improved clarity. Simplified the pagination controls and removed redundant hydration layer for
  - simplify hydration logic
  ([f16c7a0](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/f16c7a02125613ad0d8171a3c2e51708863861a3)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-15. Removed explicit type annotation for the `fetchPaginationAlerts` and `fetchAlertAssets` hydration calls, relying on inferred types for improved readability and maintainability. Cleaned up unused import for `AlertAsset` type to reduce clutter.

- base-repository
  - simplify getAllWithPagination params
  ([a24478a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a24478aec09ac6404e056cd9adf75664a432b018)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-15. Revised the `getAllWithPagination` method to accept the `PaginationRequest` type as a single parameter. This simplifies the method signature and aligns with the updated pagination type usage. Replaced individual parameters (e.g., `page`, `pageSize`, `sortField`, etc.) with a destructured object for improved maintainability.

- crud-service
  - simplify pagination request type
  ([46925b3](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/46925b383cf5d52dca75ba6955b22bf934de723a)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-15. Revised the `fetchAllWithPagination` method in `crudService` to use a simplified `PaginationRequest` type. Removed unused parameters (`sortField`, `sortDirection`, `status`, `search`) to align with updated pagination logic and enhance maintainability.

- data-table
  - add href prop for dynamic url building
  ([d68d3aa](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/d68d3aa2680695b86a2c32b3f6227d4cceca9929)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-15. Enhanced `DataTableWithActions` to accept an optional `href` prop for constructing URLs dynamically during table sorting. Updated function dependencies to include `href` when building query parameters. This change improves flexibility in routing and aligns the data table's behavior with other components’ dynamic URL handling.

- fetcher
  - remove redundant string checks
  ([54dd0b9](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/54dd0b98c37cf2cc09a25491162ddd7d197570e4)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-12. Eliminated the redundant `typeof url === 'string'` checks in `fetcher.ts`, simplifying the conditions and improving code readability. These conditions were unnecessary as the `url` is already validated where required.

- filter-dropdown
  - add href support for dynamic base URLs
  ([9bb7bca](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/9bb7bca41dffe360ca067e6ab36b629bdc37ae6b)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-15. Extended the `FilterDropdown` component to accept a `href` prop for defining dynamic base URLs when building or updating query parameters. Updated dependent logic to include `href` in memoized computations and effect dependencies. This change enhances flexibility for integrating the filter with various routing and navigation contexts.
  - enhance filters with users data
  ([e26bede](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/e26bedeed3ac39228e1d4ae5b6cffa10b558caa4)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-15. Refactored `AlertFilterDropdown` to utilize user pagination data for the `Assigned to` filter. Replaced hardcoded filter keys with `SearchParams` constants for consistency. Updated filter options to dynamically generate based on the API responses.
  - simplify search params handling
  ([f2413b4](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/f2413b4bd061b4d71129eebcfb5e54f695679198)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-15. Revised `FilterDropdown` component to unify search parameter management using the `SearchParams` mapping. Introduced helper functions like `buildSearchParamsQueryFrom` and reorganized logic to cleanly handle URL queries. Replaced `toCsv` and `parseCsvValues` with `joinCsv` and `parseCsv` for improved clarity and naming consistency.
  - unify search params and add href support
  ([6af19d6](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/6af19d6841e7569f5b03e91171b435376cbca990)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-15. Enhanced filter components to utilize unified `SearchParams` mappings across `SourceFilterDropdown`, `ObligationFilterDropdown`, and `AlertFilterDropdown`. Added dynamic `href` prop for base URL handling, improving routing compatibility. Integrated user pagination data for the "Assigned to" filter in `ObligationFilterDropdown`.
  - remove unused import from types
  ([22c6063](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/22c6063363b67b18b4f19a7bcf06270301b2c9b9)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-12. Removed the unused `SortDirection` import from the `FilterDropdown` types file. This cleanup enhances code maintainability and readability by eliminating redundant imports.

- helpers
  - replace parsePaginationParams with normalizeSearchParams
  ([9164765](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/916476529e597b5afd7206eeb03b2c9f20cdac4a)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-15. Replaced the `parsePaginationParams` helper with a more generalized and concise `normalizeSearchParams` function. The new implementation maps API keys to application keys and simplifies parameter normalization, improving maintainability and aligning with updated search parameter handling.
  - simplify buildUrlQueryParams function
  ([90f7161](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/90f7161c6b8761605c3da605e26fd1961faef9d0)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-15. Revised the `buildUrlQueryParams` helper to use the `SearchParams` mapping and accept a single `SearchParamsQuery` object as input. This change removes redundant parameters, streamlines API key mapping, and standardizes the handling of extra query parameters. Additionally, sorting of query parameters was introduced for consistent serialization.

- obligation
  - remove unused import for updateObligation
  ([8f6f1e7](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/8f6f1e73064f7db79ca02dae4b24bacf0cc951fa)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-12. Removed the unused `useUpdateObligation` import from the `ObligationFormCreateWithAlert` component. This cleanup improves code readability and maintainability by eliminating redundant imports.
  - remove unused imports
  ([7faf501](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/7faf50174fa3a48983e337ec69eb3a8ba4aa56f9)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-12. Removed the unused `useUsersPagination` and commented `useUsers` imports from `ObligationDetails`. Cleaning up these unnecessary imports improves code readability and maintainability.

- obligations-page
  - normalize search params for consistency
  ([ea24042](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/ea24042d7bbc45864aac420e84e547101c6aea29)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-15. Replaced individual pagination-related fields on the obligations page with a unified `searchParams` object, utilizing the `normalizeSearchParams` helper for consistency and maintainability. Updated data fetching logic to use `QUERY_KEYS` and `normalizedParams` for improved clarity and alignment with recent changes. Simplified the pagination controls and removed redundant hydration layers for users and alerts.

- page-size
  - update `PageSizeSelect` for simplified props
  ([fd37658](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/fd3765884c1c36588109f716b2e2d3244081a554)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-15. Revised the `PageSizeSelect` component to replace multiple parameters with a single `searchParams` object. This change aligns with the recent refactor in pagination logic, improves maintainability, and simplifies query parameter handling. Utilized the `buildUrlQueryParams` helper for consistent URL construction.
  - update props to use searchParams
  ([4581a9f](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/4581a9fd2cb28de72105486c956d5ef470fae60e)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-15. Revised `PageSizeSelectProps` to replace individual pagination-related fields (`pageSize`, `sortDirection`, `sortField`, `status`, `search`) with a consolidated `searchParams` object. This aligns with the ongoing refactor for improved maintainability and consistency in pagination logic.

- pagination
  - simplify prop handling with searchParams
  ([9d1a035](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/9d1a035993b9e23232d817ee98dce92cae9b488a)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-15. Updated the `Pagination` component to replace individual pagination-related props (e.g., `pageSize`, `sortField`, `sortDirection`, etc.) with a unified `searchParams` object. This change reduces redundancy, aligns with recent refactor efforts, and simplifies query parameter management.
  - standardize search params and query logic
  ([50528df](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/50528df8d18ed325d834cf33e8d227dd223b246d)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-15. Unified pagination handling by replacing individual `sortField` and `sortDirection` parameters with `orderBy` for consistency. Refactored several pagination hooks to accept `params` as a single object, simplifying query key generation and API interaction. Updated related components to align with these changes. Deprecated unused props and cleaned up redundant logic.

- pagination-control
  - simplify props with searchParams
  ([eeb781f](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/eeb781ffcb55200e7997c558c384a2507c33fe83)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-15. Updated `TablePaginationControls` component to replace individual props (`pageSize`, `sortField`, `sortDirection`, `status`) with a unified `searchParams` object. This aligns with recent updates to pagination types and improves code consistency and maintainability.

- pagination-previous
  - add href prop support
  ([5c95b62](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/5c95b626bc247f4e5918b9890352cf63cc436860)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-15. Enhanced the `PaginationPrevious` component by introducing the `href` prop. This allows for direct hyperlink functionality, improving navigation capabilities and aligning with standard link behavior.

- pagination-types
  - replace individual props with searchParams
  ([bb6c797](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/bb6c797671b52ccf575f9f8b3a97619490805584)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-15. Replaced individual props (`sortDirection`, `sortField`, `pageSize`, `search`, `status`) in `PaginationProps` with a unified `searchParams` object. This simplifies the type structure and aligns with recent updates to related components, improving maintainability and consistency in pagination logic.

- post
  - simplify createPostSchema definition
  ([6d1031a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/6d1031ae97dec09e3f8402f0c7ee4605b6cdcf7b)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-12. Revised the `createPostSchema` by replacing `.pick` and `.extend` with a direct `z.object` declaration. This change improves clarity and maintains consistency with schema definitions across the codebase.

- repository
  - remove unused Logo import
  ([65f28b2](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/65f28b20c968cca3ff51b366dfa3f7855ee06db1)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-12. Removed the unused `Logo` import from `baseRepository.ts`. This cleanup reduces unnecessary imports, improving code readability and maintainability.

- source-alerts
  - remove unused imports
  ([1d31c92](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/1d31c9246a790f938763ff08ef89ecea28faffd5)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-12. Removed unused `PAGINATION`, `SORTING`, and `BaseFilters` imports from `SourcePageAlertsFilters`. This cleanup improves code readability and maintainability by eliminating redundant imports.

- source-assets
  - streamline schema definitions
  ([6d2373a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/6d2373aeb00dd5de7e076e90456b5e48e0fa9fe5)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-12. Reorganized the `sourceAssetSchema` by extracting and reusing `jurisdictionsSchema`. Replaced the inline `extend` logic with a standalone `z.object` declaration for better clarity and maintainability in schema definition.

- source-filter
  - remove unused SearchInput import
  ([54eab66](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/54eab66fd2f83f45080476ff7b2901959e996719)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-12. Removed the unused `SearchInput` import from `SourceFilterDropdown`. This cleanup reduces unnecessary imports, improving code readability and maintainability.

- source-pages
  - remove unused constants
  ([4280155](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/42801551973f94f20d4aec51b6c222a8ab7a3017)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-12. Removed the unused `PAGINATION` and `SORTING` imports from `SourcePageMonitored`. This cleanup improves code clarity and maintainability by eliminating redundant imports.

- sources-page
  - normalize search params for pagination
  ([945f9f0](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/945f9f026098b6b7cd362d12e232bab87f0ace88)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-15. Replaced individual pagination-related fields with a unified `searchParams` object, leveraging the new `normalizeSearchParams` helper. Updated data fetching logic to use `QUERY_KEYS` and `normalizedParams` for consistency and maintainability. Simplified pagination controls by passing `searchParams`.

- tabs
  - remove unnecessary router effect
  ([cad864d](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/cad864d108243cdd4f132b413db0d4f88642e42d)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-15. Eliminated the `useEffect` hook responsible for automatically pushing a tab's initial route when `withRouter` was enabled. The behavior is now streamlined and relies only on `onValueChange` for handling route updates.

- types
  - adjust getAllWithPagination type
  ([fe7687b](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/fe7687bbb42f1b5521c8552dd888a71f7fee5739)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-15. Updated the `getAllWithPagination` method to simplify the `PaginationRequest` type by removing the generic parameter. This adjustment aligns with the updated pagination type usage and improves type consistency.
  - simplify pagination and search types
  ([41f9653](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/41f96534bc2a19976b8d3f666721ca220974ca51)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-15. Revised type definitions for pagination and search parameters by consolidating them under `SearchParamsQuery`. This change reduces redundancy and enhances type reuse across the codebase.
  - simplify TablePaginationControlsProps
  ([dfe6067](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/dfe60673edb6ff3c0e9e1bc8ad5b7e092ed6deaa)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-15. Revised `TablePaginationControlsProps` to include only relevant properties from `PaginationProps`. Removed unused fields (`pageSize`, `sortField`, `sortDirection`, `status`, `search`) and replaced them with `searchParams` for improved type alignment and maintainability.

- user
  - remove redundant import from queries
  ([3c58c09](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/3c58c094e359925efb5f86dea62390f3b1797939)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-12. Removed the unused `fetchPaginationSources` import from user queries. This change cleans up the code, reducing unnecessary imports and improving maintainability.
  - simplify and improve user schema definitions
  ([b5f6b99](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/b5f6b990c13c1680c52a173fc7ad158b93f9e894)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-12. Revised the user schema definitions to enhance clarity and maintainability. Replaced `pick` and `extend` methods with a direct `z.object` declaration to define `createUserSchema`, ensuring consistency with validation schemas. Updated `updateUserSchema` to allow partial updates, aligning its functionality with expected behavior.

### Chores
- deps
  - update Next.js to v15.4.7
  ([abc1fc5](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/abc1fc5f3f82da0a52bcb26486d9deb0c974fc95)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-12. Updated the `next` dependency from v15.2.3 to v15.4.7 in `package.json`. This update ensures compatibility with the latest features, bug fixes, and security improvements provided by Next.js.
  - update Next.js to v15.5.3
  ([049418c](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/049418c7b6340d7585202a6760d6439d111c04b8)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-12. Upgraded `next` and related dependencies from v15.4.5 to v15.5.3. This update includes the latest bug fixes and performance improvements, ensuring alignment with the current version of Next.js.

- release
  - 0.4.1
  ([b2194c4](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/b2194c47eae1168eb410e67b99adf9b6eb1c168c)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-16.
  - 0.4.0
  ([df238f7](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/df238f77d0a853b624d40ca27638e3712f22228d)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-12. Release version 0.4.0 with significant enhancements, including feature additions, refinements, and fixes across various project components. Notably, introduces alert, dashboard, and obligation-related improvements.

 Highlights:
- Added alert components: AlertButtonDelete, AlertRiskBadge, and more.
- Updated record schemas to allow nullable values for flexibility.
- Integrated enhanced pagination filters and query support.
- Added loading and not-found components for improved UX.


## v0.4.0 - 2025-09-12

### Features
- alerts
  - add AlertButtonDelete component
  ([456f9ce](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/456f9ce76d0b982edda0bc8cf911b588dc2e62cd)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-12. Introduced the `AlertButtonDelete` component for rendering a delete button within alert-related UIs. The button handles deletion logic using the `useDeleteObligation` mutation and provides feedback with a loading state. This feature improves user interaction and aligns with alert management functionalities.
  - add AlertEditableFieldSelect component
  ([30fed76](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/30fed76cf184ab48362dcece7da0ab77ad56f232)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-12. Introduced the `AlertEditableFieldSelect` component to enable inline editing of alert select fields with validation. This component uses the `EditableFieldSelect` and integrates mutation logic to handle patch requests for alerts. It ensures robust input validation using the `patchAlertSchema`.
  - add AlertEditableFieldTextarea component
  ([f5d75a9](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/f5d75a91712bffeefbf0c242b4882537bf9aa20b)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-12. Introduced the `AlertEditableFieldTextarea` component to enable inline editing of alert text fields with validation. This component leverages the `EditableFieldTextarea` and integrates mutation logic to handle patch requests for alerts. It ensures robust input validation using `zod` schemas.
  - add AlertPageAlertsPage component
  ([cd56d35](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/cd56d3535ec2a31a46041fad561224a2f6ad1545)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-12. Introduced the new `AlertPageAlertsPage` component to display detailed information about alerts, including regulatory details, assignment progress, and compliance summaries. The component uses dynamic data fetching and hydration to ensure up-to-date and consistent data rendering.
  - add AlertRiskBadge component
  ([cb5d714](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/cb5d7149622d04c046fc48d0b641684ed61d9778)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-12. Introduced the `AlertRiskBadge` component to display risk levels for alerts using the `RiskBadge` molecule. This improves modularity and reusability when rendering risk levels in alert-related UIs. The component handles conditional rendering for cases with no data.
  - add AlertStatusBadge component
  ([7cd9107](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/7cd9107d4d2d64bd918bf18d8927fe6213a06a66)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-12. Introduced the `AlertStatusBadge` component to display the status of an alert using the `Badge` component. This adds modularity and improves consistency in UI elements for alert-related status visuals. The component includes conditional rendering to handle cases with no data.
  - add inline edit for status and assignee fields
  ([aeee477](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/aeee4778668f1b7dc5c8d6ec14f1c601625bbf42)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-12. Enhanced the alert details page with inline editing for "Status" and "Assignee" fields. Leveraged `AlertEditableFieldSelect` for editable dropdowns, allowing users to seamlessly update these values. Added support for fetching users and status options as required for dynamic dropdown functionality.
  - add loading and not-found components
  ([3c8f757](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/3c8f757ce8b4285f3d3c7473814d289f5358a0c7)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-12. Introduced a loading component and a not-found component to the alerts page route. These updates improve user experience by displaying a loading placeholder or a not-found message when appropriate.
  - integrate risk and status badges in AlertTable
  ([a088fa1](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a088fa11cd0c1b44968679eb0b8abb2504711551)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-12. Added `AlertRiskBadge` and `AlertStatusBadge` components to enhance the `AlertTable` display. These badges replace plain text for risk levels and statuses, providing more visually consistent and interactive representations. This change improves the overall clarity of the UI for alerts.
  - replace Sheet with Modal in AlertDropdownAction
  ([753c26e](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/753c26ee5d7dec985d1ccb46bc27aca7d257b8fe)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-12. Replaced the `Sheet` component with the `Modal` component in `AlertDropdownAction` for better alignment with UI consistency and functionality. Enhanced the dropdown menu by introducing options for creating obligations using the new `ObligationFormCreateWithAlert` component. Updated icons to reflect a more intuitive design.
  - update patch schema for partial updates
  ([d4a38eb](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/d4a38ebcf736e604455dda1eec26b1f271c1bade)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-12. Updated the `patchAlertSchema` to allow partial updates to specific fields and defined their constraints. Enhanced the `AlertPatchDto` type to infer from the updated schema for type consistency.
  - implement alert entity to the project
  ([a846bcc](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a846bcc5935a73ee222011309ed682ae66623f2b)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-11. Added a complete set of components to manage regulatory alerts, including a table with selectable rows, filter controls, dropdown actions, and pagination. Introduced state management with `AlertsStore` for better user interaction with data selection and updates.

Improved API integration with alert assets and alerts services, ensuring seamless data flow. Developed reusable entities for filters, search, and query handling.

- api
  - add search and rest parameters to pagination
  ([9859025](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/9859025eaa685e9f45038ca7cfe6c86ed26d48ae)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Extended the `getAllWithPagination` method to include support for `search` and additional parameters. These changes enhance flexibility in pagination and filtering, allowing more dynamic queries to better align with application needs.
  - add StatusParams to SearchParamsProps
  ([e910061](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/e9100612259067bf2c0e5b48b47362970d4d351b)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Extended the `SearchParamsProps` interface to include `StatusParams`. This update introduces the ability to filter by `status`, enhancing flexibility in managing API queries. The change aligns with ongoing efforts to expand filtering capabilities across the system.
  - extend SearchParamsProps with new filters
  ([a71c8f5](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a71c8f55f9246a6d23aed0ed4add03afe65c4991)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Added new interfaces to support additional filtering options, including obligation type, risk level, assigned users, jurisdiction name, and monitoring details. These changes ensure the system accommodates more granular filtering capabilities and aligns with client requirements.

- components
  - add EditableFieldTextarea component
  ([baf87c9](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/baf87c952320efe5f980e36118c29179374fba17)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-12. Implemented the `EditableFieldTextarea` component to enable inline editing of text fields with validation. The component toggles between editable and read-only states, integrates a cancel button to discard changes, and uses react-hook-form and zod for form validation. This addition improves user interaction for editable fields.
  - add FormFieldReadOnly component
  ([21a9c31](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/21a9c310525eb5372d7af5b45b55eaccda48b879)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-12. Introduced the `FormFieldReadOnly` component to display non-editable form fields with optional descriptions, links, and value positions. This feature enhances the display of read-only data with improved UI flexibility and clarity.
  - extract StatusBadge types to separate file
  ([4323b4e](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/4323b4e54b341313a627d92e8cdb9c4e2889e29e)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-12. Decoupled `StatusBadgeProps` type into a dedicated `types.ts` file to improve code organization and reusability. This change aligns `StatusBadge` with consistent patterns across the project for managing types.
  - replace inline date formatting with helper
  ([98e383a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/98e383a4d8345228159db53dfd25a6f9662e9a43)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-12. Replaced the inline date formatting logic in `DataTableWithActions` with the new `dataFormat` helper function. This change improves code reusability and ensures consistent date formatting across the project.

- constants
  - add 'alert' key to queryKeys
  ([ddc7a43](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/ddc7a43a88a28db1ffd396f993a4661afae5dd47)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-12. The `alert` key was added to the `QUERY_KEYS` object in order to support new or upcoming query-related functionalities requiring this identifier. This change enhances the ability to manage and organize query keys consistently across the project.
  - add user-related query keys
  ([8ba6808](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/8ba68081e357ffe56393fd8fcb5aa801f7a10fc3)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-12. Added `users` and `user` keys to `QUERY_KEYS` for improved query key management. These additions centralize user-related query key definitions, promoting consistency and easing future maintenance.
  - add query keys constant
  ([7c6ea42](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/7c6ea427e86a184680afc7f654d424971546da49)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-11. Introduced `QUERY_KEYS` constant for managing alertAssets query keys. This enhances consistency in specifying query identifiers, providing a centralized and reusable structure for alert-related queries.
  - update Alerts navigation URL
  ([cf7636a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/cf7636ac5ea0fe88382abae7eb9774c7b69490b4)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-11. Changed the `url` property of the Alerts navigation item from `#` to `/alerts`. This enhances navigation accuracy and aligns with the current route structure.
  - add status constants and types
  ([7ff6b61](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/7ff6b610765e3ea810f58b4c3cc06d2f3a1cb091)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-09. Introduced a new `STATUS` constant for defining status-related fields in a type-safe manner. This addition centralizes the status identifier and improves maintainability and consistency across related modules.

- crud-service
  - add status filter to pagination
  ([8cbfe20](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/8cbfe20c10173ca8894853671ff049ea6374240a)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-09. Enhanced the `getAllWithPagination` method to support the `status` parameter in pagination logic. This update extends filtering capabilities, enabling more refined queries based on resource status.

- dashboard
  - add loading component
  ([6bdf0fd](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/6bdf0fd04884c41f133acb54d2baef939329bb43)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-12. Added a simple loading component to the dashboard route. This component displays a placeholder "Loading..." message while the page content is being loaded, improving user experience during data fetch or rendering delays.

- datatable
  - add datetime formatting to column types
  ([a22c1c3](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a22c1c3dafc6f8da096cf9ada498c1dafef86df4)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-11. Enhanced the `DataTableWithActions` component to include proper formatting for `datetime` column types. This ensures consistent and readable date-time outputs when rendering in the table.

- editablefield
  - add EditableFieldSelect component
  ([5218458](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/5218458f9a4b1cc388fc1d78306b4cb677f80549)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-12. Introduced the `EditableFieldSelect` component to enable inline editing of select fields with validation. This component supports controlled forms using `react-hook-form` and ensures robust validation with `zod`. It includes a read-only view and an editable mode with support for canceling edits.

- forms
  - improve FormFieldCheckboxGroup accessibility
  ([95e9ba3](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/95e9ba33cbc1ab386827a8bdfed7391e0727d7a2)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-11. Updated the FormFieldCheckboxGroup component to enhance accessibility and semantics. Replaced standard `label` elements with `FormLabel` components, associating them directly with corresponding inputs via the `htmlFor` attribute. This change improves screen reader compatibility and makes the UX more intuitive.

- helpers
  - add data formatting utility
  ([10766b1](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/10766b17bb6f19ddf8682b7394fcdf1578751696)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-12. Introduced the `dataFormat` helper function to format date values into a readable string format (`dd MMM yyyy, HH:mm`). This utility also validates the input and ensures proper ISO date parsing. It improves consistency and reusability for date formatting across the project.
  - add utility function to check empty values
  ([63a7804](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/63a7804089facfae63d52af5767e9a98616b4b50)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-12. Introduced the `isEmptyValue` helper function to evaluate whether a given value is null, undefined, or an empty string. This utility simplifies value-checking logic and promotes code reusability across the project.
  - improve pageSize handling in pagination
  ([1bf5f8f](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/1bf5f8fc13b20f268f6689294ccaee0051095f9b)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-11. Enhanced `parsePaginationParams` to better manage `pageSize` input by introducing fallback logic. This change supports new parameter `pS` or `size` for determining `pageSize`, maintaining backwards compatibility with existing defaults. Simplifies parameter handling and improves flexibility.
  - add status filter to pagination params
  ([d54c448](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/d54c448d23025a4e5f82180087fde1c0d641f8e2)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Added support for `status` as a filter in the `parsePaginationParams` function. This change enables more flexible querying capabilities and aligns with enhanced filtering requirements across the application.
  - add support for additional query params
  ([f74df63](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/f74df6398dd8b8b30e92f707dc4a03201f87d790)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Expanded the `buildUrlQueryParams` helper to include support for `jurisdiction__name` and `monitoring_frequency` fields. This ensures proper handling of these query parameters when building URLs, improving flexibility and accuracy.
  - extend pagination params with new filters
  ([b1bc36a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/b1bc36a0e407fc0d51d6bfd6028f3cb2f0cc844e)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Added support for additional filters in `parsePaginationParams`, including search, obligation type, risk level, assigned user, jurisdiction name, monitoring enabled, and monitoring frequency. These changes improve flexibility in handling and parsing pagination parameters, aligning with enhanced filtering requirements.

- logo
  - update homepage link to dashboard
  ([8f08f82](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/8f08f82bd7b69a1fb4c8df4cf12c69bde1096557)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-12. Updated the `href` in the `Logo` component to point to `/dashboard` instead of the root `/`. This change ensures that users are redirected to the dashboard when clicking on the logo, enhancing navigation consistency.

- obligation
  - update schema fields to allow null values
  ([1d96981](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/1d9698132277e0f5426cf9aebe0eb1788c69e98e)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-12. Updated key fields in the obligation schema to support nullable values. This change provides greater flexibility for handling optional fields and aligns with the updated schema requirements.

- obligations
  - add action of opening obligation details
  ([de237e4](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/de237e49677355816723f06a95bffe2805d5b6b8)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-12.
  - add ObligationFormCreateWithAlert component
  ([ce02408](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/ce024083065c12fd2b4ed98f769a75de8e30a610)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-12. Introduced a new `ObligationFormCreateWithAlert` component to create obligations based on alert data. The form leverages react-hook-form and zod for validation and utilizes the `useCreateObligation` mutation. It dynamically fetches users and sources to populate selectable options, enhancing user interaction and data consistency.
  - create component for assigned user field
  ([ec066da](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/ec066da4ea8ab11af2befddd94ce3b389efa5553)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-12.
  - create component for obligation table status badge
  ([d836d6e](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/d836d6eeecd58fc5313492cd3f51c3f552fc4378)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-12.
  - create component for updated by user field
  ([7bc0acf](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/7bc0acfb0863849e5b1c462166d24ede24e2295a)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-12.
  - fetch alerts for obligations page
  ([115c7ee](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/115c7ee57b2f64fded0e567089f83be7a4455708)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-12.
  - refactor obligations create form
  ([c4e563f](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/c4e563f61cbb8f730ccac3343e084580c1d98adc)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-12.
  - refactor obligations table
  ([a440732](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a44073293becc1830571512c7a858ae5979d5120)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-12.
  - refactor obligations update form
  ([c342bbc](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/c342bbc4cd4cbf3f75a167084d99e40c6cbdebac)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-12.
  - add obligation risk badge into table and fix titles
  ([9caabb8](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/9caabb88a64572c1bf6e5ea808a264b52713bbde)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-11.
  - create obligation risk badge component
  ([63619fa](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/63619fab49ba010884ecece0fc75d018304ef623)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-11.
  - add `ObligationFilterDropdown` component
  ([bc3d09c](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/bc3d09cf28809548239e759f46e978e8c2e2b3ee)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Introduced a new `ObligationFilterDropdown` component for filtering obligations based on risk level and type. This decouples filter logic into a dedicated component, improving modularity and reusability. The loading state is also handled gracefully.
  - add `ObligationFilterSearch` component
  ([2e75f90](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/2e75f90c7efae2bf75072da065bd60dac27b61b9)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Introduced a new `ObligationFilterSearch` component to enable search functionality within obligations. This component uses the `SearchInput` molecule for handling search queries, improving modularity and reusability of the search logic across the application.
  - add content_types to obligation schema
  ([0f9eec1](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/0f9eec18087f8ac2b392aabe1a60d9ec8045ec61)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Extended the `obligationAssetSchema` to include `content_types`, enhancing the schema's ability to categorize asset types more comprehensively. This update supports additional flexibility and alignment with extended data handling requirements.
  - add loading and not-found pages for obligation details
  ([d372633](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/d372633629350db9e7f6a54f68717babc0b746d2)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Introduced `loading` and `not-found` pages under the obligations/[obligationId]/(page) directory to improve the user experience for obligation detail pages. The `loading` page displays a loading indicator, while the `not-found` page provides a friendly error message for unavailable obligations.
  - add toast notifications for mutations
  ([4b56d6c](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/4b56d6c78375669159485fc2fcc7aeeaf49cfc54)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Introduced toast notifications for obligation-related mutations to improve user feedback. Success and error messages are now displayed to inform users of operation outcomes, enhancing the user experience.
  - enhance ObligationFormCreate with new fields
  ([17f1420](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/17f14209473f7a56c40ef6179d4819b3283f425e)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Updated the ObligationFormCreate component to include new fields and improve field configurations. Added support for `Source`, `Alert`, `Content Type`, and `Description` fields, while updating others with better default structures, clearer options, and improved integrations. This enhances the form's usability and aligns it with updated schema requirements.
  - extend pagination with search and rest params
  ([db3f933](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/db3f933b79c51c661e678a066992f022bb07de23)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Enhanced pagination in the obligations list by adding support for `search` and additional parameters passed via the rest operator. This change improves flexibility in filtering and querying obligations, aligning with extended application requirements.
  - fetch and map obligation asset options dynamically
  ([52a7215](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/52a72156ca1035a4c4d4907f01a3eede33d2906b)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Replaced hardcoded option arrays for `status`, `risk_level`, and `obligation_type` fields with dynamic data fetched via the `useObligationAssets` hook. This update allows the fields to adapt to changes in the backend data structure, improving maintainability and reducing redundancy.
  - streamline obligation schema definitions
  ([68e8e1c](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/68e8e1c3c28f6dadf96724c7b6ceb9072e771b72)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Refactored obligation schema to improve maintainability and consistency. Consolidated schemas by streamlining properties, incorporating `regulatory_metadata` as a passthrough object, and reducing redundancy in update-specific schemas by reusing `createObligationSchema`. These changes simplify data validation and enhance schema reusability.
  - update filter dropdown to single select
  ([80d26b7](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/80d26b71cce6bdad6eadc5d358b1294926eaa3b9)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Updated the `ObligationFilterDropdown` component to use single-select filters for "Risk" and "Obligation Type". This change ensures a simpler and more straightforward user experience when selecting filters.
  - update obligation details with user pagination
  ([dd70baa](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/dd70baa0e11ac2032058bcc3995277ecd6b180e2)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Integrated the `useUsersPagination` hook in the ObligationDetails component to enable fetching paginated user data. This sets up the groundwork for improving efficiency when handling large datasets related to user information. Related imports adjusted accordingly.
  - update ObligationFormUpdate with new fields
  ([8e18b8a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/8e18b8acb6c8fb37d6a05f766c06e10c83aa7a85)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Enhanced the ObligationFormUpdate component to include new fields and align with updated schema requirements. Added `Alert`, `Content Type`, and `Description` fields, updated label configurations, and improved field mappings for better usability. Updated field defaults, select options, and validation to match the adjusted ObligationUpdateDto type and schema changes.
  - use paginated users in obligation form
  ([15199f7](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/15199f702f3116cc4f12750cfc9035662e94a875)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Integrated the `useUsersPagination` hook in the ObligationFormCreate component to fetch paginated user data. This improves efficiency by managing large user datasets dynamically and allows sorting by creation date. Updated initialization logic to adapt to the new paginated data structure.
  - use paginated users in update form
  ([b3e3e15](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/b3e3e1518c0c8006d2e4feb3d4c8a0285335a00a)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Integrated the `useUsersPagination` hook into the ObligationFormUpdate component to fetch paginated user data. This improves efficiency by dynamically managing large datasets and supports sorting by the creation date. Updated logic to adapt to the new paginated data structure.
  - add fetching users on obligations page
  ([d5f6e3f](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/d5f6e3fb73f70f8f3cafeaf0b2adca599f922335)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-09.
  - add update obligation form
  ([30ea47b](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/30ea47b68635a8f952f3fad4849a92523a537784)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-09.
  - create obligation form
  ([f76ef61](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/f76ef6145914ee246706ad690bf25a8906f63e89)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-09.
  - create types for obligations entities
  ([6a3d99e](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/6a3d99e6305abcf15ecf72245ed4f06107d67cf1)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-09.
  - rename obligation create button
  ([339803c](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/339803c0c47439f1939efc790177302e3034a072)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-09.
  - add obligation tabs with filtering functionality
  ([125fdbc](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/125fdbc064b81dc5e7aa9077e0e6c21f2fba3e99)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-05.
  - add tabs functionality to obligations filters
  ([a9750e7](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a9750e716fd71a3be8bc687d2c229189b181996a)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-05.
  - change types for obligation filters
  ([75b81d3](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/75b81d3a028671c3d0426837423c0d588117a041)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-05.
  - create obligation details component
  ([2c7b2f8](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/2c7b2f8757aef62f5bdf5335f735ffd10cc8e87d)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-05.
  - create obligation details page
  ([568835f](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/568835f699fc01a012ab9c47adbe73b794bd35f9)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-05.
  - create obligation status badge component
  ([82c7fcb](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/82c7fcb05268c1d3fbec528fb7dd94ca855d477d)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-05.
  - create universal editable field component for obligation details
  ([57281c6](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/57281c6d6159e71d54b4bec22431b663fb14a481)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-05.
  - create universal source document component
  ([956b68c](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/956b68c089aca0ebf842cc7630286a84f449f02a)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-05.
  - make risk badge component universal, update source tables
  ([3165e95](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/3165e95f8656c21aa19de73a837bd3c5ebee63ca)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-05.
  - move layout into list folder
  ([5064612](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/5064612411f5dafd8956dad3cc7b11fccb648819)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-05.

- pagination
  - add tab support to pagination params
  ([8049bb4](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/8049bb463179b03b41b183bd8c37a5a68d0d9213)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-09. Introduced a new `tab` parameter in the `parsePaginationParams` function to allow managing
tab-based queries. This enhancement supports more dynamic navigation and filtering requirements,
streamlining pagination logic across tabs.

- repository
  - extend pagination support in baseRepository
  ([dd1ad57](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/dd1ad57651eae660382b1e733a074fc46be0ddaa)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Enhanced the `getAllWithPagination` method in `baseRepository` by adding support for additional parameters using the rest operator (`...rest`). This update improves flexibility in passing dynamic query parameters for paginated requests.
  - add status and search to pagination queries
  ([d500ff3](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/d500ff3301441180420550a9debd1aa61d795045)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-09. Enhanced the `BaseRepository` to support `status` and `search` parameters in its pagination logic. These changes improve filtering and searching capabilities for paginated resource requests, enabling more dynamic and robust query handling.

- sources
  - add SourceFilterDropdown component
  ([208abb3](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/208abb3509c42bf742b9d87852aab450c83737d1)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Introduced the `SourceFilterDropdown` component to streamline filter dropdowns specifically for source assets. This new component builds filters dynamically based on API data, improving maintainability and reusability. It supports multiple selectable options like jurisdictions and monitoring frequency, with a loading state when fetching data.
  - add SourceFilterSearch component
  ([ee4b1f2](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/ee4b1f201e991eb080d7881f848a7c7f506e69cb)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Introduced the `SourceFilterSearch` component to enhance the search functionality within source filters. This component provides a streamlined and reusable structure for implementing search capabilities specific to source-related data. Designed with flexibility in mind, it uses `SearchInput` with configurable parameters.
  - add ui for create source form
  ([34a2898](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/34a28982252b30d5f9eda53cb99197f740e4d80c)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-08.
  - add ui for update source form
  ([dc823bb](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/dc823bbec7e9a7083d074e0fc9c2208733952bef)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-08.

- tabs
  - persist default tab in URL and enhance initialization
  ([b03a3a6](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/b03a3a68bc63862aeddcd47fcd4774e5872cca94)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Updated the `Tabs` component to ensure the default tab is persisted in the URL when `withRouter` is enabled. Added a new `useEffect` to navigate to the `defaultTab` on mount, improving synchronization between the UI and route state. Adjusted the initialization logic to account for the `defaultTab` fallback when the URL parameter is absent.

- types
  - create universal requiredStringSchema and nullableStringSchema
  ([7499c7a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/7499c7ae4dc78358f8fadc84e2561df902732a82)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-11.
  - add tab parameter to pagination types
  ([a64924c](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a64924c05c970a242d76ff29b641357fbd0b1abb)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-09. Extended the `Pagination` and `SearchParamsProps` types by introducing a `tab` parameter. This enhancement enables more granular and dynamic handling of tab-specific queries in paginated data, improving overall flexibility.

- typography
  - enhance styling for Title component
  ([a383ccd](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a383ccd43b1882cd00033cf9fe0e79688a294a0d)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-12. Added a `font-semibold` class to the '6' size variant in the Title component to improve text emphasis. This change ensures better visual hierarchy and aligns with the updated design guidelines.

- ui
  - add possibility of inline label in form field
  ([270d3f2](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/270d3f2ba4da0706dcf4df5b6aff3b12d520d3ce)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-12.
  - add multiple prop into filter dropdown component
  ([7a0ed17](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/7a0ed17e428a2519371df0f913b9f219d9b99e45)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-11.
  - add possibility to click on full card in checkbox group
  ([1d14008](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/1d1400814a769744223a5119c5ecac9924defcdb)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-11.
  - create buttons panel component for editable field
  ([75e3872](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/75e387264d06e48eda0e6863b3ff8b53177957b6)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-11.
  - show proper dates in tables
  ([0cd7b60](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/0cd7b600cd34dfa9490ed391c5b360dab59bbd52)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-11.
  - create universal form field datepicker
  ([43241ad](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/43241ad38d252f03b30f7d88bdf6b3a477118f27)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-09.
  - add switch label into switch form field
  ([bae2ff7](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/bae2ff70b5e67a08933c96620629b71f91053b0e)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-08.
  - add ui for form field checkbox group
  ([77db5c9](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/77db5c93f64b72096e3b21026352b01e34e7517a)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-08.
  - change types for form field switch
  ([a801f90](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a801f9020eae8d832aef13d96bc5bd9174f6a025)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-08.

- url-builder
  - add support for alternate casing in params
  ([daba811](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/daba811ebb63e95c7855e89a5230202e84bb9e0a)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Enhanced `buildUrlQueryParams` to handle `obligationType` and `riskLevel` in both camelCase and snake_case. This update ensures compatibility with varying parameter naming conventions, improving flexibility in API interactions.
  - add support for additional query parameters
  ([2dc84b3](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/2dc84b32f90af2cff8ae7fe1fc0a468697a345f5)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-09. Enhanced the `buildUrlQueryParams` function to include new parameters for filtering and querying. Added handling for `status`, `obligationType`, `riskLevel`, `assignedTo`, `jurisdictionName`, `monitoringEnabled`, and `monitoringFrequency`. Introduced utility functions `isValueSet` and `setParam` to streamline query parameter management. These changes improve flexibility and maintainability when building URLs with dynamic query params.

- user
  - add paginated users query hook
  ([aef49df](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/aef49df7f03c6d48a56cb38d279ef7dfbf092968)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Introduced a new `useUsersPagination` hook to enable paginated fetching of users. This allows efficient user data management by supporting dynamic pagination parameters such as page, page size, sort field, and sort direction. Integrated related pagination constants and updated imports for proper functionality.
  - add pagination support to user service
  ([dd9d388](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/dd9d388fc0401d55e25b70c7b3883946cf82d3d7)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Added new pagination support to the user service, enabling fetching users with paginated results. This improvement ensures better data handling when dealing with large user datasets.

### Bug Fixes
- alerts
  - fix header cells in alerts table
  ([c043500](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/c0435002ee79ae624fbbb77d9e6052b4e5f6775e)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-12.

- formfield
  - allow null for defaultValue prop
  ([fac5b02](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/fac5b02318ec6fce9091acea60214574c249223e)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-12. Updated the `defaultValue` prop in `FormField` types to support `null` values. This change ensures compatibility when no default value is provided, avoiding potential runtime issues.
  - handle null for defaultValue prop
  ([78d28ec](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/78d28ec061e698fba5e9e39895754f3785a59d2d)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-12. Updated the `defaultValue` prop in `FormField` to use `undefined` if `null` is provided. This ensures compatibility with `UIFormField` and resolves potential rendering issues when no default value is passed.

- obligations
  - fix obligation types
  ([daf2c80](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/daf2c802dd1b69d446aed3f34d456e5ffb06570f)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-12.
  - comment unused types
  ([c4c9787](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/c4c9787e03123bdd47689a9db417ea8bdb1dd409)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-11.
  - fix obligation types export
  ([18bb3f9](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/18bb3f91275b69a130938ccfcec6295e103a2a06)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-11.
  - fix paddings in obligation details
  ([a4273bc](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a4273bc069a9577a7c2dc563c278f439dcd1349f)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-11.
  - fix types for obligation entity
  ([cfb74d2](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/cfb74d28b397368487ed85c872fbffc34fb791a0)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-11.
  - refactor obligation create form
  ([9359a4a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/9359a4a2e78377692bf3dc5455b3f249902d64aa)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-11.
  - refactor obligation update form
  ([049f1f6](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/049f1f66f0dfa1dfd88941eb0c164bde081c67e4)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-11.
  - fix ui in obligations filter and tabs
  ([8356a4a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/8356a4a40a759426ee9ec8e99958e970a5bc9346)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-10.
  - fix obligations types errors
  ([3fcd256](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/3fcd256324df91dedc5550992162ce83a534039c)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-08.
  - fix source risk badge import
  ([1acb9d2](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/1acb9d21f4405a8993803a497d5b4bd02f725ab1)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-08.

- sources
  - fix header cells in sources table
  ([aa6cc24](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/aa6cc246b4cd6387631b6ef2cdbed39b065f2f4c)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-12.
  - fix types for source entity
  ([330ea54](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/330ea542956576b042c2761a44bf3ffeb5e6359a)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-11.
  - fix update source form
  ([eb5936a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/eb5936a276298d1e03e31f80d87a6e1bf6c86f2c)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-11.
  - fix scroll in create source form
  ([f853883](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/f8538831f7e2f630bf1a1efa8b47e5a1f4ba7d2c)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-08.
  - remove unused import
  ([1579a76](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/1579a76a15b133a73c5362b39cbe39ac0ce71e5f)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-08.

- ui
  - add inline label into form field select component
  ([fb23c54](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/fb23c54e7389d32c2c1db639944d2a9cb57a27d7)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-12.
  - fix styles in editable field select component
  ([a2ab819](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a2ab819c0221b14a03fec2f6f041411d55c37b8e)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-12.
  - fix styles in editable field textarea component
  ([4d4b4a6](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/4d4b4a6bc0f0f0c5a2bec92d6bb34fad8a83cfa9)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-12.
  - fix styles in form field read only component
  ([615caa1](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/615caa13e5fccfc003ebf23643a014cbad85573c)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-12.
  - fix table head checkbox component
  ([c4f0448](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/c4f0448dc429bb2b5470c0a747c49443daa3437c)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-12.
  - truncate description in tables
  ([0d657f2](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/0d657f2977721a9f6d9ddca3ab26db98b86dbca5)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-12.
  - fix ui for editable field component
  ([12a711d](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/12a711dbc29e15159e6a7da72bec14dcec170d27)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-11.
  - refactor form field datepicker
  ([bcab3ca](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/bcab3caf21aa33def7dff238eb95bb7728660941)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-11.
  - change select placeholder
  ([f56bdca](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/f56bdca32bc2df3f406129007137fc251d93042e)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-08.
  - remove unused import
  ([666baee](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/666baee39f254b60939b3f204c0c4782d3758fb0)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-08.

- users
  - fix types for user entity
  ([1809c80](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/1809c809ef88e285caa116aad4757c6302f791b1)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-11.

### Refactoring
- alerts
  - update schema references for clarity
  ([3283cd1](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/3283cd1aaa5e34a3110c301192733fb083271cf9)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-12. Renamed field schemas in alert-related object schemas for better clarity and consistency. Updated references in the impacted files to use the new `requiredStringSchema` and `nullableStringSchema` definitions.
  - remove unused ObligationCreateButton
  ([679bbbc](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/679bbbcbfb5d6aa10b806f142aa5e77e755aadb8)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-11. Removed the `ObligationCreateButton` component from the Alerts layout as it was no longer utilized. This change simplifies the layout and removes unnecessary imports.

- alerts-filters
  - remove unused props from `SourcePageAlertsFilters`
  ([16e9c31](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/16e9c31da9f24bbc3d84d42e3d275c70740ed0f0)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Removed `page`, `pageSize`, `sortField`, and `sortDirection` props from the `SourcePageAlertsFilters` component. This aligns with ongoing refactoring efforts to simplify components by eliminating unused or redundant properties related to pagination and sorting.

- api
  - centralize query key definitions
  ([82484da](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/82484da82366d4d5e3ebb2ba1242d7a4c2e9110d)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-12. Centralized query key definitions by replacing hardcoded strings in `useQuery` calls with constants from `QUERY_KEYS`. This improves maintainability, ensures consistency, and reduces the likelihood of manual errors when managing query keys.
  - rename schemas for clarity
  ([5178c5a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/5178c5a582b354cdc6d506f2310bb5a60a7757a2)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-12. Renamed `requiredFieldSchema` and `nullableFieldSchema` to `requiredStringSchema` and `nullableStringSchema` for improved clarity and consistency. Updated references in related object schemas to reflect the new names.

- editable-field
  - rename property in options array
  ([4bbdde9](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/4bbdde9d7b34f95f88f679f2eeaa3987068de986)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Renamed the `label` property to `textValue` in the `options` array within the `EditableField` types. This change improves clarity and better aligns with other naming conventions in the codebase.
  - update option property to textValue
  ([b652bfd](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/b652bfdc2e4d5972d3da1685e39db975a32a6ce3)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Replaced `label` with `textValue` in the `options` array for better naming alignment and consistency across the EditableField component. This change improves clarity and reflects prior updates in the codebase.

- editablefield
  - update props for consistency
  ([fcde9af](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/fcde9afe4aa982a03988bff11fdf89f2a3b4a687)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-12. Updated `EditableFieldTextareaProps` to use `FormFieldTextareaProps` instead of `FormFieldProps`. This change ensures consistent prop definitions and simplifies type management. Removed unnecessary `renderAction` prop, aligning the component's responsibilities more closely with its intent.

- filter-dropdown
  - move component to molecules layer
  ([a2bf01f](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a2bf01ff3f139e28d9a96fc824f49861bda47fc8)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Relocated `FilterDropdown` and its related components from the `organisms` layer to the `molecules` layer to better align with design system structure and simplify component hierarchy. Updated all associated import paths accordingly.
  - remove unused props and add `show`
  ([199f7b2](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/199f7b21b7a9b5653a0153a93d19c58046deb639)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Simplified the `FilterDropdownProps` interface by removing unused properties (`page`, `pageSize`, `sortField`, and `sortDirection`) to improve maintainability and minimize confusion. Introduced a new optional `show` property in `FilterConfig` to enable better customization of filters.
  - simplify state management and query handling
  ([7306cbb](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/7306cbb161bf19a3996f4fa7753d3d9c61559dbe)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Refactored `FilterDropdown` to improve state synchronization with query parameters and streamline handling of selected filters. Removed redundant pagination and sorting logic, leaving only filter-specific state. Simplified `handleClear` and `handleClearAll` logic using `useCallback`. Replaced the `selected` state with `selectedParams` for consistent representation of filter selections. Enhanced URL synchronization using `useEffect` and improved performance with `useMemo`.
  - update `selected` type in props
  ([e38f70e](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/e38f70e78277d0317066b3d2772810e54dc94682)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Updated the `selected` property type from `Record<string, string[]>` to `Record<string, string>`
in `FilterOptionDropdownProps` to better align with its usage and simplify type handling.

- filters
  - remove unused pagination and sorting props
  ([5898ef8](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/5898ef8302d68553bb1a69eabe34e4558c9edaf2)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Simplified `SourcePageFilters` by removing unused pagination (`page`, `pageSize`) and sorting (`sortField`, `sortDirection`) props. This aligns with ongoing efforts to eliminate redundant properties and streamline component code.

- form-field
  - update Datepicker props structure
  ([fd96259](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/fd9625971f442e0b7d04f0dd71ee26aa53af346a)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Refactored the `FormFieldDatepickerProps` type for better alignment with existing conventions and to enhance extensibility. Consolidated shared properties with the `FormFieldProps` type and added new options for improved flexibility.

- form-field-switch
  - rename prop names for clarity
  ([6c8e709](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/6c8e709abf4a1c4fa86fb04e577d1c837c38bde8)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Updated `switchLabel` and `switchLabelClassName` props to `label` and `className` for better clarity and alignment with standard naming conventions. Adjusted relevant references and types accordingly to maintain seamless functionality.

- monitored-filters
  - remove unused pagination and sorting props
  ([dbc541e](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/dbc541e2b35782759f42f665146179eb9aabdfa7)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Simplified `SourcePagesFilters` usage in `SourcePageMonitored` by removing unused pagination (`page`, `pageSize`) and sorting (`sortField`, `sortDirection`) props. This aligns with the ongoing effort to streamline components by eliminating redundant properties for improved maintainability.

- obligations
  - remove unused console log from ObligationFormCreate
  ([e50ccb7](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/e50ccb7c145899588d30ea65b2182139557e977d)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-11. Removed an outdated and unused `console.log` statement in the `onSubmit` function of ObligationFormCreate. This cleanup improves code readability and eliminates unnecessary debugging artifacts.
  - update column types in ObligationTable
  ([55ed98f](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/55ed98f4ce28ffebd98db565fc059a620578a264)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-11. Changed column types from `text` to `datetime` for date-related fields in the ObligationTable component. This update aligns the table rendering logic with the proper data types, ensuring accurate and consistent representation of datetime values.
  - centralize default tab logic
  ([10004e5](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/10004e58501c01da1dabfac3c45370da480dedb8)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Simplified tab initialization logic by introducing a `DEFAULT_TAB` constant for reuse across the component. Adjusted tab handling to ensure consistency and improve maintainability.
  - fix indentation and formatting
  ([572c7f7](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/572c7f7f895d70d96c2ea67bac0b400b07c29a05)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Adjusted inconsistent indentation levels and formatting within the `obligations` list page to improve code readability and maintain consistency. This change does not affect functionality but ensures better alignment with coding standards.
  - fix indentation and formatting
  ([7811d56](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/7811d565535b2d227636dee0d75a9eb866d488b3)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Adjusted inconsistent indentation levels and formatting within the `obligations` list page to improve code readability and maintain consistency. This change does not affect functionality but ensures better alignment with coding standards.
  - replace `ObligationsFilters` with `ObligationFilter`
  ([0eae783](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/0eae783c9b696a6a199c3b491656dd75971efb24)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Replaced the `ObligationsFilters` component with the new `ObligationFilter` and updated file structures to align with this change. This refactor simplifies and standardizes the filter logic and naming convention.
  - restructure directories for clarity
  ([c2004a8](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/c2004a81f152cffeec1bfb7f90f2ba06ead4d16f)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Refactored the directory structure of `Obligations` components to enhance clarity and maintain consistency across the project layout. Moved relevant files to a new nested `list` directory under the `obligations` module.
  - update filter component and tabs content
  ([428f385](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/428f38527c8a1e1cbc1ea710e787f1b28196e143)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Replaced `ObligationsFilters` with `ObligationFilter` and simplified tab content initialization. The change improves clarity and consistency in how filters are managed within each tab.
  - streamline data handling and tab logic
  ([673a123](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/673a123059bf250be56326b665112979d06197b0)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-09. Reorganized data fetching and tab construction for the Obligations page. Introduced shared query parameter builders, clarified variable naming, and made components reusable to streamline logic and enhance maintainability. Removed hardcoded filters in favor of dynamic status-based tabs.
  - restructure not-found and loading components
  ([08b1c2c](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/08b1c2c349a261a0678a984b78eb18b5e21cf930)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-08. Moved `not-found` and `loading` components into the `(list)` subdirectory under `obligations`. This aligns the structure with the project’s updated directory organization for improved clarity and maintainability.

- openapi
  - format JSON for readability
  ([d0327ca](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/d0327ca55dad980cac21f03fdc4d8ec6dd9be1dc)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Improved the formatting of the `openapi.json` file for better readability and consistency. This update adjusts indentation levels, converts compact arrays and objects into expanded structures, and ensures the file follows a uniform styling for easier maintenance.

- pagination
  - add status and search support to PageSizeSelect
  ([7b767e8](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/7b767e8b66788040a89a4717ddc2e6b6c505389a)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-09. Expanded the `PageSizeSelect` component by integrating `status` and `search` parameters into its props. This enhancement ensures additional query parameters are included when updating pagination, improving functionality and flexibility.
  - add status filter to pagination props
  ([9ad9d57](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/9ad9d57bda31bca1682794d523132d36e0fee777)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-09. Enhanced the pagination component to support a `status` filter, improving query flexibility. Consistently passed the `status` parameter to page navigation and query logic to enable filtering based on status.

- pagination-controls
  - add status and search to props
  ([e9fd86d](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/e9fd86da607676d81dbbf7d8c2a6777e0b78650f)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-09. Enhanced the `TablePaginationControls` component to support `status` and `search` parameters. These improvements enable more flexible filtering and searching while maintaining consistency across pagination controls.

- profile-settings
  - add default tab to Tabs component
  ([a6b8b16](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a6b8b16211a3fcdd62d5e687e3d56d5244fddd89)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Added `defaultTab` property with a value of `'profile'` to the `Tabs` component within the `ProfileSettings` component. This ensures a consistent initial tab is displayed when the component is loaded, improving usability.

- search-input
  - remove unused props for simplification
  ([31f7c76](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/31f7c76738a05acd18675c49ac5500d58024117f)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Removed `page`, `pageSize`, `sortField`, and `sortDirection` properties from `SearchInputProps` to simplify the interface. These changes eliminate unnecessary props not relevant to the current usage of the `SearchInput` component, improving its maintainability and clarity.
  - streamline param handling and improve UX
  ([642e5e7](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/642e5e74ec238de1a1b5fb9dd3fcdcb8d3ab2e0a)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Refactored `SearchInput` to enhance query parameter management and simplify the form logic. Removed reliance on redundant pagination and sorting logic, centralizing URL building while maintaining parameter integrity. Integrated `useMemo` and `useCallback` for performance optimization. Improved the UX by updating the debounce behavior and ensuring smooth URL updates.

- source-details
  - remove unused constants
  ([cea69fe](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/cea69fe8c3a1cd184ce4cf01e02d11002ac46a16)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Removed unused `PAGINATION` and `SORTING` constants in `SourcePageDetails`. Simplified the usage of `SourcePageAlertsFilters` by no longer passing redundant pagination and sorting props.

- source-form
  - unify label prop usage in SourceFormUpdate
  ([5768e6e](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/5768e6e18c9ce2d2ebd72c4353c050bfce0ea8ff)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Updated the `FormFieldSwitch` component in `SourceFormUpdate` to replace the `switchLabel` prop with `label`. This modification aligns with standardized prop naming conventions used across the project for improved code consistency and readability.
  - update prop name for consistency
  ([4c77b73](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/4c77b73fcfda88498207f939caeb44ce94b640ef)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Replaced the `switchLabel` prop with `label` in the `FormFieldSwitch` component to align with updated naming conventions and improve code clarity. This change follows the recent refactor for standardized prop names.

- sources
  - rename `SourcesFilters` to `SourcesFilter`
  ([e9d1110](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/e9d11100929cd73956ad23b8668620308836ff2d)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Updated component import and usage to reflect the rename from `SourcesFilters` to `SourcesFilter`. This change aligns the naming convention with other singular components for consistency.
  - replace filters with dedicated components
  ([5418f10](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/5418f1051ec1c1e18fb606a759e8ce9f01e8760d)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Replaced `SearchInput` and `FilterDropdown` with `SourceFilterSearch` and `SourceFilterDropdown` in the `SourcesFilter` component. This change introduces more specialized components for filtering, improving code organization and reusability.

- sources-filters
  - remove unused props from `SourcesFilters`
  ([9f6ca80](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/9f6ca80545a92b35853f519bfb2a98fec50600a2)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Simplified the `SourcesFilters` component by removing unused pagination (`page`, `pageSize`) and sorting (`sortField`, `sortDirection`) props. This change aligns with recent refactors to eliminate redundant properties, improving maintainability and reducing complexity.
  - simplify props for `SourcesFilters`
  ([1f786c6](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/1f786c67cb0150785144a6e0864b37b24df47814)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Removed unused props (`page`, `pageSize`, `sortField`, `sortDirection`) from the `SourcesFilters` component. This change aligns with recent refactoring efforts to remove redundant pagination and sorting logic. Simplification improves maintainability and streamlines component usage.

- tabs
  - enhance tab handling and query integration
  ([fb2ae9c](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/fb2ae9c33322c1c026382c9581dc0558f2dbe311)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Refactored the `Tabs` component to improve query parameter handling and URL updates when navigating between tabs. The changes include dynamic derivation of the initial selected tab, centralized URL building, and seamless query parameter updates using `useRouter` and `useSearchParams`. These updates improve the flexibility and maintainability of tab interactions, especially with routing enabled.
  - enhance tab initialization logic
  ([ed84a2a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/ed84a2adcf6240390b70c38f872d7542d51cfdbc)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Updated the `Tabs` component to improve tab initialization. Replaced `defaultTab` with `initialSelectedTab` across the logic for better clarity and consistency. Added a condition to prevent router calls when `withRouter` is disabled, avoiding unnecessary side effects.
  - make `defaultTab` a required prop
  ([8eeb67c](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/8eeb67cae404f11afefe620c2cb4142485049f26)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-10. Updated the `defaultTab` property in `TabsProps` interface to be required instead of optional. This ensures that the default tab is always explicitly defined, improving type safety and reducing potential ambiguity in component usage.
  - add router support for dynamic tab changes
  ([aa45054](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/aa45054b91598b8fc50972f8250cb1c72ce096fb)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-09. Added the `withRouter` property to `Tabs` component to enable dynamic URL updates when tab status changes. This allows seamless integration with Next.js routing and query parameter management for enhanced navigation handling.

### Chores
- changelog
  - update for release v0.3.2
  ([c34f6a8](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/c34f6a83727c9c6d6880b9f387f81ca397c49943)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-05. Updated the changelog to include details of the v0.3.2 release. This captures all changes, including newly added features, bug fixes, refactoring efforts, and chore tasks to ensure an accurate record of updates.

- release
  - 0.4.0
  ([94d8264](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/94d8264d1d595cf07d09378b293f82eac251cfa6)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-12.


## v0.3.2 - 2025-09-05

### Features
- api
  - add OpenAPI 3.1.0 spec for all endpoints
  ([0dc9e81](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/0dc9e8166713f187637373b91857c689699d8d43)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-05. Included a comprehensive OpenAPI 3.1.0 specification file defining all API endpoints, schemas, and operations for `regwatch`. This includes endpoints for organizations, sources, alerts, obligations, and users, as well as associated CRUD operations with filtering, pagination, and security definitions. The spec ensures alignment with the system's current functionality and provides a clear structure for API consumers.

- button
  - add disabled state styling and attributes
  ([983cc7b](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/983cc7bee33f9f0cf7befcf27d179c7b16d55e03)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-03. Enhanced the `Button` component to support a disabled state. Updated the CSS class logic to reflect a 'not-allowed' cursor when the button is disabled. Added `aria-disabled` and `disabled` attributes to improve accessibility and functionality.

- compare-changes
  - add CompareChangesViewer component
  ([bc49ff2](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/bc49ff250eaa75148d742dd15a299f802c900b78)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-02. Introduced a new component, `CompareChangesViewer`, to display and compare changes in a document line by line. This includes visual differentiation for added and removed lines, leveraging sample mock data to render comparison panels side by side. The changes enhance readability and simplify change tracking.

- formfield
  - add FormField component
  ([e114798](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/e1147988438a0dc1d08b3422e9d8ba468df83056)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-05. Introduced a generic `FormField` component integrated with `react-hook-form`. This component enhances modularity by supporting dynamic labels, descriptions, validation messages, and custom rendering actions. Enables consistent and reusable form field logic across the application.
  - enhance CheckboxGroup integration with FormField
  ([e077bac](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/e077bac0a1c8e0489ac04e64c558a6a4ee5cec64)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-05. Updated `FormFieldCheckboxGroup` to use the `FormField` component, streamlining its structure and enhancing modularity. Added support for dynamic labels, descriptions, and restructured rendering logic to improve clarity and consistency. Simplified type definitions by integrating `FormFieldProps`.
  - make control optional in FormFieldProps
  ([647d858](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/647d858c95925e248b79d0dc5127150b0aa9d55e)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-05. Made the `control` property optional in `FormFieldProps` type definition. This change allows greater flexibility when using the `FormField` component across various contexts in the application.
  - omit renderAction from FormFieldProps types
  ([8e87130](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/8e87130276c08e82c2a04d9139d3b7b52b07f6e8)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-05. Updated type definitions for all FormField components to omit the `renderAction` property from `FormFieldProps`. This change ensures better flexibility and aligns with the consistent structure of form components.
  - refactor FormFieldInput to improve modularity
  ([5b286e0](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/5b286e0be304fed83f14ee3bc8e775aaa4b07d54)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-05. Refactored `FormFieldInput` to utilize the `FormField` component, enhancing modularity and alignment with other form components. Simplified type definitions by leveraging `FormFieldProps` and improved rendering logic.
  - refactor FormFieldRadioGroup for modularity
  ([35bfaa2](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/35bfaa284051e1e4c2d7598eab448767c76f2c0b)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-05. Refactored `FormFieldRadioGroup` to leverage the `FormField` component, enhancing modularity, consistency, and alignment with other form components. Simplified rendering logic and updated type definitions.
  - refactor FormFieldSelect for modularity
  ([88d911f](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/88d911f72bee9bd691efba597b51db88af891fbc)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-05. Refactored `FormFieldSelect` to utilize the `FormField` component, improving modularity and consistency with other form components. Simplified type definitions and rendering logic for better maintainability.
  - refactor FormFieldSwitch for modularity
  ([e6ea5cc](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/e6ea5ccd77a506f75403f51aae19d68e476d0a95)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-05. Refactored `FormFieldSwitch` to utilize the `FormField` component, aligning it with other modular form components. Simplified type definitions and rendering logic for improved maintainability and reusability.
  - refactor FormFieldTextarea for modularity
  ([1c5e9c9](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/1c5e9c92ce8bb66ed28cf95645100770b40db41c)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-05. Refactored `FormFieldTextarea` to utilize the `FormField` component, in line with other modular form components. Simplified type definitions and rendering logic for improved maintainability and consistency.
  - add checkbox group component
  ([b64ca26](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/b64ca264f1b8edf4497550e5d20b82f6afc977e8)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-03. Introduced `FormFieldCheckboxGroup` component to enhance form capabilities with checkbox groups. Provides support for toggle all functionality, descriptions, and seamless integration with `react-hook-form`. Optimized for flexibility and reusability.
  - add FormFieldInput component
  ([4120961](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/4120961624e2273b71fc73d746f627a0e3fbd9f8)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-03. Introduced a new `FormFieldInput` component for handling form fields with input elements. This component integrates seamlessly with `react-hook-form` and provides support for labels, descriptions, and placeholders. It enhances form usability by reusing modular components from the UI library.
  - add FormFieldSelect component
  ([f0250df](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/f0250dfd2d0a9fc95864f4736bb3c792c7fc1f32)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-03. Introduced the `FormFieldSelect` component for handling select-based form fields integrated with `react-hook-form`. This component supports dynamic labels, descriptions, and error messages, offering seamless reusability and modularity through existing UI elements.
  - add FormFieldSwitch component
  ([08511c6](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/08511c689faa48a8bc7aee9f47847521251187d8)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-03. Introduced `FormFieldSwitch` component to handle switch-based form fields integrated with `react-hook-form`. This component supports dynamic labels, descriptions, and error messages while leveraging reusable UI elements for modularity.
  - add FormFieldTextarea component
  ([9f1ce92](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/9f1ce92c1c9500e5079dc5ea7696f2efbeb00ed9)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-03. Introduced `FormFieldTextarea` component for managing textarea-based form fields within `react-hook-form`. This component supports dynamic labels, placeholders, descriptions, and error messages, enhancing modularity and reusability through existing UI elements.
  - add radio group component
  ([a241705](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a241705457b12b2f83d2cbbc8e7c5cd40d67495f)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-03. Introduced `FormFieldRadioGroup` component to enable handling grouped radio inputs in forms. This component integrates seamlessly with `react-hook-form`, supporting dynamic labels, descriptions, and error messaging. It enhances reusability and modularity by leveraging existing UI elements.

- input
  - add disabled state and optional id prop
  ([8931eb8](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/8931eb8b6fae4132e7ca79eb25e64a1401f76d3c)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-03. Enhanced the `Input` component to support a disabled state and made the `id` prop optional. Updated the class logic to add a 'not-allowed' cursor when disabled. Included `aria-disabled` and `disabled` attributes for better accessibility. Added flexibility for styling through `className`.

- obligation
  - refactor obligation schemas for modularity
  ([827cf08](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/827cf082501b571fb57ced0208a7f5b0e99d2c8a)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-05. Refactored obligation schemas to improve modularity, reuse, and validation clarity. Introduced reusable schemas like `itemSchema`, `titleSchema`, `descriptionSchema`, and `obligationSourceSchema`, simplifying type definitions and ensuring consistency across obligation-related types and schemas. Removed redundant type declarations, streamlined filter enums, and adjusted schemas for improved maintainability.

- obligation-assets
  - reuse itemSchema in asset schema
  ([fb20c54](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/fb20c54b46b62adb704ba69a8a4cdb1b75c4df50)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-05. Refactored `obligationAssetSchema` to leverage the reusable `itemSchema` for `statuses`, `risk_levels`, and `obligation_types`. Simplified type definitions by replacing inline object structures with a modular and consistent schema.

- obligations-table
  - update column IDs for nested structures
  ([5d22e03](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/5d22e03987702f8d9d1f71e8338bdf67467bbd0e)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-05. Updated column definitions in the `ObligationsTable` to use nested object IDs for better alignment with updated data models. Added a new `detected_at` column to enhance displayed data.

- pagination
  - add default orderBy to searchParams
  ([65e2103](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/65e21031c871350cacd367056864806672b039be)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-02. Enhanced pagination logic to include default `orderBy` values when parsing search parameters.
This ensures consistent ordering for obligations and sources pages, improving user experience.

- select
  - replace id with name for clearer semantics
  ([4c388ca](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/4c388ca344e2c9c62f0fc2a509898304a16ec1cb)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-05. Replaced the `id` prop with `name` in `SelectProps` and related component logic. This change ensures a clearer alignment with input field conventions and improves semantic clarity.

- source
  - refine source type schemas for consistency
  ([874b176](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/874b176efe2bfcc06bdeac585f859d662c33eefa)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-05. Enhanced `source` schemas for improved modularity, type safety, and compliance with OpenAPI spec. Simplified structures, added new enums, and clarified optional fields for clearer schema definitions.
  - refine types and schemas for clarity
  ([bf1f021](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/bf1f0217de2a36766c3d1adc0064e937a08f5af4)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-05. Refactored `source` schemas to improve modularity, validation, and alignment with shared types. Consolidated repetitive logic by reusing `nameSchema` and `descriptionSchema` across multiple schemas. Enhanced consistency by introducing `monitoringFrequencyItemSchema` and `contentTypeItemSchema`.
  - update schemas and table for nested structures
  ([1afe5a7](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/1afe5a7fa87511f3139af03d97d1bede7b9e926d)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-05. Enhanced the `source` schema and table to support nested structures for better data clarity. Replaced `jurisdiction_id` with a nested `jurisdiction` object. Updated `content_types` and `monitoring_frequency` to include nested schemas for flexibility.
  - add toast notifications for mutations
  ([a0469af](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a0469af5b8d23e38de03d2f6ba92d4296ba89fab)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-04. Introduced user-facing toast notifications for source update, patch, and delete
mutations. Notifications provide immediate feedback for both success and
failure scenarios, improving the user experience and clarity of operations.
  - refactor SourceUpdateForm and schemas
  ([37cbae5](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/37cbae52ec8c97e4d040d62f0c7b9e8ea7781c79)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-04. Refactored `SourceUpdateForm` and related schemas to enhance maintainability and modularity. Introduced `react-hook-form` with `zodResolver` integration and replaced legacy form components with reusable modular ones (`FormFieldInput`, `FormFieldTextarea`, etc.). Updated schema to require a minimum length for the `name` field.

- source-assets
  - extend jurisdiction schema with code
  ([7e7bf30](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/7e7bf30fb23da1dbc3468835a5fba2e92d7e95ea)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-05. Enhanced `sourceAssetSchema` by extending `jurisdictionItemSchema` to include a `code` property. This ensures more detailed and structured data representation for jurisdictions.
  - simplify schemas with reusable types
  ([4134b4a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/4134b4af67bfe63dba7e9566959a20395045d33c)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-05. Refactored `sourceAssetSchema` to leverage reusable schemas for improved modularity and clarity. Consolidated validations by replacing inline object definitions with shared `itemSchema` and `jurisdictionItemSchema`.

- source-form
  - adjust defaults for nested schemas
  ([50977e1](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/50977e128d558853865bb9918bf3ce287c98002b)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-05. Updated default values in `SourceFormUpdate` to use nested object IDs for `content_types`, `monitoring_frequency`, and `jurisdiction`. Removed unused description field in `FormFieldSwitch`, improving clarity and consistency with updated API responses
  - remove unused radio group and update defaults
  ([ec3f0ec](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/ec3f0ec7121c3a5555fa99bf5c5c457feefb8a91)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-05. The `monitoring_frequency` field now defaults to `undefined` instead of an empty string, aligning with consistent type handling. Removed an unused `FormFieldRadioGroup` for `monitoring_frequency`, simplifying the component structure. Minor clean-up included removing an outdated console log and unused description text.

- sources
  - add success and error notifications for source creation
  ([c1cff16](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/c1cff16208774104856f09fa9bbcc0376349fedd)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-03. Added toast notifications for success and error scenarios in the `createSourceMutation`. This enhances user feedback by providing clear visual indicators for operation outcomes.
  - add NotFoundPage and restructure loading routes
  ([832bf2d](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/832bf2db204b7f9bd25b477423fb9ef94a47af30)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-02. Introduced a `NotFoundPage` component under the `(list)` directory in the sources module. This component uses the reusable `NotFound` organism to display a consistent "not found" experience for users. Additionally, restructured the loading route file organization for clarity and alignment with updated project conventions.
  - add SourceDetails component
  ([1f4b944](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/1f4b944d608cdb97446fb515efad44ece67ddea7)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-02. Introduced a new `SourceDetails` component within the `Sources` module. This component is designed to display detailed information about a specific source, improving clarity and user accessibility for source-related data.
  - add SourcePageAlertPage component
  ([d1beb4a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/d1beb4a57137278bf2a2d5e7199ffb1c2022f812)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-02. Introduced a new `SourcePageAlertPage` component under the `Sources` module. This component serves to render a page with a title and a comparison changes viewer, enhancing the user experience for alert-related views.
  - add SourcePageAlertsDropdownActions component
  ([baffbb0](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/baffbb0c2adeede0f21c0d840d100da9cd105e06)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-02. Added a new `SourcePageAlertsDropdownActions` component to enhance interaction options for source alerts. This component provides dropdown actions such as viewing source details and deleting alerts, improving the user experience and functionality within the `Sources` module.
  - add SourcePageAlertsFilters component
  ([eb9efef](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/eb9efefe25a6977dba91424ecd6584f51ac9c6a3)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-02. Added a new `SourcePageAlertsFilters` component to enhance filter functionality for source page alerts. This component provides a search input and a filter dropdown with impact levels, offering improved data exploration and filtering options.
  - add SourcePageAlertsPage with hydration
  ([3851645](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/3851645e6b7c3d88dbded3fa016246a74301048e)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-02. Introduced `SourcePageAlertsPage`, a server component that fetches and displays source-specific alerts. This page utilizes `HydrationBoundary` for managing server-side and client-side data transfer, integrating `SourcePageDetails` for rendering alert details.
  - add SourcePageAlertsTable component
  ([17ae2f8](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/17ae2f8bfe6529c1cef403bbae427e609644fa40)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-02. Introduced the `SourcePageAlertsTable` component to display source alerts in a data table format. The table includes critical details such as change name, risk level, description, and date. It incorporates reusable components like `RiskBadge` and `DataTableWithActions`, enhancing modularity and visual clarity. Sample data is included for testing.
  - add SourcePageDetails component
  ([6a4eff7](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/6a4eff73de888220e596d35ac8c119b5c8cd352a)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-02. Introduced the `SourcePageDetails` component to display detailed information and alerts for a specific source. The component integrates previously created features, providing a cohesive layout with titles, subtitles, filters, and an alert table for better user interaction and data display.
  - add SourcePagesMonitored component
  ([ad85551](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/ad85551323e8873dd6acc8d0e001907accc43f45)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-02. Introduced the `SourcePagesMonitored` component to display a list of monitored sources. This component includes a title, filtering functionality, and a table for improved user experience. Default pagination and sorting settings are applied using constants for consistency.

- textarea
  - add Textarea component
  ([300b0a0](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/300b0a04fd956197552ded047ec99b591f752b8d)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-03. Introduced a new `Textarea` component in the atom library to enhance input controls. This component wraps the `UITextarea` and provides type-safe props to ensure ease of integration and better usability.

- ui
  - add scrollable area to SourceCreateForm
  ([26628cf](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/26628cf89efe962961554697bd359787ac663061)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-03. Integrated `ScrollArea` component into the `SourceCreateButton` to enhance usability when dealing with lengthy forms. This ensures better accessibility and user experience, particularly on smaller viewports.

### Bug Fixes
- crud-service
  - log detailed error on pagination parse
  ([6f59af3](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/6f59af30041c3b74aea566a086305c8f84c46a63)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-05. Improved error reporting by adding console error logging when pagination data parsing fails. The logged message provides detailed information, aiding in debugging parsing issues.

- source-monitor
  - improve switch handling for monitoring
  ([22c532e](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/22c532efe5d2318a96f4aaecf8d80e3c33784b49)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-05. Enhanced the `SourceMonitorSwitch` logic to handle state updates more effectively and prevent regressions. Introduced error recovery to revert the switch state if an API mutation fails.

- source-page
  - handle nested `monitoring_frequency` object
  ([784829c](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/784829c3cd9a4e88e6c0ac7c5d23a316c0dac60a)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-05. Fixed an issue in the `SourcePage` where nested `monitoring_frequency` objects were not properly accessed. Updated the logic to correctly retrieve the `name` property from nested `monitoring_frequency` schemas, resolving potential display errors.

- sources
  - add missing column size to SourcePagesTable
  ([9ae1624](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/9ae162486a794fb9cb11a0f8585c5dd12399d532)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-02. Added a `size` property of 120 to the table column definition in `SourcePagesTable`. This ensures consistent column width and improves layout stability in the table view.
  - update link in SourcePagesDropdownActions
  ([1371fd3](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/1371fd321f55534878f0ee468a44973bf9643867)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-02. Updated the `NextLink` href in `SourcePagesDropdownActions` to use the dynamic source id and correct path structure. This change ensures the "View details" action navigates users to the correct source details page.

### Refactoring
- auth
  - replace auth with verifySession handling
  ([45d5307](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/45d53072e66210b07801ccb9664b29f88573ecb1)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-02. Updated session verification logic by replacing `auth` with `verifySession`. The new implementation explicitly checks for authentication status and validates session before redirecting, improving clarity and robustness in session handling.

- dashboard
  - clean up unused imports and logic
  ([c404bcd](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/c404bcd960a593620f3b9f3168b5a89867e946c1)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-05. Removed unused imports, constants, and asynchronous data fetching logic from `DashboardContent`. Simplified the component to improve readability and maintainability. All unused data-fetching functions and related content were removed as part of the cleanup.

- formfield
  - restructure and move form components
  ([617b979](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/617b979c67d16746e1569b3722f99dd77bf7b298)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-04. Restructured form components to improve modularity and maintainability. Migrated `FormField` components (Input, Select, CheckboxGroup, RadioGroup, Switch, Textarea) from `atoms` to `molecules`, reflecting their complex behavior. Additionally, enhanced `Input` component to use `forwardRef` for better compatibility.

- obligations
  - rename component directories for clarity
  ([7b68dfb](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/7b68dfb515e4e1e144e51de095c8f75f6104316c)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-05. Renamed multiple `Obligations` component directories and their imports to improve naming clarity and maintain consistency across the project structure. This change accommodates better directory naming conventions.

- obligations-table
  - remove unused `size` column property
  ([ee0e60a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/ee0e60acb23b5c24b31c0cc09b15f89d7b7990aa)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-05. Removed the redundant `size` property from the column definition within the `ObligationsTable`. This simplification eliminates unused code and improves maintainability by keeping column definitions concise and relevant.

- select
  - modularize and optimize Select component
  ([49aeff4](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/49aeff41057a6eac6db8c4f2eae7719219e69ea3)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-03. Centralized logic for deriving the selected option's display text by extracting it into a new `getSelectedText` function. Introduced a memoized variable for stable rendering when options or value change. Replaced magic string with a constant for the "No items" placeholder. Updated overall code for improved readability, maintainability, and performance.

- source-assets
  - remove risk_levels schema
  ([3b16a7b](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/3b16a7be89de81681012bb5240b02e624c9c70c4)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-03. Removed the `risk_levels` schema from `sourceAssets` types as it is no longer required. This change ensures the code stays clean and avoids maintaining unused structures.

- source-pages
  - rename directories for consistency
  ([42f4859](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/42f48598ed53619f39e84f2107c7c49867c47d1e)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-05. Renamed multiple `SourcePages` component directories and updated related imports to improve directory naming consistency and clarity. These changes align with updated project naming conventions without altering functionality.

- source-table
  - remove unused column properties
  ([022c34a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/022c34a43544fa8887adaffcff53c324f8ab8ab9)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-05. Simplified the `SourceTable` component by removing unused column properties `size` and `pin`. These properties were no longer needed, streamlining the table configuration and improving maintainability.
  - remove unused column property
  ([5eb4bb9](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/5eb4bb93d3e8c0748955f09b05b351de1d1d49f1)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-05. Removed the redundant `pin` property from the column definition in the `SourceTable`. This cleanup ensures the column configuration remains streamlined and avoids unnecessary properties.

- sources
  - make description optional in schema
  ([f4df964](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/f4df96461e141895b78c2ec21bf14ec21b260066)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-03. Made the `description` field optional in the sources schema to improve flexibility when defining source entities. This change allows creating sources without mandatory descriptions.
  - simplify and modularize SourceCreateForm
  ([201b9a2](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/201b9a2210b5ae98a8de4779da3ebcc592c92310)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-03. Refactored `SourceCreateForm` component to improve readability and maintainability by introducing modular `FormField` components. Replaced inline JSX elements with dedicated form components for better reusability and consistency. Integrated schema validation using `zodResolver` for improved type safety.
  - correct import path for SourcesTable
  ([8a0ab70](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/8a0ab70bc935196ecc3270994080670f99ee4689)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-02. The `SourcesTable` import path was updated from `SourcesTable` to `SourceTable`. This adjustment ensures alignment with the component’s renamed file and maintains consistency within the module.
  - fix path import for SourcePagesFilters
  ([507f3a0](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/507f3a009cf4115d52bc9b9aae697170dfe7908e)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-02. Corrected the import path for `SourcePagesFilters` in `SourcePagesMonitored` component. This adjustment aligns the import statement with the recent directory renaming to ensure consistency and resolve potential issues caused by incorrect paths.
  - remove SourceDetails component
  ([22be6ea](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/22be6ea8d89fab80794eec36be99657867ee5f0b)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-02. The `SourceDetails` component was deleted as it is no longer required. Its functionality has either become redundant due to recent enhancements or has been replaced by updated components in the sources module. This aligns with ongoing efforts to clean up unused code and streamline the application.
  - remove unused alert-related pages
  ([3b75562](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/3b755624b38cb1af023a5e1c1631d194e33a920d)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-02. Deleted unused alert-related pages to streamline the codebase and improve maintainability. These pages are no longer required following recent updates to the `Sources` module.
  - remove unused NotFound component
  ([21108d1](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/21108d13a3d82b253bba164569f0d03fc92a8f3e)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-02. The unused `NotFoundPage` component was removed to clean up the codebase. This change eliminates redundancy and ensures that only actively utilized components are maintained.
  - rename directory for SourceCreateForm
  ([fc94e5f](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/fc94e5f0c63160312304b881e4d5274f79a81302)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-02. Renamed the `SourceCreateForm` directory to `SourceFormCreate` for better alignment with the naming conventions in the `Sources` module. This change improves consistency across similar components.
  - rename directory for SourceMonitorSwitch
  ([900dd86](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/900dd86a1476386f2ffe9701d0bf7538224609a5)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-02. Renamed the `SourceMonitorSwitch` directory to `SourceSwitchMonitor` for consistent naming and improved clarity across the `Sources` module. This change aligns with recent refactoring efforts.
  - rename directory for SourceUpdateForm
  ([ff0861e](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/ff0861ec119f330884af9c8cd47e75dd1665b45b)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-02. Renamed `SourceUpdateForm` directory to `SourceFormUpdate` for improved naming consistency within the `Sources` module. This change aligns the directory structure and naming conventions across similar components.
  - rename dynamic segment `[id]` to `[sourceId]`
  ([88d8a84](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/88d8a843e72cbdebfd0ddf92e2c494ae133565f3)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-02. Updated the dynamic route segment in various `Sources` module pages from `[id]` to `[sourceId]`
for improved clarity and consistency. Adjusted related variable names and logic to align with the
renamed segment.
  - rename SourcePageFilters directory for clarity
  ([cfc68cf](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/cfc68cfe937a036950dd034cdd08ffec41bb589c)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-02. Renamed `SourcePageFilters` directory to `SourcePagesFilters` to ensure consistent naming conventions throughout the `Sources` module. This change improves clarity and aligns with existing folder structure naming patterns.
  - update dynamic segment from `[id]` to `[sourceId]`
  ([10a5cee](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/10a5cee75bce19621560c3d5bbb2dc20799416de)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-02. Updated the dynamic route segment in the `Sources` module from `[id]` to `[sourceId]` for improved clarity and consistency. Adjusted relevant variable naming and logic to reflect this change.
  - update import path for SourceCreateButton
  ([cdd8923](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/cdd89232fd098a027631d342beaf2e201a4610e4)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-02. Aligned the import path for `SourceCreateButton` with the renamed component `SourceButtonCreate`. This change ensures consistency with the recent renaming of components in the `Sources` module.
  - update import path for SourceCreateForm
  ([eb23d1c](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/eb23d1c1c439e367233fbbf7f17685a3f55f1599)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-02. Aligned the import path for `SourceCreateForm` with the newly renamed `SourceFormCreate` directory in the `SourceCreateButton` component. This ensures consistency across the `Sources` module after recent directory renaming.
  - update import path for SourceMonitorSwitch
  ([37cc86d](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/37cc86d8d9dfecf9349b337726d0ca4cae65145e)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-02. Updated the import path for `SourceMonitorSwitch` to `SourceSwitchMonitor` in the `SourcesTable` component. This aligns the import with the renamed file to maintain consistency and avoid import resolution issues.
  - update import path for SourceUpdateForm
  ([2499cf0](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/2499cf0fe61372edb302bd6d3dcbe484a13d57dc)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-02. Updated the import path for `SourceUpdateForm` to `SourceFormUpdate` in the `SourceDropdownAction` component. This change reflects the recent renaming of the directory for better naming consistency across the `Sources` module.
  - update Title imports and formatting
  ([d678bed](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/d678bed58fcb58091fd783268c3689e78fab905a)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-02. Updated the import style for the `Title` component, changing from double quotes to single quotes for consistency with the codebase. Simplified the JSX return statements by removing unnecessary parentheses.

### Chores
- changelog
  - add changelog updates for v0.3.1
  ([ede10c2](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/ede10c2d16923c5e6ff86b5d25937f65ace1cfa7)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-02. Included detailed entries for version v0.3.1 in the CHANGELOG file. Documented added features, improvements, bug fixes, and other modifications to ensure clear communication of changes in this release.
  - update changelog for v0.3.1
  ([f878a15](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/f878a15f2a38b48b4667dcd20b4647cc981b566d)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-02. Updated the CHANGELOG to include entries for v0.3.1 release. Documented notable changes, new features, and improvements introduced in this version. This ensures transparency and provides a clear summary of updates for users.

- dashboard
  - remove commented-out notes
  ([4710f1d](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/4710f1da8c7b477411feb3dd99e593b5b6fb9647)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-05. Removed unused commented-out notes from the `DashboardContent` component to improve code cleanliness and maintain consistency.

- release
  - 0.3.2
  ([b877991](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/b877991f1531f41e716a53d49cd5493e6f92973d)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-05.

- scripts
  - update `postrelease` config in package.json
  ([2121c9e](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/2121c9eec6d265b47ce15e6502a3aae5f5899b65)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-02. Changed `postrelease` script to use `-r 0` instead of `-r 1`. This modification ensures the changelog generator always includes all relevant commits in the changelog, even for the latest release.

### Styles
- form
  - adjust formatting and code consistency
  ([e5bbbf2](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/e5bbbf247fba2e42fe71ba990914110f7ac0988b)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-04. Improved code readability and consistency within the `form` components. Adjusted import statements and function definitions for cleaner formatting. Ensured alignment with the overall code style guidelines.


## v0.3.1 - 2025-09-02

### Chores
- release
  - 0.3.1
  ([9d0ecbb](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/9d0ecbb3735de39b91dbd9a34e61df11b63cf54f)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-02.


## v0.3.0 - 2025-09-02

### Features
- api
  - add dynamic proxy route for flexible API requests
  ([b13b217](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/b13b21768b7a87b8f8a246b17c0c3f8cb5aacc37)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-28. Added a dynamic API proxy handler to route requests based on paths and environment configurations. This implementation supports filtering headers, managing multiple HTTP methods, and constructing target URLs using the `API_URL` environment variable. The proxy improves flexibility and scalability for backend API communication.
  - add reusable shared schemas for validation
  ([a2fe3a3](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a2fe3a37eb89245528409b5717833b4b537e6ffb)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-27. Introduced shared schemas using Zod for validation across the API. These schemas improve type safety and promote consistency for common data validations such as pagination, email, UUIDs, and more.
  - add source assets entities with repository, service, and query integration
  ([6500668](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/650066894a1233ef80cfe0369851c5f9c7848e5e)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-27. Introduced support for source assets management, including repository, service, and query integration. Defined relevant schemas, types, and API endpoint handling to enable interaction with source assets data.
  - introduce shared types for sorting, pagination & search
  ([84442e4](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/84442e4019a2a03675875c085b5696d5cb0615ee)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-27. Added reusable interfaces for sorting, pagination, and search parameters. These types enhance type safety and maintain consistency across the API when handling data querying needs.
  - update CRUD service for improved pagination typing
  ([78ce9a4](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/78ce9a40f1016fefd93e83170808537a2cf278d6)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-27. Refactored the `createCrudService` function to enhance type safety and consistency in handling paginated responses. Updated typing to use `PaginationResponse` and adjusted parameter handling to include `sortDirection` instead of `sortOrder`.
  - add initial openapi specification
  ([bf4cf2b](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/bf4cf2b1e51774d9077b6e1e99203dd39dc7e9b3)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-26. Added the OpenAPI 3.1.0 specification for the `regwatch` API, providing detailed documentation
for endpoints, request/response schemas, and components.
  - add new source route with upstream fetch for testing
  ([c689dc2](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/c689dc2e49714b7c12c2994d0da16a1aa483db64)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-26. Introduced an API route for retrieving sources from an upstream service. This includes session authentication and response handling to ensure secure and consistent API interactions.
  - add reusable schemas for validation
  ([5565bc2](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/5565bc278f3dc9f755a96cdceb6d7e9cbec50201)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-26. Added shared validation schemas to centralize common patterns and improve API consistency. These schemas include validation for email, UUID, and date-time formats.
  - add OpenAPI specification for regwatch
  ([8456a12](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/8456a1240991165b0e3f6a549dbffd0510793e84)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-21. The initial OpenAPI 3.1.0 specification for the `regwatch` API was created to document endpoints, request/response structures, and security schemes. This includes endpoints for organizations, sources, users, tasks, and associated assets, with pagination, filtering, and error responses fully defined.

- auth
  - add token validation helper function
  ([6608dab](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/6608dab5466b64ab8a51ef4ca863f8cce38fbc4c)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-01. Introduced a utility to validate tokens based on presence and expiration. Includes fallback handling for undefined properties and ensures tokens are checked with expiration leeway for reliability.
  - unify token validation and session handling
  ([fe5cedf](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/fe5cedf6e823475f8b76ca850957157d9e3884b6)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-01. Refactored authentication and session logic to centralize token validation. Introduced `isValidToken` checks in various components to ensure consistent handling of session expiration and authentication status. Improved server and client error handling for unauthorized users.
  - improve token handling and property destructuring
  ([ef0a2f6](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/ef0a2f6811afc3a0936dc4a38ea6f3f84b4b45c9)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-29. Optimized and refactored authentication logic to improve clarity and maintainability. Updated callback functions to destructure properties explicitly, added fallback handling for token expiration, and replaced redundant calculations with constants for consistency.
  - enhance user sign-in with token persistence
  ([a538277](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a5382771f9830aa16292315a61fd1fd7845f244d)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-26. Enhanced the NextAuth configuration to include OAuth token persistence and user creation during the sign-in process. This ensures that user data is properly stored and access tokens are available for authenticated sessions.

- changelog
  - add initial changelog for v0.2.0
  ([29f49b3](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/29f49b3beb88ab5fe4df24cf4d7774cfc4d6e8c2)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-25. Added a comprehensive changelog file to document features, improvements, and breaking changes introduced in version 0.2.0. This provides transparency and helps developers maintain compatibility during upgrades.

- constants
  - add SEARCHING constant and related type
  ([fa1a79c](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/fa1a79ca5680574728c17ebe4c0d323ce363ad79)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-27. Introduced `SEARCHING` constant to define shared search-related keys. Added `SearchField` type for safely referencing the keys of `SEARCHING.SEARCH_FIELD_IDENTIFIER`. This improves type safety and consistency in handling search field identifiers.
  - add type for pagination page sizes
  ([6fbecfd](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/6fbecfd7a4e27ac1f0c2ce1a5177ecf8c511452f)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-27. Introduced `PaginationPageSizes` type for better type safety when referencing the `PAGE_SIZES` values in the `PAGINATION` constant. Enhanced maintainability for pagination settings by exporting the new type.
  - update sorting constants and types
  ([360ae56](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/360ae566efbfb0bbf0511147663d4d09bde31238)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-27. Renamed `SORT_ORDER` to `SORT_DIRECTIONS` and `DEFAULT_SORT_ORDER` to `DEFAULT_SORT_DIRECTION` for clarity and consistency. Changed `SORT_FIELD_IDENTIFIER` value to `order_by` to align with updated terminology. Introduced new types `SortDirection` and `SortField` to improve type safety and ensure consistent usage across the application.

- dashboard
  - add `notfoundpage` component
  ([de72e36](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/de72e36cb5cd3f89f54d829b35d08f9ee9c37194)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-26. Introduced a `NotFoundPage` component for the dashboard to handle 404 scenarios within the private route structure. This ensures a consistent user experience when accessing unavailable pages.

- deps
  - add cmdk and framer-motion dependencies
  ([52ffab4](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/52ffab46c3c36275dd8e1398a9c7dba659a3a9a1)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-28. Enhanced the project by introducing `cmdk` and `framer-motion` dependencies. These libraries enable advanced UI components and animations, improving the overall user experience and interaction capabilities.
  - add commitlint and conventional changelog tools
  ([3038bc2](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/3038bc28f41e00d8fcc96b1d0cbbec5d24bfa407)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-27. Added dependencies to support commit linting and changelog generation. These tools enforce consistent commit messaging and facilitate the release process with semantic versioning.

- fetcher
  - enhance URL handling and request configuration
  ([d3d3d1e](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/d3d3d1eb243e335427567cfeb1b1f117f0ede785)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-28. Added proxy support for URL transformation based on environment variables, enabling flexible API routing for development and production environments. Improved request configuration by introducing `referrerPolicy` and refining fetch options like `mode`, `cache`, and `credentials`.
  - add bearer authorization support
  ([7be2862](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/7be28629a85f39a811799f3205b0032fcb53a31e)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-26. Added a method to set Bearer token authorization in the Fetcher class. This allows users to include an Authorization header with Bearer tokens, enhancing the flexibility and security of API requests.

- filter-dropdown
  - use pagination constants for defaults
  ([7f4303c](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/7f4303cbefc0c506948d6449b0c04e86b62ed9bf)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-29. Updated `FilterDropdown` to use `PAGINATION` constants for `page` and `pageSize` default values. This improves maintainability and ensures consistent default behavior across components.
  - replace sortOrder with sortDirection
  ([c6eb82a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/c6eb82a9a4ea0a43f976e7e3113da3d804b56782)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-28. Aligned `FilterDropdownProps` with updated naming conventions by replacing `sortOrder` with `sortDirection` from `SORTING` constants. This improves type safety and maintains consistency with other components.

- filters
  - add command from shadcn and framer motion
  ([2d29d23](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/2d29d232fb09b3ecdc6879537374526e714e6336)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-27.
  - add obligations filters into page
  ([93721ca](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/93721ca17947f8db49480c8abdb2302c320405de)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-27.
  - add source filters into page
  ([3099179](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/3099179ab66724506356b3eaad1587a54fc94008)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-27.
  - create filter dropdown component
  ([90ea072](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/90ea07286e2dd31c5b48f0fef22c4a5bcafaf992)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-27.
  - create obligation filters component
  ([7663499](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/76634991bc15ffeedbc8796631693a7c8c94fca1)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-27.
  - create search component
  ([ea099ba](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/ea099bab022cfbd518ca1fc736797e37b9003cbe)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-27.
  - create source filters component
  ([a8d6b6d](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a8d6b6d64b2b9120620a96fbbbcdfa80d5eb5413)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-27.
  - edit query params helper
  ([cbc2703](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/cbc27030426cae21f46b4fd235e923e31d910645)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-27.

- helpers
  - improve pagination parsing logic
  ([9abc87a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/9abc87add22b58c65eda912b1942506c177e1cb0)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-28. Updated `parsePaginationParams` to include a more explicit return type (`ParsedPagination`) for better clarity. Enhanced input validation for pagination and sorting parameters, including clamping, normalizing, and verifying values against predefined options to reduce potential misuse.
  - add utility for parsing pagination params
  ([380f629](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/380f6296597a1fab2d4caef888059dd9bfb4943f)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-27. Introduced `parsePaginationParams` to streamline pagination parameter handling and improve code reusability. The utility parses and returns pagination and sorting parameters with default values, reducing repetition and simplifying related logic globally.
  - extend buildUrlQueryParams with search support
  ([9d64d4a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/9d64d4a5a19a21b703b4dd54715bffb38b24d61e)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-27. Enhanced the `buildUrlQueryParams` utility to include `search` functionality and improve typing. Updated the default values and added `search` as an optional parameter to simplify URL query generation for paginated and filtered endpoints.

- mocks
  - add utility functions for generating mock data
  ([4b48ef9](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/4b48ef95f9ea79ce3a447002299473bd7c78de93)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-27. Introduced `makeMockPost` and `makeMockSource` functions to generate mock objects for `Post` and `Source` entities. These utilities will enhance testing capabilities by providing realistic and flexible data generation. Configurable mock fields mimic real-world variability where certain fields may be null or omitted.

- obligations
  - create repository, queries, services and types for obligation assets
  ([dc6fb56](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/dc6fb56ad342ed594b549e6e2eb0111b58636c9a)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-01.
  - fetch obligation assets from page
  ([2192184](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/2192184c40f22599ea42c2cd464086aaf6751e65)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-01.
  - replace sortOrder with sortDirection
  ([56be8b1](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/56be8b181ba848c34b77c0f9cc7e3acc65b42c9a)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-28. Aligned `ObligationFiltersProps` interface with updated type safety by replacing `sortOrder` with `sortDirection` from `SORTING` constants. This ensures consistency across components and better naming alignment.

- pagination
  - add default orderBy to searchParams
  ([fa6f387](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/fa6f38747ef877f7ea3c6d80a819926c5fe81849)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-01. Enhanced pagination logic to include default `orderBy` values when parsing search parameters.
This ensures consistent ordering for obligations and sources pages, improving user experience.
  - make parsePaginationParams asynchronous
  ([bdbd804](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/bdbd804507fabe48ad90c998154d642fb4cbdda5)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-28. Changed `parsePaginationParams` to an asynchronous function for handling awaited input parameters. This update ensures the function can handle cases where parameters need to be resolved asynchronously before processing.

src/lib/helpers/parsePaginationParams.ts: marked the function as `async` and added `await` for parameters destructuring
  - update page size options and identifier
  ([e98c794](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/e98c7946a3e29df393aa60923c1c24c7db4835ba)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-27. Revised the pagination constants to better align with expected usage patterns and enhance customization. Updated the `PAGE_SIZE_IDENTIFIER` to `size` and adjusted the `PAGE_SIZES` array to provide more flexible options.

- profile
  - connect backend to the profile information card
  ([aa2c91e](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/aa2c91ea263bc6afe95f261378b6442a6698d048)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-01.
  - create helper for getting user initials
  ([967156b](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/967156bb569b9766c12400962d76e898d4ff6c98)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-28.
  - create hook to get user session data values
  ([ca2d299](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/ca2d2998a25941673a699499dfe50fa5cfa4d85e)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-28.
  - refactor nav user components
  ([2fbad28](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/2fbad288369b85611294c117eace75634ea7ab36)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-28.
  - show user avatar in profile settings
  ([016c810](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/016c810ed270cde96a54f2f6fee92277bab85b55)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-28.
  - show user data in profile settings
  ([c0b5fea](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/c0b5fea1da209f12d016e6f3db51d1bd60ce1f44)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-28.

- proxy
  - update route handlers to support async params
  ([39f4b5d](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/39f4b5d02dc54a7ac6cda974beae721ec283d11d)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-28. Adapted route handlers in `proxy` API to support asynchronous `params`. This ensures compatibility with changes introduced in Next.js 15, where `params` in Route Handlers are now asynchronous.

- repository
  - add helper method for URL path construction
  ([23362da](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/23362da75871d33831d071881376803711f06a05)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-27. Added a `buildUrlPath` method to the `BaseRepository` class as a wrapper around `buildUrl` for constructing URL paths. This improves code readability and adapts the repository for more intuitive URL segment handling.
  - add paginationAdapter for data transformation
  ([a157371](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a157371e3b542a5cd2eceae41d06c8e85dc27ee0)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-27. Introduced `paginationAdapter` utility to streamline the transformation of raw pagination data
into a standardized `PaginationResponse` format. This improves type safety and consistency
for handling paginated data across the repository.

- search-input
  - replace sortOrder with sortDirection
  ([547008d](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/547008da93a16787219d19fb40dde9aad0e0a552)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-28. Replaced `sortOrder` with `sortDirection` in the `SearchInputProps` interface and related logic. Updated to use `SORTING.DEFAULT_SORT_DIRECTION` for default values, ensuring alignment with naming conventions and maintaining type safety.

- source-assets
  - add content_types and fix queryKey typo
  ([95f5995](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/95f599519500af661700ab23f2c3ce4eb80fb9bb)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-28. Enhanced the `sourceAssetSchema` by introducing the `content_types` field to support structured content type data. Fixed a typo in the `useSourceAssets` queryKey to align with naming conventions.

- sources
  - add link to the source page alerts page
  ([2552a65](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/2552a6541375ea31b6ef1de51272d048a91e2efb)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-02.
  - create source page alert compare changes component
  ([cc939c3](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/cc939c379a6b0ccf5eceb2d543967bd006acbf89)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-02.
  - create source page alert page
  ([4d11a94](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/4d11a9427f794264245aa9eea6596c27c1ff364b)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-02.
  - create source page alerts dropdown action
  ([8397ca1](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/8397ca14d22ba676ef7dc02e2abd4a5d039b7c08)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-02.
  - create source page alerts filters
  ([b8c7d93](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/b8c7d9308e4af440621d87c021e55fbaa373905b)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-02.
  - create source page alerts page
  ([4944956](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/494495613d764fd572b3b1fdd37ab59003ed6069)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-02.
  - create source page alerts page route
  ([8672881](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/86728811ca18308f1ccc3cbdaa8bca9ce075358c)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-02.
  - create source page alerts table
  ([40556fd](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/40556fd847b4bee4be5d1b5a8c4637bc308e5418)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-02.
  - add source details page url
  ([953438a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/953438a50b5881df84c2f034945f3c42881d6cb3)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-01.
  - create source details component
  ([c31415c](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/c31415c8babc370086a71e5aa9279efbf5ee7059)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-01.
  - create source details page
  ([63c29d9](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/63c29d9955899ad2f2a096882c5c49432794d533)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-01.
  - create source pages dropdown actions component
  ([a8c7f21](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a8c7f216ada17b6224c886a45c7e8fc39ddd153a)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-01.
  - create source pages filters component
  ([85f87ab](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/85f87ab1b1457eeb8c045be822cd643645a9d07d)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-01.
  - create source pages table with components
  ([0577862](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/05778621121d8a618f6ba182a954c00e0c4d8971)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-01.
  - create source pages types
  ([cf2a9a0](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/cf2a9a005a0273a1038791bf28275a6b9f68d67b)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-01.
  - enhance SourceUpdateForm with dynamic data support
  ([04b1d46](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/04b1d4606594c12478651163bdcee1ad706f4a8c)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-28. Improved the `SourceUpdateForm` by integrating dynamic data fetching and support for preloading form values. Updated various form fields to leverage real-time data and provide a seamless user experience. Added a loading state to handle asynchronous operations.
  - enhance updateSourceSchema with partial fields
  ([9cc4072](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/9cc407272aeccb68bdd9e86b476f16a28cc38b0f)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-28. Refined `updateSourceSchema` to allow partial updates by utilizing `pick` for specific fields and marking them as optional. This ensures flexibility during source updates while maintaining schema integrity. Adjusted the validation error message for `base_url` to improve clarity.
  - pass data prop to SourceUpdateForm component
  ([bf5a25a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/bf5a25a653732742178d4b8a6d418444874aebf1)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-28. Updated the `SourceDropdownAction` component to pass the `data` prop to the `SourceUpdateForm`. This enables the form to utilize the provided data, improving its functionality and ensuring the correct state is preloaded during updates.
  - replace sortOrder with sortDirection
  ([7bc8721](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/7bc872152631a2146c65b5f8d157f09921cbaf25)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-28. Updated `SourceFiltersProps` interface to use `sortDirection` from `SORTING` constants for better type safety and alignment with consistent naming conventions. Adjusted components and props to utilize `sortDirection` instead of `sortOrder`.
  - integrate source assets hydration and boundary
  ([94d3486](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/94d3486b0ff62d1f315b886d0efb1b0d6195a0b4)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-27. Added hydration for source assets in the Sources page to enable fetching and displaying related data. Implemented a nested `HydrationBoundary` to manage state for `sourceAssets` alongside existing sources data.

- ui
  - add badge component from shadcn
  ([f66fbfb](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/f66fbfb07185a5b2737a972f56a52c9e93cc0628)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-01.
  - create universal form field input
  ([cfba9c6](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/cfba9c644ed750d28beee3ff68e143e91f417946)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-01.
  - create universal risk badge component
  ([e4819ae](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/e4819aeea6635c67848fd4c2ba6ff79eb804851a)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-01.
  - create universal statistic card component
  ([8f1dfd8](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/8f1dfd8885e222067336ee5c6cdc86e8a6cf486c)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-01.
  - create universal status badge component
  ([b95d88e](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/b95d88ed8e42aed2f67668d18bb5988bc179f698)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-01.

- user
  - add createUserWithSignIn method to repository
  ([7b92e1e](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/7b92e1e477e556ee235739fa154296efd5fb98a8)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-27. Added a method `createUserWithSignIn` in the user repository to support user creation while
utilizing a Bearer token for authentication. This method facilitates seamless implementation
of authenticated user creation workflows.
  - add createUserWithSignIn service method
  ([ee96da3](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/ee96da35ba4fc48b916f4e957c43b8d2efa55b3f)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-27. Added the `createUserWithSignIn` method to the user service to support user creation with a Bearer token. This enables authenticated user creation workflows and leverages the repository implementation for streamlined functionality.
  - add createUserWithSignIn service method
  ([b321ca8](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/b321ca8f1731bc5eea69a0e7f10c40ae08821a4f)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-27. Added the `createUserWithSignIn` method to the user service to support user creation with a Bearer token. This enables authenticated user creation workflows and leverages the repository implementation for streamlined functionality.
  - add crud services, schemas, and hooks
  ([80596cd](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/80596cd2b2753c1cb10770f648f1d2ad035eb375)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-26. Implemented user-related CRUD services, validation schemas, and React Query hooks for consistent and reusable user entity management. This includes schema validation, service interactions, and query/mutation hooks to streamline user-related operations.

### Bug Fixes
- base-repository
  - set bearer token after session verification
  ([ed0cd17](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/ed0cd17376ce189f93bef7a9bffd852f8fab14e5)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-26. Previously, the bearer token was not being properly set after verifying the session, potentially causing unauthorized API requests. Updated the session verification logic to ensure the authorization header is correctly configured with the access token.

- build-url
  - correct indentation issues
  ([6e7fc16](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/6e7fc1613c700c7ada6542f155f49d24cd4dab21)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-28. Resolved inconsistent indentation in the `buildUrlQueryParams` function's arguments and type definition. This ensures better code readability and adheres to the project's formatting standards.

- config
  - update commitlint subject-case rules
  ([9c8d2cb](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/9c8d2cb6968f44e9800c14c303bb0848012c939f)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-27. Adjusted commitlint configuration to allow more diverse subject-case styles. This ensures improved compatibility with existing commit message conventions and greater flexibility in message formatting.

- filters
  - add form and schema into search component
  ([3685c1f](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/3685c1f857e4517243595f2e6a9842c6eaef472a)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-28.
  - create filter option dropdown separate component
  ([c36719c](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/c36719c564c0eae9790bab690c7cadd93297f975)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-28.
  - fix applying and deleting filters, refactor url params helper
  ([4c8ab8a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/4c8ab8a4f83e1863a0a5fd5698bf943ab97f6f52)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-28.

- obligations
  - handle async searchParams and update props
  ([f998eb3](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/f998eb3730d0c122c2c602729a4c6f82d8733ea2)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-28. Updated `ObligationsPage` to support asynchronous execution for the `searchParams` parameter, improving compatibility with async logic. Replaced `sortOrder` with `sortDirection` in `ObligationsFilters` for consistency in naming conventions across components.
  - resolve async and sort direction issues
  ([e1a51fc](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/e1a51fcf7cb6f31803af4acf28b07a4a652e0d29)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-28. Updated `parsePaginationParams` to handle asynchronous execution using `await` in the Obligations page. Fixed incorrect usage of `sortOrder` by replacing it with `sortDirection` to ensure consistency and proper sort functionality.
  - fix scroll in obligations forms
  ([f96a433](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/f96a4332424777918885acc10772f549422a9767)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-26.

- profile
  - edit delete account texts
  ([d81d60c](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/d81d60c83b803dce72111472c65452ac3fd0b536)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-28.
  - fix profile data styles for mobile
  ([91a0fda](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/91a0fda363ff6be1dcf20b5f575445db02f822bb)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-28.
  - fix profile tabs for mobile
  ([7245da9](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/7245da91d5765a95acd85e01c756adb435d95d87)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-28.

- sources
  - fix source details
  ([059fb99](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/059fb99be9d9bf5f40d5807a275c8a8875c9dce1)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-02.
  - group sources list page
  ([7bbbbf7](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/7bbbbf717301450458b8cedae3d5f5c7a79b4ef3)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-01.
  - fix sources table
  ([35b3bc1](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/35b3bc11f007e84efd37ad34b85cf2fbfc8da6f7)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-28.
  - handle async searchParams and adjust props
  ([e5c420d](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/e5c420dc28cd54fd42faf3b681de88ec9725585d)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-28. Updated `SourcesPage` to handle asynchronous execution for the `searchParams` parameter, ensuring compatibility with async logic. Replaced `sortOrder` with `sortDirection` in `SourcesFilters` for better naming consistency.
  - resolve async issue in pagination params
  ([3a9603f](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/3a9603f176e373eaeac1f8d328dc2c4cf27f7bb5)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-28. Ensured `parsePaginationParams` supports async execution in the `Sources` page. This prevents potential errors when handling asynchronous pagination logic. Fixed inconsistent import order to improve readability and maintain code consistency.

- table
  - fix scroll in pages with tables
  ([37cc377](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/37cc377f4b5458b471c4c93a3598d539f28cde0e)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-26.

- types
  - fix search input types
  ([ff4551d](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/ff4551d5aeed6b6c22ed62b5155544904c4bb628)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-01.
  - fix types for sources and obligations filters
  ([2630ef8](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/2630ef81418a05a6a1e907e5abd38e2094881948)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-01.
  - fix types warnings
  ([78ec1e0](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/78ec1e000eb34b1f4a1305059e5edb67abb93de7)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-01.

- ui
  - fix search input props
  ([732800a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/732800ad7e87f6977afba2a3a71809edc19b358f)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-09-01.

### Refactoring
- api
  - enhance ID handling in fake posts routes
  ([4c022cf](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/4c022cfc9a33c6abc79c44ba9644f871ba6a48f0)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-27. Updated fake `posts` API routes to improve ID handling logic. If an ID is missing, a UUID is generated using the `faker` library. This change ensures robust handling for URLs without IDs and aligns with mock data generation practices. Added logging for incoming POST data to aid in debugging.
  - remove unused imports in obligations route
  ([03f06a8](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/03f06a877366a132e96fbcaee7e15d96680d1370)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-27. Eliminated unused imports in the fake `obligations` API route. This change simplifies the file by removing the `Obligation` type and `faker` import, which were no longer utilized, aligning with code cleanup and consistency practices.
  - replace inline mock data with utility function
  ([e590a13](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/e590a131720b4eaeea474ac6c46102c47ad85789)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-27. Replaced inline mock data generation logic in API route handlers for `posts` with the centralized `makeMockPost` utility. This change simplifies the code, ensures consistency in mock data generation, and aligns with best practices.
  - replace inline mock source data with utility
  ([ec62a3a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/ec62a3a8b33f9fa0b8a4ff497807ad0f223e7d3b)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-27. Replaced inline mock data generation in fake `sources` API routes with the centralized `makeMockSource` utility. This change improves code maintainability, reduces duplication, and aligns with existing mock data practices.
  - update sortOrder to sortDirection for consistency
  ([f487989](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/f487989bfcf06113d10138860f78ab1b11b35c3f)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-27. Renamed `sortOrder` to `sortDirection` in API route logic for better alignment with updated terminology in shared constants. This change ensures consistency across the application and improves clarity in sorting functionality.

- auth
  - update session verification logic
  ([762fc01](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/762fc01b1f8a00937a5def109bb7654f582b00da)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-02. Replaced `auth` with `verifySession` to better handle session states. This enhances authentication logic by explicitly checking the status and ensuring the session is authenticated before redirecting.
  - remove unused ClientSessionGuard component
  ([1a933af](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/1a933afa0110158ed8a4762dc7e65338989964ec)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-01. The `ClientSessionGuard` component was removed as its functionality is now centralized in token validation and session handling logic. This aligns with ongoing efforts to simplify and streamline session management across the application.

- constants
  - remove unused sorting import
  ([b843661](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/b843661c35a89b4c7450a9e7bab088f772519f30)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-27. Removed the unused `SORTING` import from the pagination constants file. This change cleans up unnecessary code, enhancing maintainability and readability.

- crud-service
  - reorder type imports for consistency
  ([20bc422](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/20bc422830d4d1b1cfdb0fda3bdfcffdc727dda0)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-27. Reorganized type imports in `crudService.ts` to improve readability and adhere to standardized import ordering across the codebase. This change moves `Id` and `PaginationRequest` into appropriate logical groups, ensuring maintainability.

- dashboard-content
  - update sorting terminology for consistency
  ([ba8649c](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/ba8649c63eda86d0a127fdf261a00754f3a32680)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-27. Replaced `sortOrder` with `sortDirection` in the DashboardContent component to align with updated sorting terminology used across the application. This ensures clarity and consistency in parameter naming and logic.

- data-table
  - update sorting terminology for consistency
  ([f3e70e0](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/f3e70e0b9e35b1a101b124b04fec453fee7145bc)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-27. Replaced `sortOrder` with `sortDirection` in the `DataTableWithActions` component to align with updated terminology across the application. Updated URL query parameter generation and adjusted related logic for improved clarity and consistency in sorting functionality.

- layout
  - simplify handling of optional search parameters
  ([9e55023](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/9e550235cd515e3a963411507e17cf4ba742241b)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-27. Simplified the handling of `searchParams` in Sources and Obligations pages to ensure better defaults and null safety. Replaced direct destructuring with a fallback mechanism to handle undefined values gracefully.

- mocks
  - add optional ID input to `makeMockPost`
  ([9d71c0c](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/9d71c0c604aa2cbe350423c798840bed331917a6)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-27. Updated `makeMockPost` to accept an optional `_id` parameter. If `_id` is provided, it is used as the mock `Post`'s ID; otherwise, a random UUID is generated. This improves flexibility and supports scenarios where a specific ID is required for mock data.

- obligation-queries
  - update sorting terminology and type import
  ([6537b24](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/6537b2493ee7dba73db116f90af0f23e30999940)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-27. Replaced `sortOrder` with `sortDirection` in `useObligationsPagination` for consistency with updated sorting terminology across the application. Updated import of `PaginationRequest` to use the shared `types` module for improved organization and maintainability.

- obligation-repo
  - update API endpoint to versioned path
  ([62f7386](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/62f738605da25490af032d230b4fe64e9f46578e)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-27. Updated the `endpoint` in the obligation repository to use the new versioned path `/v1/obligations`. This change aligns with the API's updated route structure for better maintainability and clarity in versioning.

- obligation-types
  - update and expand schemas
  ([adaa1fd](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/adaa1fdbe346a7b376bb409bbf4b0fe01070385a)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-27. Standardized and expanded `Obligation` schemas to align with updated conventions and improve consistency. Introduced new fields such as `obligation_type`, `risk_level`, `effective_date`, `detected_at`, and others to enhance schema coverage and flexibility. Consolidated imports into the shared `schemas` module to improve maintainability.

- obligations
  - align with updated sorting terminology
  ([eb5fd4c](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/eb5fd4c934b4fe8ae02c0463c57c778e7e597061)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-27. Replaced `sortOrder` with `sortDirection` across the Obligations page to ensure consistency with updated sorting terminology used throughout the application. Updated type definitions and prop names accordingly for improved clarity and alignment.
  - simplify pagination handling
  ([c9c502d](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/c9c502dd9db24f32adfb4f6ef4ebf0b282e8a533)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-27. Replaced manual parsing of pagination and sorting parameters with the `parsePaginationParams` utility in the Obligations page. This reduces redundancy and aligns with reusable code practices, improving maintainability and readability.

- obligations-table
  - update columns and fields structure
  ([88d0271](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/88d02718dcbfc98b993da0cc8acc9ac24858dcaa)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-27. Expanded and standardized table columns in ObligationsTable to align with updated schemas and naming conventions. Enhanced column labels, replaced old fields with new ones, and added new columns for better feature coverage and usability. Disabled sorting for all columns to simplify behavior and ensure consistency.

- page-size-select
  - update types and props for consistency
  ([eb3883b](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/eb3883bf1c924f50ac76be9b29c80924aec98dcc)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-27. Aligned `PageSizeSelect` props with updated pagination terminology and type definitions. Replaced `sortOrder` with `sortDirection` for improved consistency and clarity. Refactored the component to use shared `PaginationProps` for better type safety and standardization.

- pagination
  - update types and props for consistency
  ([2267c7a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/2267c7a84e33950788555b58aa8f38705643f489)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-27. Revised pagination-related types and component props for better clarity and alignment with shared definitions. Replaced `sortOrder` with `sortDirection`, introduced `PaginationResponse` for standardized structure, and updated `PaginationProps` to improve type safety. Refactored URL query parameter handling to streamline search and sorting integration.

- pagination-controls
  - update types and props for consistency
  ([60ad5ba](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/60ad5ba03ec47e14b107828e20b87ea2c933f2d3)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-27. Aligned `TablePaginationControls` component with updated pagination and sorting terminology. Replaced `sortOrder` with `sortDirection` for clarity and consistency across the application. Improved type safety by introducing a generic `<T>` type to the component's props.

- post-types
  - consolidate id schema into shared module
  ([4d344f5](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/4d344f5316c27bee4a4436f7be27484f535d76f3)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-27. Replaced the inline definition of `idSchema` in the post schema with the shared `idSchema` from the `shared/schemas` module. This change promotes code reuse and aligns the post schema with shared schema conventions.

- repositories
  - centralize request handling logic
  ([4276e2e](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/4276e2eea4f193a5fcf4131c3912ecbf5eefee59)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-28. Refactored `BaseRepository` to consolidate request handling into a single reusable method `request`. Introduced a new centralized error handling function to streamline unauthorized responses across client and server. This improves code maintainability, readability, and consistency by reducing repetitive authorization and error handling logic.
  - remove redundant type import
  ([e824b34](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/e824b34530b518b822caa67769609d19a70283ba)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-27. Removed the unnecessary `type` keyword from the `paginationAdapter` import in `baseRepository`. This change cleans up the import statement, as `paginationAdapter` is not used as a type.

- repository
  - enhance pagination handling
  ([59a07c0](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/59a07c02a0ca63c9dfdbb27219151af16131c292)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-27. Updated `BaseRepository` to improve pagination functionality and standardize typing. Replaced `PaginatedResponse` with `PaginationResponse` and adjusted the pagination adapter to transform fetcher data. Renamed `sortOrder` to `sortDirection` for terminology consistency.
  - update types for consistency
  ([390bf30](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/390bf302599ba638f0837327c0b595a629e2b576)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-27. Replaced local pagination and ID types with shared definitions to improve type consistency and reuse across the application. Updated `getAllWithPagination` to use `PaginationResponse` from shared types.
  - update endpoint to align with api v1
  ([097f39f](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/097f39f07782339102cce3c57953ae81cf078367)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-26. Updated the `endpoint` property in the `Repository` class to use the new `/v1/sources` route. This aligns with the API v1 structure for source data management and ensures consistency with backend changes.

- source-types
  - update schemas and types for consistency
  ([72421d5](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/72421d547b92cd42e79c68f53d2e0f744d2e2d8f)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-27. Standardized and expanded the `Source` schema to align with updated organizational conventions. Consolidated imports from `shared/schemas` to streamline dependencies. Enhanced type definitions to improve clarity and coverage for new attribute fields.

- sources
  - handle optional params for source page
  ([fb3ee87](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/fb3ee87fc1cd211cbc53a8a05aa9c2c1730e5d8d)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-02. Updated `SourcePage` logic to handle `params` as an optional promise and resolve it dynamically. Added fallback for cases where `sourceId` is undefined, ensuring proper error handling by invoking `notFound()`.
  - restructure not-found and loading components
  ([80b213a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/80b213a648ef5b9271978d59c4116c6cfac17259)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-02. Moved `not-found.tsx` and `loading.tsx` components for sources into the `(list)` directory. This change ensures better organization and aligns with the directory structure for source-related components.
  - update params handling and error fallback
  ([682f16b](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/682f16b0005210b77c86d46715c37dc3b9dcb713)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-02. Updated `SourcePageAlertsPage` to properly handle `params` as an optional promise. Introduced logic to resolve `params` dynamically and added fallback to invoke `notFound()` when `sourceId` is undefined. This improves error handling and robustness of the component.
  - remove unused imports in page.tsx
  ([863804e](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/863804ef16d6cdc050479c6ac5027586a6ae35eb)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-28. Removed unused `PAGINATION` and `SORTING` imports from the Sources page to improve code clarity and maintainability. This cleanup eliminates redundant code, aligning the file with streamlined practices.
  - remove unused `SearchParams` import
  ([a920fd2](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a920fd22d2bef4aa756e14eb35bccac3510fc214)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-27. Eliminated the unused `SearchParams` type import from the Sources page. This change cleans up unused code and ensures consistency with proper import practices.
  - remove unused imports in page.tsx
  ([28adcc7](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/28adcc7968794fa1333fcdc1fe7707f9e7bff7e5)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-27. Removed unused `PAGINATION` and `SORTING` imports from the Sources page to improve code clarity and maintainability. This cleanup eliminates redundant code, aligning the file with streamlined practices.
  - streamline pagination params and hydration handling
  ([8da92b5](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/8da92b5c6e8e2245daa521fb04e1cf35ff431955)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-27. Refactored the Sources page to enhance pagination parameter parsing and simplify hydration logic. Replaced manual parameter processing with `parsePaginationParams` utility for clarity and consistency. Combined multiple hydration setups into a single `Promise.all` call for efficiency.
  - update fields to align with updated schema
  ([c986598](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/c986598105ff0369921964601680fc4edf8ada31)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-27. Updated `Source` component field names to reflect changes from the updated schema. Replaced `monitor` with `monitoring_enabled`, `regulatorySource` with `name`, `jurisdiction` with `jurisdiction_id`, `frequency` with `monitoring_frequency`, `pages` with `last_monitoring_completed_at`, and more. These changes ensure consistent naming conventions and improved integration with aligned schema structures.
  - update pagination and sorting logic
  ([e9f01e0](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/e9f01e02cdd6c09a6de0f7467cbb29c729ff134e)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-27. Replaced `sortOrder` with `sortDirection` in `useSourcesPagination` to align with the updated sorting terminology across the application. Updated the `PaginationRequest` type import to use the shared module for better consistency and organization.
  - update sorting and pagination handling
  ([9ed866a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/9ed866a77d4553c43edf9d4d88fa5e0b6808bb79)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-27. Replaced `sortOrder` with `sortDirection` in Sources page to align with updated terminology across the application. Updated type definitions, searchParams handling, and props for improved clarity and consistency. Leveraged `Source` type for stricter typing in `TablePaginationControls`.
  - update imports to reflect store rename
  ([ed68020](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/ed68020d9089897dacb5d9528745e5f316804c0a)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-26. Renamed `useSourcesStore` imports across source-related components following the refactor from `StoresStore` to `SourcesStore`. This enhances consistency and aligns with updated store naming conventions.

- sources-table
  - update columns and data structure
  ([c788c04](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/c788c047ad5c204c466d5633d6e7c36973d337e4)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-27. Standardized table columns to support updated source attributes and enhance clarity in displayed information. Replaced several column IDs with new relevant fields and adjusted their labels and types accordingly. Added new columns for monitoring attributes to support enhanced monitoring capabilities.

- stores
  - rename storesstore to sourcesstore
  ([37cbef8](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/37cbef8cf614713bd47f28d074641497c61b99e9)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-26. Renamed `StoresStore` directory to `SourcesStore` to improve clarity and reflect its purpose more accurately. Adjusted related type imports to match the updated naming.

- tables
  - standardize column definitions and sorting
  ([a002aef](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a002aefafb8e77b4266c9ca3b61408622c1b876a)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-27. Aligned column definitions and sorting settings for ObligationsTable and SourcesTable to improve consistency. Adjusted indentation and updated sorting behavior to ensure uniformity across components. Disabled sorting for multiple columns to simplify interactions.
  - update `Id` type to use shared module
  ([cc59564](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/cc5956480bdac583d4da85ce2ba7aefc2da99364)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-27. Replaced the `Id` type import in TableRowCheckbox and TableHeadCheckbox components to reference the centralized `Id` definition from the shared `types` module. This change consolidates type usage and aligns the components with standardized conventions.

- user-types
  - update schemas and types for consistency
  ([a25fbd4](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a25fbd43b2d470d5fc7a80aa93e0a71f6638ef7b)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-27. Replaced `createdAtSchema` and `updatedAtSchema` with `datetimeSchema` for uniform handling of datetime fields. Consolidated imports from `shared/schemas` module. Improved type organization by moving `User` type closer to its associated schema.

### Documentation
- readme
  - remove unnecessary question at the end
  ([1c37333](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/1c3733334ea5c26120fb607ce1472ae094fce678)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-25. Removed an outdated and unnecessary question from the README to maintain clarity and professionalism. This change helps ensure the document remains concise and straightforward for developers.

### Chores
- gitignore
  - update rules to exclude specific files
  ([12be9ba](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/12be9baeca622ee32a704afd0622d6751beb29a2)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-25. Added a rule to exclude files and folders matching the `___*` pattern for better control over untracked files. This change improves project directory management and avoids accidental commits of specific files or directories.

- release
  - 0.3.0
  ([033af4f](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/033af4f6efc2c2732a8cfaa563847ae91f320669)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-09-02.

- scripts
  - remove unused format:pretty script
  ([085ce9a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/085ce9a95a0d1ae7fac9e34abe662880cfa187d0)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-26. Removed the `format:pretty` script from `package.json` as it was no longer in use and redundant. This cleanup helps maintain a lean and relevant script list, reducing potential confusion for developers.


## v0.2.0 - 2025-08-25
### ⚠️ BREAKING CHANGE
- `deletePostSchema` has been renamed to `idValidationSchema`, and any references to `PostEdit` should now use `PostPatch`. This may require updates in external integrations referencing these.
- Adjustments to style conventions may require updates for tools or configurations expecting deprecated formatting.
- Introduced custom utilities and setup that may require updates to existing styles.

### Features
- alert-dialog
  - add onOpenChange prop for state handling
  ([463199f](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/463199f637f5ee06109cb0e41ac8c101bc65fd53)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-21. The `AlertDialog` component now supports the `onOpenChange` callback, enabling parent components to handle state updates when the dialog is opened or closed. This change enhances flexibility and integration with state management.
  - add size prop for trigger button
  ([ca8047c](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/ca8047cd880c4e6e13ad3d536655eeaf6adf4418)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-21. Enhanced the AlertDialog component by introducing a `size` prop for the trigger button, allowing customization of its size. This change ensures more flexibility and consistency when implementing the AlertDialog in various UI contexts.
  - support HTML parsing for title and description
  ([5da3616](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/5da361689d4eefc5fe636a3c424611bcff87c614)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-21. Enhanced the AlertDialog component to allow parsing of HTML content in the `title` and `description` props. This enables the rendering of custom HTML structures when these props are provided as strings, enhancing content flexibility.

- api
  - add DELETE endpoint for obligations
  ([291f2d8](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/291f2d8fda4f76ad6b3ed10aa24f69a28031d3c6)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-21. Introduced a DELETE endpoint for obligations in the fake API. The endpoint provides a `204 No Content` response to simulate successful deletion behavior, supporting development and testing needs.
  - update `postSchema` to use `_userIdSchema`
  ([4e20b7f](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/4e20b7fe5c16e83e373e9e620f2ff31032c78f9c)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-19. Updated the `postSchema` definition to replace the `userId` type with `_userIdSchema`. This change allows for a more flexible and reusable schema definition, ensuring consistency across related data models.
  - add CRUD endpoints for fake source data
  ([7b2ec19](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/7b2ec194641b5c6e31abf21b7c5fad3ffae52ab4)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-14. Implemented GET, PUT, DELETE, and PATCH endpoints to serve and modify fake source data for testing. These endpoints utilize `faker.js` to generate dynamic mock data for fields like regulatory source, jurisdiction, content type, and more. The PATCH endpoint allows partial updates with autogenerated defaults
  - add CRUD service and shared pagination schema
  ([ac4d68d](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/ac4d68ddd4e351b15f24820f5aa5f639dd92c613)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-13. Introduced `createCrudService` and `createPaginationSchema` utility to standardize and simplify CRUD operations and pagination handling across APIs. This enhances maintainability and reduces repetitive code
  - add fake Posts and Sources API endpoints
  ([3de2d1b](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/3de2d1b32906e02dd108815860754f5d6e032e60)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-13. Implemented mock API endpoints for handling `Posts` and `Sources` with support for CRUD operations. These endpoints utilize the `@faker-js/faker` library to generate realistic test data
  - add pagination support to BaseRepository
  ([cc6f6b7](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/cc6f6b78079dbfd4e033123438f804f2f4056f3a)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-13. Introduced `getAllWithPagination` method to support paginated retrieval in the BaseRepository. This enhances flexibility by allowing clients to fetch data with pagination parameters such as page, page size, sorting field, and sorting order
  - add Source entity with CRUD and schema support
  ([28b13ac](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/28b13ac62dcf5d58e811b43955a05f7db5d6fc8a)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-13. Introduced comprehensive functionality for the `Source` entity, including schemas, queries, services, and repository support. Leverages reusable CRUD utilities and pagination features to standardize API operations
  - refactor Posts to use shared CRUD service
  ([8bbd6df](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/8bbd6df77c64eebd9d389d251fc1a59451adf01c)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-13. Refactored the `Post` entity to leverage the reusable `createCrudService` utility. Simplified the service layer and repository by consolidating CRUD operations, removing redundant logic, and ensuring consistent schema validation
  - use pagination and sorting constants in fake sources
  ([79c8964](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/79c89649a8429392f4e69f6c6da6f3cc5312912a)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-13. Refactored the `GET` function in the fake sources API to replace hardcoded pagination and sorting defaults with centralized constants from the `PAGINATION` and `SORTING` modules. This enhances code maintainability and ensures consistency across the application
  - use pagination constants in CRUD service
  ([6cd9545](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/6cd95457e3a0ef26a31e35d32d4f658fabbbf40b)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-13. Updated `createCrudService` to leverage centralized pagination constants for default `page` and `pageSize` values. This ensures consistency and improves maintainability across pagination logic
  - use pagination constants in sources queries
  ([2cbda0a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/2cbda0ad82f086fb3db093d46f8e3f6a3c0aaec9)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-13. Replaced hardcoded default `page` and `pageSize` values with centralized constants in `PAGINATION`. This change improves consistency and maintainability in pagination handling for sources queries
  - log TRPC request duration for debugging
  ([a553f50](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a553f500b5d70a3a11adfdd87b66bb5c276de39c)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-08. Added a log statement to the TRPC middleware to output request duration details, including path, start time, end time, and duration. This enhances debugging and helps monitor request performance in the application

- app
  - replace TRPC provider with REST, update hydration
  ([2f72015](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/2f720155243e0cb2fae4575a6604af2d529d101e)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-08. Migrated from TRPC to REST for API communication, optimizing data fetching and React Query usage. Replaced the `HydrateClient` with `HydrationBoundary` for server-side state hydration. Updated the page to utilize `createHydration` and React Query for fetching `posts`. Removed unused code and components, simplifying the structure

- atoms
  - add CheckboxIndeterminate component
  ([48f7fe2](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/48f7fe28286538b3992585e6c706f3c9c8ba17c3)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-20. Introduced the `CheckboxIndeterminate` component to extend Radix's Checkbox functionality. This component supports a tri-state (unchecked, checked, and indeterminate) to represent scenarios like "some selected" states. It normalizes state propagation and provides a consistent UI with improved customization options.
  - introduce Checkbox component
  ([b925d4d](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/b925d4dc292c42ea17cd5b113c95e2f826ef2a3a)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-20. Added the `Checkbox` component to wrap Radix's Checkbox primitives with customizable props and styles. This addition simplifies integrating checkboxes in the UI while maintaining consistency in design and functionality.

- auth
  - add ClientSessionGuard for unauthenticated redirects
  ([5c3c7d6](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/5c3c7d6cd0fa9a0cc08c1c40d5989546462dc835)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-19. Introduced `ClientSessionGuard` to handle session state and redirect unauthenticated users to the sign-in page. This enhances client-side session management and ensures protected content is only accessible to authenticated users.
  - improve provider management in SignInProviders
  ([376c2e9](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/376c2e9e65acebd41f6f156dbda4eb9a5bacf548)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-19. Refactored the `SignInProviders` component to introduce additional type safety and improve code maintainability. Introduced type definitions for providers, adjusted component logic for better error handling, and ensured proper usage of provider IDs to prevent rendering issues.
  - rename AuthWrapper to SessionGuard with improved session handling
  ([7602106](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/7602106708693864252bc8112001458354f8a4f0)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-19. Renamed the `AuthWrapper` component to `SessionGuard` for better clarity and alignment with its functionality. Added `ClientSessionGuard` to enhance client-side session management and introduced a `refetchInterval` constant to improve maintainability.
  - replace AuthWrapper with SessionGuard in layout
  ([b1c5c81](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/b1c5c810052c870c8c40cf03cb0fb495aa4e6229)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-19. Replaced `AuthWrapper` with `SessionGuard` in the private layout to align with updated session management flow. This ensures enhanced session validation and consistency with the new `SessionGuard` component structure.
  - enhance sign-in and session management flow
  ([2b416e1](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/2b416e145bfc95d13f2159595ea00cffb252835d)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-18. Introduced `SignInProviders` component for dynamic provider retrieval, replacing the obsolete `SignIn` component. Updated authentication flow to incorporate improved user session handling and provider-based sign-in options. Added `SignOutButton` for seamless logout functionality.
  - add sign in component and dashboard page
  ([b0ac9eb](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/b0ac9eb52695c9a896a3ffad55196fb3e905dc20)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-15.
  - add styles for main page sign in form, add sign out button
  ([2a91f9d](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/2a91f9d4bb59faf7a455feae2def2936bb51fc82)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-15.
  - wrap dashboard and profile pages with AuthWrapper
  ([da8e9a2](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/da8e9a283f9ac155e7c41be29d580934a2a541ef)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-15. Added `AuthWrapper` component to `DashboardPage` and `ProfileSettingsPage` to enforce authentication. This ensures proper access control and session handling for these private pages. `AuthWrapper` acts as a higher-order component, restricting unauthorized users.
  - add AuthWrapper component for session validation
  ([d155103](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/d155103d31f37a27703f1d503d1cfd9f6704673f)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-14. Introduced the `AuthWrapper` component to validate user authentication sessions automatically. This wrapper ensures that sessions are verified before rendering any child components, enhancing the security and integrity of authenticated views.
  - add constants for sign-in and sign-out pages
  ([227bedd](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/227bedda59c92cf6a5b763f67a935e6497d9c97d)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-14. Added `SIGNIN_PAGE` and `SIGNOUT_PAGE` constants to consolidate and standardize API authentication endpoint references. This change improves maintainability by centralizing path definitions for authentication actions.
  - add session verification utility
  ([a5c9776](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a5c9776ec0ab56417d97a096a6a425a83c6de98d)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-14. Introduced a `verifySession` function to validate user authentication sessions. This function ensures proper redirection to the sign-in page if the session is invalid or expired, improving authentication flow and security.
  - integrate AuthWrapper in private layout
  ([e7cc535](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/e7cc5356cabe0855c6568c187104e051c3b502f6)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-14. Replaced manual session validation and redirection logic in `PrivateLayout` with the `AuthWrapper` component. This simplifies authentication handling by delegating session validation to the `AuthWrapper`, ensuring consistent behavior across private routes and enhancing code maintainability.
  - wrap ObligationsPage with AuthWrapper for session validation
  ([01cae11](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/01cae1180a5b488ce93551ad1ed45ef75106e13d)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-14. Replaced ObligationsPage's root component with AuthWrapper to ensure session validation before rendering the page. This aligns authentication flow with private route standards and provides consistent security for the obligations view.
  - wrap SourcesPage with AuthWrapper for session validation
  ([b359b95](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/b359b95de2bd5b4d1b156c26def4b874c60d29c9)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-14. Replaced SourcesPage's root component with AuthWrapper to ensure session validation before rendering the page. This change aligns the authentication flow with private route standards and provides consistent security for the sources view.
  - add private layout with session check
  ([aaaf5dd](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/aaaf5dd7ad3e594594ef612c346d70a9d9f27f22)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-13. Introduced a private layout component to enforce session checks for authenticated pages. If no active session is found, the user is redirected to the sign-in page. This ensures secure access to pages requiring authentication
  - add Auth0 provider support
  ([1b13c20](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/1b13c2053fe73e8c3aa7f4c12be85d2410826c75)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-06. Integrated Auth0 as a new authentication provider alongside Discord. This adds greater flexibility for applications to support multiple authentication methods and better caters to a wider user base. Updated environment variable schema to include required Auth0 credentials

- build
  - add Pretty Quick for pre-commit formatting
  ([20dd039](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/20dd039d3bbd1aaaad548e5b14c2bff0aae768fd)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-19. Integrated the Pretty Quick package to enforce formatting on pre-commit using Prettier, improving code consistency. Updated `package.json` with new formatting commands and dependencies to streamline development. Changes enhance automatic handling of formatted code in staged files.
  - add Pretty Quick for pre-commit formatting
  ([4718171](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/471817182abe13840e4d40b0446277fc114b6a14)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-19. Integrated the Pretty Quick package to enforce formatting on pre-commit using Prettier, improving code consistency. Updated `package.json` with new formatting commands and dependencies to streamline development. Changes enhance automatic handling of formatted code in staged files.

- changelog
  - add custom changelog configuration
  ([ed7d943](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/ed7d943bbc931b8235079dadaba29522c18a6c67)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-25. Introduced a custom changelog configuration file to standardize the commit grouping, sorting, and formatting of generated changelogs. This ensures enhanced readability and compliance with the project's structure for better release management.

- checkbox
  - add nativeChecked prop to CheckboxIndeterminate
  ([8568a39](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/8568a39c0aab647efa687778654ad08e434ac674)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-21. Introduced a `nativeChecked` prop to enhance the `CheckboxIndeterminate` component. This prop ensures better integration with native checkbox behavior while maintaining support for tri-state logic. Adjusted the internal handling of the visual state to consider `nativeChecked` for consistent rendering and interaction.

- components
  - add SourceDeleteButton component
  ([7cc9dee](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/7cc9dee30ceab483a26cb30849dc7d1db521be0d)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-13. Introduced the `SourceDeleteButton` component to enable deletion of a `Source` entity. This component provides a button that handles asynchronous delete operations, including UI feedback for pending states. It integrates with the `useDeleteSource` hook for API interaction
  - add SourceDropdownAction component
  ([b45d200](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/b45d20012ebe61de6ca430bf69e0525795dbbc70)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-13. Introduced the `SourceDropdownAction` component to provide a dropdown menu with actions: view details, edit, and delete. This component improves user interaction by offering contextual options for a `Source` entity in a compact and accessible layout. Includes integration with `AlertDialog`, `Sheet`, and a delete action via `SourceDeleteButton`
  - add SourceDropdownAction component
  ([06e911c](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/06e911cc95d3bdaf9ea3126ffabffd33dfd69066)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-13. Introduced the `SourceDropdownAction` component to provide a dropdown menu with actions: view details, edit, and delete. This component improves user interaction by offering contextual options for a `Source` entity in a compact and accessible layout. Includes integration with `AlertDialog`, `Sheet`, and a delete action via `SourceDeleteButton`
  - add SourcesTable component
  ([3182de5](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/3182de563442f36380e2219314bddbf8ed889c68)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-13. Introduced the `SourcesTable` component for displaying tabular data with configurable actions. This component leverages `DataTableWithActions` and includes predefined column definitions such as regulatory source, jurisdiction, content type, and frequency. A custom dropdown action column is also integrated for better user interaction

- constants
  - add pagination constants
  ([5637af2](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/5637af22064a0f3f67b617d0d8729c7e83404ad9)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-13. Introduced a constants file to centralize pagination-related configurations, including default values and page size options. This improves maintainability and ensures consistent usage of pagination settings across the codebase
  - add sorting constants
  ([0cd48e1](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/0cd48e1034ed8234a753b9ce3abf3d4a1571e5c1)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-13. Introduced a constants file to centralize sorting configurations, including default sort order and field identifiers. This enhances maintainability and ensures consistency in sorting across the application
  - add sorting constants
  ([6d4e388](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/6d4e388a28d8b370410c7a43d1e9d8b028b29690)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-13. Introduced a constants file to centralize sorting configurations, including default sort order and field identifiers. This enhances maintainability and ensures consistency in sorting across the application

- dashboard
  - add dashboard content components
  ([8031140](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/803114066e37f9e8cdc28e4a32e5258a885cc666)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-15.

- datatable
  - integrate constants and URL helper
  ([20c4fe3](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/20c4fe381ab3970aea13faba9fa7da943f6441b0)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-13. Revised sorting and pagination logic in `DataTableWithActions` to use centralized `PAGINATION` and `SORTING` constants. Replaced manual URLSearchParams manipulation with the `buildUrlQueryParams` utility for constructing query strings. These updates improve code consistency, maintainability, and reusability

- deps
  - add html-react-parser to dependencies
  ([0573333](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/0573333dbe8f7b873522762631dd568c8c9786e3)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-21. Added `html-react-parser` to project dependencies for advanced HTML rendering and parsing capabilities in React components. This library enables enhanced processing of dynamic HTML content.
  - add zustand library to dependencies
  ([a1f3e7a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a1f3e7aa64d270ee2a2009c8e6a552770174137f)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-20. Added `zustand` version 5.0.8 to the project's dependencies for state management. Updated the `pnpm-lock.yaml` file to reflect the new dependency and its associated installations. This change introduces support for a modern, minimalistic state management library with optional React bindings.
  - add new dependencies for forms and dev tools
  ([32d0875](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/32d087544adcb3f89124a7cb3a3c876357c49acb)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-08. Added dependencies for `react-hook-form`, `@hookform/resolvers`, and `@tanstack/react-query-devtools` to enhance form validation, integrate React Query development tools, and improve developer experience. These additions support ongoing improvements to the application's features and developer tooling
  - add Radix UI and TanStack dependencies
  ([d5c0aae](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/d5c0aae942f2b038e4f4a9c2f5666cb0ebbe5f3e)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-07. Added new dependencies for `@radix-ui/react-alert-dialog`, `@radix-ui/react-dialog`, and `@tanstack/react-table`
to enhance UI components and table functionality. These updates align with project goals to improve modularity,
accessibility, and data presentation capabilities

- env
  - enhance `.env.example` with more variables
  ([f956187](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/f95618768bc2cb8a1c567ac8748e1e6566dd7aa3)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-19. Added additional environment variables to the `.env.example` file for better development configuration. These include support for Auth0 integration, server port settings, and public API URLs. Existing comments were streamlined to improve clarity and maintainability.

- fetchers
  - add reusable Fetcher utility class
  ([a1de01a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a1de01ac77c45d3d341c5392c0ce6f27b0b4767a)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-08. Implemented a reusable `Fetcher` utility to standardize HTTP requests across the application. This utility supports common methods like `GET`, `POST`, `PUT`, and `PATCH`, provides configurable headers, and includes file upload-specific methods. It ensures better code reusability, consistency, and ease of integration for future API communication needs

- helpers
  - add utility to build URL query parameters
  ([9053c6b](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/9053c6b20ef61fedb5100edd04283dcf366f7e0b)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-13. Introduced `buildUrlQueryParams` helper function to construct URL query strings dynamically based on sorting and pagination parameters. This utility ensures consistent and reusable query parameter handling across the application

- husky
  - add commit-msg hook for commitlint validation
  ([75a3f7a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/75a3f7aa6b39556438f499f249cfbd9f662493df)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-25. Integrated a Husky `commit-msg` hook to ensure commit messages adhere to defined linting rules. This addition enforces consistency and compliance with the project's commit message standards during development.
  - add pre-commit hook for pnpm check
  ([291245e](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/291245ebda1367ce08f805d8a75577ecf69113fa)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-08. Added a Husky pre-commit hook to run `pnpm check:write` automatically before committing. This ensures that necessary checks are performed to maintain code quality and consistency

- layout
  - add AppHeader component and update styles
  ([1fb7919](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/1fb7919dbf2b19b498fed505fca5bd42e5735842)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-19. Introduced the `AppHeader` component to enhance the layout with a consistent header section. Updated the sidebar header and global styles to integrate the new header and ensure visual consistency across the application.

- legal
  - add privacy policy and terms of service pages
  ([800e843](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/800e843c2f3dc02370784f1dbdde6690086e0876)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-19. Introduced new standalone pages for Privacy Policy and Terms of Service to enhance user accessibility. These pages are linked from the home page for better compliance and clarity.

- nav
  - add `disable` property to navigation items
  ([238e52a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/238e52ac4aa9753ba23742638326fc305f41c92e)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-19. Introduced the `disable` property to `NavigationItem` type and updated relevant navigation items to include this property. This allows for selectively disabling certain navigation menu items for better control and user experience.
  - add `NavUser` component for user dropdown menu
  ([9fed2de](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/9fed2ded4bd23949c1fdfb92a7e12d7441f377e4)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-19. Introduced the `NavUser` component to display a user-specific dropdown menu, improving navigation. It integrates `DropdownMenu`, `NavUserInfo`, and `SignOutButton` for enhanced user experience and accessibility. The dropdown includes profile access, billing, notifications, and sign-out options.
  - add `NavUserInfo` component with user details
  ([fd7c6e7](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/fd7c6e7496bdda17e0519eecfde2bb8d26e84e7f)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-19. Introduced the `NavUserInfo` component to display user-specific details, enhancing user interface consistency and profile accessibility. The component includes a profile picture (`Avatar`), name, and email display, with fallback logic for missing data.
  - integrate `Log out` confirmation in dropdown
  ([c01278c](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/c01278c2eec20e244aeab8b11dd4ba1f78fa71d4)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-19. Added an `AlertDialog` for the `Log out` action in the `NavUser` dropdown menu, providing users with a confirmation dialog before signing out. Updated the `SignOutButton` to use a `destructive` button variant for consistency with destructive actions.

- nextlink
  - enhance class name handling and button integration
  ([2236c4b](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/2236c4b81d4d1dddb9bea023ad4b8a4a58e7c8de)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-19. Improved the `NextLink` component by introducing a `cn` function for class name concatenation, ensuring a consistent and extensible approach to managing `className` properties. Integrated a minimal `UIButton` import for future enhancements. Updated the props logic for better flexibility and usability.

- not-found
  - centralize NotFound component for reuse
  ([cf621de](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/cf621de4c0fe69fbf4bb1b406fdaac84e9f173e2)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-21. Created a reusable `NotFound` component to standardize the "Not Found" page across different sections. Replaced duplicate implementations of "Not Found" pages for "Obligations" and "Sources" with the new component, improving consistency and reducing code duplication.

- nvm
  - add Node.js version file for environment consistency
  ([2e70d75](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/2e70d75002770bbdb26bceffbb939cde20aae75f)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-08. Added an `.nvmrc` file to specify the Node.js version (`22.17.1`) for the project. This ensures that all developers and CI/CD environments use the same Node.js version, improving build reliability and reducing compatibility issues

- obligations
  - add actions to clear selected and all items
  ([5289893](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/52898938cce530d7201634b7dd17efcfb6f81e79)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-21. Introduced `clearAllSelected` and `clearAll` actions to the `ObligationsStore` to enhance state management. These actions allow clearing all selected obligations or both selected and items simultaneously, providing more flexibility for obligations-related operations.
  - add delete functionality with confirmation dialog
  ([bbf0ab3](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/bbf0ab3627f50d4561d6bdb7dbbbd60a01dd7e14)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-21. Implemented delete functionality for selected obligations in `ObligationTableRowSelected`. Integrated an `AlertDialog` to confirm deletion with a detailed list of selected obligations. Updated logic to handle the deletion by calling `useDeleteObligation` for each selected obligation and removing them from the store.
  - add selected items display component
  ([90cbaa8](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/90cbaa88f2b10165f02c62a403c3c3a615fc4f4e)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-21. Introduced `ObligationTableRowSelected` component to display the count of selected obligations. This component integrates with `ObligationsStore` and dynamically retrieves the `selected` state to reflect the number of selected items.
  - enhance delete functionality in TableRowSelected
  ([5a7b0e3](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/5a7b0e3cbc07bf60595023a3d3322dc530e1cd69)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-21. Redesigned the delete functionality for `ObligationTableRowSelected` to improve usability and robustness. Added sequential API request handling using `mutateAsync` for better API consistency. Introduced `useCallback` and `useMemo` to optimize re-renders and ensure efficient handling of selected obligations. Updated the confirmation dialog to display a detailed rendered list of selected obligations for review.
  - enhance header checkbox functionality
  ([d94c9ab](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/d94c9ab10bb9339e70ca6446c512fb1b46dbb210)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-21. Updated `ObligationTableHeadCheckbox` to handle selection logic for items on the current page. Added synchronization with `ObligationsStore` to manage page-specific selections and improve the checkbox's `indeterminate` and `checked` states using `useEffect`.
  - enhance row selection with clear action
  ([c4a2209](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/c4a22096a52b28ec1c5d89cf2cf7e2f637e2f522)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-21. Updated `ObligationTableRowSelected` to use `TableRowSelected` for improved modularity and UI consistency. Added a destructive button with a `Trash` icon to allow users to clear all selected obligations, enhancing interactivity and user control.
  - extend state with `items` management
  ([dbbd3c7](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/dbbd3c7d0b54014f456f68144a8c8d8dc2e82c01)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-21. Added `items` state and associated actions to `ObligationsStore`. Introduced methods `setItem` to update single obligations and `clearItems` to reset `items`. This change enhances the store to accommodate additional obligations-related state management.
  - include selected items display in table
  ([eab4f86](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/eab4f86cf8762db1bfb931595f889a588d6abee6)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-21. Integrated `ObligationTableRowSelected` component into `ObligationsTable` to display the count of currently selected obligations. This enhancement improves user feedback by providing visibility into selection status directly within the table layout.
  - log delete action in row selection button
  ([5ff368e](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/5ff368ed0fc51f844cdfc24293982c34053f823f)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-21. Added a `console.log` to the delete button in `ObligationTableRowSelected` for development purposes. This change helps in testing the button's functionality and ensures proper interaction occurs when triggered.
  - sync checkbox state with store
  ([4f5f9de](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/4f5f9de3ac06c83225a6822e29dffc2b034ebb55)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-21. Added state synchronization for `ObligationTableRowCheckbox` with `ObligationsStore`. The component now utilizes `useEffect` to ensure the checkbox reflects updates to the store whenever `data` changes, preventing stale state. Introduced `checked` prop for controlled checkbox rendering based on store state.
  - add state management with Zustand
  ([ecd9a34](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/ecd9a342a26ab22c07a6fb933cb8ea54b3fd1302)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-20. Implemented `ObligationsStore` using Zustand for managing selected obligations' state. This addition includes actions to set, remove, and clear selected obligations, enabling flexible state manipulation for the obligations feature.
  - add state management with Zustand
  ([03c4f12](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/03c4f12f1812b25c921e95352be8b36d8a586cc2)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-20. Implemented `ObligationsStore` using Zustand for managing selected obligations' state. This addition includes actions to set, remove, and clear selected obligations, enabling flexible state manipulation for the obligations feature.
  - add table row and head checkboxes
  ([55a11e4](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/55a11e4e274f178c1cad8f110bd12d059d4f2317)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-20. Introduced `ObligationTableRowCheckbox` and `ObligationTableHeadCheckbox` components to enable row and header-level selection functionality in obligations tables. Integrated state management using `ObligationsStore` to track selected rows and implement clear and toggle actions.
  - add ObligationCreateButton component
  ([f5051e0](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/f5051e0b69e4850423cb49175da1d76dbe8e1523)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-14. Introduced the `ObligationCreateButton` component to facilitate adding new obligations. This component incorporates a `Sheet` with a trigger button and the `ObligationCreateForm`, providing a seamless user interface for creating obligations
  - add ObligationDeleteButton component
  ([4828fb0](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/4828fb04c206042267ce2e5030606937e9c07aed)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-14. Introduced the `ObligationDeleteButton` component to enable deletion of obligations. This button integrates with the `useDeleteSource` hook to perform the delete operation and provides a loading state for user feedback
  - add ObligationDropdownAction component
  ([55bfd57](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/55bfd570a6d0e004423f735d60921deb5a1d2fa4)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-14. Introduced the `ObligationDropdownAction` component to provide a dropdown menu for managing obligations. This menu includes actions for editing and deleting an obligation, with integrated components like `ObligationUpdateForm` and `ObligationDeleteButton`. Enhances user experience by consolidating related actions into a compact and accessible interface
  - add ObligationsTable component
  ([ced959d](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/ced959d2600e2e0d623c1c7b4a3590f9c7d5c66b)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-14. Introduced the `ObligationsTable` component to display a paginated table for obligations with sortable columns and actionable dropdown menus. This component integrates the `DataTableWithActions` molecule with predefined columns and styling, providing a standardized interface for presenting obligation data
  - add ObligationsTable component
  ([5c1111c](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/5c1111c90f4ac9fc309bc24e1d0a71c6da7c1667)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-14. Introduced the `ObligationsTable` component to display a paginated table for obligations with sortable columns and actionable dropdown menus. This component integrates the `DataTableWithActions` molecule with predefined columns and styling, providing a standardized interface for presenting obligation data

- page
  - use centralized pagination and sorting constants
  ([5210894](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/52108940dc4848df40dd761aae58f48b64d7186b)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-13. Updated the `SourcesPage` component to leverage centralized `PAGINATION` and `SORTING` constants for default values. Replaced inline default values with reusable constants, improving maintainability and alignment with standardized logic. Refactored `searchParams` to utilize the `PaginationRequest` type for enhanced type safety

- pagination
  - enhance Pagination component with constants
  ([4c121cf](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/4c121cfad6dff5f9007d7be3658eb4f74c20fd0d)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-13. Updated the `Pagination` component to utilize centralized constants from `PAGINATION` and `SORTING` for default `page` and `pageSize` values. Replaced hardcoded logic with the reusable `buildUrlQueryParams` helper function for constructing URLs. These changes improve consistency, modularity, and reusability in handling pagination

- posts
  - introduce PostPatch feature and enhance Posts
  ([d98aec0](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/d98aec0bb00e9c4d3cf9bb810d6a997d732e252b)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-12. Implemented the `PostPatch` feature to allow partial updates for posts. This includes the new `PostPatchForm` component utilizing `zod` validation and `react-hook-form`. Enhanced the `Posts` component for better action handling by integrating the `PostPatch` functionality, replacing redundant components
  - add PostDeleteButton component for deletion
  ([d2f4a02](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/d2f4a02c4d8e6454a8bc2c6a299a4662ed2c9d80)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-11. Introduced `PostDeleteButton` component to handle post deletion with a clean UI and loading state. Integrated it into the `Posts` component for delete actions. Enhanced `useDeletePost` hook to include error handling and success logging
  - create PostCreateForm component
  ([3cf42c0](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/3cf42c0db31c379c7abd1f96793ece20aec2cf56)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-11. Introduced the `PostCreateForm` component to facilitate post creation with fields for title and body. This form leverages `zod` and `react-hook-form` for validation and error handling. It includes mutation logic with `useCreatePost` to handle form submission and API interaction
  - introduce PostUpdateForm component
  ([11f184e](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/11f184e4977d3788bee574d39fb9b1b4d214db39)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-11. Created the `PostUpdateForm` component to enable editing of post details, including title and body.
This form integrates validation using `zod` and `react-hook-form`, displaying appropriate error messages
and real-time feedback. Implemented loading and error states to enhance user experience during
data-fetch operations
  - log success messages for create and update operations
  ([e7a1a06](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/e7a1a06e3b944cc8c8c3801bebcd13d168f75dc1)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-11. Added `console.info` logging for successful post creation and update operations. This change aids in tracking and debugging API interactions by providing immediate feedback in the console after a mutation succeeds
  - update PostEdit to use default export
  ([e25673b](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/e25673b93b494a1a3de14b31fdb52e1a43b5be9e)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-11. Refactored the `PostEdit` component to utilize a default export for consistency with other modules. This ensures a uniform export pattern across the codebase and simplifies imports where the component is used
  - add PostEdit and Posts components
  ([9f4879f](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/9f4879f2be5043e2c2564e148ea37d936d74f327)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-08. Introduced `PostEdit` for editing posts with a form validated by Zod and React Hook Form. Added `Posts` component displaying posts data with actions like view, edit, and delete. These components enhance the user interface for managing posts, leveraging React Query for data fetching and mutation
  - add schemas, repository, and hooks for posts
  ([684122e](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/684122e427b1a948165b66aa19f45371d4215292)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-08. Introduced complete type-safe API handling for posts, including schemas, repository, and React Query hooks. Added validation schemas using Zod to standardize and validate API communication. PostRepository extends the `BaseRepository` to provide CRUD operations for the `/posts` endpoint. React Query hooks were implemented for fetching, creating, updating, and deleting posts, ensuring seamless state management and data syncing
  - simplify LatestPost component with new hooks
  ([09fb4eb](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/09fb4eb7d7dd719df80f9ea1902f21cc0e680c4c)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-08. Replaced the TRPC-based implementation in the `LatestPost` component with React Query hooks for improved structure and consistency. Removed client-side state and mutation logic, replacing them with `usePosts()` for fetching posts data. Added loading and pending state handling for enhanced user experience

- profile
  - refactor profile settings and add styles to tabs item
  ([12e5d7d](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/12e5d7dcb397ba791c7218a43f0839bcb7bfc20a)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-14.

- repositories
  - add BaseRepository for API operations
  ([cf966e0](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/cf966e015f1bd8bdfd8b786b467205ee9d31d6f6)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-08. Created an abstract `BaseRepository` class to standardize and simplify API repository creation. This class includes common CRUD operations (`create`, `getAll`, `getOne`, `update`, `patch`, `delete`, etc.) and supports customizable endpoints. It utilizes the `Fetcher` utility class for HTTP requests, ensuring consistency across API requests, and provides helpers like `buildUrl` and `toBoolean` for robust and reusable functionality. The `Repository` interface was also introduced for type safety and to enforce consistent repository implementations

- repository
  - enforce session authorization in BaseRepository
  ([0073096](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/007309626bfe2615c0a2d128c068ce4ec48da097)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-19. Added a private `ensureAuthorized` method to `BaseRepository` to validate user sessions before executing protected operations. This ensures that only authorized users can invoke repository methods, improving security. The method supports both client-side and server-side session verification, with redirection to the sign-in page for invalid sessions.
  - enhance pagination handling in BaseRepository
  ([f8ccc98](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/f8ccc9814556ac2aebe670309f1cc9fbe3dc9e10)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-13. Replaced hardcoded default `page` and `pageSize` values with centralized `PAGINATION` constants in `BaseRepository`. Updated URL query parameter construction to leverage the `buildUrlQueryParams` utility for improved readability and reusability. These changes enhance consistency, maintainability, and modular

- rest
  - introduce REST client with hydration and provider
  ([fd8c67d](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/fd8c67de4c157dadce0e316f727bf31e1d2e9a95)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-08. Added a REST client utility leveraging React Query and SuperJSON for efficient server-side state hydration and management. Implemented the `RESTReactProvider` for encapsulating React Query providers and initialized a query client with default configurations. Introduced a server-side hydration utility leveraging `createHydration` for consistent data-fetching patterns across the application

- scripts
  - add commitlint and release process commands
  ([06bf6af](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/06bf6af1cc313bc0c5c2f4ae4722e3082322b251)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-25. Introduced new scripts for commit message linting and release management. These additions aim to standardize commit messages and streamline the release process with semantic versioning and changelog generation.

- sources
  - hide trigger button in monitor dialog
  ([ce61657](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/ce6165788f2deea1977559edd9b53b60da78b809)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-22. The `SourceTableRowSelected` component now hides the trigger button within the monitor confirmation dialog, improving UI behavior. This ensures a cleaner interface and prevents unnecessary interactions when the dialog is displayed.
  - add monitor and delete actions to SourceTableRowSelected
  ([b156d10](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/b156d106f79a3f0de1eb5e14feaa9ee543bdd623)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-21. Implemented monitor and delete functionalities for `SourceTableRowSelected` with confirmation dialogs. Added `AlertDialog` components to confirm each action, displaying detailed lists of selected sources. Integrated `useDeleteSource` for batch deletion and provided placeholder logic for monitoring until a dedicated API endpoint is implemented.
  - add row selection and display functionality
  ([0c1ae28](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/0c1ae285c46f9d564b3e70e0e5c54c4e5620aadc)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-21. Introduced components and state management for row selection in the `Sources` table. This enhancement provides users with the ability to select individual items, toggle bulk selection at the page level, and view the count of selected items. Integrated Zustand for state management to ensure synchronization and flexibility.
  - integrate TableRowSelected in SourceTableRowSelected
  ([a1aaf50](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a1aaf502d2a982869719095592a787a427502c19)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-21. Enhanced `SourceTableRowSelected` by replacing the custom layout with the `TableRowSelected` component for improved modularity and consistency. Added a `Switch` for toggling actions and a destructive `Button` with a `Trash` icon to enable clearing all selected items. These updates improve user interactivity and streamline the UI.
  - add SourceMonitorSwitch component
  ([1b29d58](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/1b29d580f58d5bb87904e7db87d5f4ad7946de34)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-14. Introduced the `SourceMonitorSwitch` component to manage source monitoring configuration. This component utilizes the `usePatchSource` function to toggle the monitoring state for a specific source. It includes a `Switch` UI element with states tied to the `monitor` property and handles async state updates
  - add SourcesTable and related components
  ([d96d349](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/d96d34907f94a76f886e92255c9ac4f145f08fd3)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-14. Introduced the `SourcesTable` component for displaying source data with sorting, actions, and flexible configuration. Supporting components like `SourceDropdownAction` and `SourceDeleteButton` were also created to handle edit, view, and delete functionalities specific to sources. These enhancements improve the modularity and reusability of the UI for better maintainability
  - add SourceUpdateForm component
  ([694b901](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/694b90155399feed2303c83fff2bb82340809400)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-14. Introduced the `SourceUpdateForm` component to manage source updates with a user-friendly interface. The form includes fields for regulatory source, jurisdiction, content type selection, monitoring configuration, and alert sensitivity. It incorporates dynamic content type toggles, "select all" functionality, and preset default values using `react-hook-form`
  - integrate dynamic pagination and data fetching
  ([6ef554b](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/6ef554ba79a1427a295cca685cffc443f1989c8e)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-13. Replaced static source data with dynamic data fetching via the `createHydration` utility and server-side `fetchPaginationSources` service. Implemented logic to handle pagination parameters (page, page size, sort field, sort order) and display a "not found" page when no data is available. Enhanced the `SourcesPage` component with a `HydrationBoundary` and connected it to the reusable `Pagination` component for navigation

- table
  - add TableRowSelected component
  ([c160502](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/c1605021cc47184d070c40f69301f238046adc34)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-21. Introduced `TableRowSelected` to display the count of selected table rows and provide an option to clear all selected items. This component enhances user interaction by improving feedback on selection actions.
  - add checkbox column type to DataTableWithActions
  ([07b5df6](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/07b5df6ce8560232837075a51273109803520025)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-20. Added support for a `checkbox` column type in the `DataTableWithActions` component. This addition allows rendering a checkbox for rows, enabling selection functionality directly within the table. Updated the column header type to support React nodes, improving customization options.
  - add support for column pinning and sizes
  ([e2f3755](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/e2f375574f2826af7d66e74600feec4dca25c17f)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-19. Enhanced the `DataTable` and `DataTableWithActions` components with support for pinned columns and column sizes. These updates allow greater flexibility for presenting tabular data, including fixed columns on the left or right and setting explicit column sizes. Updated `SourcesTable` to demonstrate the new pinned column functionality.

- table-row-selected
  - improve selection handling and UI
  ([dfc4a6b](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/dfc4a6bbde0f6f09d49f4cb0b153d7d8ef163f1b)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-22. Enhanced the `TableRowSelected` component by improving the selected items display and UI structure. Updated the `AlertDialog` trigger button to display the number of selected items and added a vertical separator for better visual distinction between elements. These updates enhance user experience and clarity.

- templates
  - add Hydrated component for server-side state hydration
  ([67ca4e0](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/67ca4e009f22e80e3cf116b7d0d4fb948059b2cc)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-08. Introduced the `Hydrated` component to streamline server-side state hydration with React Query. This component leverages `createHydration` for fetching data and uses `HydrationBoundary` to manage state. It simplifies the integration of server-fetched data into the UI, enhancing developer productivity and maintaining a consistent data-fetching pattern

- tsconfig
  - add path alias for UI components
  ([e4c39a5](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/e4c39a5cdba66dd3f85be1ded450ab56155bc4f6)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-07. Enhanced developer experience by introducing a new path alias, `@/ui/*`, to simplify imports for UI components. This aligns with the project's modular structure and reduces import path complexity

- types
  - integrate pagination and sorting constants
  ([4544bbc](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/4544bbcf3b93baf5adf486bad8735c7c3be6973b)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-13. Replaced hardcoded pagination and sorting types with centralized `PAGINATION` and `SORTING` constants. Updated type definitions and query parameter handling to enhance maintainability, type safety, and consistency across the application

- ui
  - enhance `SignOutButton` with icon and styling
  ([5dfdcf5](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/5dfdcf5d779011fb07f59d13385c7a960493a199)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-19. Updated the `SignOutButton` component to include an `IconLogout` for better visual clarity. Refined the button style by introducing a `ghost` variant, full width, and left-aligned content for better alignment with dropdown menus and overall UI consistency.
  - add Select component to enhance form elements
  ([cc57957](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/cc579575dc0d50cf9f95c49b10a43ba75a65c48c)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-15. Introduced the `Select` component for improved form usability and consistency. This component supports customizable options, placeholders, and integrates seamlessly with the existing UI framework. It provides a fallback input field when no options are available.
  - add avatar, tabs, card from shadcn
  ([073581d](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/073581d9409794b2fc305c95485ab04cad3a4c97)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-14.
  - add components for profile page
  ([7a01ac0](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/7a01ac0ff661d2d3096a66b3f0f74d6e2170238e)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-14.
  - add loading component for private routes
  ([0d2f426](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/0d2f426424abb2c02d60947af8b88361fd6c49ee)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-14. Introduced a `Loading` component to enhance user experience during route loading states. This lightweight component provides a placeholder message, ensuring smooth transitions between views.
  - add popover and calendar from shadcn
  ([edea1e0](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/edea1e0b28809ce3ec899be82dade65687123e70)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-14.
  - add profile settings into navigation
  ([8fb0e46](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/8fb0e468a37d9746e99a9c6f3384e18ce0eed1a7)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-14.
  - add toasts functionality
  ([8e429c0](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/8e429c0d228cd37444f66c00ff9bfbe3f39e40b5)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-14.
  - create obligations form component
  ([89d9fdc](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/89d9fdc5d38d34f37ea8f1d8cb7db48544833cdc)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-14.
  - create obligations page
  ([cb3a83d](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/cb3a83d96094d8f7ed220816a24b7b9b9b40c21f)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-14.
  - create obligations repository, services, queries, types and route with data
  ([a538b28](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a538b2813f39c6b197938dd65be5ba892f8a50e2)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-14.
  - remove initial data
  ([5be9fe0](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/5be9fe0a2c9809f6fc4207436d740c8de910ce7a)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-14.
  - remove sources layout and edit private layout
  ([551702f](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/551702fe42c77b51ca85ffedf62ef4e3a55c4d73)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-14.
  - rename old tabs component
  ([0c5244f](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/0c5244f34c31f96cc2a261182227374c54c86bb9)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-14.
  - add checkbox, radio-group, scroll-area from shadcn
  ([f40fcd1](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/f40fcd18c64b291531486d489ad57c5688a6c74c)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-13.
  - add delete source button
  ([90814ce](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/90814ce3d2bbbd1c824e96fd6ba6c8bcd35b57de)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-13.
  - add dropdown menu and switch from shadcn
  ([ccf8ca5](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/ccf8ca5ad6a0130f6dab1e3ee40c861c116b29f4)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-13.
  - add pagination components (rows per page, shadcn select, tablePaginationControls)
  ([63602c2](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/63602c29416a2fcdedec47c3eab4d2027d69c238)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-13.
  - add pagination components with advanced navigation
  ([da79a94](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/da79a94e83781ea9bd2579315ba3ca2fd6c3d32e)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-13. Introduced reusable pagination components for improved page navigation. These include next/previous buttons, page links, ellipsis, and dynamic page ranges. The components support sorting, page sizes, and integrate smoothly with the existing UI
  - add props for styles into tables
  ([5938500](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/5938500c1c8d18eee17b38ece79e0d354bd3b509)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-13.
  - add reusable pagination components
  ([606ffc6](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/606ffc665919fda20281210f28c5360f5da94b51)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-13. Introduced a set of reusable pagination components to enhance navigation across pages. This includes components for pagination container, content, items, links, navigation arrows, and ellipsis. These components are highly customizable, accessible via ARIA attributes, and integrate seamlessly with existing UI elements
  - create add source button and edit source form
  ([054a685](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/054a685d1c06bd746b5ea3bc7bb8dd91b5416fc3)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-13.
  - create main table component
  ([5818b02](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/5818b0202e822e63c41682f6a3cb3837ce70601f)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-13.
  - create source edit form
  ([a310246](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a3102462031e0bd58a3d611c4baa85b0f4a1e3ab)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-13.
  - edit alert dialog component
  ([eac282d](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/eac282d8058617354d3c5d232554d181ee0c3bf0)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-13.
  - enhance DataTableWithActions with dynamic handling
  ([5ebd281](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/5ebd281327f11792e03c9669ccddc97f4e2fd217)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-13. Reorganized `DataTableWithActions` to improve action rendering and sorting logic. Introduced reusable utility functions for determining default titles, descriptions, and rendering action elements. Updated sorting behavior to sync with query parameters for better integration
  - move navigation items into proper folder
  ([b7ddc38](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/b7ddc389a19ba0bfb625e7b1c7141fe6fd33e7bd)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-13.
  - add sidebar common component with dependencies (separator, skeleton, tooltip, use-mobile hook)
  ([bc86d7c](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/bc86d7c8bea773d7e04160e6ba774d19a8286109)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-12.
  - add subtitle types
  ([576aa07](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/576aa077a0811c358b1f7ce3939f577bf88a5a54)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-12.
  - create logo component
  ([577db43](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/577db430a378206ca02f62fff4628bc105590b59)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-12.
  - create main sidebar component
  ([3ee2f67](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/3ee2f67888332ce1012dead15609a86b07a64314)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-12.
  - create navigation items constant
  ([ac939ac](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/ac939ac539259d8526ed2305c230c6c07818b5d5)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-12.
  - create pages layout
  ([71b6daa](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/71b6daab9f9d4723dd1ed5987fe19728783fc9b6)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-12.
  - create sources page
  ([6c0872e](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/6c0872ebd60196f201c36df593fc7e58729f811d)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-12.
  - create subtitle component
  ([8472885](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/84728851fb2f9efb31f99103227e264da73bc96a)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-12.
  - add typings for Sheet component props
  ([f9253e6](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/f9253e61d203b7cdef66f6173cffc32661312f60)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-11. Defined TypeScript types for the `Sheet` component to standardize and clarify its props usage. This includes support for customizable sides, trigger rendering, and event handlers, enhancing the component's reusability and developer experience
  - update SheetProps import path
  ([de6945f](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/de6945f74188dcaf99294cf4ceff5ec0b41fbea9)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-11. Replaced the `SheetProps` import with a local relative path. This change improves modularity by referencing the local `types` directly, reducing dependency on `@/types` and enhancing the component's maintainability
  - update TitleProps and improve Title usage
  ([592c46c](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/592c46c5852ed21c9799e85fb4142a748821746c)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-11. Made `level` in `TitleProps` optional and expanded `className` to accept `ReactNode`, enabling more flexibility for styling and content customization. Refined level-specific font sizes in `titleVariants` and simplified the Title component usage in `page.tsx`
  - add reusable form, input, label, and textarea components
  ([d997fe1](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/d997fe17d3ebffa8baf6d109d623c7e1c2059d53)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-08. Implemented reusable UI components for forms, adhering to accessibility and usability standards. These components integrate seamlessly with `react-hook-form` for efficient form state management and validation. The `Input`, `Label`, `Textarea`, and form utilities simplify building complex forms in the interface
  - update DataTableWithActions to support dynamic descriptions
  ([3b415c1](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/3b415c1852c8d46d56567fcdf046f941e5c1feeb)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-08. Updated the `DataTableWithActions` component to incorporate dynamic `description` rendering based on the provided `row` data. This enhances the component's flexibility and user experience. Adjusted the `Sheet` component's usage to include the new `description` attribute and corrected property references in `row` to match updated naming conventions
  - add reusable AlertDialog and DataTable components
  ([482eef7](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/482eef7707c8c6b742494c88c554050a4d82ce55)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-07. Introduced `AlertDialog` and `DataTable` components as reusable UI elements to enhance the application's modularity and UX. The `AlertDialog` supports customizable triggers, actions, and content, while the `DataTable` integrates with `@tanstack/react-table` for dynamic table rendering
  - add reusable button component with variants
  ([0652c41](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/0652c419aeb63a942baf6bdde23574cf4ac1b78c)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-07. Introduced a `Button` component with multiple variants and sizes for consistent UI across the app. Implemented the `class-variance-authority` and `clsx` libraries for class name management. Added new Tailwind configuration and global styles to support the button component

- utils
  - add utility for retrieving base URL
  ([b806872](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/b806872eb0fa7b0d4cfba23969cd0de911e649d7)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-08. Introduced a `getBaseUrl` function to dynamically determine the application's base URL. The utility prioritizes the browser's window origin, followed by the `VERCEL_URL` environment variable, and defaults to localhost with a custom or default port. This ensures versatile and environment-aware URL generation

### Bug Fixes
- api
  - correct Response instantiation in DELETE handler
  ([50c3b47](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/50c3b4717ed771fb369d701d938ec4f9578641c1)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-21. Updated the DELETE handler in the fake API for sources to properly instantiate the `Response` object. This ensures the response adheres to the expected format, fixing a potential runtime error.

- dashboard
  - fix dashboard content components
  ([110d449](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/110d449a64a61069df8c3385c2d5fa7b167eadb6)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-15.

- fetchers
  - ensure delete method returns promise
  ([e9e84f9](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/e9e84f9332672c951678b9a46993af4e6115806b)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-11. Previously, the `delete` method in `fetcher` did not return the Promise from the underlying `request` call, leading to inconsistencies when chaining or awaiting results. This change ensures the `delete` method returns the expected Promise, aligning with other HTTP methods in the API

- profile
  - remove unused import
  ([d040977](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/d0409772d9d44a68f84da0f35fa6daae61c5732a)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-14.

- sources
  - reorder SourcesTable import in SourcesPage
  ([74ac94f](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/74ac94f990d219fcbe08fb91325194a66ce41c1d)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-14. Reordered the `SourcesTable` import in the `SourcesPage` to align with the project's import order conventions. This change ensures consistent organization and readability of imports in the file

- style
  - standardize quotes and improve formatting
  ([acac179](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/acac17956b05208c6862e0388e395f2496a2e1b6)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-07. Reformatted files to use single quotes consistently and adjusted indentation for better readability. Enhanced code maintainability by ensuring uniform style and structure across the project

- table
  - remove redundant width styling in DataTable
  ([497a888](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/497a88896e03a10f624955a3c3614a6fd4efd7d2)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-19. Removed the unnecessary inline width styling passed to the `Table` component in `DataTable`. This change simplifies the component rendering logic without altering visual or functional behavior.

- table-row-selected
  - adjust Trash icon size and Separator styles
  ([2193cfc](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/2193cfcedc0d94a2ff52730900fc4e0b1f57ab92)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-22. Updated the `Trash` icon within the delete trigger button to use a consistent sizing approach for better UI alignment. Modified the `Separator` component in `SourceTableRowSelected` to include a vertical height adjustment, enhancing visual consistency across orientations.

- TablePaginationControls
  - use dynamic href for pagination
  ([3687a36](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/3687a3668bc194669587cfb8377792d84e43e45c)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-19. Updated the `href` property in the `Pagination` component to dynamically use the provided `href` prop instead of the hardcoded `'/sources'`. This change ensures flexibility and supports dynamic pagination links across different contexts.

- ui
  - fix pagination error
  ([b819b36](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/b819b364e4670d5104487c98032e97a995a5bf9f)) — [Ruslan Vahapov](mailto:ruslan.vahapov@otakoyi.com) • 2025-08-13.

### Refactoring
- General
  - remove unused imports across components
  ([c2f3789](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/c2f37897c1ad43517a3185943ce5e5dd0fe7e009)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-19. Streamlined multiple components by removing unused imports, reducing clutter, and improving code readability. These changes enhance maintainability without impacting functionality.
  - enhance type annotations and modularize component structure
  ([57c21e3](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/57c21e3f1f940e72ab1ebff9c4d2784564f99971)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-14. Improved type safety by updating type annotations across components. Modularized repetitive logic and adjusted imports for better maintainability and consistency. Applied accessibility improvements in buttons for sorting and pagination controls.

 Changes:
- **src/components/organisms/Obligations/ObligationsTable/index.tsx**:
  - Updated type for `data` to `Obligations`.
  - Fine-tuned type use in columns configuration.
- **src/components/molecules/Tabs/index.tsx**:
  - Replaced inline types with imported `TabsProps` from new types file.
  - Adjusted import paths.
- **src/components/molecules/Modal/components/ModalBody/index.tsx**:
  - Renamed `content` prop to `children` for better React semantics.
- **src/components/organisms/TablePaginationControls/types.ts**:
  - Introduced `TablePaginationControlsProps` extending `PaginationProps`.

 New files:
- **src/components/molecules/Tabs/types.ts**:
  - Added dedicated type definitions for `TabsProps`.
- **src/components/ui/tabs.tsx**:
  - Modularized `Tabs` component using Radix UI primitives.

 Accessibility updates:
- Improved `aria-label` and `aria-sort` properties for sortable columns.

 Dependency updates:
- Added `@radix-ui/react-tabs` for tab management

- api
  - update useDeleteObligation to improve flexibility
  ([2190924](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/21909245d1a9fab1f6ca34c63ef0dcacfb677d02)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-21. Refactored the `useDeleteObligation` hook to remove the `id` parameter from the function signature, making the `id` dynamically passed to the mutation function. This change enhances the hook's flexibility by decoupling the deletion logic from the initial invocation.
  - update useDeleteSource to improve flexibility
  ([aba1f37](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/aba1f37ded1a51e5bf905bf1f6fe0deb76c78bc6)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-21. Refactored the `useDeleteSource` hook to enhance its flexibility by removing the `id` parameter from the function signature. The mutation function now dynamically accepts `id` as an argument, decoupling the deletion logic from the initial invocation.
  - simplify DELETE handler for fake APIs
  ([77aad16](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/77aad16e5bf6b92af631dd55d348de515af2a161)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-19. The DELETE handlers across multiple fake APIs were updated to streamline their implementation. The `request` parameter and unnecessary logic for extracting IDs were removed since they were not being used. The response is now uniformly returned with `204 No Content` status, simplifying the code and improving consistency.
  - update fetchPosts import path
  ([ff254cb](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/ff254cb90796c1d5d86aeb029bf496a2311f9410)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-13. Updated the import path for the `fetchPosts` function to use the `services` module instead of the `posts` module. This aligns with recent service layer refactoring for improved structure and maintainability

- app
  - remove placeholder ProtectedPage component
  ([a4fba7e](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a4fba7e8354a818526f8b27bb438a4bf73b1faf2)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-15. Removed the `ProtectedPage` component, including its placeholder redirect logic. This cleanup simplifies the codebase and eliminates an unused component tied to future authentication configurations.
  - replace SignIn rendering with redirect logic
  ([ed94881](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/ed94881cc8339fe2c21fd9026548f2cbbab4ad1e)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-15. Removed the `SignIn` component rendering from the Home page and replaced it with a redirect to the `SIGNIN_PAGE` constant. This change aligns the behavior with the existing redirect logic for authenticated users, improving consistency and removing the unnecessary React import.

- auth
  - remove AuthWrapper from private pages
  ([407b4fa](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/407b4fa6dfdf2e11485e9035f4773bca0bc89182)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-19. The `AuthWrapper` component was removed from `Dashboard`, `Profile`, `Obligations`, and `Sources` pages. This aligns the pages with the updated session management approach using `SessionGuard` in the layout. The change simplifies the page structure while maintaining proper authentication flow.
  - update session verification logic
  ([e24b725](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/e24b7256a960c011efd71a3a928c1de98337a30d)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-19. Refactored `verifySession` to improve clarity and maintainability. Introduced variables `isValid` and `status` to streamline session validation, replacing redundant checks. Updated the function's return value to include `status` instead of the `isAuth` flag for better status representation.

- components
  - update imports to use aliases
  ([04bf2fa](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/04bf2fa246b04b6c417bd8105e3fe641f3cf35d2)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-15. Replaced relative import paths with alias-based imports for improved code clarity and maintainability. Updated `AvatarUploader` to align with the revised structure in `profileDropdownOptions`.
  - improve action element validation
  ([f6dca67](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/f6dca67051ca033de1b1647d358027d8487afa40)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-13. Renamed the `isActionElement` function to `isValidElement` for clarity and replaced its uses throughout the `DataTableWithActions` component. Improved null and validity checks for handling custom, view, edit, and delete actions, ensuring robustness and better code readability
  - remove MainTable component
  ([bc67c44](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/bc67c44f1501111fe8d76cf7f8fba2f0d214b8b0)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-13. Removed the unused `MainTable` component, along with its related functionality and sub-components. This cleanup reduces unused code from the codebase, improving maintainability and eliminating potential confusion for developers

- constants
  - centralize dashboard URL in shared constant
  ([4b18813](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/4b18813667c3ff45ce7acb2ebed88a026fd222c6)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-15. Centralized the `/dashboard` URL definition into a shared constant `DASHBOARD_PAGE` within `common.ts`. Replaced hardcoded occurrences of the dashboard URL with the new constant to improve maintainability and reduce duplication.

- dashboard
  - remove `Sign out` button from `DashboardContent`
  ([da84376](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/da843766b974975bddabaf3768b37707feaa567b)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-19. This change removes the `Sign out` button from the `DashboardContent` component, aligning with recent UI updates where the button has been integrated into centralized navigation elements. This simplification enhances content focus within the dashboard.

- datatable
  - remove unused `SortableColumn` type import
  ([17e4f64](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/17e4f64ecac22a4152d0d787816f0e03d53988d7)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-19. The `SortableColumn` type was removed from the `DataTableWithActions` component as it was no longer being used. This cleanup helps to reduce unnecessary dependencies and improve code maintainability.
  - remove unused type import
  ([9cda22d](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/9cda22d9012f0c1596874e8b3e4f2f8868928b20)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-19. The `PaginationRequest` type was removed from the `DataTableWithActions` component as it was no longer being used. This helps to reduce unnecessary dependencies and improve code maintainability.

- delete-buttons
  - refactor delete hooks for flexibility
  ([f68f221](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/f68f22165370f750ece6ac73495f6a1fd81383bc)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-22. Updated `useDeleteSource`, `useDeleteObligation`, and `useDeletePost` hooks to remove the `id` parameter from their initial invocation. The hooks now accept `id` dynamically, improving flexibility and decoupling logic. Adjusted related calls to these hooks in various delete button components.

- layout
  - create layouts for obligations and sources
  ([44445b0](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/44445b08883ec8eab6ca6d220a89e5b1e2159200)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-21. Added dedicated layout components for "Obligations" and "Sources" pages to enhance consistency and modularity. Moved header and action bar elements from page components to layout components, improving structure and code reuse.
  - move Toaster outside of content wrapper
  ([66ba0b4](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/66ba0b46c11a7fd68791839753ad437c8c35c5de)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-14. Relocated the `Toaster` component outside of the content `div` in the private layout for better UI consistency and to avoid potential spacing issues within the content area

- nav
  - adjust `Profile` dropdown menu item label
  ([f3927a6](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/f3927a645492fdb0b0298a8886bec13478de994b)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-19. Updated the label for the dropdown menu item from "Account" to "Profile details" for improved clarity and alignment with UI terminology. Also, removed unused `IconLogout` import to clean up code.
  - simplify `NavUserInfo` props and improve fallback
  ([42ea6b3](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/42ea6b374d35800e1b50acd188ccf24220bd9787)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-19. Enhanced the `NavUserInfo` component by replacing the custom `NavUserInfoProps` type with the built-in `User` type from `next-auth`. This change simplifies type management and aligns with the existing authentication structure. Additionally, adjusted the fallback logic to use the trimmed `displayName` when deriving initials, ensuring greater consistency.

- obligations
  - optimize head checkbox selection logic
  ([534854c](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/534854caa508d5ba9cb893d33ca5dd561ce71240)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-21. Refactored `ObligationTableHeadCheckbox` to improve performance and maintainability. Introduced `useMemo` for efficient computation of selection states and `useCallback` for handling `onCheckedChange` functionality. Replaced redundant variables with streamlined logic to determine checkbox states and actions.
  - refactor row checkbox component to use callbacks
  ([62f2ec5](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/62f2ec5b63d489dbe50caeea477b37bceb6c9956)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-21. Refactored `ObligationTableRowCheckbox` to introduce `useCallback` for handling `onCheckedChange` logic, enhancing performance by memoizing the function. Updated the props type for improved type safety and consistency. Simplified state management by renaming `setSelected` to `addSelected` and `setItem` to `upsertItem` for better descriptive clarity.
  - relocate row selection display logic
  ([d2d7d60](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/d2d7d60da615bf3806c9823c25b686c644f25e27)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-21. Moved `ObligationTableRowSelected` from `ObligationsTable` to the parent page component for better separation of concerns. This change ensures the row selection display is managed at a higher level, improving component modularity and aligning with separation of responsibilities.
  - rename ObligationForm component
  ([98e2d32](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/98e2d321e16922c3b1e5aa240211e666509484f7)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-14. Renamed the `ObligationForm` component to `ObligationCreateForm` to better reflect its purpose in the application. This aligns with the naming convention used for related components and improves code clarity
  - replace MainTable with ObligationsTable
  ([9c88ecd](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/9c88ecd73be14619574bfab5114f09e5d0df407a)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-14. Replaced the `MainTable` component with the newly introduced `ObligationsTable` for better structure and maintainability. Removed the inline column definitions and integrated the `ObligationsTable`, which encapsulates all column configurations and actions, promoting reusability and clarity. Additionally, substituted the `Sheet` and `ObligationForm` combination with the `ObligationCreateButton` component to improve consistency in UI elements for managing obligations

- pagination
  - remove unused import
  ([a464bd7](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a464bd7fa9b4fa5c916159fc12a6847405ac429c)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-13. Removed an unused `SORTING` import from the `Pagination` component to clean up the code. This change eliminates unnecessary code and aligns with best practices for maintaining readability and reducing clutter

- post
  - remove unused `PostUpdateDto` import
  ([ba45260](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/ba452600bd13e8d478915d68a9862c095ccf26ba)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-19. The `PostUpdateDto` type import was removed from the `PostPatchForm` component as it was not being used. This cleanup reduces unnecessary dependencies, improving code readability and maintainability.
  - remove unused `useState` and `usePost` imports
  ([07724a6](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/07724a6bb0e3d5e8ee47cc21890f30ffff935263)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-19. The `useState` and `usePost` imports were removed from the `PostDeleteButton` component as they were unused. This cleanup improves the maintainability and readability of the code by reducing unnecessary dependencies.

- posts
  - restructure and update import paths
  ([e2ee2ea](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/e2ee2ea452d3cfcc9449db5887f95fade6adb6d0)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-14. Reorganized the directory structure for `post-related` components and updated import paths to ensure consistency and maintainability. This change groups all `post` components under the `Posts` directory for better organization and modularity

- profile
  - remove `Sign out` button from `ProfileTabContent`
  ([b40dfe3](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/b40dfe383fce6633308cf5b48f6c07efd9fc5f0e)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-19. This change removes the `Sign out` button from the `ProfileTabContent` component, simplifying the layout and improving focus on the remaining profile elements. The removal aligns with recent updates to the `SignOutButton` and its integration elsewhere in the user interface.
  - update ProfileSettings to reflect Tabs changes
  ([e77558a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/e77558a39f30987cc84c6779591a06df3162ba22)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-15. Aligned the `ProfileSettings` component with the updated `Tabs` implementation. Replaced the deprecated `classNames` prop with new props: `listClassName`, `triggerClassName`, and `contentClassName`, ensuring compatibility with the revised structure. This change improves clarity and maintainability
  - remove unnecessary async from ProfileTabContent
  ([1a719b9](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/1a719b961de177effd2da8923d619d396397c0c2)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-14. The `ProfileTabContent` component no longer requires the `async` keyword as it does not leverage any asynchronous operations. This simplifies the component and removes unnecessary overhead, leading to cleaner and more predictable behavior
  - update ProfileSettings to use new Tabs structure
  ([df513de](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/df513de568221263b30fc0480f683134c445d344)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-14. Revised the `ProfileSettings` component to align with the updated `Tabs` implementation. Updated tabs data to the new structure, introduced type safety using `TabsProps['tabs']`, and added support for vertical orientation in the `Tabs` component

- sidebar
  - update structure and enhance functionality
  ([edaf284](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/edaf2845d51a59cdde87f83c43a6950ceeb425b1)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-19. This update enhances the `AppSidebar` component by reorganizing the structure and integrating new functionality. A `SidebarFooter` was added with the `NavUser` component to display a user dropdown menu, improving navigation and user profile access. The `disable` property was also applied to the `SidebarMenuButton` and reflected via the `aria-disabled` attribute for accessibility.

- sources
  - rename AddSourceButton to SourceCreateButton
  ([29fe059](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/29fe059651b287a08c333cec74d83a3fe434334b)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-14. Updated the `AddSourceButton` component to `SourceCreateButton` for better clarity and alignment with its purpose. This improves readability and consistency with other component naming conventions in the codebase
  - rename SourceForm to SourceCreateForm
  ([a0a7ae8](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/a0a7ae8f36fb765a851466a7696da67658ea6034)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-14. Renamed the `SourceForm` component to `SourceCreateForm` for clarity and better alignment with its purpose. This change improves the codebase's readability and makes the component's functionality more explicit
  - restructure and update import paths
  ([2be214c](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/2be214c43009df6d8023ba791b87bbc6b557c2e5)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-14. Reorganized the directory structure and updated import paths to improve consistency and maintainability. This change ensures all source-related components are grouped under the `Sources` directory for better modularity
  - update SourcesPage with new components
  ([c199182](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/c19918223c9432ff743fe2e0b65154350c6aa6b8)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-14. Replaced `AddSourceButton` with `SourceCreateButton` and `MainTable` with `SourcesTable` in the `SourcesPage` component. Removed unused column configuration logic, simplifying the code and aligning with updated modular components
  - replace MainTable with SourcesTable
  ([c72a678](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/c72a678e2f9eddee7b0eb7871a9d1c374b502497)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-13. Replaced the `MainTable` component in the sources page with the newly introduced `SourcesTable` component. Removed unused column definitions and related logic, simplifying the code and aligning it with the updated functionality

- table
  - create reusable checkbox components for row and header selection
  ([febc443](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/febc443b57f40de162a480c558ca61619a45225d)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-21. Introduced `TableRowCheckbox` and `TableHeadCheckbox` as reusable components to handle row and header-level selections in tables. This change unifies row selection logic across different features (e.g., Sources, Obligations) and centralizes shared behaviors, improving maintainability and consistency. Zustand stores are leveraged for state synchronization.

- tabs
  - update Tabs props for cleaner usage
  ([dea5b76](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/dea5b76783670cfccd43c4dbb0f84683f02323c1)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-15. Revised the `Tabs` component to simplify and standardize prop naming. Removed the `classNames` prop and replaced it with individual props: `listClassName`, `triggerClassName`, and `contentClassName`. This enhances clarity and improves maintainability.

- **src/components/molecules/Tabs/types.ts**: updated `TabsProps` to remove `classNames` and introduced new props for specific class customization.
- **src/components/molecules/Tabs/index.tsx**: replaced `classNames` destructuring with the updated prop names and revised corresponding usage throughout the component
  - unify and update Tabs implementation
  ([2e08f32](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/2e08f32abc5b9d8bc0be2cccb3e9a3729c5755d3)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-14. Consolidated the `Tabs` and `OldTabs` components, unifying functionality and improving maintainability. Updated the types and implementation to align with the Radix UI `Tabs` structure. Removed unnecessary components like `DesktopSidebar` and streamlined the interface to support both horizontal and vertical orientations. Introduced a `handleTabChange` placeholder for future logic handling

- ui
  - simplify imports by using shortened aliases
  ([9550bce](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/9550bce97037b5cb52db4f17ba5b2308d2592aaf)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-15. Revised import paths within the `ui` components to use shorter aliases, improving readability and consistency across the codebase. This change reduces redundancy in path definitions and aligns with established aliasing standards.

### Chores
- changelog
  - remove redundant comments in config
  ([3d02ba2](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/3d02ba21e5ce8fec74e388192178af088387ae5d)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-25. Cleaned up unnecessary comments in the changelog configuration file, improving code readability and reducing clutter. This change ensures the file focuses on functional content without unnecessary annotations.

- config
  - update tsconfig and biome ignore files
  ([47e7ff7](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/47e7ff767f007af31567de6c1468675c27ea6e3d)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-25. Updated configuration files to exclude changelog-related scripts, ensuring cleaner builds
and avoiding inclusion of unnecessary files during formatting or compilation.

- deps
  - remove unused dependencies from pnpm-lock and package.json
  ([2240f50](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/2240f50659934d2a2d5707fba426fee077b3ac21)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-19. Cleaned up unused dependencies from the `pnpm-lock.yaml` and `package.json` files to reduce build size and maintenance overhead. Removed `pretty-quick`, `tinyexec`, `@pkgr/core`, `ignore`, `mri`, `picomatch`, and `prettier`. These dependencies were either no longer referenced, redundant, or deprecated.

- husky
  - remove redundant `pnpm format:pretty` script
  ([3a143be](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/3a143bea79b588eab2e2bf64f19fb95539519789)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-19. The `pnpm format:pretty` script was removed from the `.husky/pre-commit` file as it was redundant and no longer necessary. This change simplifies the pre-commit process by only running essential formatting and validation commands.
  - update pre-commit hook commands
  ([6e54f35](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/6e54f3556ceca41c18eb94854f586e1ed3f438cd)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-19. Revised the `.husky/pre-commit` hook to include new formatting and styling commands. Added `pnpm format:write` and `pnpm format:pretty` to enforce consistent and automated handling of code formatting during pre-commit. Retained the existing `pnpm check:write` for validation.
  - update pre-commit script
  ([293bb7c](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/293bb7c5452fceb919baea65e30d8d5238347685)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-19. Revised the pre-commit script to update the order of PNPM commands. This ensures that formatting (`format:pretty`) and checks (`check:write`) are consistently executed in tandem with each commit, improving code quality and maintaining uniform standards.

- lint
  - disable `useHookAtTopLevel` rule in Biome config
  ([e97ac2a](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/e97ac2a9160739f65c07fb9eab4279a97b3aa980)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-14. The `useHookAtTopLevel` linting rule was set to "off" in the Biome configuration. This change allows greater flexibility during development by removing the requirement for hooks to be exclusively used at the top level of components. This adjustment aligns with the project's evolving coding requirements

- pnpm
  - update lockfile with dependency quotes standardization
  ([e98e70d](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/e98e70de1284aacd9bd2d244d96caf89cee57a5b)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-19. Updated `pnpm-lock.yaml` to standardize single quotes on dependency names and introduced new dependencies, reflecting the latest changes. This change ensures consistent formatting and brings the updated package versions into the lockfile.

- release
  - 0.2.0
  ([3926889](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/39268892cffae121f6f77b7f6d8a20c4b2b57e0b)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-25.

### Styles
- General
  - standardize single quotes and table styles
  ([7a353e9](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/7a353e9fa8f7933e069b669887e47cb0aca9c479)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-19. Aligned the project's style by replacing double quotes with single quotes across all impacted files. Updated `ObligationsTable` to enhance table usability with column size definitions, pinned columns, and improved cell background styling.

- constants
  - standardize quotes in navigationItems.ts
  ([9bcc689](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/9bcc689a16a4feb866b009eed1ba4d4b618b1ad0)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-19. Updated all string literals in `src/lib/constants/navigationItems.ts` to use single quotes for consistency with project coding standards. Adjusted import formatting for better readability and compliance with linting rules.

- types
  - standardize quotes for import statements
  ([b1b61ae](https://git.otakoyi.com/reg-watch/reg-watch-web/commit/b1b61ae3a635aad164508f8556fc3823601df885)) — [Maksym Lukianov](mailto:ml@otakoyi.com) • 2025-08-13. Replaced double quotes with single quotes in import statements across multiple files. This change maintains consistency in the codebase's style and adheres to the established linting rules
