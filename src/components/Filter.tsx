"use client";

import { cn } from "@/lib/helpers";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter: string) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex border border-primary-800">
      <Button
        filter="all"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        All cabins
      </Button>
      <Button
        filter="small"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        1&mdash;3 guests
      </Button>
      <Button
        filter="medium"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        4&mdash;7 guests
      </Button>
      <Button
        filter="large"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        8&mdash;12 guests
      </Button>
    </div>
  );
}

type ButtonProps = {
  children: React.ReactNode;
  handleFilter: (filter: string) => void;
  filter: string;
  activeFilter: string;
};

function Button({ children, filter, handleFilter, activeFilter }: ButtonProps) {
  return (
    <button
      className={cn(
        "px-5 py-2 hover:bg-primary-700",
        activeFilter === filter && "bg-primary-700 text-primary-50",
      )}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}
