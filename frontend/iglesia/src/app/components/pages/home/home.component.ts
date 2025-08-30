import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    LoginComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  readonly viewDate = signal(new Date());
  readonly events = signal([
    {
      start: new Date(),
      title: 'Evento de prueba',
    },
  ]);

  showLogin = signal(false);

  constructor(public authService: AuthService) {}

  openLogin() {
    this.showLogin.set(true);
  }

  onLoginClosed() {
    this.showLogin.set(false);
  }

  onUserOption(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    if (value === 'edit') {
      console.log('Editar perfil');
    } else if (value === 'logout') {
      this.authService.logout();
    }
    (event.target as HTMLSelectElement).selectedIndex = 0;
  }
}