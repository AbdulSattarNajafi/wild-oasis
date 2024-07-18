"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { redirect } from "next/navigation";
import { getBookings } from "./data-service";
import { Session } from "./types";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateGuest(formData: FormData) {
  const session: Session | null = await auth();

  if (!session) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID")?.toString();
  const [nationality, countryFlag] =
    formData.get("nationality")?.toString().split("%") ?? [];

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID ?? ""))
    throw new Error("Please provide a valid national ID");

  const updatedData = { nationalID, nationality, countryFlag };

  const { data, error } = await supabase
    .from("guests")
    .update(updatedData)
    .eq("id", session.user?.guestId);

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile");
}

export async function deleteBooking(id: number) {
  const session: Session | null = await auth();

  if (!session) throw new Error("You must be logged in");

  const guestBooking = await getBookings(Number(session.user?.guestId));
  const guestBookingIds = guestBooking.map((booking) => booking.id);

  if (!guestBookingIds.includes(id)) {
    throw new Error("You are not allowed to delete this booking");
  }

  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    throw new Error("Booking could not be deleted");
  }

  revalidatePath("/account/reservations");
}

export async function updateBooking(formData: FormData) {
  const id = Number(formData.get("id"));

  const session: Session | null = await auth();
  if (!session) throw new Error("You must be logged in");

  const guestBooking = await getBookings(Number(session.user?.guestId));
  const guestBookingIds = guestBooking.map((booking) => booking.id);

  if (!guestBookingIds.includes(id)) {
    throw new Error("You are not allowed to update this booking");
  }

  const updatedFields = {
    observations: formData.get("observations")?.slice(0, 1000),
    numGuests: Number(formData.get("numGuests")),
  };

  const { error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error("Booking could not be updated");
  }

  // Revalidate should happen before Redirect
  revalidatePath("/account", "layout");
  redirect("/account/reservations");
}

type bookingDataType = {
  startDate: Date;
  endDate: Date;
  numNights: number;
  cabinPrice: number;
  cabinId: number;
};

export async function createBooking(
  bookingData: bookingDataType,
  formData: FormData,
) {
  const session: Session | null = await auth();
  if (!session) throw new Error("You must be logged in");

  const newBooking = {
    ...bookingData,
    guestId: session.user?.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations")?.slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) {
    throw new Error("Booking could not be created");
  }

  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/cabins/thankyou");
}
