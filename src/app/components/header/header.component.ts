import { Component, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent {

  @Output() term?:string;

  makeSearch(event: Event){
    this.term= (event.target as HTMLInputElement).value;
    console.log(this.term);
  }
}
