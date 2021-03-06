import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {AdminModule} from "./admin/admin.module";
import {CategoryService} from "./services/category.service";
import {SubcategoryService} from "./services/subcategory.service";
import {ItemService} from "./services/item.service";
import {FormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {SharedModule} from "./shared/shared.module";
import {PaginatorPipe} from './pipes/paginator.pipe';
import {ProductComponent} from "./templates/product/product.component";
import {WishlistComponent} from './templates/wishlist/wishlist.component';

@NgModule({
    declarations: [AppComponent, PaginatorPipe, ProductComponent, WishlistComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,

        AdminModule,
        SharedModule,

        AppRoutingModule,
        FormsModule,
        FontAwesomeModule,
    ],
    providers: [CategoryService, SubcategoryService, ItemService],
    bootstrap: [AppComponent]
})
export class AppModule {

}
