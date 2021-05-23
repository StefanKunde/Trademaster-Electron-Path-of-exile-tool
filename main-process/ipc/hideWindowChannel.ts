import { IpcChannelInterface, IpcRequest } from "./IpcChannelInterface";
import { IpcMainEvent } from 'electron';
import { mainWindow } from "../../main";

export class HideWindowChannel implements IpcChannelInterface {
  getName(): string {
    return 'hideWindow';
  }

  handle(event: IpcMainEvent, request: IpcRequest): void {
    if (!request.responseChannel) {
      request.responseChannel = `${ this.getName() }_response`;
    }

    if (mainWindow) {
      mainWindow.hide();
    }

    event.sender.send(request.responseChannel, {});
  }
}
