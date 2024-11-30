import { Global, Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuUpdate } from './menu.update';
import { MenuBuilder } from './menu.builder';

@Global()
@Module({
   providers: [MenuBuilder, MenuService, MenuUpdate],
   exports: [MenuService, MenuBuilder]
})
export class MenuModule {}
