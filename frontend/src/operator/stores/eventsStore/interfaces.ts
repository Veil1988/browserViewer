export interface EventStoreProps {
  /** Запрос рабочего стола пользователя */
  getUserDesktop: (sessionId: number) => void;
  /** Запрос на изменение статусе у пользователя */
  activateSession: (sessionId: number) => void;
}

export interface SendClickDataProps {
  clientX: number;
  clientY: number;
}
