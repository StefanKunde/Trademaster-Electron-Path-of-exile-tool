export interface Item {
  id: string;
  label: string;
  entries: ItemEntrySearch[];
}

export interface ItemEntrySearch {
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
