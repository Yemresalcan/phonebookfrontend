import { Routes } from '@angular/router';
import { SignInComponent } from '../components/sign-in/sign-in.component';
import { TableComponentsComponent } from '../components/table-components/table-components.component';

import { UpdateComponent } from '../components/update/update.component';
import { UserAddComponent } from '../components/user-add/user-add.component';

export const appRoutes: Routes = [
  { path: 'users/edit/:id', component: UpdateComponent },
  { path: '**', redirectTo: 'any', pathMatch: 'full' },
  { path: 'users/sign-in', component: SignInComponent },
  { path: 'users/users/add', component: UserAddComponent },


];
