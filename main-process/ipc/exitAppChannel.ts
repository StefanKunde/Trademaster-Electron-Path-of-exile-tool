import { IpcChannelInterface, IpcRequest } from "./IpcChannelInterface";
import { app, IpcMainEvent } from 'electron';
import { mainWindow } from "../../main";

export class ExitAppChannel implements IpcChannelInterface {

  getName(): string {
    return 'exitApp';
  }

  handle(event: IpcMainEvent, request: IpcRequest): void {
    if (!request.responseChannel) {
      request.responseChannel = `${ this.getName() }_response`;
    }

    if (mainWindow) {
      mainWindow.close();
    }

    // We dont need to send back when closing.
    // event.sender.send(request.responseChannel, {});
  }
}
