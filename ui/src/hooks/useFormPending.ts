import { FORM_PENDING_EVENT } from '@/lib/helpers/formPending';
import { useEffect, useState } from 'react';

export function useFormPending(formId?: string) {
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (!formId || typeof window === 'undefined') return;

    const handler = (e: Event) => {
      const ce = e as CustomEvent<{ formId: string; pending: boolean }>;
      if (ce.detail?.formId === formId) setPending(ce.detail.pending);
    };

    window.addEventListener(FORM_PENDING_EVENT, handler as EventListener);
    return () => window.removeEventListener(FORM_PENDING_EVENT, handler as EventListener);
  }, [formId]);

  return pending;
}
