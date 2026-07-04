import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { PydtSharedModule } from "pydt-shared-lib";

import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, PydtSharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
