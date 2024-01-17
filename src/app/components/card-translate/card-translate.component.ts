import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-translate',
  templateUrl: './card-translate.component.html',
  styleUrls: ['./card-translate.component.scss']
})
export class CardTranslateComponent implements OnInit {

  @Input() secondCard: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
