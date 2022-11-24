import { HeaderComponent } from './header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule],
  exports: [HeaderComponent],
  //since HeaderComponent is used by another component in another module, then you have to export it.
})
export class HeaderModule {}

//since Header Component is reusable across different module and component,if it is just put in the app.module.ts, then it will not be available in other modules, hence why it has to be a module, standalone module, that can be reused across the project
