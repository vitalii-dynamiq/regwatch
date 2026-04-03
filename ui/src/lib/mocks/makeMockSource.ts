import type { Source } from '@/server/api/entity/source/types';
import { faker } from '@faker-js/faker';

const CONTENT_TYPES = [
  'Regulatory Guidance',
  'Enforcement Actions',
  'Rules & Regulations',
  'Public Consultations',
] as const;

const MONITORING_FREQUENCIES = ['Daily', 'Weekly', 'Every 8 hours'] as const;

export function makeMockSource(): Source {
  const hasName = Math.random() > 0.2;
  const hasBaseUrl = Math.random() > 0.2;
  const hasDescription = Math.random() > 0.2;
  const hasJurisdictionId = Math.random() > 0.2;
  const hasFrequency = Math.random() > 0.2;
  const hasContentType = Math.random() > 0.2;
  const hasMonitor = Math.random() > 0.2;

  return {
    id: faker.string.uuid(),
    name: hasName ? faker.company.name() : null,
    base_url: hasBaseUrl ? faker.internet.url() : null,
    description: hasDescription ? faker.lorem.paragraphs().replace(/\n/g, '\\n') : null,
    jurisdiction_id: hasJurisdictionId ? faker.string.uuid() : null,
    monitoring_enabled: hasMonitor ? faker.datatype.boolean() : null,
    monitoring_frequency: hasFrequency ? faker.helpers.arrayElement([...MONITORING_FREQUENCIES]) : null,
    content_types: hasContentType
      ? faker.helpers.arrayElements([...CONTENT_TYPES], { min: 1, max: CONTENT_TYPES.length })
      : null,
    last_monitoring_started_at: hasMonitor ? faker.date.past().toISOString() : null,
    last_monitoring_completed_at: hasMonitor ? faker.date.past().toISOString() : null,
  } as unknown as Source;
}
