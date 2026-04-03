export type ObligationId = string;

export type ObligationPage =
  | Partial<{
      obligationId: ObligationId | undefined;
    }>
  | undefined;

export type ObligationPageProps = {
  params?: Promise<ObligationPage>;
};
