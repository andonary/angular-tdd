import {Component, OnInit} from '@angular/core';
import {AppService} from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  cocktail = {};

  constructor(private appService: AppService) {
  }

  async ngOnInit() {
    this.getCocktail();
  }

  getCocktail() {
    this.appService.getOne().subscribe(cocktail => {
      this.cocktail = cocktail;
    });
  }
}
