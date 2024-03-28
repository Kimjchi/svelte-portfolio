import { STRAPI_API_TOKEN } from "$env/static/private";
import { PUBLIC_STRAPI_URL } from "$env/static/public";

export async function load() {
  const url = PUBLIC_STRAPI_URL + "/api/photos?populate=photo";
  const resp = await fetch(url, {
    headers: { Authorization: `Bearer ${STRAPI_API_TOKEN}` },
  });
  const json = await resp.json();
  return json;
}
