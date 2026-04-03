import type { CheckboxProps } from '@/components/atoms/Checkbox/types';
import { Checkbox as UICheckbox } from '@/ui/checkbox';
import type { ReactNode } from 'react';

export default function Checkbox(props: CheckboxProps): ReactNode {
  return <UICheckbox className={'cursor-pointer'} {...props} />;
}
