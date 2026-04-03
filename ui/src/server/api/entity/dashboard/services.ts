import Repository from '@/server/api/entity/dashboard/repository';
import { type DashboardWidgets, dashboardWidgetsSchema } from '@/server/api/entity/dashboard/types';

const repo = new Repository();

export const fetchDashboardWidgets = async (): Promise<DashboardWidgets> => {
  const data = await repo.getAll();

  return dashboardWidgetsSchema.parse(data);
};
