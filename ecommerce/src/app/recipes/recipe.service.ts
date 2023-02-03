import { Recipe } from "./recipe.model";
import { EventEmitter } from '@angular/core';
import { Ingredient } from "../shared/ingredient.model";

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipe: Recipe[] = [
    new Recipe(
      'A test Recipe', 
      'This is a test Recipe',
    'https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2022/09/1440/810/Million-dollar-bars-10.jpg?ve=1&tl=1',
    [
      new Ingredient('sugar', 1),
      new Ingredient('flour', 1)
    ]),
    new Recipe(
      'A test Recipe', 
      'This is another test Recipe',
    'https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2022/09/1440/810/Million-dollar-bars-10.jpg?ve=1&tl=1',
    [
      new Ingredient('butter', 1),
      new Ingredient('baking Powder', 1)
    ])
  ];

  getRecipes() {
    return this.recipe.slice();
  }

}
