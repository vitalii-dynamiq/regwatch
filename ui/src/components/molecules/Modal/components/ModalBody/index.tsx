import type { ModalBodyProps } from '@/components/molecules/Modal/components/ModalBody/types';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/ui/dialog';
import CloseButton from '../CloseButton';

const ModalBody = ({ title, description, children, actions }: ModalBodyProps) => {
  return (
    <DialogContent className='sm:max-w-[425px]'>
      <DialogHeader>
        {title && <DialogTitle>{title}</DialogTitle>}
        {description && <DialogDescription>{description}</DialogDescription>}
      </DialogHeader>
      {children && <div className='grid gap-4'>{children}</div>}
      {actions && (
        <DialogFooter>
          <CloseButton />
          {actions}
        </DialogFooter>
      )}
    </DialogContent>
  );
};

export default ModalBody;
