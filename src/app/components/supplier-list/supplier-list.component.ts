import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

interface Supplier {
  id: number; name: string; contact: string; email: string;
  phone: string; category: string; status: 'Active' | 'Inactive'; rating: number;
}

@Component({
  selector: 'app-supplier-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatCardModule, MatIconModule,
            MatButtonModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatTooltipModule],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1>Suppliers</h1>
        <p>Registered vendors and supplier information — {{ filteredSuppliers.length }} listed</p>
      </div>

      <mat-card class="glass-card">
        <mat-card-content>
          <div class="filter-row">
            <mat-form-field appearance="outline" class="filter-field">
              <mat-label>Search</mat-label>
              <input matInput [(ngModel)]="searchText" placeholder="Name or contact...">
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
                <mat-option value="">All</mat-option>
                <mat-option value="Active">Active</mat-option>
                <mat-option value="Inactive">Inactive</mat-option>
              </mat-select>
            </mat-form-field>
            <button class="clear-btn" (click)="clearFilters()" *ngIf="hasFilters">
              <mat-icon>close</mat-icon> Clear
            </button>
          </div>

          <table mat-table [dataSource]="filteredSuppliers">
            <ng-container matColumnDef="id">
              <th mat-header-cell *matHeaderCellDef>#</th>
              <td mat-cell *matCellDef="let s" style="color:#999; font-size:0.8rem;">{{ s.id }}</td>
            </ng-container>
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef>Supplier Name</th>
              <td mat-cell *matCellDef="let s">
                <div class="supplier-name-cell">
                  <div class="supplier-avatar">{{ s.name[0] }}</div>
                  <strong>{{ s.name }}</strong>
                </div>
              </td>
            </ng-container>
            <ng-container matColumnDef="contact">
              <th mat-header-cell *matHeaderCellDef>Contact Person</th>
              <td mat-cell *matCellDef="let s">{{ s.contact }}</td>
            </ng-container>
            <ng-container matColumnDef="email">
              <th mat-header-cell *matHeaderCellDef>Email</th>
              <td mat-cell *matCellDef="let s" style="font-size:0.82rem; color:#555;">{{ s.email }}</td>
            </ng-container>
            <ng-container matColumnDef="phone">
              <th mat-header-cell *matHeaderCellDef>Phone</th>
              <td mat-cell *matCellDef="let s" style="font-family:monospace; font-size:0.82rem;">{{ s.phone }}</td>
            </ng-container>
            <ng-container matColumnDef="category">
              <th mat-header-cell *matHeaderCellDef>Category</th>
              <td mat-cell *matCellDef="let s"><span class="cat-badge">{{ s.category }}</span></td>
            </ng-container>
            <ng-container matColumnDef="rating">
              <th mat-header-cell *matHeaderCellDef>Rating</th>
              <td mat-cell *matCellDef="let s">
                <div class="star-row">
                  <span *ngFor="let star of getStars(s.rating)" class="star filled">★</span>
                  <span *ngFor="let star of getEmptyStars(s.rating)" class="star empty">★</span>
                  <span class="rating-num">{{ s.rating }}/5</span>
                </div>
              </td>
            </ng-container>
            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let s">
                <span class="status-chip" [class.active]="s.status==='Active'" [class.inactive]="s.status==='Inactive'">
                  {{ s.status }}
                </span>
              </td>
            </ng-container>
            <tr mat-header-row *matHeaderRowDef="columns"></tr>
            <tr mat-row *matRowDef="let r; columns: columns;"></tr>
          </table>

          <div *ngIf="filteredSuppliers.length === 0" class="empty-state">
            <mat-icon>search_off</mat-icon>
            <p>No suppliers match your filters</p>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .filter-row { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; margin-bottom: 8px; }
    .filter-field { min-width: 170px; }
    .clear-btn {
      display: inline-flex; align-items: center; gap: 4px;
      padding: 8px 14px; border-radius: 8px; background: #fdecea;
      color: #c0392b; border: 1px solid #f5c2c2; font-size: 0.8rem;
      font-weight: 600; cursor: pointer; white-space: nowrap;
    }
    .clear-btn mat-icon { font-size: 16px; width: 16px; height: 16px; }
    .supplier-name-cell { display: flex; align-items: center; gap: 10px; }
    .supplier-avatar {
      width: 32px; height: 32px; border-radius: 8px;
      background: linear-gradient(135deg, #4a5730, #6b7c45);
      color: #e8f4c8; font-weight: 700; font-size: 0.9rem;
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }
    .cat-badge {
      display: inline-block; padding: 3px 9px; border-radius: 6px;
      background: #f0ede3; color: #4a4a4a; font-size: 0.78rem; font-weight: 500;
    }
    .star-row { display: flex; align-items: center; gap: 1px; }
    .star { font-size: 16px; line-height: 1; }
    .star.filled { color: #b8960a; }
    .star.empty  { color: #ddd; }
    .rating-num { font-size: 0.72rem; color: #999; margin-left: 5px; }
    .empty-state { text-align: center; padding: 48px 0; color: #aaa; }
    .empty-state mat-icon { font-size: 48px; width: 48px; height: 48px; }
    .empty-state p { margin-top: 12px; font-size: 0.9rem; }
  `]
})
export class SupplierListComponent {
  searchText = '';
  filterCategory = '';
  filterStatus = '';
  categories = ['Electronics', 'Office', 'Furniture', 'Logistics', 'Accessories'];
  columns = ['id', 'name', 'contact', 'email', 'phone', 'category', 'rating', 'status'];

  suppliers: Supplier[] = [
    { id: 1, name: 'TechParts India Pvt Ltd', contact: 'Ramesh Babu',  email: 'ramesh@techparts.in',   phone: '98400-11234', category: 'Electronics', status: 'Active',   rating: 5 },
    { id: 2, name: 'OfficeWorld Supplies',    contact: 'Kavitha Nair', email: 'kavitha@officeworld.in', phone: '99001-22345', category: 'Office',      status: 'Active',   rating: 4 },
    { id: 3, name: 'FurniCraft Solutions',    contact: 'Ajay Menon',   email: 'ajay@furnicraft.co.in',  phone: '80001-33456', category: 'Furniture',   status: 'Active',   rating: 4 },
    { id: 4, name: 'QuickShip Logistics',     contact: 'Divya Raj',    email: 'divya@quickship.in',     phone: '70001-44567', category: 'Logistics',   status: 'Inactive', rating: 3 },
    { id: 5, name: 'GadgetZone Trading',      contact: 'Suresh Kumar', email: 'suresh@gadgetzone.in',   phone: '90001-55678', category: 'Electronics', status: 'Active',   rating: 5 },
    { id: 6, name: 'AccessoriesMart',         contact: 'Pooja Sharma', email: 'pooja@accmart.in',       phone: '60001-66789', category: 'Accessories', status: 'Active',   rating: 4 },
  ];

  get hasFilters(): boolean {
    return !!(this.searchText || this.filterCategory || this.filterStatus);
  }

  get filteredSuppliers(): Supplier[] {
    return this.suppliers.filter(s => {
      const matchText = !this.searchText ||
        s.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        s.contact.toLowerCase().includes(this.searchText.toLowerCase());
      const matchCat    = !this.filterCategory || s.category === this.filterCategory;
      const matchStatus = !this.filterStatus   || s.status   === this.filterStatus;
      return matchText && matchCat && matchStatus;
    });
  }

  clearFilters(): void { this.searchText = ''; this.filterCategory = ''; this.filterStatus = ''; }
  getStars(rating: number): number[]      { return Array(rating).fill(0); }
  getEmptyStars(rating: number): number[] { return Array(5 - rating).fill(0); }
}
