import type { ScrollContainerProps } from '@/components/molecules/ScrollContainer/types';

const ScrollContainer = ({ children }: ScrollContainerProps) => (
  <div className='flex-1 overflow-y-auto w-full'>{children}</div>
);

export default ScrollContainer;
