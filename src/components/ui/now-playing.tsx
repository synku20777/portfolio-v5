import * as React from "react";

type NowPlaying = {
  playing: boolean;
  id?: string;
  title?: string;
  artist?: string;
  url?: string;
  albumImageUrl?: string;
  progressMs?: number;
  durationMs?: number;
};

export default function NowPlaying() {
  const [np, setNp] = React.useState<NowPlaying | null>(null);

  React.useEffect(() => {
    let alive = true;
    const load = async () => {
      const res = await fetch("/api/spotify/now-playing.json");
      const json = await res.json();
      if (alive) setNp(json);
    };
    load();
    const t = setInterval(load, 15000);
    return () => { alive = false; clearInterval(t); };
  }, []);

  if (!np) return <div className="h-20 w-full animate-pulse rounded-xl bg-neutral-100 dark:bg-neutral-800" />;

  if (!np.playing) {
    return (
      <div className="flex items-center gap-3 rounded-xl border p-3">
        <div className="h-14 w-14 rounded-md bg-neutral-200 dark:bg-neutral-800" />
        <div className="text-sm text-neutral-500">Not playing right now</div>
      </div>
    );
  }

  const pct = np.progressMs && np.durationMs ? (np.progressMs / np.durationMs) * 100 : 0;

  return (
    <a href={np.url} target="_blank" rel="noreferrer"
       className="group block rounded-xl border p-3 hover:bg-neutral-50 dark:hover:bg-neutral-900">
      <div className="flex items-center gap-3">
        {np.albumImageUrl && <img src={np.albumImageUrl} alt=""
          className="h-14 w-14 rounded-md" loading="lazy" />}
        <div className="min-w-0">
          <div className="truncate text-sm font-medium">{np.title}</div>
          <div className="truncate text-xs text-neutral-500">{np.artist}</div>
        </div>
      </div>
      <div className="mt-2 h-1 w-full rounded bg-neutral-200 dark:bg-neutral-800">
        <div className="h-1 rounded bg-neutral-800 dark:bg-neutral-200" style={{ width: `${pct}%` }} />
      </div>
    </a>
  );
}
