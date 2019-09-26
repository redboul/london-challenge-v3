import { Component } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { RootStoreState } from "../root-store";
import { UserStoreActions } from "../root-store/user-store";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  user = { email: null as string, password: null as string };
  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);

  passwordFormControl = new FormControl("", [
    Validators.required,
    Validators.minLength(6)
  ]);
  constructor(private store$: Store<RootStoreState.State>) {}

  login() {
    this.store$.dispatch(
      new UserStoreActions.LoginUserRequestAction(this.user)
    );
  }
}
