import Button from '@/components/atoms/Button';
import { DialogClose } from '@/ui/dialog';

const CloseButton = ({ title = 'Close' }) => (
  <DialogClose asChild>
    <Button variant='outline'>{title}</Button>
  </DialogClose>
);

export default CloseButton;
