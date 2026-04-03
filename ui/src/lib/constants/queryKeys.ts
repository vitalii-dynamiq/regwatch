const QUERY_KEYS = {
  alertAssets: 'alertAssets',
  alert: 'alert',
  alerts: 'alerts',
  users: 'users',
  user: 'user',
  me: 'me',
  sources: 'sources',
  source: 'source',
  sourceAssets: 'sourceAssets',
  sourcePages: 'sourcePages',
  obligations: 'obligations',
  obligation: 'obligation',
  obligationAssets: 'obligationAssets',
  dashboardWidgets: 'dashboardWidgets',
};

export type QueryKeys = keyof typeof QUERY_KEYS;

export default QUERY_KEYS;
