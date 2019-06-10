import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPostPage } from './view-post.page';

describe('ViewPostPage', () => {
  let component: ViewPostPage;
  let fixture: ComponentFixture<ViewPostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPostPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
