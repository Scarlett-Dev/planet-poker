import {Component} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})


export class CardComponent {
  arraystandard = [0, 1, 2, 3, 5, 8, 13, 20, 40, 100];
  cardContent = "Coffee!";
  message = '';


  logToConsole(message: number) {
    console.log("KUT MAAAAN");
    console.log(message);

  }
}
