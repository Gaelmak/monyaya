import { Loader } from "@/components/ui/loader";

export type LoadingProps = {};

export default function Loading(props: LoadingProps) {
  return (
    <div className="h-20 w-full flex justify-center items-center">
      <Loader />
    </div>
  );
}
