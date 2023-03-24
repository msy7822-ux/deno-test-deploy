import { serve } from "https://deno.land/std@0.157.0/http/server.ts";

const handler = async (req: Request): Promise<Response> => {
  const requestUrl = new URL(req.url);
  const pokemonNumber = requestUrl.searchParams.get("number");

  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}/`;

  const res = await fetch(url, {
    headers: {
      accept: "application/json",
    },
  });

  let body = `<p>Not Found. number: ${pokemonNumber}`;
  if (res.status === 200) {
    const json = await res.json();
    body = `
      <p>Id: ${json["id"]}</p>
      <p>Name: ${json["name"]}</p>
      <img src="${json["sprites"]["front_default"]}" alt="${json["name"]}">
    `;
  }

  return new Response(body, {
    status: res.status,
    headers: {
      "content-type": "text/html",
    },
  });
};

serve(handler);
