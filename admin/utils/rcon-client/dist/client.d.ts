/// <reference types="node" />
/// <reference types="node" />
import { Socket, TcpNetConnectOpts } from "node:net";
import { EventEmitter } from "node:events";
export interface RconConnectOptions extends TcpNetConnectOpts {
    password: string;
}
export declare class RconClient extends EventEmitter {
    #private;
    readonly socket: Socket;
    static connect(options: RconConnectOptions): Promise<RconClient>;
    constructor(socket: Socket);
    auth(password: string): Promise<void>;
    cmd(cmd: string): Promise<string | null>;
    close(): Promise<void>;
}
