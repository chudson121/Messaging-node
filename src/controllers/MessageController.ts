// MessageController - Responsible for handling message-related HTTP requests
import { Request, Response } from 'express';
import { IMessageService } from "../interfaces/IMessageService";

export class MessageController {
  constructor(private messageService: IMessageService) {}

  handleSendMessage = async (req: Request, res: Response): Promise<void> => {
    try {
      const { mobile, message } = req.body;
      const to = `${mobile}`;
      await this.messageService.sendMessage(to, message);
      res.status(200).json({ message: "Message sent" });
    } catch (error) {
      res.status(500).json({ error: "Failed to send message" });
    }
  };
}