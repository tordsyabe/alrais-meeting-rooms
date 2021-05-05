import React, { createContext, useState } from "react";

export const TimerContext = createContext();

export default function TimerContextProvider({ children }) {
  const [isActive, setIsActive] = useState(false);

  const [selectedCardMeeting, setSelectedCardMeeting] = useState("");
  const values = {
    isActive,
    setIsActive,
    selectedCardMeeting,
    setSelectedCardMeeting,
  };
  return (
    <TimerContext.Provider value={values}>{children}</TimerContext.Provider>
  );
}
