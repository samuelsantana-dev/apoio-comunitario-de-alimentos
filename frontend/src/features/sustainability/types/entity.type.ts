export type Destination = "compostagem" | "reciclagem" | "biodigestao";

export type DisposalRecord = {
  id: number;
  material: string;
  weight: number;
  destination: Destination;
  date: string;
};
