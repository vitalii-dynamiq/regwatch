import Title from '@/components/atoms/Title';
import { Tabs } from '@/components/molecules/Tabs';
import type { TabsProps } from '@/components/molecules/Tabs/types';
import ProfileTabAppearance from '@/components/organisms/Profile/ProfileTabAppearance';
import ProfileTabContent from '@/components/organisms/Profile/ProfileTabContent';

export const metadata = {
  title: 'Profile details',
  description: 'Manage your profile details and preferences.',
};

export default function ProfilePage() {
  const tabs = [
    {
      content: <ProfileTabContent />,
      id: 'profile',
      label: 'Profile',
    },
    {
      content: <ProfileTabAppearance />,
      id: 'appearance',
      label: 'Appearance',
    },
  ] as TabsProps['tabs'];
  return (
    <>
      <Title level={3}>Profile Details</Title>
      <div className='w-full mt-6'>
        <Tabs
          defaultTab={'profile'}
          tabs={tabs}
          orientation='vertical'
          className='flex flex-col md:flex-row gap-6 md:gap-12'
          listClassName='w-full md:w-64 space-y-1 h-fit bg-white dark:bg-gray-800'
          triggerClassName='hover:bg-accent-foreground/10 rounded-md px-3 font-normal justify-start py-2 text-sm data-[state=active]:font-medium cursor-pointer text-accent-foreground dark:text-accent-foreground-dark w-full h-9 data-[state=active]:bg-accent dark:data-[state=active]:bg-accent-dark'
          contentClassName='w-full bg-white dark:bg-gray-900'
        />
      </div>
    </>
  );
}
