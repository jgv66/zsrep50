import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Ventas012Page } from './ventas012.page';

describe('Ventas012Page', () => {
  let component: Ventas012Page;
  let fixture: ComponentFixture<Ventas012Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ventas012Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Ventas012Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
