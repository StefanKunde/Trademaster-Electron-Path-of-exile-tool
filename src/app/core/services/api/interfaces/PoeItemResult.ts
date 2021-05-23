export interface PoeItemResult {
  id: string;
  item: PoeItem;
  listing: Listing;
}

export interface PoeItem {
  baseType: string;
  descrText: string;
  explicitMods: string[];
  frameType: number;
  h: number;
  w: number;
  icon: string;
  id: string;
  identified: boolean;
  ilvl: number;
  league: string;
  maxStackSize: number;
  note: string;
  stackSize: number;
  typeLine: string;
}

export interface Listing {
  account: Account;
  indexed: string;
  method: string;
  price: Price;
  stash: Stash;
  whisper: string;
}

export interface Account {
  language: string;
  lastCharacterName: string;
  name: string;
  online: {
    league: string;
  }
}

export interface Price {
  exchange: PriceExchange;
  item: PriceItem;
}

export interface PriceExchange {
  amount: number;
  currency: string;
}

export interface PriceItem {
  amount: number;
  currency: string;
  id: string;
  stock: number;
}

export interface Stash {
  name: string;
  x: number;
  y: number;
}
