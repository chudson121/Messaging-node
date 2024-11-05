import { IMessageService } from "../interfaces/IMessageService";

class MessageService implements IMessageService {
  constructor(private client: any, private fromNumber: string) {}

  async sendMessage(to: string, message: string): Promise<any> {
    try {
      const response = await this.client.messages.create({
        body: message,
        to,
        from: this.fromNumber,
      });
      return response;
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  }
}

export { MessageService };