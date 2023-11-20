import { Component } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  readonly provider = new GoogleAuthProvider();

  constructor(readonly auth: Auth, readonly router: Router) {}

  async signIn() {
    await signInWithPopup(this.auth, this.provider);
    await this.router.navigate(['/']);
  }
}
