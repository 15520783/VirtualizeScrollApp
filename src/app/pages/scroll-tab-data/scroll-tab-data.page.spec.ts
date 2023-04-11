import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScrollTabDataPage } from './scroll-tab-data.page';

describe('ScrollTabDataPage', () => {
  let component: ScrollTabDataPage;
  let fixture: ComponentFixture<ScrollTabDataPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ScrollTabDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
