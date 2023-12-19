import { Component, inject } from '@angular/core';
import { Auth, User, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly auth = inject(Auth);
  readonly router = inject(Router);
  readonly breakpointObserver = inject(BreakpointObserver);
  readonly title = inject(Title);
  readonly title$ = this.router.events.pipe(map(() => this.title.getTitle()));

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay()
  );

  user$: Observable<User | null> = user(this.auth);

  async signOut() {
    await this.auth.signOut();
    await this.router.navigate(['sign-in']);
  }
}
