export type AlertId = string;

export type AlertPage =
  | Partial<{
      alertId: AlertId | undefined;
    }>
  | undefined;

export type AlertPageProps = {
  params?: Promise<AlertPage>;
};
