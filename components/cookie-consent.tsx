"use client";

import { useEffect, useMemo, useState } from "react";
import { Settings2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getTranslator, type Locale } from "@/lib/i18n";

const STORAGE_KEY = "euromotors.cookie-preferences";

type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
};
type OptionalPreferenceKey = Exclude<keyof CookiePreferences, "necessary">;

type CookieConsentProps = {
  locale: Locale;
};

const preferenceSections: Array<{
  key: keyof CookiePreferences;
  isOptional: boolean;
}> = [
  { key: "necessary", isOptional: false },
  { key: "analytics", isOptional: true },
  { key: "marketing", isOptional: true },
];

export function CookieConsent({ locale }: CookieConsentProps) {
  const t = useMemo(() => getTranslator(locale), [locale]);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);
  const [draftPreferences, setDraftPreferences] = useState<CookiePreferences>(defaultPreferences);
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const stored = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;

      if (stored) {
        const parsed = JSON.parse(stored) as CookiePreferences | null;
        if (parsed && typeof parsed.analytics === "boolean" && typeof parsed.marketing === "boolean") {
          setPreferences({ ...defaultPreferences, analytics: parsed.analytics, marketing: parsed.marketing });
          setDraftPreferences({ ...defaultPreferences, analytics: parsed.analytics, marketing: parsed.marketing });
          setHasConsent(true);
        } else {
          setShowBanner(true);
        }
      } else {
        setShowBanner(true);
      }
    } catch (error) {
      console.error("Failed to read cookie preferences", error);
      setShowBanner(true);
    } finally {
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    if (showSettings) {
      setDraftPreferences(preferences);
    }
  }, [showSettings, preferences]);

  const persistPreferences = (next: CookiePreferences) => {
    setPreferences(next);
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      }
    } catch (error) {
      console.error("Failed to store cookie preferences", error);
    }
    setHasConsent(true);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleAcceptAll = () => {
    persistPreferences({ ...defaultPreferences, analytics: true, marketing: true });
  };

  const handleRejectAll = () => {
    persistPreferences({ ...defaultPreferences, analytics: false, marketing: false });
  };

  const handleSaveSettings = () => {
    persistPreferences({ ...draftPreferences, necessary: true });
  };

  const handleToggleDraft = (key: OptionalPreferenceKey) => {
    setDraftPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleOpenSettings = () => {
    setShowSettings(true);
    setShowBanner(false);
  };

  const handleCloseSettings = () => {
    setShowSettings(false);
    if (!hasConsent) {
      setShowBanner(true);
    }
  };

  if (!isReady) {
    return null;
  }

  return (
    <>
      {showBanner ? (
        <div className="fixed inset-x-0 bottom-0 z-40 px-4 pb-4 sm:px-6 sm:pb-6">
          <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <h2 className="text-lg font-semibold text-slate-900">{t("cookieConsent.banner.title")}</h2>
                <p className="text-sm text-slate-600">{t("cookieConsent.banner.description")}</p>
              </div>
              <div className="flex flex-col gap-2 sm:w-72">
                <Button onClick={handleAcceptAll}>{t("cookieConsent.banner.acceptAll")}</Button>
                <Button variant="outline" onClick={handleRejectAll}>
                  {t("cookieConsent.banner.reject")}
                </Button>
                <Button variant="ghost" onClick={handleOpenSettings}>
                  {t("cookieConsent.banner.settings")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {hasConsent && !showBanner ? (
        <div className="fixed bottom-4 right-4 z-30 sm:bottom-6 sm:right-6">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 border-slate-300 bg-white text-slate-700 shadow-lg"
            onClick={() => setShowSettings(true)}
          >
            <Settings2 className="h-4 w-4" />
            {t("cookieConsent.settingsButton")}
          </Button>
        </div>
      ) : null}

      {showSettings ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto px-4 py-6 sm:items-center sm:py-10">
          <div className="absolute inset-0 bg-slate-950/60" aria-hidden="true" />
          <div
            role="dialog"
            aria-modal="true"
            className="relative z-10 w-full max-w-xl max-h-[calc(100vh-3rem)] overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl sm:max-h-[calc(100vh-5rem)]"
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">{t("cookieConsent.modal.title")}</h2>
                <p className="text-sm text-slate-600">{t("cookieConsent.modal.description")}</p>
              </div>
              <button
                type="button"
                onClick={handleCloseSettings}
                className="rounded-full p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label={t("cookieConsent.modal.close")}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4 px-6 py-5">
              {preferenceSections.map(({ key, isOptional }) => {
                const title = t(`cookieConsent.modal.sections.${key}.title`);
                const description = t(`cookieConsent.modal.sections.${key}.description`);
                const isEnabled = draftPreferences[key];

                return (
                  <div
                    key={key}
                    className="flex flex-col gap-2 rounded-xl border border-slate-200 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{title}</p>
                        <p className="text-sm text-slate-600">{description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {!isOptional ? (
                          <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                            {t("cookieConsent.modal.sections.necessary.alwaysOn")}
                          </span>
                        ) : (
                          <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-600">
                            <input
                              type="checkbox"
                              checked={isEnabled}
                              onChange={() => handleToggleDraft(key as OptionalPreferenceKey)}
                              className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                            />
                            <span>{isEnabled ? t("cookieConsent.modal.toggle.on") : t("cookieConsent.modal.toggle.off")}</span>
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col gap-3 border-t border-slate-200 px-6 py-4 sm:flex-row sm:justify-end">
              <Button variant="ghost" onClick={handleCloseSettings}>
                {t("cookieConsent.modal.cancel")}
              </Button>
              <Button onClick={handleSaveSettings}>{t("cookieConsent.modal.save")}</Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
