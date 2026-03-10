import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

interface CategoryReport {
  name: string; products: number; totalQty: number; totalValue: number; avgRating: number;
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatIconModule, MatButtonModule, MatDividerModule],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1>Reports</h1>
        <p>Inventory summary and analytics — as of 9 Mar 2026</p>
      </div>

      <!-- KPI Row -->
      <div class="stat-cards">
        <mat-card class="stat-card primary">
          <mat-card-content>
            <div class="stat-number">128</div>
            <div class="stat-label">Total Products</div>
          </mat-card-content>
          <mat-icon class="card-bg-icon">inventory_2</mat-icon>
        </mat-card>
        <mat-card class="stat-card success">
          <mat-card-content>
            <div class="stat-number">{{ totalQty | number }}</div>
            <div class="stat-label">Total Units</div>
          </mat-card-content>
          <mat-icon class="card-bg-icon">widgets</mat-icon>
        </mat-card>
        <mat-card class="stat-card warn">
          <mat-card-content>
            <div class="stat-number">₹{{ (totalValue / 100000).toFixed(1) }}L</div>
            <div class="stat-label">Inventory Value</div>
          </mat-card-content>
          <mat-icon class="card-bg-icon">currency_rupee</mat-icon>
        </mat-card>
        <mat-card class="stat-card accent">
          <mat-card-content>
            <div class="stat-number">8</div>
            <div class="stat-label">Orders This Month</div>
          </mat-card-content>
          <mat-icon class="card-bg-icon">receipt_long</mat-icon>
        </mat-card>
      </div>

      <!-- Category Breakdown -->
      <div class="report-grid">
        <mat-card class="glass-card">
          <mat-card-header>
            <mat-icon class="section-icon">category</mat-icon>
            <mat-card-title>Category Breakdown</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <table class="report-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Products</th>
                  <th>Total Units</th>
                  <th>Total Value</th>
                  <th>Share</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let c of categoryReports">
                  <td><span class="cat-pill">{{ c.name }}</span></td>
                  <td>{{ c.products }}</td>
                  <td><span class="qty-badge">{{ c.totalQty }}</span></td>
                  <td class="value-cell">₹{{ c.totalValue.toLocaleString() }}</td>
                  <td>
                    <div class="share-bar-wrap">
                      <div class="share-bar">
                        <div class="share-fill" [style.width.%]="(c.totalValue / totalValue) * 100"></div>
                      </div>
                      <span class="share-pct">{{ ((c.totalValue / totalValue) * 100).toFixed(0) }}%</span>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr class="total-row">
                  <td><strong>Total</strong></td>
                  <td>10</td>
                  <td><span class="qty-badge">{{ totalQty }}</span></td>
                  <td class="value-cell"><strong>₹{{ totalValue.toLocaleString() }}</strong></td>
                  <td>100%</td>
                </tr>
              </tfoot>
            </table>
          </mat-card-content>
        </mat-card>

        <!-- Order Summary -->
        <mat-card class="glass-card">
          <mat-card-header>
            <mat-icon class="section-icon">bar_chart</mat-icon>
            <mat-card-title>Order Summary</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="order-stat-row">
              <div class="order-stat">
                <div class="os-label">Total Orders</div>
                <div class="os-value">8</div>
              </div>
              <div class="order-stat">
                <div class="os-label">Inflow</div>
                <div class="os-value inflow">5</div>
              </div>
              <div class="order-stat">
                <div class="os-label">Outflow</div>
                <div class="os-value outflow">3</div>
              </div>
            </div>
            <mat-divider style="margin: 16px 0;"></mat-divider>
            <div class="order-status-list">
              <div class="ost-row">
                <span class="status-chip delivered">Delivered</span>
                <div class="ost-bar-wrap">
                  <div class="ost-bar"><div class="ost-fill green" style="width:62.5%;"></div></div>
                </div>
                <span class="ost-count">5</span>
              </div>
              <div class="ost-row">
                <span class="status-chip processing">Processing</span>
                <div class="ost-bar-wrap">
                  <div class="ost-bar"><div class="ost-fill blue" style="width:12.5%;"></div></div>
                </div>
                <span class="ost-count">1</span>
              </div>
              <div class="ost-row">
                <span class="status-chip pending">Pending</span>
                <div class="ost-bar-wrap">
                  <div class="ost-bar"><div class="ost-fill amber" style="width:12.5%;"></div></div>
                </div>
                <span class="ost-count">1</span>
              </div>
              <div class="ost-row">
                <span class="status-chip cancelled">Cancelled</span>
                <div class="ost-bar-wrap">
                  <div class="ost-bar"><div class="ost-fill red" style="width:12.5%;"></div></div>
                </div>
                <span class="ost-count">1</span>
              </div>
            </div>
            <mat-divider style="margin: 16px 0;"></mat-divider>
            <div class="supplier-stat-row">
              <div class="order-stat">
                <div class="os-label">Active Suppliers</div>
                <div class="os-value">5</div>
              </div>
              <div class="order-stat">
                <div class="os-label">Inactive</div>
                <div class="os-value" style="color:#999;">1</div>
              </div>
              <div class="order-stat">
                <div class="os-label">Avg Rating</div>
                <div class="os-value" style="color:#b8960a;">4.2 ★</div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Stock Alerts -->
      <mat-card class="glass-card alerts-card">
        <mat-card-header>
          <mat-icon class="section-icon" style="color:#c0392b;">notifications_active</mat-icon>
          <mat-card-title>Stock Alerts</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="alert-list">
            <div class="alert-item danger">
              <mat-icon>cancel</mat-icon>
              <div class="alert-body">
                <span class="alert-title">Standing Desk (FU-SD-002)</span>
                <span class="alert-sub">Out of Stock · Furniture · ₹24,999</span>
              </div>
              <span class="status-chip out-of-stock">Out of Stock</span>
            </div>
            <div class="alert-item danger">
              <mat-icon>cancel</mat-icon>
              <div class="alert-body">
                <span class="alert-title">Web Camera HD (EL-WC-005)</span>
                <span class="alert-sub">Out of Stock · Electronics · ₹3,499</span>
              </div>
              <span class="status-chip out-of-stock">Out of Stock</span>
            </div>
            <div class="alert-item warn">
              <mat-icon>warning</mat-icon>
              <div class="alert-body">
                <span class="alert-title">Monitor 27" 4K (EL-MN-004)</span>
                <span class="alert-sub">5 units remaining · Electronics · ₹32,999</span>
              </div>
              <span class="status-chip low-stock">Low Stock</span>
            </div>
            <div class="alert-item warn">
              <mat-icon>warning</mat-icon>
              <div class="alert-body">
                <span class="alert-title">Ergonomic Chair (FU-EC-001)</span>
                <span class="alert-sub">8 units remaining · Furniture · ₹15,999</span>
              </div>
              <span class="status-chip low-stock">Low Stock</span>
            </div>
            <div class="alert-item warn">
              <mat-icon>warning</mat-icon>
              <div class="alert-body">
                <span class="alert-title">USB-C Hub 7-Port (EL-UC-002)</span>
                <span class="alert-sub">12 units remaining · Electronics · ₹2,499</span>
              </div>
              <span class="status-chip low-stock">Low Stock</span>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .section-icon { color: #6b7c45; font-size: 20px; width: 20px; height: 20px; margin-right: 8px; }
    mat-card-header { display: flex; align-items: center; padding-bottom: 14px; }

    .report-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 18px; margin-bottom: 18px; }
    @media (max-width: 900px) { .report-grid { grid-template-columns: 1fr; } }

    /* Category table */
    .report-table { width: 100%; border-collapse: collapse; }
    .report-table thead tr { background: #f0ede3; }
    .report-table th { text-align: left; padding: 10px 12px; font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #6b6b6b; }
    .report-table td { padding: 12px 12px; font-size: 0.875rem; border-bottom: 1px solid rgba(0,0,0,0.05); }
    .report-table tbody tr:hover { background: rgba(107,124,69,0.05); }
    .total-row td { font-size: 0.875rem; border-top: 2px solid rgba(0,0,0,0.1); border-bottom: none; padding-top: 14px; }
    .cat-pill { display: inline-block; padding: 3px 9px; border-radius: 6px; background: #e8f0d0; color: #2d5016; font-size: 0.78rem; font-weight: 600; }
    .qty-badge { display: inline-block; background: #f0ede3; color: #4a4a4a; padding: 2px 9px; border-radius: 10px; font-weight: 600; font-size: 0.82rem; }
    .value-cell { font-weight: 600; color: #2a3118; }
    .share-bar-wrap { display: flex; align-items: center; gap: 8px; }
    .share-bar { flex: 1; height: 6px; background: #e8e4d8; border-radius: 3px; overflow: hidden; }
    .share-fill { height: 100%; background: #6b7c45; border-radius: 3px; }
    .share-pct { font-size: 0.75rem; color: #777; min-width: 30px; }

    /* Order stats */
    .order-stat-row, .supplier-stat-row { display: flex; gap: 0; }
    .order-stat { flex: 1; text-align: center; padding: 8px; }
    .os-label { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.04em; color: #999; font-weight: 600; margin-bottom: 4px; }
    .os-value { font-size: 1.6rem; font-weight: 800; color: #1a1a1a; }
    .os-value.inflow  { color: #2d5016; }
    .os-value.outflow { color: #7a2818; }
    .order-status-list { display: flex; flex-direction: column; gap: 10px; }
    .ost-row { display: flex; align-items: center; gap: 10px; }
    .ost-bar-wrap { flex: 1; }
    .ost-bar { height: 7px; background: #e8e4d8; border-radius: 4px; overflow: hidden; }
    .ost-fill { height: 100%; border-radius: 4px; }
    .ost-fill.green { background: #6b7c45; }
    .ost-fill.blue  { background: #3a7abd; }
    .ost-fill.amber { background: #b8960a; }
    .ost-fill.red   { background: #c0392b; }
    .ost-count { font-size: 0.8rem; font-weight: 700; color: #555; min-width: 16px; text-align: right; }

    /* Alerts */
    .alert-list { display: flex; flex-direction: column; gap: 12px; }
    .alert-item { display: flex; align-items: center; gap: 12px; padding: 12px 14px; border-radius: 10px; }
    .alert-item mat-icon { flex-shrink: 0; font-size: 22px; width: 22px; height: 22px; }
    .alert-item.danger { background: #fdf0f0; border: 1px solid #f5c2c2; }
    .alert-item.danger mat-icon { color: #c0392b; }
    .alert-item.warn   { background: #fdf8ec; border: 1px solid #f5e8b0; }
    .alert-item.warn mat-icon { color: #b8960a; }
    .alert-body { flex: 1; display: flex; flex-direction: column; gap: 2px; }
    .alert-title { font-weight: 600; font-size: 0.875rem; color: #1a1a1a; }
    .alert-sub   { font-size: 0.78rem; color: #888; }
  `]
})
export class ReportsComponent {
  categoryReports: CategoryReport[] = [
    { name: 'Electronics',  products: 5, totalQty: 92,  totalValue: 45694, avgRating: 4.8 },
    { name: 'Furniture',    products: 2, totalQty: 8,   totalValue: 40998, avgRating: 4.0 },
    { name: 'Office',       products: 1, totalQty: 20,  totalValue: 3200,  avgRating: 4.0 },
    { name: 'Accessories',  products: 2, totalQty: 210, totalValue: 2843,  avgRating: 4.0 },
  ];

  get totalQty():   number { return this.categoryReports.reduce((s, c) => s + c.totalQty, 0); }
  get totalValue(): number { return this.categoryReports.reduce((s, c) => s + c.totalValue, 0); }
}
