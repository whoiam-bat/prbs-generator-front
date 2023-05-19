import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorithmPickerComponent } from './algorithm-picker.component';

describe('AlgorithmPickerComponent', () => {
  let component: AlgorithmPickerComponent;
  let fixture: ComponentFixture<AlgorithmPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlgorithmPickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlgorithmPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
