"use client";

import { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import { getTranslator, type Locale } from "@/lib/i18n";

type WorkingWindow = {
  start: number;
  end: number;
};

type AvailabilityStatus = {
  isOpen: boolean;
  label: string;
  detail: string;
};

const WORKING_WINDOWS: Array<WorkingWindow | null> = [
  null,
  { start: 9 * 60, end: 19 * 60 },
  { start: 9 * 60, end: 19 * 60 },
  { start: 9 * 60, end: 19 * 60 },
  { start: 9 * 60, end: 19 * 60 },
  { start: 9 * 60, end: 19 * 60 },
  null,
];
const NEXT_OPEN_LOOKUP_LIMIT = 7;

type Translator = ReturnType<typeof getTranslator>;

function minutesToTimeString(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
}

function getPragueSnapshot(date = new Date()) {
  const pragueNow = new Date(date.toLocaleString("en-US", { timeZone: "Europe/Prague" }));
  const dayIndex = pragueNow.getDay();
  const minutes = pragueNow.getHours() * 60 + pragueNow.getMinutes();

  return { dayIndex, minutes };
}

function getLocalizedDayNames(t: Translator) {
  return [
    t("home.availability.days.sunday"),
    t("home.availability.days.monday"),
    t("home.availability.days.tuesday"),
    t("home.availability.days.wednesday"),
    t("home.availability.days.thursday"),
    t("home.availability.days.friday"),
    t("home.availability.days.saturday"),
  ];
}

function describeNextOpen({
  offset,
  dayIndex,
  startMinutes,
  dayNames,
  t,
}: {
  offset: number;
  dayIndex: number;
  startMinutes: number;
  dayNames: string[];
  t: Translator;
}) {
  const time = minutesToTimeString(startMinutes);

  if (offset === 0) {
    return t("home.availability.closed.detailToday").replace("{time}", time);
  }

  if (offset === 1) {
    return t("home.availability.closed.detailTomorrow").replace("{time}", time);
  }

  const weekday = dayNames[dayIndex] ?? "";
  return t("home.availability.closed.detailWeekday")
    .replace("{weekday}", weekday)
    .replace("{time}", time);
}

function calculateAvailability(_locale: Locale, t: Translator): AvailabilityStatus {
  const { dayIndex, minutes } = getPragueSnapshot();
  const dayNames = getLocalizedDayNames(t);
  const todayWindow = WORKING_WINDOWS[dayIndex];

  if (todayWindow && minutes >= todayWindow.start && minutes < todayWindow.end) {
    return {
      isOpen: true,
      label: t("home.availability.openNow.label"),
      detail: t("home.availability.openNow.detail").replace(
        "{time}",
        minutesToTimeString(todayWindow.end),
      ),
    } satisfies AvailabilityStatus;
  }

  for (let offset = 0; offset < NEXT_OPEN_LOOKUP_LIMIT; offset += 1) {
    const nextDayIndex = (dayIndex + offset) % WORKING_WINDOWS.length;
    const window = WORKING_WINDOWS[nextDayIndex];

    if (!window) {
      continue;
    }

    if (offset === 0 && minutes >= window.end) {
      continue;
    }

    if (offset === 0 && minutes < window.start) {
      return {
        isOpen: false,
        label: t("home.availability.closed.label"),
        detail: describeNextOpen({
          offset,
          dayIndex: nextDayIndex,
          startMinutes: window.start,
          dayNames,
          t,
        }),
      } satisfies AvailabilityStatus;
    }

    if (offset > 0) {
      return {
        isOpen: false,
        label: t("home.availability.closed.label"),
        detail: describeNextOpen({
          offset,
          dayIndex: nextDayIndex,
          startMinutes: window.start,
          dayNames,
          t,
        }),
      } satisfies AvailabilityStatus;
    }
  }

  return {
    isOpen: false,
    label: t("home.availability.unknown.label"),
    detail: t("home.availability.unknown.detail"),
  } satisfies AvailabilityStatus;
}

interface CurrentAvailabilityProps {
  className?: string;
  locale: Locale;
}

export function CurrentAvailability({ className, locale }: CurrentAvailabilityProps) {
  const translator = useMemo(() => getTranslator(locale), [locale]);
  const [status, setStatus] = useState<AvailabilityStatus>(() => calculateAvailability(locale, translator));

  useEffect(() => {
    setStatus(calculateAvailability(locale, translator));

    const intervalId = window.setInterval(() => {
      setStatus(calculateAvailability(locale, translator));
    }, 60_000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [locale, translator]);

  return (
    <div
      className={cn(
        "flex w-full flex-wrap items-center gap-2 rounded-2xl bg-white/10 px-4 py-2 text-sm text-white shadow-lg shadow-black/10 backdrop-blur-sm",
        className,
      )}
    >
      <span
        className={cn(
          "inline-flex h-2.5 w-2.5 shrink-0 rounded-full",
          status.isOpen ? "bg-emerald-400" : "bg-rose-400",
        )}
        aria-hidden="true"
      />
      <span className="font-semibold">{status.label}</span>
      <span className="text-white/70">{status.detail}</span>
    </div>
  );
}
