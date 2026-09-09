import { afterEach, describe, expect, it, vi } from "vitest";
import {
  loadDisposalRecords,
  saveDisposalRecords,
} from "./sustainability-storage.service";

describe("sustainability storage service", () => {
  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("retorna uma lista vazia quando a leitura do armazenamento falha", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementationOnce(() => {
      throw new Error("Armazenamento indisponível");
    });

    expect(loadDisposalRecords()).toEqual([]);
  });

  it("não interrompe a aplicação quando não é possível gravar", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementationOnce(() => {
      throw new Error("Armazenamento indisponível");
    });

    expect(() => saveDisposalRecords([])).not.toThrow();
  });
});
