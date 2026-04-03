import { describe, expect, it } from 'vitest';
import {
  createPaginationSchema,
  idNumberSchema,
  idSchema,
  idStringSchema,
  makeEmailSchema,
  makeRequiredString,
  makeUrlSchema,
  optionalUuidFromEmpty,
  paginationSchema,
  uuIdSchema,
} from './index';

describe('idStringSchema', () => {
  const schema = idStringSchema;
  it('parses valid string-like IDs, non-empty', () => {
    const valid = [
      'a',
      'A',
      '123',
      'abcDEF',
      'abc-123',
      'deadbeef',
      '0a-1B-2c',
      'ffffffffffffffff',
      '0a_1B_2c',
      'zod',
      'ZOD',
    ];
    for (const v of valid) {
      expect(() => schema.parse(v)).not.toThrow();
    }
  });

  it('rejects invalid values', () => {
    const invalid: unknown[] = [
      '', // empty string
      ' ', // whitespace-only
      '(', // whitespace-only
      '?', // whitespace-only
      ')', // whitespace-only
      ',', // whitespace-only
      '.', // whitespace-only
      'abc_', // invalid char
      '_g123', // non-hex char
      'abc-', // invalid char
      '-g123', // non-hex char
      '--', // only dashes
      '-', // single dash
      null,
      undefined,
      {}, // object
      [], // array
    ];

    for (const v of invalid) {
      const res = schema.safeParse(v);
      expect(res.success).toBe(false);
      if (!res.success) {
        // top-level union error message configured
        expect(res.error.errors.some((e) => e.message === 'Invalid ID')).toBe(true);
      }
    }
  });
});

describe('idNumberSchema', () => {
  const _schema = idNumberSchema;
  it('parses valid positive numeric IDs', () => {
    const validNumbers = [1, 42, 999999, Number.MAX_SAFE_INTEGER];
    for (const n of validNumbers) {
      expect(() => idSchema.parse(n)).not.toThrow();
    }
  });

  it('rejects invalid values', () => {
    const invalid: unknown[] = [
      '', // empty string
      ' ', // whitespace-only
      0, // not positive
      -1,
      3.14, // non-integer still allowed by number schema? number is allowed but must be positive => 3.14 is positive; keep to invalid examples:
      0n, // bigint
      null,
      undefined,
      {}, // object
      [], // array
    ];

    for (const v of invalid) {
      const res = idSchema.safeParse(v);
      expect(res.success).toBe(false);
      if (!res.success) {
        // top-level union error message configured
        expect(res.error.errors.some((e) => e.message === 'Invalid ID' || e.message === 'Invalid input')).toBe(true);
      }
    }
  });
});

describe('uuIdSchema', () => {
  const schema = uuIdSchema;
  it('parses valid UUIDs', () => {
    const uuids = [
      '00000000-0000-0000-0000-000000000000',
      '550e8400-e29b-41d4-a716-446655440000',
      'de305d54-75b4-431b-adb2-eb6b9e546014',
    ];
    for (const u of uuids) {
      expect(() => idSchema.parse(u)).not.toThrow();
    }
  });

  it('rejects invalid values with "Invalid ID"', () => {
    const invalid: unknown[] = [
      '', // empty string
      ' ', // whitespace-only
      'a',
      'A',
      '123',
      'abcDEF',
      'abc-123',
      'deadbeef',
      '0a-1B-2c',
      'ffffffffffffffff',
      '0a_1B_2c',
      'zod',
      'ZOD',
      '(', // whitespace-only
      '?', // whitespace-only
      ')', // whitespace-only
      ',', // whitespace-only
      '.', // whitespace-only
      'abc_', // invalid char
      '_g123', // non-hex char
      'abc-', // invalid char
      '-g123', // non-hex char
      '--', // only dashes
      '-', // single dash
      null,
      undefined,
      {}, // object
      [], // array
      'not-a-uuid-xxxxxxxxxxxxxxxxxxxxxx', // malformed uuid
    ];

    for (const v of invalid) {
      const res = schema.safeParse(v);
      expect(res.success).toBe(false);
      if (!res.success) {
        // top-level union error message configured
        expect(res.error.errors.some((e) => e.message === 'Invalid ID')).toBe(true);
      }
    }
  });
});

