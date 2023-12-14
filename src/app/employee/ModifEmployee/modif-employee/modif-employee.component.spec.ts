import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifEmployeeComponent } from './modif-employee.component';

describe('ModifEmployeeComponent', () => {
  let component: ModifEmployeeComponent;
  let fixture: ComponentFixture<ModifEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
