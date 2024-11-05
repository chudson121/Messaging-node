import { Request, Response } from 'express';
import { MessageController } from '../controllers/MessageController';
import { IMessageService } from '../interfaces/IMessageService';

class MockMessageService implements IMessageService {
  sendMessage(to: string, message: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (to === '+15555555555' && message === 'Hello, world!') {
        resolve({ id: 'test-message-id' });
      } else {
        reject(new Error('Failed to send message'));
      }
    });
  }
}

describe('MessageController', () => {
  let messageController: MessageController;
  let mockMessageService: IMessageService;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  let mockMessageInputPhone = '+15555555555';
  let mockMessageInputMessage = 'Hello, world!';

  beforeEach(() => {
    mockMessageService = new MockMessageService();
    messageController = new MessageController(mockMessageService);

    mockRequest = {
      body: {
        mobile: mockMessageInputPhone,
        message: mockMessageInputMessage,
      },
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('handleSendMessage', () => {
    it('should send a message successfully', async () => {
      // Arrange
      const expectedResponse = { message: 'Message sent' };

      // Act
      await messageController.handleSendMessage(
        mockRequest as Request,
        mockResponse as Response
      );

      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(expectedResponse);
    });

    it('should return an error if message sending fails', async () => {
      // Arrange
      mockRequest.body = {
        mobile: mockMessageInputPhone,
        message: "Cause me to error please",
      };
      const expectedResponse = { error: 'Failed to send message' };

      // Act
      await messageController.handleSendMessage(
        mockRequest as Request,
        mockResponse as Response
      );

      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith(expectedResponse);
    });
  });
});