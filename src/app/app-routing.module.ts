

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorComponent } from './vendor/vendor.component';
import { ItemComponent } from './item/item.component';
import { DisplayOrderComponent } from './display-order/display-order.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  // { path: '', component: AppComponent }, // Default route is now the home page
  { path: 'vendor', component: VendorComponent, data: { title: 'VENDOR PROFILE' } },
  { path: 'item', component: ItemComponent , data: { title: 'ITEM PROFILE' }},
  { path: 'display-order', component: DisplayOrderComponent,data: { title: 'PURCHASE ORDER' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
