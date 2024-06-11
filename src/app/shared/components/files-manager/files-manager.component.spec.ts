import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesManagerComponent } from './files-manager.component';

describe('FilesManagerComponent', () => {
  let component: FilesManagerComponent;
  let fixture: ComponentFixture<FilesManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilesManagerComponent]
    });
    fixture = TestBed.createComponent(FilesManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
