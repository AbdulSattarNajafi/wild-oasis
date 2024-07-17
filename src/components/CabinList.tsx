import { unstable_noStore } from "next/cache";
import CabinCard from "./CabinCard";
import { getCabins } from "@/lib/data-service";

export default async function CabinList({ filter }: { filter: string }) {
  // Disable caching
  unstable_noStore();

  const cabins = await getCabins();

  if (!cabins.length) return null;

  let filteredCabins;

  if (filter === "all") {
    filteredCabins = cabins;
  }
  if (filter === "small") {
    filteredCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  }
  if (filter === "medium") {
    filteredCabins = cabins.filter(
      (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7,
    );
  }
  if (filter === "large") {
    filteredCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);
  }

  return (
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:gap-12 xl:gap-14">
      {filteredCabins?.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
