import { Component } from "@angular/core";
import { FormControl, ReactiveFormsModule, Validators, FormGroup } from "@angular/forms";
import { LayoutComponent } from "../../layouts/auth-layout.component";
import { AuthService } from "@netlifeacademic/services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'app-new-password',
    standalone: true,
    imports: [LayoutComponent, ReactiveFormsModule],
    template: `
        <app-layout>
            <form [formGroup]="form" class="flex flex-col gap-3" (submit)="onSubmit()">
                <h1 class="text-3xl font-bold text-center mb-10">Nueva Contraseña</h1>
                <span class="text-gray-500 text-xs font-semibold">Debe tener minimo 8 caracteres, letra en mayuscula y numero.</span>

                <div class="relative">
                    <img class="size-3 absolute top-0 left-0 mt-3 ml-3" src="icons/forms/password.svg" alt="Password Icon">
                    <input formControlName="password" class="p-[6px] pl-8 rounded-lg w-full border-black border-[1px] text-sm bg-[#f1f1f1]" type="{{typePasswordInput}}" placeholder="Contraseña" required/>
                    <img (click)="togglePasswordVisibility()" class="size-4 absolute top-0 right-0 mt-[10px] mr-[10px] cursor-pointer" src="icons/forms/{{iconPasswordInput}}.svg" alt="Eye Icon">
                </div>

                @if (form.get('password')?.value !== '' && form.get('password')?.invalid) {
                    <p class="text-red-500 text-xs px-4">La contraseña debe tener minimo 8 caracteres</p>
                }

                <div class="relative">
                    <img class="size-3 absolute top-0 left-0 mt-3 ml-3" src="icons/forms/password.svg" alt="Password Icon">
                    <input formControlName="confirmPassword" class="p-[6px] pl-8 rounded-lg w-full border-black border-[1px] text-sm bg-[#f1f1f1]" type="{{typeConfirmPasswordInput}}" placeholder="Confirmar Contraseña" required/>
                    <img (click)="toggleConfirmPasswordVisibility()" class="size-4 absolute top-0 right-0 mt-[10px] mr-[10px] cursor-pointer" src="icons/forms/{{iconConfirmPasswordInput}}.svg" alt="Eye Icon">
                </div>

                @if (errorMessage) {
                    <p class="text-red-500 text-xs px-4">{{errorMessage}}</p>
                } @else if (form.get('confirmPassword')?.value !== form.get('password')?.value) {
                    <p class="text-red-500 text-xs px-4">Las contraseñas no coinciden</p>
                }

                <button class="bg-black text-white py-2 rounded-lg text-sm hover:bg-black/80 transition-all duration-300">Guardar Contraseña</button>
            </form>
        </app-layout>
    `
})

export class NewPasswordComponent {
    form: FormGroup;
    errorMessage: string = '';
    token: string = '';

    isPasswordVisible = false;
    typePasswordInput = this.isPasswordVisible ? "text" : "password";
    iconPasswordInput = this.isPasswordVisible ? "eye" : "eye-off";

    isConfirmPasswordVisible = false;
    typeConfirmPasswordInput = this.isConfirmPasswordVisible ? "text" : "password";
    iconConfirmPasswordInput = this.isConfirmPasswordVisible ? "eye" : "eye-off";

    constructor(private router: Router, private authService: AuthService, private activatedRoute: ActivatedRoute) {
        this.form = new FormGroup({
            password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
            confirmPassword: new FormControl('', [Validators.required])
        });
        this.activatedRoute.queryParams.subscribe(params => {
            this.token = params['token']
        });
    }

    onSubmit() {
        if (this.form.invalid) {
            console.log('Invalid form');
        } else {
            this.authService.newPassword(this.form.value, this.token).subscribe({
                next: (result) => {
                    console.log(result.message)
                    this.router.navigate(['/auth/login']);
                },
                error: (error) => {
                    this.errorMessage = error.error.message;
                },
                complete() {
                    console.log('Code verified');
                }
            });
        }
    }

    togglePasswordVisibility() {
        this.isPasswordVisible = !this.isPasswordVisible;
        this.typePasswordInput = this.isPasswordVisible ? "text" : "password";
        this.iconPasswordInput = this.isPasswordVisible ? "eye" : "eye-off";
    }

    toggleConfirmPasswordVisibility() {
        this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
        this.typeConfirmPasswordInput = this.isConfirmPasswordVisible ? "text" : "password";
        this.iconConfirmPasswordInput = this.isConfirmPasswordVisible ? "eye" : "eye-off";
    }
}