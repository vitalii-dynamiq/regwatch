import type { UserNavigationInfoProps } from '@/components/organisms/Apps/AppSidebarUserNavigationInfo/types';
import { useUserDisplayData } from '@/hooks/useUserDisplayData';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';

export function AppSidebarUserNavigationInfo({ collapsed = false }: UserNavigationInfoProps) {
  const { displayName, displayEmail, avatarFallback, avatarImageSrc } = useUserDisplayData();

  return (
    <div className='flex items-center gap-2 min-w-0'>
      <Avatar className='h-8 w-8 flex-shrink-0 rounded-lg'>
        <AvatarImage src={avatarImageSrc} alt={displayName} />
        <AvatarFallback className='rounded-lg'>{avatarFallback}</AvatarFallback>
      </Avatar>

      {!collapsed && (
        <div className='grid flex-1 min-w-0 text-left text-sm leading-tight'>
          <span className='truncate font-medium'>{displayName}</span>
          <span className='truncate text-muted-foreground text-xs'>{displayEmail}</span>
        </div>
      )}
    </div>
  );
}
