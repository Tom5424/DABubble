import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [NgClass],
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss', './intro.component.media.scss'],
})


export class IntroComponent implements OnInit {
  dabubbleLetteringIsDisplayed: boolean = false;
  moveInTheLeftUpperCorner: boolean = false;


  ngOnInit(): void {
    this.playIntroAnimation();
  }


  playIntroAnimation(): void {
    setTimeout(() => {
      this.dabubbleLetteringIsDisplayed = true;
    }, 1000);
    setTimeout(() => {
      this.moveInTheLeftUpperCorner = true;
    }, 2500);
  }
}
