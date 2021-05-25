import { IpcChannelInterface, IpcRequest } from "./ipc-channel.interface";
import { IpcMainEvent } from 'electron';
import { saveSettings } from "../settings/settings";
import { UserSettings } from "../settings/settings.interface";

export class SaveUserSettingsChannel implements IpcChannelInterface {
  getName(): string {
    return 'save_user_settings';
  }

  handle(event: IpcMainEvent, request: IpcRequest): void {
    if (!request.responseChannel) {
      request.responseChannel = `${ this.getName() }_response`;
    }

    if (request?.params?.length > 0) {
      const settings: UserSettings = request?.params[0];
      saveSettings(settings);
    }

    event.sender.send(request.responseChannel, {});
  }
}
