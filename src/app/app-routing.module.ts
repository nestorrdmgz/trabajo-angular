import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./views/home/home.component";
import { LoginComponent } from "./views/login/login.component";
import { AddProductsComponent } from "./views/add-products/add-products.component";
import { ProfileComponent } from "./views/profile/profile.component";
import { AuthGuard } from '../app/guards/auth.guard'; // Importa tu guard de autenticación

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard] // Protege la ruta 'home' con AuthGuard
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'addProduct',
    component: AddProductsComponent,
    canActivate: [AuthGuard] // Protege la ruta 'addProduct' con AuthGuard
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard] // Protege la ruta 'profile' con AuthGuard
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
