import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AdminComponent} from "./admin.component";
import {CategoriesComponent} from "./categories/categories.component";
import {SubcategoriesComponent} from "./subcategories/subcategories.component";
import {ItemsComponent} from "./items/items.component";
import {AuthGuard} from "../auth.guard";
import {ItemsResolver} from "../shared/resolvers/items.resolver";
import {SubcategoriesResolver} from "../shared/resolvers/subcategories.resolver";
import {CategoriesResolver} from "../shared/resolvers/categories.resolver";

const routes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'categories',
                component: CategoriesComponent,
                resolve: {
                    categories: CategoriesResolver
                }
            },
            {
                path: 'subcategories',
                component: SubcategoriesComponent,
                resolve: {
                    subCategories: SubcategoriesResolver
                }
            },
            {
                path: 'items',
                component: ItemsComponent,
                resolve: {
                    items: ItemsResolver
                }
            },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {

}