import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LfsrComponent } from './lfsr.component';

describe('LfsrComponent', () => {
  let component: LfsrComponent;
  let fixture: ComponentFixture<LfsrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LfsrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LfsrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
