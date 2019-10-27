import {Component, OnInit} from '@angular/core';
import {AppService} from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public cocktail = {};
  public errorMsg: string;

  constructor(private appService: AppService) {
  }

  ngOnInit() {
    this.getCocktail();
  }

  getCocktail() {
    this.appService.getOne().subscribe(cocktail => {
      this.cocktail = cocktail;
      this.errorMsg = void 0;
    }, () => {
      this.cocktail = {};
      this.errorMsg = 'Opération impossible';
    });
  }
}
