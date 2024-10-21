export type NotFoundProps = {};

export default function NotFound(props: NotFoundProps) {
  return (
    <div className="flex flex-col justify-center items-center h-80">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="text-md">Cours trouvée</p>
    </div>
  );
}
