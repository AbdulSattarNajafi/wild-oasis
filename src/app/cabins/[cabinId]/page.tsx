import type { Metadata, ResolvingMetadata } from "next";

import Cabin from "@/components/Cabin";
import Reservation from "@/components/Reservation";
import Spinner from "@/components/Spinner";
import { getCabin, getCabins } from "@/lib/data-service";
import { Suspense } from "react";

export async function generateMetadata(
  { params }: { params: { cabinId: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { name } = await getCabin(+params.cabinId);

  return {
    title: `Cabin ${name}`,
  };
}

// Dynamic to Static
export async function generateStaticParams() {
  const cabins = await getCabins();

  return cabins.map((cabin) => ({
    cabinId: String(cabin.id),
  }));
}

export default async function CabinDetailPage({
  params,
}: {
  params: { cabinId: string };
}) {
  const cabin = await getCabin(+params.cabinId);

  return (
    <div className="mx-auto mt-8 max-w-6xl">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="mb-10 text-center text-5xl font-semibold text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
