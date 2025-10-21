import "server-only";

import { cache } from "react";

const INSTAGRAM_API_BASE = "https://graph.instagram.com";
const DEFAULT_LIMIT = 9;

interface InstagramApiMedia {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM" | string;
  media_url?: string;
  permalink: string;
  thumbnail_url?: string;
  timestamp: string;
  username?: string;
}

interface InstagramApiResponse {
  data?: InstagramApiMedia[];
  paging?: {
    cursors?: {
      before?: string;
      after?: string;
    };
  };
  error?: {
    message?: string;
    type?: string;
    code?: number;
  };
}

export interface InstagramPost {
  id: string;
  caption: string | null;
  captionPreview: string;
  mediaUrl: string;
  permalink: string;
  timestamp: string;
  alt: string | null;
  username: string | null;
}

export interface InstagramPostsResult {
  posts: InstagramPost[];
  error?: string;
}

function buildRequestUrl(accessToken: string, limit: number) {
  const url = new URL(`${INSTAGRAM_API_BASE}/me/media`);
  url.searchParams.set(
    "fields",
    "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username",
  );
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("access_token", accessToken);
  return url.toString();
}

function createCaptionPreview(caption?: string | null) {
  if (!caption) {
    return "Instagram příspěvek";
  }
  const normalized = caption.trim().replace(/\s+/g, " ");
  if (normalized.length <= 80) {
    return normalized;
  }
  return `${normalized.slice(0, 77)}...`;
}

function normaliseMedia(media: InstagramApiMedia): InstagramPost | null {
  const mediaUrl = media.media_url ?? media.thumbnail_url;
  if (!mediaUrl) {
    return null;
  }

  return {
    id: media.id,
    caption: media.caption ?? null,
    captionPreview: createCaptionPreview(media.caption),
    mediaUrl,
    permalink: media.permalink,
    timestamp: media.timestamp,
    alt: media.caption ? createCaptionPreview(media.caption) : null,
    username: media.username ?? null,
  };
}

const loadInstagramPosts = cache(async (): Promise<InstagramPostsResult> => {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!accessToken) {
    return {
      posts: [],
      error:
        "INSTAGRAM_ACCESS_TOKEN není nastaven. Přidejte přístupový token Instagram Graph API.",
    };
  }

  try {
    const response = await fetch(buildRequestUrl(accessToken, DEFAULT_LIMIT), {
      next: {
        revalidate: 60 * 30,
      },
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Instagram API odpovědělo s kódem ${response.status}: ${body}`);
    }

    const payload = (await response.json()) as InstagramApiResponse;

    if (payload.error) {
      throw new Error(payload.error.message ?? "Neznámá chyba Instagram API");
    }

    const posts = (payload.data ?? [])
      .map(normaliseMedia)
      .filter((post): post is InstagramPost => Boolean(post));

    return {
      posts,
    };
  } catch (error) {
    return {
      posts: [],
      error: error instanceof Error ? error.message : "Nepodařilo se načíst Instagram příspěvky.",
    };
  }
});

export async function getInstagramPosts(): Promise<InstagramPostsResult> {
  return loadInstagramPosts();
}
