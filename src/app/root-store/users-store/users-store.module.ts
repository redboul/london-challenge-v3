import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UsersStoreEffects } from './effects';
import { userReducer } from './reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('users', userReducer),
    EffectsModule.forFeature([UsersStoreEffects])
  ],
  providers: [UsersStoreEffects]
})
export class UsersStoreModule { }
