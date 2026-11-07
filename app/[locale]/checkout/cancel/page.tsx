import { redirect } from "next/navigation";
import type { Locale } from "@/i18n-config";

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function CancelPage({ params }: PageProps) {
  const { locale } = await params;
  redirect(`/${locale}/bag`);
}
