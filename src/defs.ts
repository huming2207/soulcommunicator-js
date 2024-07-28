import Stream from "stream";

export const TOPIC_REPORT_BASE = "/soulinjector/v1/report";
export const TOPIC_REPORT_INIT = "init";
export const TOPIC_REPORT_HOST_STATE = "state";
export const TOPIC_REPORT_PROG = "prog";
export const TOPIC_REPORT_SELF_TEST = "test/int";
export const TOPIC_REPORT_EXTN_TEST = "test/ext";
export const TOPIC_REPORT_ERASE = "erase";
export const TOPIC_REPORT_REPAIR = "repair";
export const TOPIC_REPORT_DISPOSE = "dispose";

export const TOPIC_CMD_BASE = "/soulinjector/v1/cmd";
export const TOPIC_CMD_METADATA_FIRMWARE = "meta/fw";
export const TOPIC_CMD_METADATA_FLASH_ALGO = "meta/algo";
export const TOPIC_CMD_BIN_FIRMWARE = "bin/fw";
export const TOPIC_CMD_BIN_FLASH_ALGO = "bin/algo";
export const TOPIC_CMD_SET_STATE = "state";
export const TOPIC_CMD_READ_MEM = "read_mem";

export class TypedEventEmitter<TEvents extends Record<string, any>> {
  private emitter = new Stream.EventEmitter();

  emit<TEventName extends keyof TEvents & string>(eventName: TEventName, ...eventArg: TEvents[TEventName]) {
    this.emitter.emit(eventName, ...(eventArg as []));
  }

  on<TEventName extends keyof TEvents & string>(
    eventName: TEventName,
    handler: (...eventArg: TEvents[TEventName]) => void,
  ) {
    this.emitter.on(eventName, handler as any);
  }

  off<TEventName extends keyof TEvents & string>(
    eventName: TEventName,
    handler: (...eventArg: TEvents[TEventName]) => void,
  ) {
    this.emitter.off(eventName, handler as any);
  }
}

export type DeviceListenerType = {
  initEvent: [message: Buffer, serialNumber: string, topic: string];
  hostStateEvent: [message: Buffer, serialNumber: string, topic: string];
  programEvent: [message: Buffer, serialNumber: string, topic: string];
  selfTestEvent: [message: Buffer, serialNumber: string, topic: string];
  extTestEvent: [message: Buffer, serialNumber: string, topic: string];
  eraseEvent: [message: Buffer, serialNumber: string, topic: string];
  repairEvent: [message: Buffer, serialNumber: string, topic: string];
  disposeEvent: [message: Buffer, serialNumber: string, topic: string];
};
