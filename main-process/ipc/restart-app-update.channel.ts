import { IpcChannelInterface, IpcRequest } from "./ipc-channel.interface";
import { autoUpdater, IpcMainEvent } from 'electron';

export class RestartAppAndUpdateChannel implements IpcChannelInterface {
  getName(): string {
    return 'restart_app';
  }

  handle(event: IpcMainEvent, request: IpcRequest): void {
    if (!request.responseChannel) {
      request.responseChannel = `${ this.getName() }_response`;
    }

    autoUpdater.quitAndInstall();

    event.sender.send(request.responseChannel, {});
  }
}
