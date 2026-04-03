import { Subtitle } from '@/components/atoms/SubTitle';
import Title from '@/components/atoms/Title';
import * as React from 'react';

export const metadata = {
  title: 'Regulatory Alerts',
  description: 'Monitor and manage compliance-critical regulatory changes.',
};
export default async function ObligationsLayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className='flex justify-between items-start'>
        <div>
          <Title level={3}>Regulatory Alerts</Title>
          <Subtitle>Monitor and manage compliance-critical regulatory changes.</Subtitle>
        </div>
      </div>
      {children}
    </>
  );
}
