export default async function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full min-h-[100dvh] pt-20 md:pt-4 pb-8 flex flex-col p-4">
      {children}
    </main>
  );
}
