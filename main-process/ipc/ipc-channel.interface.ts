import { IpcMainEvent } from 'electron';

export interface IpcChannelInterface {
  getName(): string;
  handle(event: IpcMainEvent, request: IpcRequest): void;
}

export interface IpcRequest {
  responseChannel?: string;
  params?: any[];
}
