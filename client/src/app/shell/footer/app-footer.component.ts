import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.scss']
})
export class AppFooterComponent {
  contentEl = document.querySelector('.content');
  constructor() {}

  scrollToTop() {
    this.contentEl.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
