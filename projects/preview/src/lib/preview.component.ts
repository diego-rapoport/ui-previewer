import { Component, ComponentRef, EnvironmentInjector, inject, viewChild, ViewContainerRef } from '@angular/core';
import { UI_TEST_CONFIG } from './ui-previewer.config';

@Component({
  selector: 'lib-preview',
  template: `
    <ul class="tab-list">
      @for(tab of tabs; let i=$index; track tab) {
      <li [class.active]="i === activeIndex" (click)="selectTab(i)">
        {{ tab.title }}
      </li>
      }
    </ul>

    <div class="rendered-component">
      <ng-template #tabContent></ng-template>
    </div>
  `,
  styles: `
    :host {
      /* --ui-previewer-gap-tabs: 0; */
      /* --ui-previewer-padding-tabs: .5rem; */
      /* --ui-previewer-border-tabs: .1rem solid black; */
      /* --ui-previewer-bg-tabs: #ccc; */
      /* --ui-previewer-deactivated-fg-tabs: black; */
      /* --ui-previewer-activated-fg-tabs: black; */
      /* --ui-previewer-rendered-border: 1px solid #ccc; */
    }

    ul.tab-list {
      list-style: none;
      display: flex;
      padding: 0;
      gap: var(--ui-previewer-gap-tabs, 0);

      >li {
        padding: var(--ui-previewer-padding-tabs, .5rem);
        border: var(--ui-previewer-border-tabs, .1rem solid black);
        border-top-left-radius: .3rem;
        border-top-right-radius: .3rem;
        color: var(--ui-previewer-deactivated-fg-tabs, black);
        cursor: pointer;

        &.active {
          color: var(--ui-previewer-activated-fg-tabs, black);
          background-color: var(--ui-previewer-bg-tabs,#ccc);
          font-weight: bold;
        }
      }
    }

    .rendered-component {
      border: var(--ui-previewer-rendered-border,1px solid #ccc);
      padding: 1rem;
    }
  `
})
export class PreviewComponent {

  private readonly injector = inject(EnvironmentInjector);
  readonly container = viewChild.required('tabContent', { read: ViewContainerRef });

  constructor(
  ) { }
  tabs = inject(UI_TEST_CONFIG);
  activeIndex = 0;
  activeComponentRef: ComponentRef<any> | null = null;

  ngOnInit() {
    this.selectTab(this.activeIndex);
  }

  selectTab(index: number) {
    if (this.activeComponentRef) {
      this.activeComponentRef.destroy();
      this.activeComponentRef = null;
    }

    this.activeIndex = index;
    const inputs = this.tabs[index].options?.inputs.length ? this.tabs[index].options.inputs : [];

    this.tabs[index].loadComponent()
      .then(componentClass => {
        const cmpRef = this.container().createComponent(componentClass,
          {
            environmentInjector: this.injector,
          }
        );

        if (inputs.length) {
          inputs.forEach((input: Record<string, unknown>) => {
            const [inputName, inputValue] = Object.entries(input)[0];
            cmpRef.setInput(inputName, inputValue);
          });
        }

        this.activeComponentRef = cmpRef;
      })
      .catch(err => console.error('Failed to load tab', err));
  }

}
