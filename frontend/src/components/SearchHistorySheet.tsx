"use client";

import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const SearchHistorySheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="cursor-pointer bg-blue-500 hover:bg-blue-700">
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

        <div className="flex flex-col">
          <Separator />
          <div className="px-4 py-2">
            <p className="text-center text-white">Hello World</p>
          </div>
          <Separator />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SearchHistorySheet;
