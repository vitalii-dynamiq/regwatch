export const FORM_PENDING_EVENT = 'rw:form-pending';

type Detail = { formId: string; pending: boolean };

export function emitFormPending(formId: string, pending: boolean) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent<Detail>(FORM_PENDING_EVENT, { detail: { formId, pending } }));
}
