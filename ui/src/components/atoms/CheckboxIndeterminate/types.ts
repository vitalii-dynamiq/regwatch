import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

export type CheckboxIndeterminateProps = Omit<
  React.ComponentProps<typeof CheckboxPrimitive.Root>,
  'checked' | 'onCheckedChange'
> & {
  checked?: boolean; // represents "some selected" state in parent
  onCheckedChange?: (checked: boolean) => void;
  nativeChecked?: boolean;
};
