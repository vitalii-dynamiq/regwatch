import type { TitleProps } from '@/components/atoms/Title/types';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import type { NextComponentType, NextPageContext } from 'next';

const titleVariants = cva('font-bold leading-tight', {
  variants: {
    level: {
      1: 'text-5xl',
      2: 'text-3xl',
      3: 'text-2xl tracking-tight',
      4: 'text-xl font-semibold text-gray-900 dark:text-gray-100',
      5: 'text-lg md:text-xl font-semibold',
      6: 'text-base font-semibold',
    },
  },
  defaultVariants: {
    level: 1,
  },
});

type HeadingType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

const Title: NextComponentType<NextPageContext, null, TitleProps> = ({
  level = 1,
  children,
  className,
}: TitleProps) => {
  const Comp = `h${level}` as HeadingType;

  return <Comp className={cn(titleVariants({ level, className }))}>{children}</Comp>;
};

export default Title;
