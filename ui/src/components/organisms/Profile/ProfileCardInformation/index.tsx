'use client';
import Button from '@/components/atoms/Button';
import InfoRow from '@/components/atoms/InfoRow';
import Title from '@/components/atoms/Title';
import { ProfileFormUpdate } from '@/components/organisms/Profile/ProfileFormUpdate';
import { useMe } from '@/server/api/entity/user/queries';
import { Card } from '@/ui/card';
import { useState } from 'react';

const ProfileCardInformation = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { data: me, isLoading } = useMe();

  const name = me ? `${me.first_name} ${me.last_name}` : '';
  const email = me?.email ?? '';

  const editButton = isEditing
    ? { label: 'Cancel', onClick: () => setIsEditing(false) }
    : { label: 'Edit', onClick: () => setIsEditing(true) };

  return (
    <Card className='border border-border rounded-lg shadow-sm py-2 overflow-hidden w-full'>
      <div className='px-4 py-4 md:px-6'>
        <div className='flex justify-between items-center'>
          <Title level={5}>Profile information</Title>
          <Button variant='outline' type='button' onClick={editButton.onClick}>
            {editButton.label}
          </Button>
        </div>
      </div>
      <div className='px-4 pb-4 md:px-6'>
        {isEditing ? (
          <ProfileFormUpdate />
        ) : (
          <>
            <InfoRow label='Name' value={name} isLoading={isLoading} />
            <InfoRow label='Email' value={email} isLoading={isLoading} />
          </>
        )}
      </div>
    </Card>
  );
};
export default ProfileCardInformation;
