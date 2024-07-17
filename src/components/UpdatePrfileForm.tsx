"use client";

import { updateGuest } from "@/lib/actions";
import Image from "next/image";
import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

type UpdatePrfileFormProps = {
  children: ReactNode;
  guest: {
    id: number;
    created_at: Date;
    fullName: string;
    email: string;
    nationalID?: string;
    nationality?: string;
    countryFlag?: string;
  };
};

export default function UpdatePrfileForm({
  children,
  guest,
}: UpdatePrfileFormProps) {
  return (
    <form
      action={updateGuest}
      className="flex flex-col gap-6 bg-primary-900 px-12 py-8 text-lg"
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          disabled
          defaultValue={guest.fullName}
          name="fullName"
          className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          disabled
          name="email"
          defaultValue={guest.email}
          className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          {guest.countryFlag && (
            <Image
              width={20}
              height={20}
              src={guest.countryFlag}
              alt="Country flag"
              className="h-5 rounded-sm"
            />
          )}
        </div>

        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          name="nationalID"
          defaultValue={guest.nationalID}
          className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
        />
      </div>

      <div className="flex items-center justify-end gap-6">
        <SubmitButton />
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="bg-accent-500 px-8 py-4 font-semibold text-primary-800 transition-all hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
    >
      {pending ? "Updating..." : "Update profile"}
    </button>
  );
}
