const SearchParams = {
  alertId: 'alert_id',
  alertType: 'alert_type',
  assignedTo: 'assigned_to',
  contentTypeIn: 'content_type__in',
  isRegulatory: 'is_regulatory',
  jurisdictionName: 'jurisdiction__in',
  monitoringEnabled: 'monitoring_enabled',
  monitoringFrequency: 'monitoring_frequency',
  obligationId: 'obligation_id',
  obligationType: 'obligation_type',
  orderBy: 'order_by',
  page: 'page',
  pageSize: 'size',
  riskLevel: 'risk_level',
  search: 'search',
  sourceId: 'source_id',
  sourceIn: 'source__in',
  status: 'status',
};

export type QueryValue = string | number | (string | number)[] | null | undefined;
export type SearchParamsKeys = keyof typeof SearchParams;
export type SearchParamsQuery = Partial<Record<SearchParamsKeys, QueryValue>>;

export default SearchParams;
