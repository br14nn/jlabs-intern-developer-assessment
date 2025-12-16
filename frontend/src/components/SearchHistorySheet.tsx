"use client";

import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { getSearchHistory } from "@/lib/api/search-history.api";

const SearchHistorySheet = () => {
  const { data, refetch } = useQuery({
    queryKey: ["search-history"],
    queryFn: async () => await getSearchHistory(),
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="cursor-pointer bg-blue-500 hover:bg-blue-700"
          onClick={() => refetch()}
        >
          History
        </Button>
      </SheetTrigger>
      <SheetContent
        className="z-200 border-none bg-blue-500"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <SheetHeader>
          <SheetTitle>
            <p className="font-bold text-white">Search History</p>
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col-reverse">
          {data?.results.map((history: any, index: number) => (
            <div key={`${history.id}-${index}`}>
              <div className="px-4 py-2">
                <p className="text-center text-white">{history.ip_address}</p>
              </div>
              <Separator />
            </div>
          ))}
          <Separator />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SearchHistorySheet;
