import { tmdbConfig as t } from '../config/tmdb';

export async function fetchTMDB(endpoint: string, params: Record<string, string> = {}, method: string = 'GET') {
  const baseUrl = `${t.api.url}/${t.api.version}`;
  const url = new URL(`${baseUrl}/${endpoint}`);

  url.searchParams.append('api_key', t.api.key);
  url.searchParams.append('language', t.language);
  url.searchParams.append('include_adult', 'false');

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  try {
    const response = await fetch(url, {
      method,
      headers: {
        accept: 'application/json'
      }
    });

    if (response.status === 200) {
      try {
        const data = await response.json();
        return data;
      } catch {
        return undefined;
      }
    }
  } catch {
    return undefined;
  }
}