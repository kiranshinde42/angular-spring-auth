import { Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { SnackBarService } from 'src/app/shared-module/services/snack-bar.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  hide = true;
  @ViewChild('formDirective') private formDirective: NgForm;

  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  role: any;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit() {}

  onSubmit() {
    if (this.registerForm.valid) {
      this.auth.register(this.registerForm.value).subscribe({
        next: (res) => {
          this.snackBarService.openSnackBar(res['message']);
        },
        error: (err) => {
          this.snackBarService.openSnackBar(err.error?.errorMessage);
        },
        complete: () => {
          this.formDirective.resetForm();
        },
      });
    }
  }
}
