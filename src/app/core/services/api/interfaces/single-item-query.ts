export default interface SingleItemQuery {
  query: {
    name?: string;
    status: {
      option: string; // e.x. "online"
    };
    type?: {
      discriminator?: string; // e.x. "warfortheatlas"
      option?: string; // e.x. "Burial Chambers Map"
    } | string;
    stats?: StatQuery[];
  };
  sort: {
    price: string; // e.x. "asc"
  }
}

export interface StatQuery {
  type: string;
  filters: StatFilter[]
}

export interface StatFilter {
  id: string;
  value: {
    option?: string;
    min?: string;
    max?: string;
  };
  disabled: false;
}
