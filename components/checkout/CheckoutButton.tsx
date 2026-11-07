"use client";

import { type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname, getUiLabels } from "@/lib/i18n/uiLabels";

type CheckoutButtonProps = {
  className?: string;
  children?: ReactNode;
};

export default function CheckoutButton({
  className = "",
  children,
}: CheckoutButtonProps) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const labels = getUiLabels(locale).commerce.cart;

  return (
    <>
      <button type="button" disabled aria-disabled="true" className={className}>
        <span className="inline-flex items-center justify-center">
          <span>{children ?? labels.checkout}</span>
        </span>
      </button>

      <p className="font-garamond mt-3 text-center text-sm leading-relaxed text-neutral-600">
        {labels.checkoutDisabledMessage}
      </p>
    </>
  );
}
