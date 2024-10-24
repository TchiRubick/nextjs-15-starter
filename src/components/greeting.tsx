"use client";

import { greeting } from "@/actions/greeting";
import { useQuery } from "@tanstack/react-query";

export const Greeting = () => {
  const { data, isError, error } = useQuery({
    queryKey: ["greeting"],
    queryFn: () => greeting("TCHI"),
  });

  if (isError) return <div>Error: {error.message}</div>;

  return <div>Hello {data?.type}</div>;
};
