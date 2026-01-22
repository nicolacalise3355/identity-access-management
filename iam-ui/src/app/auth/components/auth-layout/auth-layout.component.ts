import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <!-- Main Container: Full screen, grigio chiaro, flex center -->
    <div class="min-h-screen bg-slate-50 flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
      
      <!-- Header / Logo Area -->
      <div class="sm:mx-auto sm:w-full sm:max-w-md mb-8 text-center">
        <h2 class="text-3xl font-extrabold text-slate-900 tracking-tight">
          Secure<span class="text-indigo-600">IAM</span>
        </h2>
        <p class="mt-2 text-sm text-slate-600">
          Identity Access Manager
        </p>
      </div>

      <!-- Card Container per il contenuto dinamico (Login, Register, ecc.) -->
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 border border-slate-100">
          <router-outlet></router-outlet>
        </div>
      </div>
      
      <!-- Footer -->
      <div class="mt-8 text-center text-xs text-slate-400">
        &copy; 2026 SecureIAM Corp. All rights reserved.
      </div>
    </div>
  `,
  styles: []
})
export default class AuthLayoutComponent {}
