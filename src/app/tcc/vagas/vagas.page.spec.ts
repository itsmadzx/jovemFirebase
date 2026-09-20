import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VagasPage } from './vagas.page';

describe('VagasPage', () => {
  let component: VagasPage;
  let fixture: ComponentFixture<VagasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VagasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
