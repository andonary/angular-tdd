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

  it('should injected via component and be MockAppService', () => {
    expect(componentService instanceof MockAppService).toBeTruthy();
  });

  it('should inject appService and get cocktail', () => {
    fixture.detectChanges();
    expect(app.cocktail).toEqual(sampleCocktail);
  });

  it('should inject appService and not get errorMsg', () => {
    fixture.detectChanges();
    expect(app.errorMsg).not.toBeTruthy();
  });

  it('should has an error if API throw an error', () => {
    spyOn(componentService, 'getOne').and.callFake(() => {
      return throwError(new Error('Fake error'));
    });
    fixture.detectChanges();
    expect(componentService.getOne).toHaveBeenCalled();
    expect(app.cocktail).toEqual({});
    expect(app.errorMsg).toBeTruthy();
  });

  it('should display a cocktail', () => {
    fixture.detectChanges();
    const componentDiv = fixture.nativeElement.querySelectorAll('.cocktail');
    // @ts-ignore
    expect(componentDiv.item(0).innerHTML).toContain(app.cocktail.strDrink);
  });
});
