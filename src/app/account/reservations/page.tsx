import ReservationList from "@/components/ReservationList";
import { auth } from "@/lib/auth";
import { getBookings } from "@/lib/data-service";
import { Booking, Bookings, Session } from "@/lib/types";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reservations",
};

export default async function ReservationsPage() {
  const session: Session | null = await auth();
  const bookings: Bookings[] = await getBookings(
    Number(session?.user?.guestId),
  );

  // console.log(bookings);

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
