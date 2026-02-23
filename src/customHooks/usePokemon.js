import { useEffect, useState } from "react";

export const pokemonCache = new Map();

export default function usePokemon(name) {

  const key = String(name).toLowerCase();

  const [data, setData] = useState(pokemonCache.get(key) || null);
  const [loading, setLoading] = useState(!pokemonCache.has(key));

  useEffect(() => {
    if (!key) return;

    if (pokemonCache.has(key)) {
      setData(pokemonCache.get(key));
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    setLoading(true);

    fetch(`https://pokeapi.co/api/v2/pokemon/${key}`, {
      signal: controller.signal
    })
      .then(res => {
        if(!res.ok) throw new Error("Pokemon not found")
        return res.json()
      })
      .then(json => {
        pokemonCache.set(key,json);
        pokemonCache.set(String(json.id),json)

        setData(json);
        setLoading(false);
      })
      .catch(err => {
        if (err.name !== "AbortError") {
          console.error(err);
          setLoading(false);
          setData(null)
        }
      });

    return () => controller.abort();
  }, [key]);

  return { data, loading };
}