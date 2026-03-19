export default function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="rounded-2xl bg-gray-200 aspect-[3/4]" />
      <div className="mt-3 px-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-2/4" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/3" />
      </div>
    </div>
  );
}
