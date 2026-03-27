"use client";

import { useState } from "react";
import { useClientTranslation } from "@/shared/i18n";
import { useTranslation } from "react-i18next";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Loader2,
  CheckCircle,
  Instagram,
  Facebook,
} from "lucide-react";

const PHONE = "+998 (90) 123-45-67";
const EMAIL = "info@engineeringpro.uz";
const ADDRESS_UZ = "Toshkent, Amir Temur ko'chasi, 45";
const ADDRESS_RU = "Ташкент, ул. Амира Темура, 45";

interface FormData {
  name: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  message?: string;
}

export default function ContactsPage() {
  const { t, isMounted } = useClientTranslation("common");
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) {
      newErrors.name = t("contact.validation.nameRequired");
    }

    if (!form.phone.trim()) {
      newErrors.phone = t("contact.validation.phoneRequired");
    } else if (!/^\+?[\d\s\-()]{10,}$/.test(form.phone.trim())) {
      newErrors.phone = t("contact.validation.phoneInvalid");
    }

    if (!form.message.trim()) {
      newErrors.message = t("contact.validation.messageRequired");
    } else if (form.message.trim().length < 10) {
      newErrors.message = t("contact.validation.messageMinLength");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate sending — replace with real API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    setForm({ name: "", phone: "", subject: "", message: "" });
  };

  if (!isMounted) {
    return (
      <main className="min-h-screen bg-white">
        <div className="animate-pulse">
          <div className="h-[320px] bg-gray-100" />
          <div className="container mx-auto px-4 py-16 space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
            <div className="grid md:grid-cols-2 gap-12 mt-8">
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-20 bg-gray-100 rounded-xl" />
                ))}
              </div>
              <div className="h-96 bg-gray-100 rounded-2xl" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white font-sans text-gray-900">
      {/* Hero */}
      <section className="bg-[#173F5F] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
              {t("contact.heroTitle")}{" "}
              <span className="text-red-400">{t("contact.heroAccent")}</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              {t("contact.heroDescription")}
            </p>
          </div>
        </div>
      </section>

      {/* Info + Form */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left — Contact Info */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              {t("contact.infoTitle")}
            </h2>

            <div className="space-y-5">
              <a
                href={`tel:${PHONE.replace(/[^\d+]/g, "")}`}
                className="flex items-start gap-4 p-5 rounded-xl border border-gray-100 hover:border-[#173F5F]/20 hover:bg-blue-50/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#173F5F]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#173F5F] transition-colors">
                  <Phone className="w-5 h-5 text-[#173F5F] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">
                    {t("contact.phone")}
                  </p>
                  <p className="font-semibold text-gray-900">{PHONE}</p>
                </div>
              </a>

              <a
                href={`mailto:${EMAIL}`}
                className="flex items-start gap-4 p-5 rounded-xl border border-gray-100 hover:border-[#173F5F]/20 hover:bg-blue-50/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#173F5F]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#173F5F] transition-colors">
                  <Mail className="w-5 h-5 text-[#173F5F] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">
                    {t("contact.email")}
                  </p>
                  <p className="font-semibold text-gray-900">{EMAIL}</p>
                </div>
              </a>

              <div className="flex items-start gap-4 p-5 rounded-xl border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-[#173F5F]/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#173F5F]" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">
                    {t("contact.address")}
                  </p>
                  <p className="font-semibold text-gray-900">
                    {lang === "ru" ? ADDRESS_RU : ADDRESS_UZ}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-xl border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-[#173F5F]/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#173F5F]" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">
                    {t("contact.workingHours")}
                  </p>
                  <p className="font-semibold text-gray-900">
                    {t("contact.workingHoursValue")}
                  </p>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="mt-8">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
                {t("contact.social")}
              </p>
              <div className="flex gap-3">
                {[
                  { icon: Instagram, href: "#", label: "Instagram" },
                  { icon: Send, href: "#", label: "Telegram" },
                  { icon: Facebook, href: "#", label: "Facebook" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-11 h-11 rounded-xl bg-gray-100 hover:bg-[#173F5F] flex items-center justify-center text-gray-500 hover:text-white transition-all"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div>
            <div className="bg-gray-50 rounded-2xl p-6 md:p-10">
              <h2 className="text-2xl font-bold mb-2">
                {t("contact.formTitle")}
              </h2>
              <p className="text-gray-500 text-sm mb-8">
                {t("contact.formDescription")}
              </p>

              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-5">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {t("contact.successTitle")}
                  </h3>
                  <p className="text-gray-500 mb-6">
                    {t("contact.successDescription")}
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="text-sm font-medium text-[#173F5F] hover:underline"
                  >
                    {t("contact.formTitle")}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t("contact.fields.name")} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder={t("contact.fields.namePlaceholder")}
                      className={`w-full px-4 py-3 border rounded-xl text-sm outline-none transition-colors ${
                        errors.name
                          ? "border-red-400 focus:border-red-500"
                          : "border-gray-200 focus:border-[#173F5F]"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t("contact.fields.phone")} *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder={t("contact.fields.phonePlaceholder")}
                      className={`w-full px-4 py-3 border rounded-xl text-sm outline-none transition-colors ${
                        errors.phone
                          ? "border-red-400 focus:border-red-500"
                          : "border-gray-200 focus:border-[#173F5F]"
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t("contact.fields.subject")}
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder={t("contact.fields.subjectPlaceholder")}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#173F5F] transition-colors"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t("contact.fields.message")} *
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder={t("contact.fields.messagePlaceholder")}
                      className={`w-full px-4 py-3 border rounded-xl text-sm outline-none resize-none transition-colors ${
                        errors.message
                          ? "border-red-400 focus:border-red-500"
                          : "border-gray-200 focus:border-[#173F5F]"
                      }`}
                    />
                    {errors.message && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-[#173F5F] hover:bg-[#0f2d45] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl text-sm transition-colors"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    {isSubmitting
                      ? t("contact.submitting")
                      : t("contact.submit")}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">{t("contact.mapTitle")}</h2>
          <div className="rounded-2xl overflow-hidden border border-gray-200 h-[400px]">
            <iframe
              title="Azrar Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.5234567890123!2d69.2787!3d41.3111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDE4JzQwLjAiTiA2OcKwMTYnNDMuMyJF!5e0!3m2!1suz!2s!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
