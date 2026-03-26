import React from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: string | React.ReactNode;
  children?: React.ReactNode; // Qo'shimcha tugmalar uchun
}

export const EmptyState = ({
  title,
  description,
  icon = "📦",
  children,
}: EmptyStateProps) => {
  return (
    <section className="min-h-[50vh] flex flex-col items-center justify-center bg-white p-8 text-center w-full">
      <div className="text-6xl mb-4 leading-none">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 leading-snug">
        {title}
      </h3>
      {description && (
        <p className="text-gray-500 mt-2 max-w-sm mx-auto">{description}</p>
      )}
      <div className="mt-6">{children}</div>
    </section>
  );
};
