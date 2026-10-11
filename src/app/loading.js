const Loading = () => {
  return (
    <main className="container max-auto m-2 p-5">
      <div className="h-48 animate-pulse rounded-2xl bg-gray-200" />
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-40 animate-pulse rounded-lg bg-gray-200" />
        ))}
      </div>
    </main>
  );
};

export default Loading;
