import SelectCountry from "@/components/SelectCountry";
import UpdatePrfileForm from "@/components/UpdatePrfileForm";
import { auth } from "@/lib/auth";
import { getGuest } from "@/lib/data-service";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Update profile",
};

export default async function ProfilePage() {
  const session = await auth();

  const guest = await getGuest(session?.user?.email ?? "");

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold text-accent-400">
        Update your guest profile
      </h2>

      <p className="mb-8 text-lg text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      <UpdatePrfileForm guest={guest}>
        <SelectCountry
          name="nationality"
          id="nationality"
          className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
          defaultCountry={guest.nationality}
        />
      </UpdatePrfileForm>
    </div>
  );
}
