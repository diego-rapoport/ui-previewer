# ngx-ui-previewer

This is a helper library to show previewers of Angular components in a simple way to test/debug quickly. Tested on version 19.
Install it as a dev dependency.

# Example of a component configuration
```
// app.config.ts
import { pvw } from '@pvw/ui-preview';

components: UITestConfig[] = [
  {
    // Title is shown in the tab header
    title: 'Range Scheduled Block',
    // Lazy Load component
    loadComponent: () =>
      import('../../../components/range-scheduled-block/range-scheduled-block.component')
        .then(m => m.RangeScheduledBlockComponent),
    options: {
      // Inputs for the component
      inputs: [
        {
          // This is the name of the input you set
          blockData: {
            start: '2023-01-01T10:00:00',
            end: '2023-01-31',
            title: 'Test Block',
            description: 'This is a test block'
          }
        }
      ]
    },
  },
]

export const appConfig: ApplicationConfig = {
  providers: [
    pvw.provideUiPreviewer(components),
    ...
  ]
};
```

This will create a new route on the root of your routes called `/ui-tests` that will make everything available.

# Types

```
type InputsComponent = {
  [key: string]: object
}

type ComponentOptions = {
  inputs: InputsComponent[]
}

export interface UITestConfig {
  title: string;
  loadComponent: () => Promise<any>;
  options?: ComponentOptions
}
```

