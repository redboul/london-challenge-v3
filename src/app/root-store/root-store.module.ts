import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersStoreModule } from './users-store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserStoreModule } from './user-store/user-store.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UsersStoreModule,
    UserStoreModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([])
  ]
})
export class RootStoreModule { }