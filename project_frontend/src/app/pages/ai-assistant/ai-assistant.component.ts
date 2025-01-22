import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import {ChatService} from "../../services/chatservice.service";
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";


@Component({
  selector: 'app-ai-assistant',
  templateUrl: './ai-assistant.component.html',
  standalone: true,
  imports: [
    NgClass,
    NgForOf,
    FormsModule,
    NgIf,
    NgOptimizedImage
  ],
  styleUrls: ['./ai-assistant.component.css']
})
export class AiAssistantComponent implements OnInit {
  @Output() closeChatEvent = new EventEmitter<void>();
  messages: any[] = [];
  newMessage: string = '';

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.sendInitialBotMessage();
  }

  sendInitialBotMessage() {
    const initialMessage = { text: 'Hello! How can I help you today?', sender: 'bot' };
    this.messages.push(initialMessage);
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      const message = { text: this.newMessage, sender: 'user' };
      this.messages.push(message);
      this.newMessage = '';
      this.sendBotResponse(message.text);
    }
  }

  sendBotResponse(userMessage: string) {
    this.chatService.getMessages().subscribe((data: any) => {
      const botResponse = data.messages.find((msg: any) => msg.text.toLowerCase() === userMessage.toLowerCase());
      if (botResponse && botResponse.response) {
        this.messages.push({ text: botResponse.response, sender: 'bot' });
      } else {
        this.messages.push({ text: 'I am not sure how to respond to that.', sender: 'bot' });
      }
    });
  }

  closeChat() {
    this.messages = [];
    this.closeChatEvent.emit();
  }
}
