
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FulfilledChallengesStoreEffects } from './effects';
import { fulfilledChallengesReducer } from './reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('fulfilledChallenges', fulfilledChallengesReducer),
    EffectsModule.forFeature([FulfilledChallengesStoreEffects])
  ],
  providers: [FulfilledChallengesStoreEffects]
})
export class FulfilledChallengesStoreModule { }
