
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ChallengesStoreEffects } from './effects';
import { challengesReducer } from './reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('challenges', challengesReducer),
    EffectsModule.forFeature([ChallengesStoreEffects])
  ],
  providers: [ChallengesStoreEffects]
})
export class ChallengesStoreModule { }
