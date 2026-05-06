import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';

const routes: Routes = [
  // Main portfolio is the default route
  { path: '', pathMatch: 'full', redirectTo: '' },
  // Future routes for blog pages etc.
  // { path: 'blog', loadChildren: () => import('./features/blog/blog.module').then(m => m.BlogModule) },
  // Fallback route
  { path: '**', redirectTo: '' }
];

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 80], // offset for fixed navbar
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