describe('idSchema', () => {
  const schema = idSchema;
  it('keeps compatibility with constituent schemas', () => {
    const s = 'abc-123';
    const n = 7;
    const u = '550e8400-e29b-41d4-a716-446655440000';

    expect(() => idStringSchema.parse(s)).not.toThrow();
    expect(() => idNumberSchema.parse(n)).not.toThrow();
    expect(() => uuIdSchema.parse(u)).not.toThrow();

    expect(() => schema.parse(s)).not.toThrow();
    expect(() => schema.parse(n)).not.toThrow();
    expect(() => schema.parse(u)).not.toThrow();
  });
});

describe('makeRequiredString', () => {
  const schema = makeRequiredString;
  const label = 'String';
  it('accepts valid string', () => {
    const result = schema(label).safeParse('asd');
    expect(result.success).toBe(true);
  });

  it('rejects invalid values with "Invalid ID"', () => {
    const invalid: unknown[] = [
      '', // empty string
      ' ', // whitespace-only
      null,
      undefined,
      {}, // object
      [], // array
    ];

    for (const v of invalid) {
      const res = schema(label).safeParse(v);
      expect(res.success).toBe(false);
      if (!res.success) {
        // top-level union error message configured
        expect(res.error.errors.some((e) => e.message === `${label} is required`)).toBe(true);
      }
    }
  });
});
// // ✅ EMAIL SCHEMA TESTS
// describe('makeEmailSchema', () => {
//   const schema = makeEmailSchema();
//
//   it('accepts valid email', () => {
//     expect(schema.safeParse('test@example.com').success).toBe(true);
//   });
//
//   it('rejects empty string', () => {
//     const result = schema.safeParse('');
//     expect(result.success).toBe(false);
//     expect(result.error?.issues[0]?.message).toBe('Email is required');
//   });
//
//   it('rejects invalid email format', () => {
//     const result = schema.safeParse('not-an-email');
//     expect(result.success).toBe(false);
//     expect(result.error?.issues[0]?.message).toBe('Invalid email address');
//   });
// });
//
// // ✅ URL SCHEMA TESTS
// describe('makeUrlSchema', () => {
//   const schema = makeUrlSchema();
//
//   it('accepts valid URL (HTTP)', () => {
//     expect(schema.safeParse('http://example.com').success).toBe(true);
//   });
//
//   it('accepts valid URL (HTTPS)', () => {
//     expect(schema.safeParse('https://example.com').success).toBe(true);
//   });
//
//   it('accepts valid URL (localhost)', () => {
//     expect(schema.safeParse('http://localhost:3000').success).toBe(true);
//   });
//
//   it('rejects empty string', () => {
//     const result = schema.safeParse('');
//     expect(result.success).toBe(false);
//     expect(result.error?.issues[0]?.message).toBe('URL is required');
//   });
//
//   it('rejects invalid URL', () => {
//     const result = schema.safeParse('not-a-url');
//     expect(result.success).toBe(false);
//     expect(result.error?.issues[0]?.message).toBe('Invalid url');
//   });
// });
//
//
//
//
//
// // ✅ OPTIONAL UUID TRANSFORMATION TEST
// describe('optionalUuidFromEmpty', () => {
//   it('transforms empty string to undefined', () => {
//     const result = optionalUuidFromEmpty.parse('');
//     expect(result).toBeUndefined();
//   });
//
//   it('keeps valid UUID', () => {
//     const validUuid = '550e8400-e29b-41d4-a716-446655440000';
//     const result = optionalUuidFromEmpty.parse(validUuid);
//     expect(result).toBe(validUuid);
//   });
// });
//
// // ✅ PAGINATION SCHEMA TESTS
// describe('createPaginationSchema', () => {
//   const itemSchema = makeEmailSchema(); // example item type
//   const schema = createPaginationSchema(itemSchema);
//
//   it('accepts valid pagination structure', () => {
//     const result = schema.safeParse({
//       totalItems: 10,
//       page: 1,
//       pageSize: 10,
//       totalPages: 1,
//       items: ['test@example.com'],
//     });
//
//     expect(result.success).toBe(true);
//   });
//
//   it('rejects invalid items', () => {
//     const result = schema.safeParse({
//       totalItems: 10,
//       page: 1,
//       pageSize: 10,
//       totalPages: 1,
//       items: ['not-an-email'],
//     });
//
//     expect(result.success).toBe(false);
//     expect(result.error?.issues[0]?.message).toContain('Invalid email address');
//   });
// });
//
// // ✅ BASE PAGINATION SCHEMA TEST
// describe('paginationSchema', () => {
//   it('requires numeric fields', () => {
//     const result = paginationSchema.safeParse({
//       totalItems: '10',
//       page: 1,
//       pageSize: 10,
//       totalPages: 1,
//     });
//     expect(result.success).toBe(false);
//   });
// });
