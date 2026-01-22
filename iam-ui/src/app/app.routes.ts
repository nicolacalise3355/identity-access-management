import { Routes } from '@angular/router';

export const routes: Routes = [
  // 1. SSO Zone (Layout minimale, accessibile a guest)
  {
    path: 'auth',
    loadComponent: () => import('./auth/components/auth-layout/auth-layout.component'),
    children: [
      { path: 'login', loadComponent: () => import('./auth/pages/login/login.component') },
      { path: 'consent', loadComponent: () => import('./auth/pages/consent/consent.component') }
    ]
  },

  // 2. Management Console (Layout Admin, protetto da AuthGuard)
  /*
  {
    path: 'admin',
    canActivate: [authGuard], // Guard che verifica il cookie/token
    loadComponent: () => import('./layout/admin-layout/admin-layout.component'),
    children: [
      { path: 'dashboard', loadComponent: () => import('./features/admin/dashboard/dashboard.component') },
      { path: 'users', loadComponent: () => import('./features/admin/users/users-list.component') },
      { path: 'clients', loadComponent: () => import('./features/admin/clients/clients-list.component') },
    ]
  },
  */

  // Redirect default
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth/login' }
];
