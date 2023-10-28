import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    private auth: AuthService,
    private router: Router  
  ) { }

  onSubmit() {
    if(this.loginForm.valid){
      this.auth.login(this.loginForm.value).subscribe({
        next:(res)=>{
          this.router.navigate(['dashboard']);
        }, error:(err)=>{
          alert(err.error);
        }, complete: ()=>{
          this.loginForm.reset();
        }
      })
    }
  }

}
