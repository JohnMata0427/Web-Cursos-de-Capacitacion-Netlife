import { Routes } from '@angular/router';
import { RegistroComponent } from './pages/auth/registro.component';
import { LoginComponent } from './pages/auth/login.component';
import { HomeComponent } from './pages/home.component';
import { RecoveryPasswordComponent } from './pages/auth/recovery-password.component';
import { VerifyCodeComponent } from './pages/auth/verify-code.component';
import { NewPasswordComponent } from './pages/auth/new-password.component';
import { MisCursosComponent } from './pages/mis-cursos.component';
import { MiPerfilComponent } from './pages/mi-perfil.component';
import { CourseComponent } from './pages/course.component';
import { ActualizarPerfilComponent } from './pages/actualizar-perfil.component';
import { authGuard } from './guard/required-auth.guard';
import { noAuthGuard } from './guard/no-required-auth.guard';
import { MisCertificadosComponent } from './pages/mis-certificados.component';
import { AdminDashboardComponent } from './pages/admin/dashboard.component';
import { adminGuard } from './guard/required-admin.guard';
import { requiredCodeGuard } from './guard/required-code.guard';
import { AdminAnunciosComponent } from './pages/admin/anuncios.component';
import { NotFoundComponent } from './pages/not-found.component';
import { TermsComponent } from './pages/terms.component';

export const routes: Routes = [
    { path: 'auth', canActivate: [noAuthGuard], children: [
        { path: 'register', component: RegistroComponent },
        { path: 'login', component: LoginComponent },
        { path: 'recovery-password', component: RecoveryPasswordComponent },
        { path: 'verify-code', component: VerifyCodeComponent, canActivate: [requiredCodeGuard] },
        { path: 'new-password', component: NewPasswordComponent, canActivate: [requiredCodeGuard] },
    ]},
    { path: 'terms-and-conditions', component: TermsComponent },
    { path: 'home', component: HomeComponent, canActivate: [authGuard] },
    { path: 'mis-cursos/:id', component: CourseComponent, canActivate: [authGuard] },
    { path: 'mis-cursos', component: MisCursosComponent, canActivate: [authGuard] },
    { path: 'actualizar-informacion', component: ActualizarPerfilComponent, canActivate: [authGuard] },
    { path: 'mi-perfil', component: MiPerfilComponent, canActivate: [authGuard] },
    { path: 'mis-certificados', component: MisCertificadosComponent, canActivate: [authGuard] },
    { path: 'admin', canActivate: [adminGuard], children: [
        { path: 'dashboard', component: AdminDashboardComponent },
        { path: 'anuncios', component: AdminAnunciosComponent }
    ] },
    { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
    { path: '**', component: NotFoundComponent, canActivate: [authGuard] }
];