import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTranslateComponent } from './card-translate.component';

describe('CardTranslateComponent', () => {
  let component: CardTranslateComponent;
  let fixture: ComponentFixture<CardTranslateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardTranslateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardTranslateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
