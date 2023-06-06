import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';

const routes: Routes = [{
  path: 'terms',
  component: TermsOfUseComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class TermsRoutingModule { }
