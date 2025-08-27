export function LoadingState({ type = "spinner" }) {
  if (type === "skeleton") {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-12 bg-neutral-200 dark:bg-neutral-800 rounded-md"></div>
        <div className="h-64 bg-neutral-200 dark:bg-neutral-800 rounded-md"></div>
        <div className="h-8 bg-neutral-200 dark:bg-neutral-800 rounded-md w-2/3"></div>
      </div>
    );
  }
  
  return (
    <div className="flex items-center justify-center h-32">
      <div className="relative h-12 w-12">
        <div className="absolute animate-ping h-full w-full rounded-full bg-neutral-400 dark:bg-neutral-600 opacity-75"></div>
        <div className="relative rounded-full h-12 w-12 bg-neutral-500 dark:bg-neutral-500"></div>
      </div>
    </div>
  );
}