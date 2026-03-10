import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Product } from '../product-list/product-list.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatIconModule, MatButtonModule,
            MatDividerModule, MatSnackBarModule],
  template: `
    <div class="page-container" *ngIf="product; else notFound">
      <div class="page-header" style="display:flex; align-items:center; gap:12px;">
        <a class="back-btn" routerLink="/products">
          <mat-icon>arrow_back</mat-icon>
        </a>
        <div>
          <h1>{{ product.name }}</h1>
          <p>Product Detail — SKU: <code>{{ product.sku }}</code></p>
        </div>
        <span class="spacer"></span>
        <span class="status-chip"
          [class.in-stock]="product.status === 'In Stock'"
          [class.low-stock]="product.status === 'Low Stock'"
          [class.out-of-stock]="product.status === 'Out of Stock'">
          {{ product.status }}
        </span>
      </div>

      <div class="detail-grid">
        <!-- Main Info Card -->
        <mat-card class="glass-card">
          <mat-card-header>
            <mat-icon class="section-icon">info</mat-icon>
            <mat-card-title>Product Information</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="detail-row">
              <span class="label">Product ID</span>
              <span class="value">#{{ product.id }}</span>
            </div>
            <mat-divider></mat-divider>
            <div class="detail-row">
              <span class="label">Name</span>
              <span class="value fw600">{{ product.name }}</span>
            </div>
            <mat-divider></mat-divider>
            <div class="detail-row">
              <span class="label">SKU</span>
              <code class="sku-code">{{ product.sku }}</code>
            </div>
            <mat-divider></mat-divider>
            <div class="detail-row">
              <span class="label">Category</span>
              <span class="cat-badge">{{ product.category }}</span>
            </div>
            <mat-divider></mat-divider>
            <div class="detail-row">
              <span class="label">Unit Price</span>
              <span class="price-value">₹{{ product.price.toLocaleString() }}</span>
            </div>
            <mat-divider></mat-divider>
            <div class="detail-row">
              <span class="label">Total Value</span>
              <span class="value fw600">₹{{ (product.price * product.quantity).toLocaleString() }}</span>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Stock & Actions -->
        <div class="side-cards">
          <!-- Stock Meter -->
          <mat-card class="glass-card stock-card"
                    [class.warn-border]="product.quantity > 0 && product.quantity < 15"
                    [class.danger-border]="product.quantity === 0">
            <mat-card-content>
              <div class="stock-header">
                <mat-icon class="stock-icon">inventory_2</mat-icon>
                <span class="stock-label">Stock Level</span>
              </div>
              <div class="stock-number" [class.warn-num]="product.quantity < 15 && product.quantity > 0"
                                        [class.danger-num]="product.quantity === 0">
                {{ product.quantity }}
              </div>
              <div class="stock-sub">Units in Stock</div>
              <!-- Stock bar -->
              <div class="stock-track">
                <div class="stock-fill"
                  [style.width.%]="stockPercent"
                  [class.warn-fill]="product.quantity < 15 && product.quantity > 0"
                  [class.danger-fill]="product.quantity === 0">
                </div>
              </div>
              <div class="stock-hint">
                <span *ngIf="product.quantity === 0" class="hint-red">⚠ Out of stock — restock immediately</span>
                <span *ngIf="product.quantity > 0 && product.quantity < 15" class="hint-amber">⚡ Low stock — consider restocking</span>
                <span *ngIf="product.quantity >= 15" class="hint-green">✓ Healthy stock level</span>
              </div>
            </mat-card-content>
          </mat-card>

          <!-- Actions Card -->
          <mat-card class="glass-card">
            <mat-card-header>
              <mat-icon class="section-icon">bolt</mat-icon>
              <mat-card-title>Quick Actions</mat-card-title>
            </mat-card-header>
            <mat-card-content class="action-btns">
              <button class="action-btn primary-btn" (click)="restock()">
                <mat-icon>add_circle</mat-icon> Restock Product
              </button>
              <button class="action-btn secondary-btn" (click)="editProduct()">
                <mat-icon>edit</mat-icon> Edit Details
              </button>
              <button class="action-btn danger-btn" (click)="removeProduct()">
                <mat-icon>delete_outline</mat-icon> Remove Product
              </button>
            </mat-card-content>
          </mat-card>
        </div>
      </div>
    </div>

    <ng-template #notFound>
      <div class="page-container" style="text-align:center; padding:80px 32px;">
        <mat-icon style="font-size:72px; width:72px; height:72px; color:#d0ccc0;">search_off</mat-icon>
        <h2 style="color:#aaa; margin-top:20px; font-weight:600;">Product not found</h2>
        <p style="color:#ccc; margin-top:8px;">The product you're looking for doesn't exist.</p>
        <a class="action-btn primary-btn" routerLink="/products" style="display:inline-flex; margin-top:24px; text-decoration:none;">
          <mat-icon>arrow_back</mat-icon> Back to Products
        </a>
      </div>
    </ng-template>
  `,
  styles: [`
    .back-btn {
      display: flex; align-items: center; justify-content: center;
      width: 38px; height: 38px; border-radius: 10px;
      background: #f0ede3; color: #4a4a4a; border: 1px solid rgba(0,0,0,0.1);
      transition: all 180ms; cursor: pointer; text-decoration: none;
    }
    .back-btn:hover { background: #e8e4d8; transform: translateX(-2px); }
    code { font-family: monospace; font-size: 0.85rem; color: #555; }

    /* Section icon */
    .section-icon { color: #6b7c45; font-size: 20px; width: 20px; height: 20px; margin-right: 8px; }
    mat-card-header { display: flex; align-items: center; padding-bottom: 12px; }

    /* Detail grid */
    .detail-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 18px; align-items: start; }
    @media (max-width: 800px) { .detail-grid { grid-template-columns: 1fr; } }

    .detail-row { display: flex; justify-content: space-between; align-items: center; padding: 14px 0; }
    .label { font-weight: 500; color: #888; font-size: 0.875rem; }
    .value { font-size: 0.9rem; color: #1a1a1a; }
    .fw600 { font-weight: 600; }
    .sku-code { font-family: monospace; font-size: 0.85rem; color: #555; background: #f0ede3; padding: 3px 8px; border-radius: 5px; }
    .cat-badge { display: inline-block; padding: 3px 10px; border-radius: 6px; background: #e8f0d0; color: #2d5016; font-size: 0.8rem; font-weight: 600; }
    .price-value { font-size: 1.15rem; font-weight: 700; color: #4a5730; }

    /* Side cards */
    .side-cards { display: flex; flex-direction: column; gap: 16px; }

    /* Stock card */
    .stock-card { text-align: center; }
    .stock-header { display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 12px; }
    .stock-icon { font-size: 22px; width: 22px; height: 22px; color: #6b7c45; }
    .stock-label { font-size: 0.8rem; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 0.06em; }
    .stock-number { font-size: 4rem; font-weight: 800; color: #2a3118; line-height: 1; letter-spacing: -0.04em; }
    .stock-number.warn-num   { color: #7a6428; }
    .stock-number.danger-num { color: #7a1818; }
    .stock-sub { font-size: 0.8rem; color: #999; margin-top: 4px; }
    .stock-track { height: 8px; background: #e8e4d8; border-radius: 4px; overflow: hidden; margin: 14px 0 8px; }
    .stock-fill { height: 100%; background: #6b7c45; border-radius: 4px; transition: width 800ms ease; min-width: 4px; }
    .stock-fill.warn-fill   { background: #b8960a; }
    .stock-fill.danger-fill { background: #c0392b; width: 4px !important; }
    .stock-hint { font-size: 0.75rem; font-weight: 500; }
    .hint-green  { color: #2d5016; }
    .hint-amber  { color: #7a6428; }
    .hint-red    { color: #7a1818; }
    .warn-border   { border-left: 4px solid #b8960a !important; }
    .danger-border { border-left: 4px solid #c0392b !important; }

    /* Action buttons */
    .action-btns { display: flex; flex-direction: column; gap: 10px; padding-top: 4px; }
    .action-btn {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 11px 16px; border-radius: 10px; font-size: 0.875rem; font-weight: 600;
      border: none; cursor: pointer; transition: all 180ms; width: 100%;
    }
    .action-btn mat-icon { font-size: 18px; width: 18px; height: 18px; }
    .primary-btn   { background: #2a3118; color: #c8d89a; border: 1px solid rgba(107,124,69,0.4); }
    .primary-btn:hover { background: #3a4422; }
    .secondary-btn { background: #f0ede3; color: #2a2a2a; border: 1px solid rgba(0,0,0,0.1); }
    .secondary-btn:hover { background: #e8e4d8; }
    .danger-btn    { background: #fdecea; color: #c0392b; border: 1px solid #f5c2c2; }
    .danger-btn:hover { background: #fad7d4; }
  `]
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;

  private allProducts: Product[] = [
    { id: 1,  name: 'Wireless Keyboard',    category: 'Electronics', sku: 'EL-WK-001', price: 1299,  quantity: 45,  status: 'In Stock' },
    { id: 2,  name: 'USB-C Hub 7-Port',     category: 'Electronics', sku: 'EL-UC-002', price: 2499,  quantity: 12,  status: 'Low Stock' },
    { id: 3,  name: 'Ergonomic Chair',      category: 'Furniture',   sku: 'FU-EC-001', price: 15999, quantity: 8,   status: 'Low Stock' },
    { id: 4,  name: 'Standing Desk',        category: 'Furniture',   sku: 'FU-SD-002', price: 24999, quantity: 0,   status: 'Out of Stock' },
    { id: 5,  name: 'Noise-Cancel Headset', category: 'Electronics', sku: 'EL-NC-003', price: 5499,  quantity: 30,  status: 'In Stock' },
    { id: 6,  name: 'Whiteboard 4x3',       category: 'Office',      sku: 'OF-WB-001', price: 3200,  quantity: 20,  status: 'In Stock' },
    { id: 7,  name: 'Laptop Stand',         category: 'Accessories', sku: 'AC-LS-001', price: 899,   quantity: 60,  status: 'In Stock' },
    { id: 8,  name: 'Monitor 27" 4K',       category: 'Electronics', sku: 'EL-MN-004', price: 32999, quantity: 5,   status: 'Low Stock' },
    { id: 9,  name: 'Web Camera HD',        category: 'Electronics', sku: 'EL-WC-005', price: 3499,  quantity: 0,   status: 'Out of Stock' },
    { id: 10, name: 'Cable Organiser Set',  category: 'Accessories', sku: 'AC-CO-002', price: 349,   quantity: 150, status: 'In Stock' },
  ];

  constructor(private route: ActivatedRoute, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.allProducts.find(p => p.id === id);
  }

  get stockPercent(): number {
    if (!this.product) return 0;
    return Math.min(100, Math.round((this.product.quantity / 200) * 100));
  }

  restock():       void { this.snackBar.open(`Restock initiated for ${this.product?.name}!`, '✓', { duration: 3000, panelClass: ['success-snack'] }); }
  editProduct():   void { this.snackBar.open('Edit product form coming soon!', 'Ok', { duration: 3000 }); }
  removeProduct(): void { this.snackBar.open('Remove product confirmation coming soon!', 'Ok', { duration: 3000 }); }
}
