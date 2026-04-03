import { Subtitle } from '@/components/atoms/SubTitle';
import Title from '@/components/atoms/Title';
import { ObligationWidgetTable } from '@/components/organisms/Obligations/ObligationWidgetTable';

export default function DashboardPage() {
  return (
    <>
      <Title level={5}>Obligations To Review</Title>
      <Subtitle>
        Monitor key obligations that are pending, overdue, or require immediate attention to maintain compliance.
      </Subtitle>
      <ObligationWidgetTable />
    </>
  );
}
