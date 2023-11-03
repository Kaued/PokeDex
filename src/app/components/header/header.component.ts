import { Component, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent {

  faArrowLeft = faArrowLeft;

  constructor (public search:SearchService, public router: Router){}

  makeSearch(event: Event){
    const term= (event.target as HTMLInputElement).value;
    this.search.term= term;
  }

}
