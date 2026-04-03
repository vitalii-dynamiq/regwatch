export default async function SourcesLayoutPage({
  children,
  title,
  check_frequency,
  monitored_pages,
  detected_alerts,
  new_obligations,
}: {
  children: React.ReactNode;
  title: React.ReactNode;
  check_frequency: React.ReactNode;
  monitored_pages: React.ReactNode;
  detected_alerts: React.ReactNode;
  new_obligations: React.ReactNode;
}) {
  return (
    <>
      {title}
      {check_frequency}
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-3 my-4 md:mt-8'>
        {monitored_pages}
        {detected_alerts}
        {new_obligations}
      </div>
      {children}
    </>
  );
}
