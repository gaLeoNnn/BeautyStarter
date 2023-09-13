import { useState, useCallback } from "react";

type HTTPRequest = "GET" | "POST" | "PATCH" | "DELETE";

interface IHeaders {
  [key: string]: string;
}

interface IRequestConfig {
  url: string;
  method?: HTTPRequest;
  body?: null | string;
  headers?: IHeaders;
}

export const useHttp = () => {
  const [loadingStatus, setLoadingStatus] = useState("idle");

  const request = useCallback(
    async ({ url, method = "GET", body = null, headers = { "Content-Type": "application/json" } }: IRequestConfig) => {
      setLoadingStatus("loading");
      try {
        const res = await fetch(url, { method, body, headers });

        if (!res.ok) {
          throw new Error(`Could not fetch this ${url}`);
        }

        const data = await res.json();
        setLoadingStatus("idle");
        return data;
      } catch (e) {
        setLoadingStatus("error");
        throw e;
      }
    },
    []
  );

  return { request, loadingStatus };
};
