import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TranslocoService} from "@ngneat/transloco";

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageSelectorComponent implements OnInit {
  activeLanguage: string;
  availableLangs = ['en', 'es'];
  menuOpen: boolean;

  constructor(private translocoService: TranslocoService) {}

  ngOnInit(): void {
    this.activeLanguage = this.translocoService.getActiveLang();
  }

  onLanguageChange(newLang: string) {
    this.translocoService.setActiveLang(newLang);
    this.activeLanguage = newLang;
  }

}
