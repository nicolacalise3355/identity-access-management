import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-consent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'consent.component.html'
})
export default class ConsentComponent {
  // In un caso reale, questi dati verrebbero dai QueryParams dell'URL (client_id, scope)

  allow() {
    console.log('Accesso Consentito - Redirecting con Auth Code...');
    // window.location.href = 'callback_url?code=xyz...';
  }

  deny() {
    console.log('Accesso Negato');
    // window.location.href = 'callback_url?error=access_denied';
  }
}
