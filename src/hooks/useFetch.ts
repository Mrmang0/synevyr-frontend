import { useEffect, useState } from "react";
import { json } from "stream/consumers";

type FetchOptions<T> = {
  onError?: (error: any) => void;
  ready?: boolean;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
};

const useFetch = <T>(
  path: string,
  callback: (response: T) => void,
  options?: FetchOptions<T>
) => {
  const [loading, setLoading] = useState(false);

  const defaultOptions: FetchOptions<T> = {
    ready: true,
    body: undefined,
    method: "GET",
    onError: (e) => console.error(e),
  };

  const { body, method, onError, ready } = { ...defaultOptions, ...options };

  useEffect(() => {
    if (!ready) return;

    const options: RequestInit = {
      headers: {
        "Content-Type": "application/json",
      },
      method,
    };

    if (method == "POST" || method == "PUT")
      options.body = JSON.stringify(body);

    setLoading(true);
    fetch(path, options)
      .then((response) => response.json())
      .then((json) => callback(json as T))
      .catch(onError)
      .finally(() => {
        setLoading(false);
      });
  }, [path, ready]);

  return [loading];
};

export default useFetch;
