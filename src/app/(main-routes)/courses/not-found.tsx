import { Button } from "@/components/ui/button";
import Link from "next/link";

export type NotFoundProps = {};

export default function NotFound(props: NotFoundProps) {
  return (
    <div className="w-full h-[50dvh] flex flex-col justify-center items-center">
      <h1 className="text-xl md:text-3xl font-semibold">404</h1>
      <p className="font-semibold">Non trouvé</p>
      <p className="text-sm">Le course n&apos;existe pas ou a été supprimer</p>
      <Button className="mt-2" asChild>
        <Link href="/courses">Page des cours</Link>
      </Button>
    </div>
  );
}
