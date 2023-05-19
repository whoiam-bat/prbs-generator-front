import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsrComponent } from './msr.component';

describe('MsrComponent', () => {
  let component: MsrComponent;
  let fixture: ComponentFixture<MsrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MsrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
