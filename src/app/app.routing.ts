import { Routes, RouterModule } from '@angular/router';

const ROUTES: Routes = [
    { path: '', loadChildren: './layout/layout.module#LayoutModule' }
    //{ path: '', loadChildren: './pages/public/public.module#PublicModule' }
];

export const routing = RouterModule.forRoot(ROUTES);
