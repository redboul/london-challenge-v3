import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DaysStoreEffects } from './effects';
import { daysReducer } from './reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('days', daysReducer),
    EffectsModule.forFeature([DaysStoreEffects])
  ],
  providers: [DaysStoreEffects]
})
export class DaysStoreModule { }
