import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/Http';
import { RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { ProductAnalysisComponent } from './components/product-analysis/product-analysis.component';
import { RiskComponent } from './components/risk/risk.component';

import { DataService } from './services/data.service';

const appRoutes: Routes = [
  //home page path
  {path:'', component:ProductAnalysisComponent},
  {path:'risk', component:RiskComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ProductAnalysisComponent,
    RiskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
