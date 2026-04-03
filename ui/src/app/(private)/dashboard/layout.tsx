import Title from '@/components/atoms/Title';
import * as React from 'react';

export const metadata = {
  title: 'Welcome',
  description: 'Welcome to Compliance Dashboard.',
};

export default async function DashboardLayoutPage({
  children,
  obligations,
  monitored_sources,
  compliance_score,
  urgent_alerts,
}: {
  obligations: React.ReactNode;
  monitored_sources: React.ReactNode;
  compliance_score: React.ReactNode;
  urgent_alerts: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      <Title level={3}>Compliance Overview</Title>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 my-8'>
        {/* Left Column */}
        <div className='flex flex-col justify-between gap-6'>
          {obligations}
          {monitored_sources}
        </div>
        {/* Middle Column - Compliance Score */}
        {compliance_score}
        {/* Right Column - Urgent Alerts */}
        {urgent_alerts}
      </div>
      {children}
    </>
  );
}
