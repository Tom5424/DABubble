import { Component } from '@angular/core';


@Component({
  selector: 'app-message-in-thread-direct-message',
  standalone: true,
  imports: [],
  templateUrl: './message-in-thread-direct-message.component.html',
  styleUrl: './message-in-thread-direct-message.component.scss'
})


export class MessageInThreadDirectMessageComponent {
  barToSelectEmojisAreOpen: boolean = false;
  menuMoreOptionsAreOpen: boolean = false;


  closeOpenMenusInMessageIfHoverOutside(): void {
    this.barToSelectEmojisAreOpen = false;
    this.menuMoreOptionsAreOpen = false;
  }


  openBarToSelectEmojis(): void {
    this.barToSelectEmojisAreOpen = !this.barToSelectEmojisAreOpen;
    this.menuMoreOptionsAreOpen = false;
  }


  openMenuMoreOptions(): void {
    this.menuMoreOptionsAreOpen = !this.menuMoreOptionsAreOpen;
  }

}
