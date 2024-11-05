import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import twilio from 'twilio';
//import dotenv from 'dotenv';

import { MessageService } from './services/MessageService';
import { IMessageService } from './interfaces/IMessageService';
import { MessageController } from './controllers/MessageController';


// 2. Open/Closed Principle (OCP)
// - Application is open for extension, but closed for modification

// 3. Liskov Substitution Principle (LSP)
// - Derived classes must be substitutable for their base classes

// 4. Interface Segregation Principle (ISP)
// - Clients should not be forced to depend on interfaces they do not use

// 5. Dependency Inversion Principle (DIP)
// - High-level modules should not depend on low-level modules. Both should depend on abstractions.
// npm install -g ts-node
// npm install typescript --save-dev
// npm install express --save
// npm install --save-dev @types/node
// npm install --save-dev @types/express @types/node @types/body-parser

// npm install --save-dev jest @types/jest ts-jest
// npm install nodemon --save-dev
// npm install express twilio
// npm install twilio --save-dev

// Main application setup
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", express.static(path.join(__dirname, "public")));

// Initialize services
const messageController = InitializeMessageService();

// Routes
app.post("/message/send", messageController.handleSendMessage);

//Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


function InitializeMessageService() {
  const twilioClient = twilio(
    process.env.MESSAGING_ACCOUNT_SID || '',
    process.env.MESSAGING_AUTH_TOKEN || ''
  );

  const messageService: IMessageService = new MessageService(
    twilioClient,
    process.env.MESSAGING_FROM_NUMBER || ''
  );

  const messageController = new MessageController(messageService);
  return messageController;
}
