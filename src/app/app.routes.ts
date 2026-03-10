import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { SupplierListComponent } from './components/supplier-list/supplier-list.component';
import { OrderTrackerComponent } from './components/order-tracker/order-tracker.component';
import { ReportsComponent } from './components/reports/reports.component';

export const routes: Routes = [
  { path: '',            redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'products',   component: ProductListComponent },
  { path: 'product/:id',component: ProductDetailComponent },
  { path: 'suppliers',  component: SupplierListComponent },
  { path: 'orders',     component: OrderTrackerComponent },
  { path: 'reports',    component: ReportsComponent },
  { path: '**',         redirectTo: 'dashboard' }
];
