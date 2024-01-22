import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/service/auth.service';
import { SnackBarService } from 'src/app/shared-module/services/snack-bar.service';
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
  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    roles: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private snackBarService: SnackBarService,
    @Inject(MAT_DIALOG_DATA) public data: UserInterface
  ) {}

  ngOnInit() {
    if (this.data) {
      this.registerForm.setValue({
        firstName: this.data.firstName,
        lastName: this.data.lastName,
        email: this.data.email,
        roles: this.data.roles,
      });

      this.registerForm.get('firstName').disable();
      this.registerForm.get('lastName').disable();
      this.registerForm.get('email').disable();
    }
  }

  onSubmit() {
    console.log('submit ', this.registerForm.getRawValue());
  }
}
