import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, LoginComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  showLogin = signal(false);

  constructor(public authService: AuthService, private router: Router) {}

  openLogin() {
    this.showLogin.set(true);
  }

  onLoginClosed() {
    this.showLogin.set(false);
  }

  onUserOption(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
        if (value === 'mis-eventos') {
      this.router.navigate(['/feligres']);
    } else if (value === 'logout') {
      this.router.navigate(['/home']);
      this.authService.logout();
      
    }
    (event.target as HTMLSelectElement).selectedIndex = 0;
  }
}
