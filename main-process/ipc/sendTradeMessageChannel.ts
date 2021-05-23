
import { IpcChannelInterface, IpcRequest } from "./IpcChannelInterface";
import { clipboard, IpcMainEvent } from 'electron';
import * as robotjs from 'robotjs';
import { overlayWindow } from 'electron-overlay-window';

export class SendTradeMessageChannel implements IpcChannelInterface {

  getName(): string {
    return 'sendTradeMessage';
  }

  handle(event: IpcMainEvent, request: IpcRequest): void {
    if (!request.responseChannel) {
      request.responseChannel = `${ this.getName() }_response`;
    }

    clipboard.writeText(request.params[0]);

    // Action here!
    overlayWindow.focusTarget();
    robotjs.keyTap('enter');
    robotjs.keyTap("v", "control");
    robotjs.keyTap('enter');

    event.sender.send(request.responseChannel, {});
  }
}

