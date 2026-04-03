'use client';

import type { DataTableWithActionsProps } from '@/components/molecules/DataTableWithActions/types';
import SourcePageAlertsDropdownAction from '@/components/organisms/SourcePageAlerts/SourcePageAlertDropdownAction';
import type { SourcePageAlert } from '@/components/organisms/SourcePageAlerts/SourcePageAlertTable/types';
import SourcePageAlertTableCellLink from '@/components/organisms/SourcePageAlerts/SourcePageAlertTableCellLink';
import { SourceRiskBadge } from '@/components/organisms/Sources/SourceRiskBadge';
import { DataTableWithActionWrapper } from '@/components/templates/DataTableWithActionWrapper';
import { usePathname } from 'next/navigation';
import * as React from 'react';

export function SourcePageAlertsTable() {
  const pathname = usePathname();
  const TEST_DATA: SourcePageAlert[] = [
    {
      id: '1',
      changeName: 'Market Risk Obligation Update',
      risk: 'high',
      description: 'Submission deadline moved to April 15',
      dateTime: 'June 15, 2025 06:30',
    },
    {
      id: '2',
      changeName: 'Stress Testing Added',
      risk: 'high',
      description: 'Added new section on stress testing requirements',
      dateTime: 'May 26, 2024 14:15',
    },
    {
      id: '3',
      changeName: 'Contact Info Update',
      risk: 'high',
      description: 'Updated contact information and formatting',
      dateTime: 'May 25, 2024 09:45',
    },
    {
      id: '4',
      changeName: 'Document Created',
      risk: 'low',
      description: 'Initial version of document published',
      dateTime: 'May 20, 2024 16:30',
    },
    {
      id: '5',
      changeName: 'Contact Information',
      risk: 'high',
      description: 'Updated definitions for financial risk terms',
      dateTime: 'May 18, 2024 11:00',
    },
    {
      id: '6',
      changeName: 'Risk Terms Revision',
      risk: 'medium',
      description: 'Audit requirements limited to annual cycles',
      dateTime: 'May 17, 2024 16:45',
    },
    {
      id: '7',
      changeName: 'Audit Scope Narrowed',
      risk: 'low',
      description: 'Added footnote about compliance with ISO standards',
      dateTime: 'May 15, 2024 13:20',
    },
    {
      id: '8',
      changeName: 'Compliance Note Added',
      risk: 'medium',
      description: 'Changed metadata format to align with XML schema',
      dateTime: 'May 14, 2024 10:10',
    },
    {
      id: '9',
      changeName: 'Metadata Format Updated',
      risk: 'medium',
      description: 'Introduced clause for late submission penalties',
      dateTime: 'May 12, 2024 15:35',
    },
    {
      id: '10',
      changeName: 'Penalties Clause Included',
      risk: 'low',
      description: 'Clarified labeling instructions for attachments',
      dateTime: 'May 10, 2024 08:55',
    },
  ];

  const columns: DataTableWithActionsProps<SourcePageAlert>['columns'] = [
    {
      id: 'changeName',
      header: { name: 'Change name', sorting: false },
      type: 'text',
      actions: {
        custom: <SourcePageAlertTableCellLink data={null} pathname={pathname} />,
      },
    },
    {
      id: 'impact',
      header: { name: 'Impact', sorting: false },
      actions: {
        custom: <SourceRiskBadge />,
      },
      size: 120,
    },
    {
      id: 'description',
      header: { name: 'Description', sorting: false },
      type: 'text',
    },
    {
      id: 'dateTime',
      header: { name: 'Date & Time', sorting: false },
      type: 'text',
    },
    {
      id: 'actions',
      header: {
        name: '',
      },
      actions: {
        custom: <SourcePageAlertsDropdownAction data={null} />,
      },
      pin: 'right',
      size: 32,
    },
  ];

  return <DataTableWithActionWrapper<SourcePageAlert> columns={columns} data={TEST_DATA} />;
}
