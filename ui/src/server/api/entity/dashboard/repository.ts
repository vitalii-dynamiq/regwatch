import BaseRepository from '@/lib/repositories/baseRepository';
import type {
  DashboardWidgets,
  DashboardWidgetsCreateDto,
  DashboardWidgetsPatchDto,
  DashboardWidgetsUpdateDto,
} from '@/server/api/entity/dashboard/types';

export default class Repository extends BaseRepository<
  DashboardWidgets,
  DashboardWidgetsCreateDto,
  DashboardWidgetsUpdateDto,
  DashboardWidgetsPatchDto
> {
  protected endpoint: string = '/v1/dashboard/widgets';
}
