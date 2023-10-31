import { Component, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent {

  constructor (public search:SearchService){}

  makeSearch(event: Event){
    const term= (event.target as HTMLInputElement).value;
    this.search.term= term;
  }
}
