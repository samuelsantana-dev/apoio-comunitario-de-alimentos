import type { DisposalRecord } from "../types/entity.type";

const STORAGE_KEY = "apoio:sustainable-destinations";

function getStorage(): Storage | null {
  if (typeof window === "undefined") return null;

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function loadDisposalRecords(): DisposalRecord[] {
  const storage = getStorage();
  if (!storage) return [];

  try {
    const savedRecords = storage.getItem(STORAGE_KEY);
    return savedRecords ? (JSON.parse(savedRecords) as DisposalRecord[]) : [];
  } catch {
    return [];
  }
}

export function saveDisposalRecords(records: DisposalRecord[]) {
  const storage = getStorage();
  if (!storage) return;

  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch {
    // O registro continua disponível durante a sessão, mesmo sem persistência.
  }
}
