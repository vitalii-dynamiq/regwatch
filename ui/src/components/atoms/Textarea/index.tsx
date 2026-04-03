import type { TextareaProps } from '@/components/atoms/Textarea/types';
import { Textarea as UITextarea } from '@/ui/textarea';
import type { ReactNode } from 'react';

export default function Textarea(props: TextareaProps): ReactNode {
  const { name, ...otherProps } = props;
  return <UITextarea name={name} {...otherProps} />;
}
