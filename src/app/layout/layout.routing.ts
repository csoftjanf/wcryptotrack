import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const LAYOUT_ROUTES: Routes = [
  {
    path: '', component: LayoutComponent, children: [

      { path: 'public', loadChildren: '../pages/public/public.module#PublicModule' },


      { path: 'logout', loadChildren: '../pages/logout/logout.module#LogoutModule'},


      { path: 'login', loadChildren: '../pages/login/login.module#LoginModule' },
      { path: 'register', loadChildren: '../pages/register/register.module#RegisterModule'},

      //Home
      { path: '', redirectTo: './crypto', pathMatch: 'full' },

      { path: 'home', loadChildren: '../pages/dashbcrypto/dashbcrypto.module#DashbcryptoModule' },
      { path: 'crypto', loadChildren: '../pages/dashbcrypto/dashbcrypto.module#DashbcryptoModule' },

      { path: 'coinview/:id', loadChildren: '../pages/coinview/coinview.module#CoinViewModule' },
      { path: 'publiccoin/:id', loadChildren: '../pages/publiccoin/publiccoin.module#publiccoinviewModule' },

    ]
  }
];

export const LayoutRouting = RouterModule.forChild(LAYOUT_ROUTES);
