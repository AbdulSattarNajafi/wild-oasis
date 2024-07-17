import ReservationList from "@/components/ReservationList";
import { auth } from "@/lib/auth";
import { getBookings } from "@/lib/data-service";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reservations",
};

export default async function ReservationsPage() {
  const session = await auth();
  const bookings = await getBookings(+session?.user?.guestId);

  return (
    <div>
      <h2 className="mb-7 text-2xl font-semibold text-accent-400">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <a className="text-accent-500 underline" href="/cabins">
            luxury cabins &rarr;
          </a>
        </p>
      ) : (
        <ReservationList bookings={bookings} />
      )}
    </div>
  );
}
