"use client";

import { useEffect, useState } from "react";
import IPGeoInfoCard from "../IPGeoInfoCard";
import IPSearchBar from "../IPSearchBar";
import { useQuery } from "@tanstack/react-query";
import { Alert, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import { getIPInfo } from "@/lib/api/ipInfo.api";
import SearchHistorySheet from "../SearchHistorySheet";

const HomePage = () => {
  const [ipSearchValue, setIpSearchValue] = useState<string>("");

  const { data, refetch } = useQuery({
    queryKey: ["search-ip"],
    queryFn: async () => await getIPInfo(ipSearchValue),
  });

  const handleIPSearchBarSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    refetch();
  };

  const handleIPSearchBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    setIpSearchValue(value);
  };

  useEffect(() => {
    if (!ipSearchValue) {
      refetch();
    }
  }, [ipSearchValue]);

  return (
    <main className="flex h-svh min-h-fit w-full items-center justify-center p-4">
      <div className="fixed inset-0 top-0 right-0 left-0 z-100 flex h-fit w-full justify-center p-4">
        <IPSearchBar
          onSubmit={handleIPSearchBarSubmit}
          onChange={handleIPSearchBarChange}
          value={ipSearchValue}
        />
      </div>

      <section className="flex w-full flex-col items-center">
        {data?.error ? (
          <Alert
            className="flex max-w-80 items-center justify-center border-none bg-red-100"
            variant="destructive"
          >
            <AlertCircle />
            <AlertTitle>
              <p className="text-red-500">{data.error.error.message}</p>
            </AlertTitle>
          </Alert>
        ) : (
          <IPGeoInfoCard
            ip={data?.results.ip}
            country={data?.results.country}
            city={data?.results.city}
            region={data?.results.region}
            postal={data?.results.postal}
            loc={data?.results.loc}
          />
        )}
      </section>

      <div className="fixed right-0 bottom-0 p-4">
        <SearchHistorySheet />
      </div>
    </main>
  );
};

export default HomePage;
