import { Buttons } from "@/ui/components/buttons/buttons";
import Link from "next/link";

export type PageProps = {
  params: { id: string };
};

export default function Page(props: PageProps) {
  const id = props.params.id;
  const editUrl = `/my-courses/${id}/edit`;
  return (
    <div className="flex flex-col gap-4 p-4">
      <div>Hello</div>

      <Link href={editUrl}>
        <Buttons>Editer</Buttons>
      </Link>
    </div>
  );
}
