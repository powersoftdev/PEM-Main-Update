import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Model/user';
import { LoginService } from 'src/app/Services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  loginForm: FormGroup;

  public usersModel: User
  public Data: any;


  loginUserData = {}
  returnUrl: string;
  errorMessage: any;
  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private service: LoginService
  ) { }



  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }


  login(loginForm: FormGroup) {
    if (this.loginForm.valid)
      this.service.login(this.loginForm.value.username, this.loginForm.value.password)
        .subscribe({
          next: data => {
            if (data.message == 'Success') {
              console.log("Success", data.auth_token);
              localStorage.setItem("token", data.auth_token);
              this.router.navigateByUrl('/dashboard')
            }
            else if (data.message !== 'Success') {
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Oops! Username and password incorrect. try again.',
                showConfirmButton: true,
              });
            }
          }
        });
  }
}
