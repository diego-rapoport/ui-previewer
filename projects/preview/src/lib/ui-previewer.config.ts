import { InjectionToken } from "@angular/core";

type InputsComponent = {
  [key: string]: object
}

type ComponentOptions = {
  inputs: InputsComponent[]
}

export interface UITestConfig {
  title: string;
  path?: string;
  loadComponent: () => Promise<any>;
  options?: ComponentOptions
}


export const UI_TEST_CONFIG = new InjectionToken<UITestConfig[]>(
  'UI_TEST_CONFIG',
  { providedIn: 'root', factory: () => [] }
);

