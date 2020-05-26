import {ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {toggleClass} from "@datorama/core";

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoriteComponent implements OnInit {
  @ViewChild('heart', {static: true}) private heartEl: ElementRef;
  private active = false;
  constructor() { }

  ngOnInit() {
  }

  toggleActive() {
    this.active = !this.active;
    toggleClass(this.heartEl.nativeElement, 'is-active', this.active);
  }

}
