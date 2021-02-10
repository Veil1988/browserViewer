export interface EventsStoreProps {
  sendDesktopToOperator: (sessionId: number) => void;
}

export interface SendClickDataProps {
  clientX: number;
  clientY: number;
}