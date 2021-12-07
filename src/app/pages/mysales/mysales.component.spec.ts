import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MysalesComponent } from './mysales.component';

describe('MysalesComponent', () => {
  let component: MysalesComponent;
  let fixture: ComponentFixture<MysalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MysalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MysalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
