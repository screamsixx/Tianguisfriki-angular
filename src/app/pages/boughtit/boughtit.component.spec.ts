import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoughtitComponent } from './boughtit.component';

describe('BoughtitComponent', () => {
  let component: BoughtitComponent;
  let fixture: ComponentFixture<BoughtitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoughtitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoughtitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
