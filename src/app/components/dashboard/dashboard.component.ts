import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

interface Activity { description: string; time: string; icon: string; iconBg: string; }
interface CategoryStock { name: string; pct: number; color: string; }
interface TopProduct { name: string; sku: string; qty: number; status: string; }

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatIconModule, MatButtonModule, MatListModule, MatDividerModule],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1>Dashboard</h1>
        <p>Inventory overview — at a glance · Last updated 9 Mar 2026</p>
      </div>

      <!-- Stat Cards -->
      <div class="stat-cards">
        <mat-card class="stat-card primary">
          <mat-card-content>
            <div class="stat-number">128</div>
            <div class="stat-label">Total Products</div>
          </mat-card-content>
          <mat-icon class="card-bg-icon">inventory</mat-icon>
        </mat-card>
        <mat-card class="stat-card success">
          <mat-card-content>
            <div class="stat-number">94</div>
            <div class="stat-label">In Stock</div>
          </mat-card-content>
          <mat-icon class="card-bg-icon">check_circle</mat-icon>
        </mat-card>
        <mat-card class="stat-card warn">
          <mat-card-content>
            <div class="stat-number">21</div>
            <div class="stat-label">Low Stock</div>
          </mat-card-content>
          <mat-icon class="card-bg-icon">warning</mat-icon>
        </mat-card>
        <mat-card class="stat-card accent">
          <mat-card-content>
            <div class="stat-number">13</div>
            <div class="stat-label">Out of Stock</div>
          </mat-card-content>
          <mat-icon class="card-bg-icon">cancel</mat-icon>
        </mat-card>
      </div>

      <!-- Quick Actions Row -->
      <div class="quick-row">
        <a class="quick-action-btn" routerLink="/products">
          <mat-icon>inventory_2</mat-icon>
          <span>View Products</span>
        </a>
        <a class="quick-action-btn accent-btn" routerLink="/orders">
          <mat-icon>receipt_long</mat-icon>
          <span>Track Orders</span>
        </a>
        <a class="quick-action-btn ghost-btn" routerLink="/suppliers">
          <mat-icon>local_shipping</mat-icon>
          <span>Suppliers</span>
        </a>
        <a class="quick-action-btn ghost-btn" routerLink="/reports">
          <mat-icon>bar_chart</mat-icon>
          <span>Reports</span>
        </a>
      </div>

      <!-- Inventory Health + Activity -->
      <div class="dash-grid">
        <!-- Inventory Health -->
        <mat-card class="glass-card health-card">
          <mat-card-header>
            <mat-icon class="section-icon">monitor_heart</mat-icon>
            <mat-card-title>Inventory Health</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="health-bars">
              <div *ngFor="let cat of categoryStock" class="health-row">
                <div class="health-meta">
                  <span class="health-name">{{ cat.name }}</span>
                  <span class="health-pct">{{ cat.pct }}%</span>
                </div>
                <div class="health-track">
                  <div class="health-fill" [style.width.%]="cat.pct" [style.background]="cat.color"></div>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Recent Activity -->
        <mat-card class="glass-card">
          <mat-card-header>
            <mat-icon class="section-icon">timeline</mat-icon>
            <mat-card-title>Recent Activity</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="activity-list">
              <div *ngFor="let a of activities; let last = last" class="activity-item">
                <div class="activity-icon-wrap" [style.background]="a.iconBg">
                  <mat-icon class="activity-icon">{{ a.icon }}</mat-icon>
                </div>
                <div class="activity-body">
                  <div class="activity-desc">{{ a.description }}</div>
                  <div class="activity-time">{{ a.time }}</div>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Top Products -->
      <mat-card class="glass-card top-products-card">
        <mat-card-header>
          <mat-icon class="section-icon">emoji_events</mat-icon>
          <mat-card-title>Top Products by Stock</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <table class="top-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Qty</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let p of topProducts">
                <td><strong>{{ p.name }}</strong></td>
                <td class="mono">{{ p.sku }}</td>
                <td><span class="qty-badge">{{ p.qty }}</span></td>
                <td><span class="status-chip" [ngClass]="statusClass(p.status)">{{ p.status }}</span></td>
              </tr>
            </tbody>
          </table>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    /* Quick actions */
    .quick-row {
      display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 24px;
    }
    .quick-action-btn {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 10px 20px; border-radius: 10px;
      font-size: 0.875rem; font-weight: 600; text-decoration: none;
      background: #2a3118; color: #c8d89a;
      border: 1px solid rgba(107,124,69,0.35);
      transition: all 180ms ease;
      cursor: pointer;
    }
    .quick-action-btn mat-icon { font-size: 18px; width: 18px; height: 18px; }
    .quick-action-btn:hover { background: #3a4422; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
    .accent-btn { background: #4a5730; color: #e8f4c8; }
    .accent-btn:hover { background: #5a6a38; }
    .ghost-btn { background: #fff; color: #4a4a4a; border-color: rgba(0,0,0,0.1); }
    .ghost-btn mat-icon { color: #6b7c45; }
    .ghost-btn:hover { background: #f5f3ec; border-color: rgba(107,124,69,0.3); }

    /* Section icon */
    .section-icon { color: #6b7c45; font-size: 20px; width: 20px; height: 20px; margin-right: 8px; }
    mat-card-header { display: flex; align-items: center; padding-bottom: 16px; }

    /* Dashboard grid */
    .dash-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-bottom: 18px; }
    @media (max-width: 768px) { .dash-grid { grid-template-columns: 1fr; } }

    /* Health bars */
    .health-bars { display: flex; flex-direction: column; gap: 14px; padding-top: 4px; }
    .health-row {}
    .health-meta { display: flex; justify-content: space-between; margin-bottom: 6px; }
    .health-name { font-size: 0.85rem; font-weight: 500; color: #2a2a2a; }
    .health-pct { font-size: 0.8rem; font-weight: 600; color: #6b7c45; }
    .health-track {
      height: 8px; background: #e8e4d8; border-radius: 4px; overflow: hidden;
    }
    .health-fill {
      height: 100%; border-radius: 4px;
      transition: width 800ms cubic-bezier(0.4,0,0.2,1);
    }

    /* Activity feed */
    .activity-list { display: flex; flex-direction: column; gap: 16px; padding-top: 4px; }
    .activity-item { display: flex; align-items: flex-start; gap: 12px; }
    .activity-icon-wrap {
      width: 36px; height: 36px; border-radius: 10px; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
    }
    .activity-icon { font-size: 18px; width: 18px; height: 18px; color: #fff; }
    .activity-body { flex: 1; }
    .activity-desc { font-size: 0.85rem; font-weight: 500; color: #2a2a2a; line-height: 1.3; }
    .activity-time { font-size: 0.75rem; color: #9a9a9a; margin-top: 2px; }

    /* Top Products table */
    .top-products-card {}
    .top-table { width: 100%; border-collapse: collapse; margin-top: 4px; }
    .top-table thead tr { background: #f0ede3; }
    .top-table th {
      text-align: left; padding: 10px 14px;
      font-size: 0.72rem; font-weight: 600;
      text-transform: uppercase; letter-spacing: 0.05em; color: #6b6b6b;
    }
    .top-table td { padding: 12px 14px; font-size: 0.875rem; border-bottom: 1px solid rgba(0,0,0,0.05); }
    .top-table tbody tr:hover { background: rgba(107,124,69,0.06); }
    .mono { font-family: monospace; font-size: 0.8rem; color: #666; }
    .qty-badge {
      display: inline-block; background: #e8f0d0; color: #2d5016;
      padding: 2px 10px; border-radius: 12px; font-weight: 600; font-size: 0.82rem;
    }

    /* Status chip pipe workaround */
    .status-chip.in-stock    { background: #d4e8b0; color: #2d5016; }
    .status-chip.low-stock   { background: #f5e8b0; color: #5c3d00; }
    .status-chip.out-of-stock{ background: #f5c2c2; color: #5c0000; }
  `]
})
export class DashboardComponent {
  categoryStock: CategoryStock[] = [
    { name: 'Electronics',  pct: 78, color: '#6b7c45' },
    { name: 'Furniture',    pct: 42, color: '#8a9e5a' },
    { name: 'Office',       pct: 91, color: '#4a5730' },
    { name: 'Accessories',  pct: 65, color: '#a0b470' },
    { name: 'Logistics',    pct: 30, color: '#b8a45a' },
  ];

  activities: Activity[] = [
    { description: 'Order #1042 delivered successfully',       time: 'Today 10:15 AM',   icon: 'local_shipping', iconBg: '#4a5730' },
    { description: 'Widget Pro stock critically low (5 left)', time: 'Today 9:40 AM',    icon: 'warning',        iconBg: '#7a6428' },
    { description: 'New supplier TechParts India added',       time: 'Yesterday',         icon: 'add_business',   iconBg: '#2a4060' },
    { description: 'Order #1041 placed for USB-C Hub',         time: 'Yesterday',         icon: 'receipt_long',   iconBg: '#5c3060' },
    { description: 'Gadget X restocked with 200 units',        time: '2 days ago',        icon: 'inventory',      iconBg: '#3a5510' },
  ];

  topProducts: TopProduct[] = [
    { name: 'Cable Organiser Set',  sku: 'AC-CO-002', qty: 150, status: 'In Stock' },
    { name: 'Laptop Stand',         sku: 'AC-LS-001', qty: 60,  status: 'In Stock' },
    { name: 'Wireless Keyboard',    sku: 'EL-WK-001', qty: 45,  status: 'In Stock' },
    { name: 'Noise-Cancel Headset', sku: 'EL-NC-003', qty: 30,  status: 'In Stock' },
    { name: 'Whiteboard 4x3',       sku: 'OF-WB-001', qty: 20,  status: 'In Stock' },
  ];

  statusClass(status: string): Record<string, boolean> {
    return {
      'in-stock':     status === 'In Stock',
      'low-stock':    status === 'Low Stock',
      'out-of-stock': status === 'Out of Stock',
    };
  }
}
