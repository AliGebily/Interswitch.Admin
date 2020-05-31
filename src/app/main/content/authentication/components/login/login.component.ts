import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { FuseConfigService } from "@fuse/services/config.service";
import { GlobalService } from "@fuse/services/global.service";
import { FuseSplashScreenService } from "@fuse/services/splash-screen.service";
import { fuseAnimations } from "@fuse/animations";
import { AuthenticationService } from "../../authentication.service";
import { environment } from "environments/environment";
@Component({
  selector: "fuse-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  animations: fuseAnimations
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  loginFormErrors: any;

  constructor(
    private authenticationService: AuthenticationService,
    private fuseConfig: FuseConfigService,
    private formBuilder: FormBuilder,
    private router: Router,
    private globalService: GlobalService
  ) {
    this.fuseConfig.setConfig({
      layout: {
        navigation: "none",
        toolbar: "none",
        footer: "none"
      }
    });

    this.loginFormErrors = {
      username: {},
      password: {}
    };
    // redirect to home screen if user is already logged in
    this.globalService.onLoginScreen.next(true);
    if (this.globalService.isLoggedIn()) {
      this.router.navigate([environment.HOME_URL]);
      return;
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
      rememberMe: [""]
    });

    this.loginForm.valueChanges.subscribe(() => {
      this.onLoginFormValuesChanged();
    });
  }
  ngOnDestroy() {
    this.globalService.onLoginScreen.next(false);
  }
  onLoginFormValuesChanged() {
    for (const field in this.loginFormErrors) {
      if (!this.loginFormErrors.hasOwnProperty(field)) {
        continue;
      }
      // Clear previous errors
      this.loginFormErrors[field] = {};

      // Get the control
      const control = this.loginForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.loginFormErrors[field] = control.errors;
      }
    }
  }
  login() {
    this.authenticationService
      .login(
        this.loginForm.controls["username"].value,
        this.loginForm.controls["password"].value,
        this.loginForm.controls["rememberMe"].value
      )
      .then(() => {
        this.router.navigate([environment.HOME_URL]).then(() => {
          this.globalService.onLoginScreen.next(false);
        });
      });
  }
}
