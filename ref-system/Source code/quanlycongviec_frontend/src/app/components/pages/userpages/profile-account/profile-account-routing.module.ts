import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';


export const profileroutes: Routes = [];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(profileroutes)
  ],
  exports: [RouterModule],
})

export class ProfileAccountRoutingModule { }
