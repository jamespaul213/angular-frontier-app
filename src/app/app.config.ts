import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngxs/store';
import { CommentState } from './features/components/store/comment/comment.state';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { importProvidersFrom } from '@angular/core';


import { routes } from './app.routes';
import { UserState } from './features/components/store/store/user.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    provideStore([CommentState, UserState]),

    importProvidersFrom(
      NgxsStoragePluginModule.forRoot({
        keys: ['comment']
      })
    )
  ]
};