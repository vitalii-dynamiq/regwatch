import ScrollContainer from '@/components/molecules/ScrollContainer';
import * as React from 'react';
import ProfileCardInformation from '../ProfileCardInformation';

const ProfileTabContent = () => {
  return (
    <ScrollContainer>
      <div className='flex flex-col gap-4 md:gap-6 w-full'>
        <ProfileCardInformation />
      </div>
    </ScrollContainer>
  );
};

export default ProfileTabContent;
