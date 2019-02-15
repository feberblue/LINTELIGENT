import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginService } from '../core/services/login.service';
import { ConfigService } from '../core/services/config.service';
import { Config } from '../core/models/config';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  confApp: Config;
  rutaHttp: string = "http://";
  invalidLogin: boolean = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService, public _config: ConfigService) { }

  ngOnInit() {
    window.localStorage.removeItem('token');
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
    this._config.getConfig().subscribe(res => {
      console.log(res);
      this.confApp = <Config>res;
      if (this.confApp.ssl) {
        this.rutaHttp = "https://";
      }
      this.rutaHttp = this.rutaHttp + this.confApp.urlserver;
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    const loginPayload = {
      userName: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value
    }
    this.loginService.login(this.rutaHttp + environment.login
      , loginPayload).subscribe(data => {
        console.log(data);
        if (data.status === "ok") {
          window.localStorage.setItem('token', data.token);
          this.router.navigate(['categorias']);
        } else {
          this.invalidLogin = true;
          alert(data.message);
        }
      });
  }

}
