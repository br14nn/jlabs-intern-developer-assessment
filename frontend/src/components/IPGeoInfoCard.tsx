import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";

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
  return (
    <Card className="w-full max-w-80 md:max-w-100">
      <CardHeader>
        <CardTitle className="flex flex-col items-center">
          <Image
            className="h-15 w-20"
            src={`https://flagcdn.com/80x60/${country?.toLowerCase()}.png`}
            width="80"
            height="60"
            alt="PH flag"
          />
          <p className="text-center text-xl font-bold">{country}</p>
        </CardTitle>
        <CardDescription className="grid grid-cols-2">
          <div>
            <p className="text-center">
              IP{": "}
              <span className="text-green-500">{ip}</span>
            </p>
          </div>
          <div>
            <p className="text-center">
              Postal{": "}
              <span className="text-blue-500">{postal}</span>
            </p>
          </div>
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2">
            <div className="flex flex-col items-center">
              <p className="text-sm text-neutral-500">City</p>
              <p className="text-center text-lg font-medium">{city}</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm text-neutral-500">Region</p>
              <p className="text-center text-lg font-medium">{region}</p>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="flex flex-col items-center">
              <p className="text-sm text-neutral-500">Latitude</p>
              <p className="text-lg font-medium">{loc?.split(",")[0]}</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm text-neutral-500">Longitude</p>
              <p
                className="text-center text-lg font-medium"
                title="Davao Region"
              >
                {loc?.split(",")[1]}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IPGeoInfoCard;
