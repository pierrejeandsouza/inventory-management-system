import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

interface Order {
  id: string; product: string; supplier: string; type: 'Inflow' | 'Outflow';
  quantity: number; date: string; status: 'Delivered' | 'Pending' | 'Processing' | 'Cancelled';
}

@Component({
  selector: 'app-order-tracker',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatCardModule, MatIconModule,
            MatButtonModule, MatTabsModule, MatTooltipModule, MatSelectModule, MatFormFieldModule],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1>Order Tracker</h1>
        <p>Track inventory inflow and outflow orders — {{ orders.length }} total</p>
      </div>

      <!-- Summary Cards -->
      <div class="stat-cards">
        <mat-card class="stat-card primary">
          <mat-card-content>
            <div class="stat-number">{{ orders.length }}</div>
            <div class="stat-label">Total Orders</div>
          </mat-card-content>
          <mat-icon class="card-bg-icon">receipt_long</mat-icon>
        </mat-card>
        <mat-card class="stat-card success">
          <mat-card-content>
            <div class="stat-number">{{ inflowCount }}</div>
            <div class="stat-label">Inflow Orders</div>
          </mat-card-content>
          <mat-icon class="card-bg-icon">arrow_downward</mat-icon>
        </mat-card>
        <mat-card class="stat-card accent">
          <mat-card-content>
            <div class="stat-number">{{ outflowCount }}</div>
            <div class="stat-label">Outflow Orders</div>
          </mat-card-content>
          <mat-icon class="card-bg-icon">arrow_upward</mat-icon>
        </mat-card>
        <mat-card class="stat-card warn">
          <mat-card-content>
            <div class="stat-number">{{ pendingCount }}</div>
            <div class="stat-label">Pending / Processing</div>
          </mat-card-content>
          <mat-icon class="card-bg-icon">hourglass_top</mat-icon>
        </mat-card>
      </div>

      <mat-card class="glass-card">
        <mat-card-content>
          <!-- Filter Row -->
          <div class="filter-row">
            <mat-form-field appearance="outline" class="filter-field">
              <mat-label>Filter Status</mat-label>
              <mat-select [(ngModel)]="filterStatus">
                <mat-option value="">All Status</mat-option>
                <mat-option value="Delivered">Delivered</mat-option>
                <mat-option value="Processing">Processing</mat-option>
                <mat-option value="Pending">Pending</mat-option>
                <mat-option value="Cancelled">Cancelled</mat-option>
              </mat-select>
            </mat-form-field>
            <button class="clear-btn" (click)="filterStatus=''" *ngIf="filterStatus">
              <mat-icon>close</mat-icon> Clear
            </button>
          </div>

          <mat-tab-group class="order-tabs">
            <!-- All Orders -->
            <mat-tab label="All Orders">
              <ng-template mat-tab-label>
                <mat-icon class="tab-icon">list_alt</mat-icon>
                All <span class="tab-badge">{{ filteredOrders.length }}</span>
              </ng-template>
              <div style="padding: 16px 0;">
                <table mat-table [dataSource]="filteredOrders">
                  <ng-container matColumnDef="id">
                    <th mat-header-cell *matHeaderCellDef>Order ID</th>
                    <td mat-cell *matCellDef="let o" style="font-family:monospace; font-weight:700; font-size:0.82rem;">{{ o.id }}</td>
                  </ng-container>
                  <ng-container matColumnDef="type">
                    <th mat-header-cell *matHeaderCellDef>Type</th>
                    <td mat-cell *matCellDef="let o">
                      <span class="type-badge" [class.inflow]="o.type==='Inflow'" [class.outflow]="o.type==='Outflow'">
                        <mat-icon class="type-icon">{{ o.type === 'Inflow' ? 'arrow_downward' : 'arrow_upward' }}</mat-icon>
                        {{ o.type }}
                      </span>
                    </td>
                  </ng-container>
                  <ng-container matColumnDef="product">
                    <th mat-header-cell *matHeaderCellDef>Product</th>
                    <td mat-cell *matCellDef="let o" style="font-weight:500;">{{ o.product }}</td>
                  </ng-container>
                  <ng-container matColumnDef="supplier">
                    <th mat-header-cell *matHeaderCellDef>Supplier / Customer</th>
                    <td mat-cell *matCellDef="let o" style="color:#666;">{{ o.supplier }}</td>
                  </ng-container>
                  <ng-container matColumnDef="quantity">
                    <th mat-header-cell *matHeaderCellDef>Qty</th>
                    <td mat-cell *matCellDef="let o"><span class="qty-pill">{{ o.quantity }}</span></td>
                  </ng-container>
                  <ng-container matColumnDef="date">
                    <th mat-header-cell *matHeaderCellDef>Date</th>
                    <td mat-cell *matCellDef="let o" style="font-size:0.82rem; color:#777;">{{ o.date }}</td>
                  </ng-container>
                  <ng-container matColumnDef="status">
                    <th mat-header-cell *matHeaderCellDef>Status</th>
                    <td mat-cell *matCellDef="let o">
                      <span class="status-chip"
                        [class.delivered]="o.status==='Delivered'"
                        [class.pending]="o.status==='Pending'"
                        [class.processing]="o.status==='Processing'"
                        [class.cancelled]="o.status==='Cancelled'">
                        {{ o.status }}
                      </span>
                    </td>
                  </ng-container>
                  <tr mat-header-row *matHeaderRowDef="columns"></tr>
                  <tr mat-row *matRowDef="let r; columns: columns;"></tr>
                </table>
              </div>
            </mat-tab>

            <!-- Inflow -->
            <mat-tab>
              <ng-template mat-tab-label>
                <mat-icon class="tab-icon inflow-icon">arrow_downward</mat-icon>
                Inflow <span class="tab-badge green">{{ inflowCount }}</span>
              </ng-template>
              <div style="padding: 16px 0;">
                <table mat-table [dataSource]="filteredInflowOrders">
                  <ng-container matColumnDef="id"><th mat-header-cell *matHeaderCellDef>Order ID</th><td mat-cell *matCellDef="let o" style="font-family:monospace;font-weight:700;font-size:0.82rem;">{{ o.id }}</td></ng-container>
                  <ng-container matColumnDef="product"><th mat-header-cell *matHeaderCellDef>Product</th><td mat-cell *matCellDef="let o" style="font-weight:500;">{{ o.product }}</td></ng-container>
                  <ng-container matColumnDef="supplier"><th mat-header-cell *matHeaderCellDef>Supplier</th><td mat-cell *matCellDef="let o">{{ o.supplier }}</td></ng-container>
                  <ng-container matColumnDef="quantity"><th mat-header-cell *matHeaderCellDef>Qty</th><td mat-cell *matCellDef="let o"><span class="qty-pill">{{ o.quantity }}</span></td></ng-container>
                  <ng-container matColumnDef="date"><th mat-header-cell *matHeaderCellDef>Date</th><td mat-cell *matCellDef="let o" style="font-size:0.82rem;color:#777;">{{ o.date }}</td></ng-container>
                  <ng-container matColumnDef="status"><th mat-header-cell *matHeaderCellDef>Status</th><td mat-cell *matCellDef="let o"><span class="status-chip" [class.delivered]="o.status==='Delivered'" [class.pending]="o.status==='Pending'" [class.processing]="o.status==='Processing'">{{ o.status }}</span></td></ng-container>
                  <tr mat-header-row *matHeaderRowDef="subColumns"></tr>
                  <tr mat-row *matRowDef="let r; columns: subColumns;"></tr>
                </table>
              </div>
            </mat-tab>

            <!-- Outflow -->
            <mat-tab>
              <ng-template mat-tab-label>
                <mat-icon class="tab-icon outflow-icon">arrow_upward</mat-icon>
                Outflow <span class="tab-badge red">{{ outflowCount }}</span>
              </ng-template>
              <div style="padding: 16px 0;">
                <table mat-table [dataSource]="filteredOutflowOrders">
                  <ng-container matColumnDef="id"><th mat-header-cell *matHeaderCellDef>Order ID</th><td mat-cell *matCellDef="let o" style="font-family:monospace;font-weight:700;font-size:0.82rem;">{{ o.id }}</td></ng-container>
                  <ng-container matColumnDef="product"><th mat-header-cell *matHeaderCellDef>Product</th><td mat-cell *matCellDef="let o" style="font-weight:500;">{{ o.product }}</td></ng-container>
                  <ng-container matColumnDef="supplier"><th mat-header-cell *matHeaderCellDef>Customer</th><td mat-cell *matCellDef="let o">{{ o.supplier }}</td></ng-container>
                  <ng-container matColumnDef="quantity"><th mat-header-cell *matHeaderCellDef>Qty</th><td mat-cell *matCellDef="let o"><span class="qty-pill">{{ o.quantity }}</span></td></ng-container>
                  <ng-container matColumnDef="date"><th mat-header-cell *matHeaderCellDef>Date</th><td mat-cell *matCellDef="let o" style="font-size:0.82rem;color:#777;">{{ o.date }}</td></ng-container>
                  <ng-container matColumnDef="status"><th mat-header-cell *matHeaderCellDef>Status</th><td mat-cell *matCellDef="let o"><span class="status-chip" [class.delivered]="o.status==='Delivered'" [class.pending]="o.status==='Pending'" [class.cancelled]="o.status==='Cancelled'">{{ o.status }}</span></td></ng-container>
                  <tr mat-header-row *matHeaderRowDef="subColumns"></tr>
                  <tr mat-row *matRowDef="let r; columns: subColumns;"></tr>
                </table>
              </div>
            </mat-tab>
          </mat-tab-group>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .filter-row { display: flex; gap: 12px; align-items: center; margin-bottom: 8px; }
    .filter-field { min-width: 200px; }
    .clear-btn {
      display: inline-flex; align-items: center; gap: 4px;
      padding: 8px 14px; border-radius: 8px; background: #fdecea;
      color: #c0392b; border: 1px solid #f5c2c2; font-size: 0.8rem;
      font-weight: 600; cursor: pointer;
    }
    .clear-btn mat-icon { font-size: 16px; width: 16px; height: 16px; }

    /* Type badges */
    .type-badge {
      display: inline-flex; align-items: center; gap: 4px;
      padding: 4px 10px; border-radius: 20px; font-size: 0.78rem; font-weight: 700;
    }
    .type-badge.inflow  { background: #d4e8b0; color: #2d5016; }
    .type-badge.outflow { background: #f5dece; color: #7a2818; }
    .type-icon { font-size: 13px; width: 13px; height: 13px; }

    /* Tab styling */
    .tab-icon { font-size: 16px; width: 16px; height: 16px; margin-right: 6px; vertical-align: middle; }
    .inflow-icon  { color: #5a8a28; }
    .outflow-icon { color: #c0392b; }
    .tab-badge {
      display: inline-block; min-width: 20px; height: 20px; line-height: 20px;
      text-align: center; padding: 0 6px; border-radius: 10px;
      background: #e0e0e0; color: #555; font-size: 0.7rem; font-weight: 700; margin-left: 5px;
    }
    .tab-badge.green { background: #d4e8b0; color: #2d5016; }
    .tab-badge.red   { background: #f5c2c2; color: #5c0000; }

    .qty-pill {
      display: inline-block; padding: 3px 10px; border-radius: 10px;
      background: #e8f0d0; color: #2d5016; font-weight: 600; font-size: 0.82rem;
    }
  `]
})
export class OrderTrackerComponent {
  filterStatus = '';
  columns    = ['id', 'type', 'product', 'supplier', 'quantity', 'date', 'status'];
  subColumns = ['id', 'product', 'supplier', 'quantity', 'date', 'status'];

  orders: Order[] = [
    { id: 'ORD-1042', product: 'Wireless Keyboard',    supplier: 'TechParts India',     type: 'Inflow',  quantity: 100, date: '8 Mar 2026', status: 'Delivered'  },
    { id: 'ORD-1041', product: 'USB-C Hub 7-Port',     supplier: 'GadgetZone Trading',  type: 'Inflow',  quantity: 50,  date: '7 Mar 2026', status: 'Processing' },
    { id: 'ORD-1040', product: 'Ergonomic Chair',      supplier: 'FurniCraft Solutions', type: 'Inflow', quantity: 20,  date: '6 Mar 2026', status: 'Pending'    },
    { id: 'ORD-1039', product: 'Laptop Stand',         supplier: 'Bangalore Corp',      type: 'Outflow', quantity: 15,  date: '5 Mar 2026', status: 'Delivered'  },
    { id: 'ORD-1038', product: 'Monitor 27" 4K',       supplier: 'GadgetZone Trading',  type: 'Inflow',  quantity: 10,  date: '4 Mar 2026', status: 'Delivered'  },
    { id: 'ORD-1037', product: 'Noise-Cancel Headset', supplier: 'Hyderabad Offices',   type: 'Outflow', quantity: 8,   date: '3 Mar 2026', status: 'Delivered'  },
    { id: 'ORD-1036', product: 'Cable Organiser Set',  supplier: 'AccessoriesMart',     type: 'Inflow',  quantity: 200, date: '2 Mar 2026', status: 'Delivered'  },
    { id: 'ORD-1035', product: 'Whiteboard 4x3',       supplier: 'Mumbai Enterprises',  type: 'Outflow', quantity: 5,   date: '1 Mar 2026', status: 'Cancelled'  },
  ];

  get filteredOrders():       Order[] { return this.orders.filter(o => !this.filterStatus || o.status === this.filterStatus); }
  get inflowOrders():         Order[] { return this.orders.filter(o => o.type === 'Inflow'); }
  get outflowOrders():        Order[] { return this.orders.filter(o => o.type === 'Outflow'); }
  get filteredInflowOrders(): Order[] { return this.inflowOrders.filter(o  => !this.filterStatus || o.status === this.filterStatus); }
  get filteredOutflowOrders():Order[] { return this.outflowOrders.filter(o => !this.filterStatus || o.status === this.filterStatus); }
  get inflowCount():  number { return this.inflowOrders.length; }
  get outflowCount(): number { return this.outflowOrders.length; }
  get pendingCount(): number { return this.orders.filter(o => o.status === 'Pending' || o.status === 'Processing').length; }
}
