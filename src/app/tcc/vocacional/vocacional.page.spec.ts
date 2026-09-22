import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VocacionalPage } from './vocacional.page';

describe('VocacionalPage', () => {
  let component: VocacionalPage;
  let fixture: ComponentFixture<VocacionalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VocacionalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
