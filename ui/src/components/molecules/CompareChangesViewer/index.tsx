'use client';

import Title from '@/components/atoms/Title';
import clsx from 'clsx';
import React from 'react';

type DiffLine = {
  oldLineNumber: number | null;
  newLineNumber: number | null;
  text: string;
  type: 'added' | 'removed' | 'unchanged';
};

const mockDiff: DiffLine[] = [
  {
    oldLineNumber: 1,
    newLineNumber: 1,
    text: 'The annual market risk report, mandated by the Financial Conduct',
    type: 'unchanged',
  },
  {
    oldLineNumber: 2,
    newLineNumber: null,
    text: 'Authority (FCA), is due by March 31st each year. It must include a',
    type: 'removed',
  },
  {
    oldLineNumber: null,
    newLineNumber: 2,
    text: 'Authority (FCA), is due by April 15th each year. It must include a',
    type: 'added',
  },
  {
    oldLineNumber: 3,
    newLineNumber: 3,
    text: 'detailed overview of market risk metrics, including VaR calculations',
    type: 'unchanged',
  },
  {
    oldLineNumber: 4,
    newLineNumber: 4,
    text: 'stress tests, and capital assessments. All data must be accurate',
    type: 'unchanged',
  },
  {
    oldLineNumber: 5,
    newLineNumber: 5,
    text: 'complete, and approved by the Chief Compliance Officer and risk head.',
    type: 'unchanged',
  },
  {
    oldLineNumber: 6,
    newLineNumber: null,
    text: 'Late or incomplete submissions may incur penalties up to $10,000',
    type: 'removed',
  },
  {
    oldLineNumber: null,
    newLineNumber: 6,
    text: 'Late or incomplete submissions may incur penalties up to $25,000',
    type: 'added',
  },
  {
    oldLineNumber: 7,
    newLineNumber: null,
    text: 'per business day. The report covers all trading and derivative activity',
    type: 'removed',
  },
  {
    oldLineNumber: null,
    newLineNumber: 7,
    text: 'per business day. The report covers updated digital templates',
    type: 'added',
  },
  { oldLineNumber: 8, newLineNumber: 8, text: 'from the previous fiscal year.', type: 'unchanged' },
];

export default function CompareChangesViewer() {
  return (
    <div className='mt-4'>
      <Title level={4}>Compare changes</Title>

      <div className='grid grid-cols-2 gap-4 border rounded-md overflow-hidden text-sm font-mono mt-4'>
        {/* Old version */}
        <div className='bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700'>
          {mockDiff
            .filter((line) => line.oldLineNumber !== null)
            .map((line, idx) => (
              <div
                key={idx}
                className={clsx(
                  'flex',
                  line.type === 'removed' && 'bg-red-100 dark:bg-red-900',
                  line.type === 'added' && 'bg-green-100 dark:bg-green-900'
                )}
              >
                <div className='w-8 text-right pr-2 text-gray-500 dark:text-gray-400 select-none'>
                  {line.oldLineNumber ?? ''}
                </div>
                <div className='whitespace-pre-wrap text-gray-900 dark:text-gray-100'>{line.text}</div>
              </div>
            ))}
        </div>

        {/* New version */}
        <div className='bg-white dark:bg-gray-900'>
          {mockDiff
            .filter((line) => line.newLineNumber !== null)
            .map((line, idx) => (
              <div
                key={idx}
                className={clsx(
                  'flex',
                  line.type === 'added' && 'bg-green-100 dark:bg-green-900',
                  line.type === 'removed' && 'bg-red-100 dark:bg-red-900'
                )}
              >
                <div className='w-8 text-right pr-2 text-gray-500 dark:text-gray-400 select-none'>
                  {line.newLineNumber ?? ''}
                </div>
                <div className='whitespace-pre-wrap text-gray-900 dark:text-gray-100'>{line.text}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
