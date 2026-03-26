"use client";

import { useClientTranslation } from "@/shared/i18n";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function OrderSuccessPage() {
  const { t, isMounted } = useClientTranslation("common");

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {t("orderSuccess.title")}
        </h1>
        <p className="text-gray-400 text-sm mb-8">
          {t("orderSuccess.description")}
        </p>

        <Link
          href="/products"
          className="block w-full bg-[#173F5F] hover:bg-[#0f2d45] text-white font-semibold text-sm py-3.5 rounded-xl transition-colors"
        >
          {t("orderSuccess.continueShopping")}
        </Link>
      </div>
    </div>
  );
}
