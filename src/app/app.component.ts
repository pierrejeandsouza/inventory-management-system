import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgFor } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

interface NavItem { label: string; icon: string; route: string; }

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor, RouterModule, MatToolbarModule, MatSidenavModule, MatListModule, MatIconModule, MatButtonModule],
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #sidenav mode="side" opened class="sidenav">
        <div class="sidenav-header">
          <div class="brand-icon-wrap">
            <mat-icon class="brand-icon">inventory_2</mat-icon>
          </div>
          <div class="brand-text">
            <span class="brand-title">InvenTrack</span>
            <span class="brand-sub">Inventory System</span>
          </div>
        </div>

        <div class="nav-section-label">MAIN MENU</div>
        <mat-nav-list class="nav-list">
          <a mat-list-item *ngFor="let item of navItems"
             [routerLink]="item.route" routerLinkActive="active-link">
            <div class="nav-item-inner">
              <mat-icon class="nav-icon">{{ item.icon }}</mat-icon>
              <span class="nav-label">{{ item.label }}</span>
            </div>
          </a>
        </mat-nav-list>

        <div class="sidenav-footer">
          <div class="footer-brand">InvenTrack v1.0</div>
          <div class="footer-sub">Academic Project · 2026</div>
        </div>
      </mat-sidenav>

      <mat-sidenav-content>
        <div class="app-toolbar">
          <button class="menu-btn" (click)="sidenav.toggle()">
            <mat-icon>menu</mat-icon>
          </button>
          <span class="toolbar-title">Inventory Management &amp; Tracking System</span>
          <span class="spacer"></span>
          <div class="toolbar-chip">
            <span class="dot"></span>Live
          </div>
        </div>
        <main class="content">
          <router-outlet></router-outlet>
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .sidenav-container { height: 100vh; }

    /* ── Sidebar ─────────────────────── */
    .sidenav {
      width: 248px;
      background: linear-gradient(180deg, #1a1e11 0%, #1e2614 60%, #232c18 100%);
      border-right: none !important;
      display: flex;
      flex-direction: column;
    }

    /* Brand header */
    .sidenav-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 24px 20px 20px;
      border-bottom: 1px solid rgba(255,255,255,0.07);
    }
    .brand-icon-wrap {
      width: 40px; height: 40px;
      background: rgba(107,124,69,0.25);
      border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
      border: 1px solid rgba(107,124,69,0.4);
    }
    .brand-icon { font-size: 22px; width: 22px; height: 22px; color: #c8d89a; }
    .brand-text { display: flex; flex-direction: column; }
    .brand-title { font-size: 1.05rem; font-weight: 700; color: #f0ede4; letter-spacing: -0.01em; }
    .brand-sub { font-size: 0.68rem; color: rgba(255,255,255,0.4); margin-top: 1px; font-weight: 400; }

    /* Section label */
    .nav-section-label {
      font-size: 0.62rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      color: rgba(255,255,255,0.25);
      padding: 20px 20px 6px;
    }

    /* Nav list */
    .nav-list { padding: 4px 12px !important; }
    .nav-list a {
      border-radius: 10px !important;
      margin-bottom: 3px !important;
      height: 44px !important;
      transition: background 180ms ease, border-color 180ms ease;
      border: 1px solid transparent !important;
    }
    .nav-list a:hover {
      background: rgba(107,124,69,0.15) !important;
      border-color: rgba(107,124,69,0.2) !important;
    }
    .nav-list a.active-link {
      background: rgba(107,124,69,0.25) !important;
      border-color: rgba(107,124,69,0.45) !important;
    }
    .nav-list a.active-link .nav-icon { color: #c8d89a !important; }
    .nav-list a.active-link .nav-label { color: #e8f0d0 !important; font-weight: 600; }

    .nav-item-inner {
      display: flex; align-items: center; gap: 12px; padding: 0 4px;
    }
    .nav-icon { font-size: 20px; width: 20px; height: 20px; color: rgba(255,255,255,0.45); transition: color 180ms; }
    .nav-label { font-size: 0.875rem; color: rgba(255,255,255,0.7); font-weight: 500; transition: color 180ms; }

    /* Footer */
    .sidenav-footer {
      margin-top: auto;
      padding: 16px 20px;
      border-top: 1px solid rgba(255,255,255,0.07);
    }
    .footer-brand { font-size: 0.75rem; font-weight: 600; color: rgba(255,255,255,0.35); }
    .footer-sub { font-size: 0.68rem; color: rgba(255,255,255,0.2); margin-top: 2px; }

    /* ── Toolbar ─────────────────────── */
    .app-toolbar {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 0 20px;
      height: 60px;
      background: #ffffff;
      border-bottom: 1px solid rgba(0,0,0,0.08);
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: 0 1px 12px rgba(0,0,0,0.06);
    }
    .menu-btn {
      background: none; border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      width: 36px; height: 36px; border-radius: 8px;
      color: #555; transition: background 180ms;
    }
    .menu-btn:hover { background: rgba(0,0,0,0.06); }
    .toolbar-title {
      font-size: 0.9rem; font-weight: 600;
      color: #2a2a2a; letter-spacing: -0.01em;
    }
    .toolbar-chip {
      display: flex; align-items: center; gap: 6px;
      background: #e8f5d0; color: #2d5016;
      padding: 4px 12px; border-radius: 20px;
      font-size: 0.75rem; font-weight: 600;
    }
    .dot {
      width: 6px; height: 6px;
      background: #5a8a28; border-radius: 50%;
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0%,100% { opacity:1; transform:scale(1); }
      50% { opacity:0.5; transform:scale(1.3); }
    }

    /* ── Content ─────────────────────── */
    .content {
      min-height: calc(100vh - 60px);
      background: #f5f3ec;
    }
    .spacer { flex: 1; }
  `]
})
export class AppComponent {
  navItems: NavItem[] = [
    { label: 'Dashboard',     icon: 'dashboard',     route: '/dashboard' },
    { label: 'Products',      icon: 'inventory',     route: '/products'  },
    { label: 'Suppliers',     icon: 'local_shipping',route: '/suppliers' },
    { label: 'Order Tracker', icon: 'receipt_long',  route: '/orders'    },
    { label: 'Reports',       icon: 'bar_chart',     route: '/reports'   },
  ];
}
