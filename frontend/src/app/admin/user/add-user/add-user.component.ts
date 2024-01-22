import { Component, Inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/service/auth.service';
import { SnackBarService } from 'src/app/shared-module/services/snack-bar.service';
import { emailValidator } from 'src/app/shared-module/validators/email-validator.directive';

interface UserInterface {
  firstName: string;
  lastName: string;
  email: string;
  roles: string;
}

// export const emailAlreadyPresentValidator = (): ValidatorFn => {
//   return (control: AbstractControl): ValidationErrors | null => {
//     const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
//     return passwordRegex.test(control.value) ? null : { invalidPassword: true };
//   };
// };

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent {
  roles: string[] = ['Admin', 'User'];
  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: [
      '',
      [
        emailValidator(),
        this.emailAlreadyPresentValidator(),
        Validators.required,
      ],
    ],
    roles: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private snackBarService: SnackBarService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    console.log('this data ', this.data);
    if (this.data.isUpdate) {
      const user = this.data.user;
      this.registerForm.setValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        roles: user.roles,
      });

      this.registerForm.get('firstName').disable();
      this.registerForm.get('lastName').disable();
      this.registerForm.get('email').disable();
    }
  }

  onSubmit() {
    console.log('submit ', this.registerForm.getRawValue());
  }

  emailAlreadyPresentValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!this.data.isUpdate) {
        const isPresent =
          this.data.dataSource.find((user) => user.email == control.value) ||
          [];
        return isPresent.length <= 0 ? null : { alreadyPresentEmail: true };
      } else {
        return null;
      }
    };
  }
}
