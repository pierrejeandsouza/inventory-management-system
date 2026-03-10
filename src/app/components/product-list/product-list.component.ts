import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

export interface Product {
  id: number; name: string; category: string; sku: string;
  price: number; quantity: number; status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatTableModule, MatCardModule,
            MatIconModule, MatButtonModule, MatInputModule, MatFormFieldModule,
            MatSelectModule, MatTooltipModule, MatSnackBarModule],
  template: `
    <div class="page-container">
      <div class="page-header" style="display:flex; align-items:flex-start; justify-content:space-between;">
        <div>
          <h1>Products</h1>
          <p>All products currently in the inventory — {{ filteredProducts.length }} result(s)</p>
        </div>
        <button class="add-btn" (click)="addProduct()">
          <mat-icon>add</mat-icon>
          Add Product
        </button>
      </div>

      <mat-card class="glass-card">
        <mat-card-content>
          <!-- Filters Row -->
          <div class="filter-row">
            <mat-form-field appearance="outline" class="filter-field">
              <mat-label>Search</mat-label>
              <input matInput [(ngModel)]="searchText" placeholder="Name or SKU...">
              <mat-icon matSuffix style="color:#6b7c45;">search</mat-icon>
            </mat-form-field>
            <mat-form-field appearance="outline" class="filter-field">
              <mat-label>Category</mat-label>
              <mat-select [(ngModel)]="filterCategory">
                <mat-option value="">All Categories</mat-option>
                <mat-option *ngFor="let c of categories" [value]="c">{{ c }}</mat-option>
              </mat-select>
            </mat-form-field>
            <mat-form-field appearance="outline" class="filter-field">
              <mat-label>Status</mat-label>
              <mat-select [(ngModel)]="filterStatus">
                <mat-option value="">All Status</mat-option>
                <mat-option value="In Stock">In Stock</mat-option>
                <mat-option value="Low Stock">Low Stock</mat-option>
                <mat-option value="Out of Stock">Out of Stock</mat-option>
              </mat-select>
            </mat-form-field>
            <button class="clear-btn" (click)="clearFilters()" *ngIf="hasFilters">
              <mat-icon>close</mat-icon> Clear
            </button>
          </div>

          <table mat-table [dataSource]="filteredProducts">
            <ng-container matColumnDef="id">
              <th mat-header-cell *matHeaderCellDef>#</th>
              <td mat-cell *matCellDef="let p" style="color:#999; font-size:0.8rem;">{{ p.id }}</td>
            </ng-container>
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef>Product Name</th>
              <td mat-cell *matCellDef="let p"><span class="product-name">{{ p.name }}</span></td>
            </ng-container>
            <ng-container matColumnDef="sku">
              <th mat-header-cell *matHeaderCellDef>SKU</th>
              <td mat-cell *matCellDef="let p" style="font-family:monospace; color:#777; font-size:0.8rem;">{{ p.sku }}</td>
            </ng-container>
            <ng-container matColumnDef="category">
              <th mat-header-cell *matHeaderCellDef>Category</th>
              <td mat-cell *matCellDef="let p"><span class="cat-badge">{{ p.category }}</span></td>
            </ng-container>
            <ng-container matColumnDef="price">
              <th mat-header-cell *matHeaderCellDef>Price</th>
              <td mat-cell *matCellDef="let p" style="font-weight:600; color:#2a3118;">₹{{ p.price.toLocaleString() }}</td>
            </ng-container>
            <ng-container matColumnDef="quantity">
              <th mat-header-cell *matHeaderCellDef>Qty</th>
              <td mat-cell *matCellDef="let p">
                <span class="qty-pill" [class.low]="p.quantity < 15" [class.zero]="p.quantity === 0">
                  {{ p.quantity }}
                </span>
              </td>
            </ng-container>
            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let p">
                <span class="status-chip"
                  [class.in-stock]="p.status === 'In Stock'"
                  [class.low-stock]="p.status === 'Low Stock'"
                  [class.out-of-stock]="p.status === 'Out of Stock'">
                  {{ p.status }}
                </span>
              </td>
            </ng-container>
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef></th>
              <td mat-cell *matCellDef="let p">
                <button class="view-btn" (click)="viewDetail(p.id); $event.stopPropagation()" matTooltip="View Details">
                  <mat-icon>arrow_forward</mat-icon>
                </button>
              </td>
            </ng-container>
            <tr mat-header-row *matHeaderRowDef="columns"></tr>
            <tr mat-row *matRowDef="let row; columns: columns;" (click)="viewDetail(row.id)"></tr>
          </table>

          <div *ngIf="filteredProducts.length === 0" class="empty-state">
            <mat-icon>search_off</mat-icon>
            <p>No products match your filters</p>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .filter-row { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; margin-bottom: 8px; }
    .filter-field { min-width: 170px; }
    .add-btn {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 10px 20px; border-radius: 10px;
      background: #2a3118; color: #c8d89a;
      border: 1px solid rgba(107,124,69,0.4); font-size: 0.875rem; font-weight: 600;
      cursor: pointer; white-space: nowrap; transition: all 180ms;
    }
    .add-btn mat-icon { font-size: 18px; width: 18px; height: 18px; }
    .add-btn:hover { background: #3a4422; transform: translateY(-1px); }
    .clear-btn {
      display: inline-flex; align-items: center; gap: 4px;
      padding: 8px 14px; border-radius: 8px; background: #fdecea;
      color: #c0392b; border: 1px solid #f5c2c2; font-size: 0.8rem;
      font-weight: 600; cursor: pointer; transition: all 180ms; white-space: nowrap;
    }
    .clear-btn mat-icon { font-size: 16px; width: 16px; height: 16px; }
    .product-name { font-weight: 600; color: #1a1a1a; }
    .cat-badge {
      display: inline-block; padding: 3px 9px; border-radius: 6px;
      background: #f0ede3; color: #4a4a4a; font-size: 0.78rem; font-weight: 500;
    }
    .qty-pill {
      display: inline-block; padding: 3px 10px; border-radius: 10px;
      background: #e8f0d0; color: #2d5016; font-weight: 600; font-size: 0.82rem;
    }
    .qty-pill.low  { background: #f5e8b0; color: #5c3d00; }
    .qty-pill.zero { background: #f5c2c2; color: #5c0000; }
    .view-btn {
      background: none; border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      width: 32px; height: 32px; border-radius: 8px;
      color: #6b7c45; transition: background 150ms;
    }
    .view-btn:hover { background: rgba(107,124,69,0.12); }
    .view-btn mat-icon { font-size: 18px; width: 18px; height: 18px; }
    .empty-state {
      text-align: center; padding: 48px 0; color: #aaa;
    }
    .empty-state mat-icon { font-size: 48px; width: 48px; height: 48px; }
    .empty-state p { margin-top: 12px; font-size: 0.9rem; }
  `]
})
export class ProductListComponent {
  searchText = '';
  filterStatus = '';
  filterCategory = '';
  categories = ['Electronics', 'Furniture', 'Office', 'Accessories'];

