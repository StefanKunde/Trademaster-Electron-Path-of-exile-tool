export interface ItemType {
  entries: ItemEntry[];
  id: string;
  label: string;
}

export interface ItemEntry {
  id: string;
  text: string;
  image?: string;
}
