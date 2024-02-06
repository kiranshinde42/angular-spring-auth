import { Component, EventEmitter, Inject, Output } from '@angular/core';
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

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent {
  roles: string[] = ['Admin', 'User'];
  @Output() onYes = new EventEmitter<any>();

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
    const user = {
      id: this.data.user.id,
      email: this.data.user.email,
      roles: this.registerForm.get('roles').value,
    };
    this.onYes.emit(user);
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
