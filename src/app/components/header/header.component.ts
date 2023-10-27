import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent {
  searchForm!: FormGroup;

  ngOnInit():void{
    this.searchForm = new FormGroup({
      search: new FormControl('', [Validators.required])
    });
  }

  get search(){
    return this.searchForm.get('search');
  }
}
