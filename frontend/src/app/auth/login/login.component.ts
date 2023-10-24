import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;
  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService
  ) { }

  onSubmit() {
    if(this.loginForm.valid){
      this.auth.login().subscribe({
        next:()=>{
          console.log("Success");
        },
        error:()=>{
          console.log("Error");
        }
      })
    }
  }

}
