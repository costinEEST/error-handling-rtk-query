import { LoadingOverlay, MantineProvider } from "@mantine/core";
import {
  NotificationsProvider,
  showNotification,
} from "@mantine/notifications";
import { useEffect, useState, useRef } from "react";

import type { FormEvent } from "react";

interface ErrorType {
  status: number;
  data: Object;
}
import { useGetPostQuery } from "./api";

const errorStatusMap = {
  400: "Bad Request",
  403: "Forbidden",
  404: "Not Found",
  500: "Internal Server Error",
};

type HttpStatusUnion = keyof typeof errorStatusMap;

const mapStatusToErrorMsg = (status: HttpStatusUnion) => errorStatusMap[status];

export default function App() {
  const [postId, setPostId] = useState<string | undefined>("");
  const { data, error, isLoading, isFetching } = useGetPostQuery(postId);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setPostId(inputRef.current?.value);
  };

  useEffect(() => {
    if (error) {
      showNotification({
        autoClose: 2000,
        title: (error as ErrorType)?.status,
        message: mapStatusToErrorMsg(
          (error as ErrorType)?.status as HttpStatusUnion
        ),
        color: "red",
        style: { backgroundColor: "red" },
        sx: { backgroundColor: "red" },
        loading: false,
      });
    }
  }, [error]);

  return (
    <MantineProvider
      theme={{ colorScheme: "light" }}
      withNormalizeCSS
      withGlobalStyles
    >
      <NotificationsProvider position="top-center">
        <LoadingOverlay visible={isLoading || isFetching} />
        Get the post with id={postId}
        <form onSubmit={handleSubmit}>
          <input
            disabled={isLoading || isFetching}
            type="number"
            min="1"
            step="1"
            placeholder="From 1 to 101"
            ref={inputRef}
          />
          <button type="submit" disabled={isLoading || isFetching}>
            Send
          </button>
        </form>
        <div className="card">
          <p className="title">
            id: {data?.id} <br />
            {data?.title}
          </p>
          <p className="body">{data?.body}</p>
        </div>
      </NotificationsProvider>
    </MantineProvider>
  );
}
