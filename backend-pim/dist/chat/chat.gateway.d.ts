import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageService } from 'src/message/message.service';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly messageService;
    server: Server;
    constructor(messageService: MessageService);
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleMessage(client: Socket, payload: any): Promise<void>;
    handleJoinRoom(client: Socket, conversationId: string): Promise<void>;
}
