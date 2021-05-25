import * as settings from 'electron-settings';
import { UserSettings } from './settings.interface';

export const loadSettings = async (): Promise<UserSettings> => {
  const league = await settings.get('general.selectedLeague');
  if (league) {
    const userSettings: UserSettings = {
      league: league.toString()
    };

    return userSettings;
  } else {
    return null;
  }
};

export const saveSettings = async (userSettings: UserSettings): Promise<void> => {
  await settings.set('general', {
    selectedLeague: userSettings.league
  });
};
