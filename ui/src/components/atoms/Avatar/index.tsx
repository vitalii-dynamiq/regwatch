import type { AvatarProps } from '@/components/atoms/Avatar/types';
import { cn } from '@/lib/utils';
import { AvatarFallback, AvatarImage, Avatar as AvatarUi } from '@/ui/avatar';

const Avatar = ({ src, fallback, alt, className }: AvatarProps) => (
  <AvatarUi className={cn('size-10', className)}>
    <AvatarImage src={src} alt={alt} />
    <AvatarFallback>{fallback}</AvatarFallback>
  </AvatarUi>
);

export default Avatar;
