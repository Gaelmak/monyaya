import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import { userAuth } from "@/lib/helper";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default async function MyTrainingsPage() {
  const user = await userAuth();

  return (
    <main className="w-full min-h-[100dvh] pt-24 md:pt-0 pb-8 flex flex-col p-4">
      <Container className="w-full h-full py-4 md:py-10 flex flex-col gap-4 rounded">
        <Typography variant="title-base" component="h3">
          Mes formations
        </Typography>
        {/* <DataTable columns={columns} data={data} /> */}
      </Container>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Skeleton className="w-full h-20 rounded-sm bg-gray-100 shadow-sm" />
        <Skeleton className="w-full h-20 rounded-sm bg-gray-100 shadow-sm" />
        <Skeleton className="w-full h-20 rounded-sm bg-gray-100 shadow-sm" />
      </div>
    </main>
  );
}
