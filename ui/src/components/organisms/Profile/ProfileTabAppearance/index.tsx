'use client';

import Title from '@/components/atoms/Title';
import ScrollContainer from '@/components/molecules/ScrollContainer';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/ui/card';
import { useTheme } from 'next-themes';

const ProfileTabAppearance = () => {
  const { theme, setTheme } = useTheme();

  return (
    <ScrollContainer>
      <Card className='px-6 w-full'>
        <div className='flex md:justify-between md:items-start flex-col md:flex-row gap-4'>
          <div className='space-y-1'>
            <Title level={6}>Theme</Title>
            <p className='text-sm text-muted-foreground'>Choose a theme for your interface</p>
          </div>

          <Select value={theme} onValueChange={setTheme}>
            <SelectTrigger className='w-52'>
              <SelectValue placeholder='Select theme' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='light'>Light</SelectItem>
              <SelectItem value='dark'>Dark</SelectItem>
              <SelectItem value='system'>System</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>
    </ScrollContainer>
  );
};

export default ProfileTabAppearance;
