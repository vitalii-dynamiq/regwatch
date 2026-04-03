'use client';

import Sheet from '@/components/molecules/Sheet';
import ObligationCreateForm from '@/components/organisms/Obligations/ObligationFormCreate';
import * as React from 'react';

export function ObligationCreateButton() {
  return (
    <Sheet
      triggerName='Create obligation'
      variant='default'
      size='sm'
      title='Create obligation'
      saveText='Create'
      stickyFooter
      formId='obligationCreateForm'
    >
      <ObligationCreateForm formId='obligationCreateForm' />
    </Sheet>
  );
}
