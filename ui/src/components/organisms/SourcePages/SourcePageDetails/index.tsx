'use client';

import { Subtitle } from '@/components/atoms/SubTitle';
import Title from '@/components/atoms/Title';
import { SourcePageAlertsTable } from '@/components/organisms/SourcePageAlerts/SourcePageAlertTable';

export default function SourcePageDetails() {
  return (
    <>
      <Title level={3}>Market Risk Disclosure Requirements 2025</Title>
      <Subtitle>/guidance/market-risk-disclosure-2025.pdf</Subtitle>

      <Title level={5} className='mt-8 mb-4'>
        Alerts detected
      </Title>

      <SourcePageAlertsTable />
    </>
  );
}
