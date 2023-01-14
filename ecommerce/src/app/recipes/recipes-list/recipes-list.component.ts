import { Component } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent {
  recipes: Recipe[] = [
    new Recipe('A test Recipe', 'This is a test Recipe',
    'https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2022/09/1440/810/Million-dollar-bars-10.jpg?ve=1&tl=1')
  ];

constructor() {

}


}
