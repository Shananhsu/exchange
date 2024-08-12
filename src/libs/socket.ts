import { Event, Quote, KLine, Deal, SettlePercent } from "./type/event";
import { WSURL } from "@/env";

const URL = `${WSURL}/symbol/quote`;

enum Cmd {
    Quote = "Quote",
    KLine = "KLine",
    Deal = "Deal",
    SettlePercent = "SettlePercent",
}

class Connection {
    socket!: WebSocket;

    onOpen: (event: globalThis.Event) => void = () => { };
    onClose: (event: CloseEvent) => void = () => { };
    onError: (event: globalThis.Event) => void = () => { };
    onQuoteEvent: (event: Event<Quote>) => void = () => { };
    onKLineEvent: (event: Event<KLine>) => void = () => { };
    onDealEvent: (event: Event<Deal>) => void = () => { };
    onSettlePercentEvent: (event: Event<SettlePercent>) => void = () => { };

    constructor(token: string) {
        this.open(token);
    }

    open(token: string) {
        this.socket = new WebSocket(`${URL}/${token}`);
        this.socket.onerror = (event) => this.onError(event);
        this.socket.onopen = (event) => this.onOpen(event);
        this.socket.onclose = (event) => this.onClose(event);
        this.socket.onmessage = (event: MessageEvent<string>) => {
            let e: Event<any> = JSON.parse(event.data);
            switch (e.cmd) {
                case Cmd.Quote:
                    this.onQuoteEvent(e);
                    break;
                case Cmd.KLine:
                    this.onKLineEvent(e);
                    break;
                case Cmd.Deal:
                    this.onDealEvent(e);
                    break;
                case Cmd.SettlePercent:
                    this.onSettlePercentEvent(e);
                    break;
            }
        };
    }

    close() {
        this.socket.close();
    }
}

export default Connection;