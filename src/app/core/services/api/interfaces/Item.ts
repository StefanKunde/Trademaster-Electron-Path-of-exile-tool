export interface Item {
  id: string;
  label: string;
  entries: ItemEntry[];
}

export interface ItemEntry {
  name?: string;
  type: string;
  text: string;
  option?: {
    options: [{
      id: string;
      text: string;
    }]
  }
  flags?: {
    unique: boolean;
  };
  disc?: string;
}
