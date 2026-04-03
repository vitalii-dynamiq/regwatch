import { Subtitle } from '@/components/atoms/SubTitle';
import Title from '@/components/atoms/Title';
import { SourceCreateButton } from '@/components/organisms/Sources/SourceButtonCreate';

export const metadata = {
  title: 'Sources',
  description: 'Track compliance obligations across regulatory jurisdictions worldwide.',
};

export default async function SourcesLayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className='flex justify-between items-start'>
        <div>
          <Title level={3}>Sources</Title>
          <Subtitle>Track compliance obligations across regulatory jurisdictions worldwide.</Subtitle>
        </div>
        <SourceCreateButton />
      </div>
      {children}
    </>
  );
}
