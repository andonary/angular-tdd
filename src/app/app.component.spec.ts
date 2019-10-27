import {TestBed, async, fakeAsync, ComponentFixture, inject} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {AppService} from './app.service';
import {of, throwError} from 'rxjs';
import {sampleCocktail} from './cocktail.sample';

export class MockAppService {
  getOne() {
    return of(sampleCocktail);
  }
}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let componentService: AppService;

  beforeEach(async(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ]}).overrideComponent(AppComponent, {
        set: {
          providers: [
            { provide: AppService, useClass: MockAppService }
          ]
        }
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;

    componentService = fixture.debugElement.injector.get(AppService);
  }));

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should initiate a cocktail with empty object', () => {
    expect(app.cocktail).toEqual({});
  });

  it('should inject appService and get cocktail', inject([AppService], (injectService: AppService) => {
    fixture.detectChanges();
    expect(app.cocktail).toEqual(sampleCocktail);
    expect(app.errorMsg).not.toBeTruthy();
  }));

  it('should injected via component and be MockAppService', () => {
    expect(componentService instanceof MockAppService).toBeTruthy();
  });

  it('should has a sample cocktail', () => {
    fixture.detectChanges();
    expect(app.cocktail).toEqual(sampleCocktail);
  });

  it('should has an error if API throw an error', inject([AppService], (injectService: AppService) => {
    spyOn(componentService, 'getOne').and.callFake(() => {
      return throwError(new Error('Fake error'));
    });
    fixture.detectChanges();
    expect(app.cocktail).toEqual({});
    expect(app.errorMsg).toBeTruthy();
  }));
});
