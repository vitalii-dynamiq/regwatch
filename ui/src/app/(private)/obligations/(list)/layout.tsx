import { Subtitle } from '@/components/atoms/SubTitle';
import Title from '@/components/atoms/Title';
import { ObligationCreateButton } from '@/components/organisms/Obligations/ObligationButtonCreate';
import * as React from 'react';

export const metadata = {
  title: 'Obligations',
  description: 'Monitor regulatory obligations and compliance status.',
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
          <Title level={3}>Obligations</Title>
          <Subtitle>Monitor regulatory obligations and compliance status.</Subtitle>
        </div>
        <ObligationCreateButton />
      </div>
      {children}
    </>
  );
}
