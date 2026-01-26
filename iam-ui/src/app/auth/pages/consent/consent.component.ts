import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-consent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'consent.component.html'
})
export default class ConsentComponent {

  allow() {
    console.log('Accesso Consentito - Redirecting con Auth Code...');
  }

  deny() {
    console.log('Accesso Negato');
  }
}
