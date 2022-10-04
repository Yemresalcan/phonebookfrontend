import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { NotloginComponent } from './components/notlogin/notlogin.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { TableComponentsComponent } from './components/table-components/table-components.component';
import { UpdateComponent } from './components/update/update.component';
import { UserAddComponent } from './components/user-add/user-add.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { LoginUser } from './models/loginUser';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  //  {path:"sign-in",pathMatch:"full",component:SignInComponent},

  { path: 'users', component: TableComponentsComponent },
  { path: 'users/add', component: UserAddComponent },
  { path: 'edit', component: UpdateComponent },
  { path: 'notlogin/sign-in', component: SignInComponent },
  { path: '', redirectTo: '/notlogin', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'admin', component: SignUpComponent },
  { path: 'users/dashboard', component: DashboardComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'notlogin', component: NotloginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
