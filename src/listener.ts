import mqtt, { IClientOptions } from "mqtt";
import {
  DeviceListenerType,
  TOPIC_REPORT_BASE,
  TOPIC_REPORT_DISPOSE,
  TOPIC_REPORT_ERASE,
  TOPIC_REPORT_HOST_STATE,
  TOPIC_REPORT_INIT,
  TOPIC_REPORT_PROG,
  TOPIC_REPORT_REPAIR,
  TOPIC_REPORT_SELF_TEST,
  TypedEventEmitter,
} from "./defs";

export class DeviceListener extends TypedEventEmitter<DeviceListenerType> {
  private mq: mqtt.MqttClient;

  constructor(brokerUrl: string, opts?: IClientOptions) {
    super();
    this.mq = mqtt.connect(brokerUrl, opts);
  }

  public startListen = async (): Promise<void> => {
    await this.mq.subscribeAsync(TOPIC_REPORT_BASE + "/#", { qos: 1 });
    this.mq.on("message", (topic, message) => {
      console.log(`New message from ${topic}: ${message.toString("hex")}`);

      const splitted = topic.replace(TOPIC_REPORT_BASE + "/", "").split("/");
      if (splitted.length < 2) {
        return;
      }

      switch (splitted[1]) {
        case TOPIC_REPORT_INIT: {
          this.emit("initEvent", message, splitted[0], topic);
          break;
        }
        case TOPIC_REPORT_HOST_STATE: {
          this.emit("hostStateEvent", message, splitted[0], topic);
          break;
        }
        case TOPIC_REPORT_PROG: {
          this.emit("programEvent", message, splitted[0], topic);
          break;
        }
        case TOPIC_REPORT_SELF_TEST: {
          this.emit("selfTestEvent", message, splitted[0], topic);
          break;
        }
        case TOPIC_REPORT_SELF_TEST: {
          this.emit("extTestEvent", message, splitted[0], topic);
          break;
        }
        case TOPIC_REPORT_ERASE: {
          this.emit("eraseEvent", message, splitted[0], topic);
          break;
        }
        case TOPIC_REPORT_REPAIR: {
          this.emit("repairEvent", message, splitted[0], topic);
          break;
        }
        case TOPIC_REPORT_DISPOSE: {
          this.emit("disposeEvent", message, splitted[0], topic);
          break;
        }
      }
    });
  };
}
