"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

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

const WEEKDAY_INDEX: Record<string, number> = {
  neděle: 0,
  pondělí: 1,
  úterý: 2,
  středa: 3,
  čtvrtek: 4,
  pátek: 5,
  sobota: 6,
};

const WEEKDAY_ACCUSATIVE = [
  "neděli",
  "pondělí",
  "úterý",
  "středu",
  "čtvrtek",
  "pátek",
  "sobotu",
];

const LOCALE_FORMAT = new Intl.DateTimeFormat("cs-CZ", {
  timeZone: "Europe/Prague",
  weekday: "long",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

const NEXT_OPEN_LOOKUP_LIMIT = 7;

function minutesToTimeString(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
}

function getPragueTimeSnapshot(baseDate = new Date()) {
  const parts = LOCALE_FORMAT.formatToParts(baseDate);
  const hourPart = parts.find((part) => part.type === "hour");
  const minutePart = parts.find((part) => part.type === "minute");
  const weekdayPart = parts.find((part) => part.type === "weekday");

  const hour = Number(hourPart?.value ?? 0);
  const minute = Number(minutePart?.value ?? 0);
  const weekday = (weekdayPart?.value ?? "").toLowerCase();

  return {
    dayIndex: WEEKDAY_INDEX[weekday] ?? 0,
    minutes: hour * 60 + minute,
  };
}

function describeNextOpen(dayIndex: number, offset: number, startMinutes: number) {
  if (offset === 0) {
    return `Otevřeno bude dnes v ${minutesToTimeString(startMinutes)}.`;
  }

  if (offset === 1) {
    return `Otevřeno bude zítra v ${minutesToTimeString(startMinutes)}.`;
  }

  return `Otevřeno bude v ${WEEKDAY_ACCUSATIVE[dayIndex]} v ${minutesToTimeString(startMinutes)}.`;
}

function calculateAvailability() {
  const { dayIndex, minutes } = getPragueTimeSnapshot();
  const todayWindow = WORKING_WINDOWS[dayIndex];

  if (todayWindow && minutes >= todayWindow.start && minutes < todayWindow.end) {
    return {
      isOpen: true,
      label: "Právě otevřeno",
      detail: `Zavíráme dnes v ${minutesToTimeString(todayWindow.end)}.`,
    } satisfies AvailabilityStatus;
  }

  // Find the next opening window
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
        label: "Mimo otevírací dobu",
        detail: describeNextOpen(nextDayIndex, offset, window.start),
      } satisfies AvailabilityStatus;
    }

    if (offset > 0) {
      return {
        isOpen: false,
        label: "Mimo otevírací dobu",
        detail: describeNextOpen(nextDayIndex, offset, window.start),
      } satisfies AvailabilityStatus;
    }
  }

  return {
    isOpen: false,
    label: "Režim provozu",
    detail: "Otevírací doba bude upřesněna.",
  } satisfies AvailabilityStatus;
}

interface CurrentAvailabilityProps {
  className?: string;
}

export function CurrentAvailability({ className }: CurrentAvailabilityProps) {
  const [status, setStatus] = useState<AvailabilityStatus>(calculateAvailability);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setStatus(calculateAvailability());
    }, 60_000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

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
