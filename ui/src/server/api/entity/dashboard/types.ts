import { z } from 'zod';

// DashboardWidgets (Get/Create/Update responses share same shape in OpenAPI)
export const dashboardWidgetsSchema = z.object({
  sources_count: z.number(),
  active_sources_count: z.number(),
  obligations_count: z.number(),
  resolved_obligations_count: z.number(),
});

export type DashboardWidgets = z.infer<typeof dashboardWidgetsSchema>;
export type DashboardWidgetsCreateDto = {};
export type DashboardWidgetsUpdateDto = {};
export type DashboardWidgetsPatchDto = {};
