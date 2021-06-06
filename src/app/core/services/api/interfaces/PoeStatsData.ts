export interface StatType {
  entries: StatEntry[];
  label: string;
}

export interface StatEntry {
  id: string;
  text: string;
  type: string;
  option?: { options?: StatOption[] };
}

export interface StatOption {
  id: string;
  text: string;
}
