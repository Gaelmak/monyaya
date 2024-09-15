import { Loader } from "@/components/ui/loader";

export type LoadingProps = {};

export default function Loading(props: LoadingProps) {
  return (
    <div className="w-full h-80 flex justify-center items-center">
      <Loader />
    </div>
  );
}
