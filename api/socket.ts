export enum TransactionEventType {
  GIVE = "give",
  REDEEM = "redeem",
  PLAY = "play"
}

export default class SocketApi {
  baseUrl: string;
  listeners: { [eventType: string]: (data: any) => void } = {};

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  initiateSocket(token: string) {
    const io = require("socket.io-client");
    const socket = io(`${this.baseUrl}/?token=${token}`);

    socket.on('transaction', (data) => {
      this.invokeListener(data.type, data);
    });
  }

  invokeListener(transactionEventType: TransactionEventType, data: any) {
    const transactionType = transactionEventType.toString();
    const listener = this.listeners[transactionType];

    if (listener) {
      listener(data);
    }
  }

  addListener(transactionEventType: TransactionEventType, callback: (data: any) => void): void {
    const transactionType = transactionEventType.toString();
    this.listeners[transactionType] = callback;
  }

  removeListener(transactionEventType: TransactionEventType) {
    const transactionType = transactionEventType.toString();
    delete this.listeners[transactionType];
  }
}
