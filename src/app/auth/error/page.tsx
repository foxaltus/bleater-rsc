export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
  const params = await searchParams;

  return (
    <section>
      <h1> Sorry, something went wrong.</h1>
      {params?.error ? (
        <p>Code error: {params.error}</p>
      ) : (
        <p>An unspecified error occurred.</p>
      )}
    </section>
  );
}
