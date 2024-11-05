// messageService.test.ts
import { MessageService } from '../services/MessageService';
import { IMessageService } from "../interfaces/IMessageService";


// Mock the client object
const mockClient = {
  messages: {
    create: jest.fn().mockResolvedValue({ id: "test-message-id" }),
  },
};

describe("MessageService", () => {
  let messageService: IMessageService;

  beforeEach(() => {
    messageService = new MessageService(mockClient, "+15551234567");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("sendMessage", () => {
    it("should send a message successfully", async () => {
      // Arrange
      const to = "+15558887777";
      const message = "Hello, world!";

      // Act
      const response = await messageService.sendMessage(to, message);

      // Assert
      expect(mockClient.messages.create).toHaveBeenCalledWith({
        body: message,
        to,
        from: "+15551234567",
      });
      expect(response).toEqual({ id: "test-message-id" });
    });

    it("should throw an error if message sending fails", async () => {
      // Arrange
      const to = "+15558887777";
      const message = "Hello, world!";
      const error = new Error("Failed to send message");
      mockClient.messages.create.mockRejectedValueOnce(error);

      // Act & Assert
      await expect(messageService.sendMessage(to, message)).rejects.toThrow(error);
    });
  });
});