  products: Product[] = [
    { id: 1,  name: 'Wireless Keyboard',    category: 'Electronics', sku: 'EL-WK-001', price: 1299,  quantity: 45,  status: 'In Stock'    },
    { id: 2,  name: 'USB-C Hub 7-Port',     category: 'Electronics', sku: 'EL-UC-002', price: 2499,  quantity: 12,  status: 'Low Stock'   },
    { id: 3,  name: 'Ergonomic Chair',      category: 'Furniture',   sku: 'FU-EC-001', price: 15999, quantity: 8,   status: 'Low Stock'   },
    { id: 4,  name: 'Standing Desk',        category: 'Furniture',   sku: 'FU-SD-002', price: 24999, quantity: 0,   status: 'Out of Stock'},
    { id: 5,  name: 'Noise-Cancel Headset', category: 'Electronics', sku: 'EL-NC-003', price: 5499,  quantity: 30,  status: 'In Stock'    },
    { id: 6,  name: 'Whiteboard 4x3',       category: 'Office',      sku: 'OF-WB-001', price: 3200,  quantity: 20,  status: 'In Stock'    },
    { id: 7,  name: 'Laptop Stand',         category: 'Accessories', sku: 'AC-LS-001', price: 899,   quantity: 60,  status: 'In Stock'    },
    { id: 8,  name: 'Monitor 27" 4K',       category: 'Electronics', sku: 'EL-MN-004', price: 32999, quantity: 5,   status: 'Low Stock'   },
    { id: 9,  name: 'Web Camera HD',        category: 'Electronics', sku: 'EL-WC-005', price: 3499,  quantity: 0,   status: 'Out of Stock'},
    { id: 10, name: 'Cable Organiser Set',  category: 'Accessories', sku: 'AC-CO-002', price: 349,   quantity: 150, status: 'In Stock'    },
  ];

  columns = ['id', 'name', 'sku', 'category', 'price', 'quantity', 'status', 'actions'];

  constructor(private router: Router, private snackBar: MatSnackBar) {}

  get hasFilters(): boolean {
    return !!(this.searchText || this.filterStatus || this.filterCategory);
  }

  get filteredProducts(): Product[] {
    return this.products.filter(p => {
      const matchText = !this.searchText ||
        p.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        p.sku.toLowerCase().includes(this.searchText.toLowerCase());
      const matchStatus   = !this.filterStatus   || p.status   === this.filterStatus;
      const matchCategory = !this.filterCategory || p.category === this.filterCategory;
      return matchText && matchStatus && matchCategory;
    });
  }

  clearFilters(): void {
    this.searchText = '';
    this.filterStatus = '';
    this.filterCategory = '';
  }

  viewDetail(id: number): void {
    this.router.navigate(['/product', id]);
  }

  addProduct(): void {
    this.snackBar.open('Add Product form coming soon!', 'Dismiss', {
      duration: 3000, panelClass: ['success-snack']
    });
  }
}
