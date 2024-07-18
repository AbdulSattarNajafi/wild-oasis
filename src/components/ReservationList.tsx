"use client";

import { Booking, Bookings } from "@/lib/types";
import ReservationCard from "./ReservationCard";
import { useOptimistic } from "react";
import { deleteBooking } from "@/lib/actions";

export default function ReservationList({
  bookings,
}: {
  bookings: Bookings[];
}) {
  const [optimisticBooking, optimisticDelete] = useOptimistic(
    bookings,
    (curBooking: Bookings[], bookingId: number) => {
      return curBooking.filter((booking) => booking.id !== bookingId);
    },
  );

  async function handleDelete(bookingId: number) {
    optimisticDelete(bookingId);
    await deleteBooking(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBooking.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}
