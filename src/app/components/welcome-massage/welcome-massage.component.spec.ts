import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeMassageComponent } from './welcome-massage.component';

describe('WelcomeMassageComponent', () => {
  let component: WelcomeMassageComponent;
  let fixture: ComponentFixture<WelcomeMassageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeMassageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeMassageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
