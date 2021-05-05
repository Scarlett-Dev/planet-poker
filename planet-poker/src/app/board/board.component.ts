import {Component} from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  gameMode= '';

  tshirtArray = ['S', 'M', 'L', 'XL', 'XXL'];
  // arraystandard = [999, 1, 2, 3, 5, 8, 13, 20, 40, 100];
  arraystandard = ['1', '23'];

  onToggle(value: string){
    this.gameMode = value;
  }

  getGameMode(){
    if(this.gameMode === 'tshirt'){
      return this.tshirtArray;
    }else{
      return this.arraystandard;
    }
  }





}
