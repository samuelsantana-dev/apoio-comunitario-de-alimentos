import { computed, ref } from "vue";
import {
  loadDisposalRecords,
  saveDisposalRecords,
} from "../services/sustainability-storage.service";
import type { Destination } from "../types/entity.type";

export const destinations: Record<
  Destination,
  { label: string; description: string }
> = {
  compostagem: {
    label: "Compostagem",
    description: "Para resíduos orgânicos que podem virar adubo.",
  },
  reciclagem: {
    label: "Reciclagem",
    description: "Para embalagens limpas de papel, plástico, vidro ou metal.",
  },
  biodigestao: {
    label: "Biodigestão",
    description: "Para resíduos orgânicos destinados à geração de energia.",
  },
};

export function useSustainableDestinationView() {
  const records = ref(loadDisposalRecords());
  const material = ref("");
  const weight = ref("");
  const destination = ref<Destination>("compostagem");
  const feedback = ref("");
  const totalWeight = computed(() =>
    records.value.reduce((total, record) => total + record.weight, 0),
  );
  const organicWeight = computed(() =>
    records.value
      .filter((record) => record.destination !== "reciclagem")
      .reduce((total, record) => total + record.weight, 0),
  );
  const recycledWeight = computed(() =>
    records.value
      .filter((record) => record.destination === "reciclagem")
      .reduce((total, record) => total + record.weight, 0),
  );

  function registerDestination() {
    const parsedWeight = Number(weight.value.replace(",", "."));
    if (
      !material.value.trim() ||
      !Number.isFinite(parsedWeight) ||
      parsedWeight <= 0
    ) {
      feedback.value = "Informe o material e um peso maior que zero.";
      return;
    }

    records.value.unshift({
      id: Date.now(),
      material: material.value.trim(),
      weight: parsedWeight,
      destination: destination.value,
      date: new Date().toISOString(),
    });
    saveDisposalRecords(records.value);
    material.value = "";
    weight.value = "";
    feedback.value = "Destino registrado com sucesso.";
  }

  function formatDate(date: string) {
    return new Intl.DateTimeFormat("pt-BR").format(new Date(date));
  }

  return {
    destinations,
    records,
    material,
    weight,
    destination,
    feedback,
    totalWeight,
    organicWeight,
    recycledWeight,
    registerDestination,
    formatDate,
  };
}
