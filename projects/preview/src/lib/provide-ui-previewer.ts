import { makeEnvironmentProviders, EnvironmentProviders } from '@angular/core';
import { ROUTES, } from '@angular/router';
import { UI_TEST_CONFIG, UITestConfig } from './ui-previewer.config';
import { PreviewComponent } from './preview.component';

export function provideUiPreviewer(config: UITestConfig[]): EnvironmentProviders {
  const routes = [
    {
      path: `ui-tests`,
      component: PreviewComponent,
    }
  ]

  return makeEnvironmentProviders([
    { provide: UI_TEST_CONFIG, useValue: config },
    {
      provide: ROUTES,
      useValue: routes,
      multi: true,
      deps: [UI_TEST_CONFIG],
    }
  ]);
}

