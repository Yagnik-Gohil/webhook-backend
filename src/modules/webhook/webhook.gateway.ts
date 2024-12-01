import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WebhookService } from './webhook.service';
import logger from '@shared/logger';

@WebSocketGateway()
export class WebhookGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private readonly webhookService: WebhookService) {}

  // A Map of socket_id -> user_id for fast lookups by socket
  private socketUserMap = new Map<string, string>();

  // A Map of user_id -> [socket_id1, socket_id2, ...] for broadcasting to all devices
  private userSocketMap = new Map<string, string[]>();

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth.authorization as string;
      // const token = client.handshake.headers.authorization as string;
      const userId = await this.webhookService.validateTokenAndGetUserId(token);

      // Add to socket-user map
      this.socketUserMap.set(client.id, userId);

      // Add socket to user-device map
      if (!this.userSocketMap.has(userId)) {
        this.userSocketMap.set(userId, []);
      }
      this.userSocketMap.get(userId).push(client.id);
    } catch (error) {
      logger.error(
        `${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })} - CHAT - ${error.message}`,
      );
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    this.userSocketMap.delete(client.id);
  }

  emitToUserDevices(userId: string, event: string, payload: any) {
    const socketIds = this.userSocketMap.get(userId) || [];
    socketIds.forEach((socketId) => {
      this.server.to(socketId).emit(event, payload);
    });
  }
}
