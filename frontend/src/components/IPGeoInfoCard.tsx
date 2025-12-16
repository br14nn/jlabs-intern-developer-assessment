"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getIPInfo } from "@/lib/api/ipInfo.api";
import { useEffect } from "react";
import { Separator } from "@radix-ui/react-separator";
import { Alert, AlertTitle } from "./ui/alert";
import { AlertCircle } from "lucide-react";

interface IPGeoInfoCardProps {
  country?: string;
  ip?: string;
  postal?: string;
  city?: string;
  region?: string;
  loc?: string;
}

const IPGeoInfoCard = ({
  country,
  ip,
  postal,
  city,
  region,
  loc,
}: IPGeoInfoCardProps) => {
  const { data, refetch } = useQuery({
    queryKey: ["default-ip"],
    queryFn: async () => await getIPInfo(ip),
  });

  useEffect(() => {
    refetch();
  }, [ip]);

  if (data?.error) {
    return (
      <Alert
        className="flex max-w-80 items-center justify-center border-none bg-red-100"
        variant="destructive"
      >
        <AlertCircle />
        <AlertTitle>
          <p className="text-red-500">{data.error.error.message}</p>
        </AlertTitle>
      </Alert>
    );
  }

  return (
    <Card className="w-full max-w-80 md:max-w-100">
      <CardHeader>
        <CardTitle className="flex flex-col items-center">
          <Image
            className="h-15 w-20"
            src={`https://flagcdn.com/80x60/${country ? country.toLowerCase() : data?.results.country.toLowerCase()}.png`}
            width="80"
            height="60"
            alt="PH flag"
          />
          <p className="text-center text-xl font-bold">
            {country ? country : data?.results.country}
          </p>
        </CardTitle>
        <CardDescription className="grid grid-cols-2">
          <div>
            <p className="text-center">
              IP{": "}
              <span className="text-green-500">
                {ip ? ip : data?.results.ip}
              </span>
            </p>
          </div>
          <div>
            <p className="text-center">
              Postal{": "}
              <span className="text-blue-500">
                {postal ? postal : data?.results.postal}
              </span>
            </p>
          </div>
        </CardDescription>
      </CardHeader>
      <Separator className="mx-auto h-px w-9/10 bg-black" />
      <CardContent className="">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2">
            <div className="flex flex-col items-center">
              <p className="text-sm text-neutral-500">City</p>
              <p className="text-lg font-medium">
                {city ? city : data?.results.city}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm text-neutral-500">Region</p>
              <p className="text-center text-lg font-medium">
                {region ? region : data?.results.region}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="flex flex-col items-center">
              <p className="text-sm text-neutral-500">Latitude</p>
              <p className="text-lg font-medium">
                {loc ? loc?.split(",")[0] : data?.results.loc.split(",")[0]}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm text-neutral-500">Longitude</p>
              <p
                className="text-center text-lg font-medium"
                title="Davao Region"
              >
                {loc ? loc?.split(",")[1] : data?.results.loc.split(",")[1]}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IPGeoInfoCard;
