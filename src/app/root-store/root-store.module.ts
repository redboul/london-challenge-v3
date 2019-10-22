import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersStoreModule } from './users-store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserStoreModule } from './user-store/user-store.module';
import { DaysStoreModule } from './days-store';
import { RootStoreEffects } from './effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { ChallengesStoreModule } from './challenges-store';
import { FulfilledChallengesStoreModule } from './fulfilled-challenges-store';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UsersStoreModule,
    UserStoreModule,
    DaysStoreModule,
    ChallengesStoreModule,
    FulfilledChallengesStoreModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([RootStoreEffects]),
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [RootStoreEffects]
})
export class RootStoreModule { }