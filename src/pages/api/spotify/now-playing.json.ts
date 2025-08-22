// src/pages/api/spotify/now-playing.json.ts
import type { APIRoute } from "astro";

const {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REFRESH_TOKEN,
} = import.meta.env;

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const NOW_URL = "https://api.spotify.com/v1/me/player/currently-playing";

async function getAccessToken() {
  const basic = Buffer.from(
    `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");

  const r = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: SPOTIFY_REFRESH_TOKEN!,
    }),
  });

  if (!r.ok) throw new Error("token refresh failed");
  const json = await r.json();
  return json.access_token as string;
}

export const GET: APIRoute = async () => {
  try {
    const access = await getAccessToken();
    const res = await fetch(NOW_URL, {
      headers: { Authorization: `Bearer ${access}` },
    });

    // 204 = not playing
    if (res.status === 204) {
      return new Response(JSON.stringify({ playing: false }), {
        headers: { "Content-Type": "application/json", "Cache-Control": "public, s-maxage=10" },
      });
    }

    const data = await res.json();
    const item = data?.item;

    return new Response(
      JSON.stringify({
        playing: !!data?.is_playing,
        id: item?.id,
        title: item?.name,
        artist: item?.artists?.map((a: any) => a.name).join(", "),
        url: item?.external_urls?.spotify,
        albumImageUrl: item?.album?.images?.[0]?.url,
        progressMs: data?.progress_ms,
        durationMs: item?.duration_ms,
      }),
      { headers: { "Content-Type": "application/json", "Cache-Control": "public, s-maxage=10" } }
    );
  } catch {
    return new Response(JSON.stringify({ playing: false }), {
      headers: { "Content-Type": "application/json", "Cache-Control": "public, s-maxage=60" },
    });
  }
};

// If your project uses output: 'hybrid', ensure this endpoint stays dynamic:
export const prerender = false;
