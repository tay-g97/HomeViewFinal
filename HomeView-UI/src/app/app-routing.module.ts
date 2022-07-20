import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfilePhotoComponent } from './components/profile-photo/profile-photo.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { PropertySearchComponent } from './components/search/property-search/property-search.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile-photo', component: ProfilePhotoComponent },
  { path: 'profile-page', component: ProfilePageComponent },
  { path: 'property-search', component: PropertySearchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
