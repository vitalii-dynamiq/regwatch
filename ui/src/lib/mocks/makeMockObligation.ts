import type { Obligation } from '@/server/api/entity/obligation/types';
import { faker } from '@faker-js/faker';

export function makeMockObligation(_id: Obligation['id'] | null = null): Obligation {
  const hasUserId = Math.random() > 0.2;
  const hasTitle = Math.random() > 0.2;
  const hasDescription = Math.random() > 0.2;

  return {
    id: faker.string.uuid(),
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.past().toISOString(),
    title: hasTitle ? faker.lorem.sentence() : null,
    obligation_type: faker.helpers.arrayElement([
      'regulatory_filing',
      'quarterly_reporting',
      'annual_reporting',
      'compliance_requirement',
      'reporting_deadline',
      'implementation_deadline',
      'disclosure_requirement',
      'training_requirement',
      'audit_requirement',
      'documentation_requirement',
      'requirement',
      'prohibition',
      'reporting_duty',
      'deadline',
    ]),
    description: hasDescription ? faker.lorem.paragraphs().replace(/\n/g, '\\n') : null,
    risk_level: faker.helpers.arrayElement(['high', 'medium', 'low', 'unknown']),
    status: faker.helpers.arrayElement(['active', 'inactive']),
    due_date: faker.date.future().toISOString(),
    effective_date: faker.date.past().toISOString(),
    detected_date: faker.date.past().toISOString(),
    completed_at: faker.date.past().toISOString(),
    regulatory_metadata: {},
    assigned_to: hasUserId ? faker.string.uuid() : null,
    assigned_at: faker.date.past().toISOString(),
    last_updated_by: hasUserId ? faker.string.uuid() : null,
    source: {
      name: faker.string.uuid(),
      base_url: faker.internet.url(),
    },
  } as unknown as Obligation;
}
