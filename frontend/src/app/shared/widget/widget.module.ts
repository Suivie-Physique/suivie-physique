import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbTooltipModule, NgbProgressbarModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
// Feather Icon
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';

@NgModule({
  declarations: [],
  imports: [CommonModule, NgbTooltipModule, NgbProgressbarModule, NgbDropdownModule, FeatherModule.pick(allIcons)],
  exports: [],
})
export class WidgetModule {}
