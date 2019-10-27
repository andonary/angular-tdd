import {TestBed, async, fakeAsync, ComponentFixture, inject} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {AppService} from './app.service';
import {of} from 'rxjs';
import {sampleCocktail} from './cocktail.sample';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let bedService: AppService;

  beforeEach(async(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ]}).overrideComponent(AppComponent, {
        set: {
          providers: [
            { provide: AppService }
          ]
        }
    }).compileComponents();
    bedService = TestBed.get(AppService);
    spyOn(bedService, 'getOne').and.returnValue(of(sampleCocktail));

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
  }));

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should has a cocktail', () => {
    expect(app.cocktail).toBeDefined();
  });

  it('should inject appService and get cocktail', inject([AppService], (injectService: AppService) => {
    expect(injectService).toBe(bedService);
    app.ngOnInit().then(() => {
      expect(app.cocktail).toEqual(sampleCocktail);
    });
  }));
});
