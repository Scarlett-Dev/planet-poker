import {Component} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})


export class CardComponent {
  //TODO: check if this is being used
  arraystandard = [0, 1, 2, 3, 5, 8, 13, 20, 40, 100];
  cardContent = "Coffee!";
  message = '';

}
