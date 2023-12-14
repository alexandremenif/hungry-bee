import { Component, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  readonly auth = inject(Auth);
  readonly router = inject(Router);
  readonly provider = new GoogleAuthProvider();

  async signIn() {
    await signInWithPopup(this.auth, this.provider);
    await this.router.navigate(['/']);
  }
}
