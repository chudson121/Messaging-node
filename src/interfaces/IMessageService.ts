// MessageService Interface
export interface IMessageService {
  sendMessage(to: string, message: string): Promise<any>;
}
