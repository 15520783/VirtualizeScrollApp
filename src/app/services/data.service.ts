import { Injectable } from '@angular/core';

export interface Message {
  fromName: string;
  subject: string;
  date: string;
  id: number;
  read: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public messages: Message[] = [];

  constructor() {
    const newStep = [];
    for (let i = 0; i < 100; i++) {
      newStep.push({
        fromName: 'Kelly Richardson ' + i,
        subject: 'Placeholder Headhots',
        date: 'Last Week',
        id: i,
        read: false,
      });
    }
    this.messages = [...this.messages, ...newStep];
  }

  public getMessages(): Message[] {
    return this.messages;
  }

  public getMessageById(id: number): Message {
    return this.messages[id];
  }

  public loadMore() {
    const count = this.messages.length;
    const newStep = [];
    for (let i = 0; i < 100; i++) {
      newStep.push({
        fromName: 'Kelly Richardson ' + (count + i),
        subject: 'Placeholder Headhots',
        date: 'Last Week',
        id: count + i,
        read: false,
      });
    }
    this.messages = [...this.messages, ...newStep];
  }
}
