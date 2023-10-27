import { Component } from '@angular/core';
import { Auth, User, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  user$: Observable<User | null> = user(this.auth);

  constructor(readonly auth: Auth, readonly router: Router) { }

  async signOut() {
    await this.auth.signOut();
    await this.router.navigate(['sign-in']);
  }
}
