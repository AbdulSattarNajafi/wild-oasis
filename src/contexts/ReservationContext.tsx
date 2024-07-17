"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { DateRange } from "react-day-picker";

const initialState = {
  from: undefined,
  to: undefined,
};

const ReservationContext = createContext({});

const ReservationProvider = ({ children }: { children: ReactNode }) => {
  const [range, setRange] = useState<DateRange | undefined>(initialState);
  const resetRange = () => {
    setRange(initialState);
  };

  const contextValue = {
    range,
    setRange,
    resetRange,
  };

  return (
    <ReservationContext.Provider value={contextValue}>
      {children}
    </ReservationContext.Provider>
  );
};

const useReservation = () => {
  const context = useContext(ReservationContext);

  if (context === undefined) {
    throw new Error("Reservation context was used outside of provider.");
  }

  return context;
};

export { ReservationProvider, useReservation };
