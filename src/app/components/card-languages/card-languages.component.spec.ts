import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardLanguagesComponent } from './card-languages.component';

describe('CardLanguagesComponent', () => {
  let component: CardLanguagesComponent;
  let fixture: ComponentFixture<CardLanguagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardLanguagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardLanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
