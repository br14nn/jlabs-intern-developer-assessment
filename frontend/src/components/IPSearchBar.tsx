"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface IPSearchBarProps {
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
}

const IPSearchBar = ({ onSubmit, onChange, value }: IPSearchBarProps) => {
  return (
    <form
      className="flex w-full max-w-80 flex-col gap-2 md:max-w-140 md:flex-row"
      onSubmit={onSubmit}
    >
      <Input
        className="h-10 bg-white selection:bg-neutral-600 focus-visible:ring-0"
        type="text"
        placeholder="Input IP Address"
        onChange={onChange}
        value={value}
      />
      <Button variant="secondary" size="lg">
        Enter IP
      </Button>
    </form>
  );
};

export default IPSearchBar;
