export interface PoeItemResult {
  id: string;
  item: PoeItem;
  listing: Listing;
}

export interface PoeItem {
  name?: string;
  baseType: string;
  extended: any[];
  frameType: FrameType;
  descrText: string;
  explicitMods?: string[];
  implicitMods?: string[];
  sockets: ItemSocket[];
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
  properties?: ItemProperty[];
  requirements?: ItemRequirement[];
}

export interface ItemProperty {
  displayMode?: number;
  name: string;
  type?: number;
  values: string[]; // first one has the value for e.x. quality
}

export interface ItemRequirement {
  displayMode?: number;
  name: string;
  values: string[];
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

export interface ItemSocket {
  group: number;
  sColour: SocketColorType;
  attr: string | boolean; // G, W, R, B, A. Stands for: green, white, red, blue, abyss (though not a colour but type).
}

export enum SocketColorType {
  Green = 'G',
  Red = 'R',
  Blue = 'B',
  White = 'W',
  Abyss = 'A'

}

export enum FrameType {
  Normal = 0,
  Magic = 1,
  Rare = 2,
  Unique = 3,
  Gem = 4,
  Currency = 5,
  Divination_Card = 6,
  Quest_Item = 7,
  Prophecy = 8,
  Unique_Relict = 9
}
