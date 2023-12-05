import { Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { AuthService } from '../service/auth.service';

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

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit() {}

  onSubmit() {
    if (this.registerForm.valid) {
      this.auth.register(this.registerForm.value).subscribe({
        next: (res) => {
          alert(res);
        },
        error: (err) => {
          alert(err.error);
        },
        complete: () => {
          this.formDirective.resetForm();
        },
      });
    }
  }
}
