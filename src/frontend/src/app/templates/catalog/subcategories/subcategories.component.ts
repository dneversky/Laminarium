import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {CategoryService} from "../../../services/category.service";
import {Category} from "../../../models/category";
import {Subcategory} from "../../../models/subcategory";

@Component({
  selector: 'app-subcategories-page',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.css']
})
export class SubcategoriesComponent implements OnInit {

  public subCategories: Subcategory[];

  constructor(private activatedRoute: ActivatedRoute,
              private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.categoryService.getByName(params.category).subscribe((response: Category) => {
        this.subCategories = response.subCategories.filter(x => x.items.length > 0);
      });
    });
  }

}
