'use client';

import Sheet from '@/components/molecules/Sheet';
import { SourceCreateForm } from '@/components/organisms/Sources/SourceFormCreate';
import * as React from 'react';

export function SourceCreateButton() {
  return (
    <Sheet
      triggerName='Add source'
      variant='default'
      size='sm'
      title='Add source'
      saveText='Add'
      stickyFooter
      formId='sourceUpdateForm'
    >
      <SourceCreateForm formId='sourceUpdateForm' />
    </Sheet>
  );
}
