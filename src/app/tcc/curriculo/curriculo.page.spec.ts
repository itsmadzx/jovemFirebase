import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurriculoPage } from './curriculo.page';

describe('CurriculoPage', () => {
  let component: CurriculoPage;
  let fixture: ComponentFixture<CurriculoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CurriculoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
