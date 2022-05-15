import { StatEntry, StatOption } from "../../../core/services/api/interfaces/PoeStatsData";

export default interface Stat {
  item: StatEntry;
  isSelected: boolean;
  hasAdditionalOptions: boolean;
  min?: string;
  max?: string;
  selectedOption?: StatOption;
}
