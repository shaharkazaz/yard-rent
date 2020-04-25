import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {parseUrl} from "../../../shared/utils";
import {URI_CONSTANTS} from "../../../shared/constants/uri.contants";

@Component({
  selector: 'app-developer-options',
  templateUrl: './developer-options.component.html',
  styleUrls: ['./developer-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeveloperOptionsComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {}


  releaseRented() {
    this.http.post(parseUrl(URI_CONSTANTS.development.releaseRented), {}).subscribe();
  }

  releaseDeleted() {
    this.http.post(parseUrl(URI_CONSTANTS.development.releaseRented), {}).subscribe();
  }
}
