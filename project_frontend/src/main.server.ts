import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { provideClientHydration } from '@angular/platform-browser';

const bootstrap = () => bootstrapApplication(AppComponent, {
  ...config,
  providers: [
    ...config.providers,
    provideClientHydration()
  ]
});

export default bootstrap;
