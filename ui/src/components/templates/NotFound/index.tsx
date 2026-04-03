import { Subtitle } from '@/components/atoms/SubTitle';
import Title from '@/components/atoms/Title';
import { SearchX } from 'lucide-react';

export default function NotFound() {
  return (
    <div className='flex flex-col items-center'>
      <div className='w-12 h-12 border rounded-md flex items-center justify-center m-8'>
        <SearchX />
      </div>
      <Title level={4}>Nothing found</Title>
      <Subtitle>Adjust your filters or search to see results.</Subtitle>
    </div>
  );
}
