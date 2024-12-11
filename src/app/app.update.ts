import { Action, Command, Ctx, Start, Update } from 'nestjs-telegraf';
import { ACTIONS, COMMANDS, MESSAGES, SCENES } from '../common/constants';
import { IContext, ISceneContext } from '../common/interfaces';
import { selectModeKeyboard } from '../common/keyboards';
import { UseGuards } from '@nestjs/common';
import { AdminGuard } from '../common/guards';
import { MenuService } from '../menu/menu.service';
import { MenuBuilder } from '../menu/menu.builder';

@Update()
export class AppUpdate {
   constructor(
      private readonly menuService: MenuService,
      private readonly MENU: MenuBuilder
   ) {}
   @Start()
   async onStart(@Ctx() ctx: IContext) {
      await ctx.replyWithHTML(MESSAGES.START(ctx.from.first_name), {
         link_preview_options: { is_disabled: true },
         reply_markup: selectModeKeyboard.reply_markup
      });
   }

   @Command('test')
   async onTest(@Ctx() ctx: ISceneContext) {
      const submenu = this.menuService.configureSubmenu(ctx, {
         message: 'sub<b>menu</b>',
         parseMode: 'HTML',
         buttons: [this.MENU.bool({ title: 'bool', resultingProperty: 'bln' })]
      });
      const menu = this.menuService.build(ctx, {
         message: 'test <b>message</b>',
         parseMode: 'HTML',
         buttons: [
            this.MENU.bool({ title: 'first button', resultingProperty: 'resulting_prop', hint: 'this is hint' }),
            this.MENU.numbers({ title: 'second button', option: 'double', max: 23, resultingProperty: '2nd' }),
            this.MENU.switch({ title: 'switch', resultingProperty: 'swtch', values: ['font1', 3] }),
            this.MENU.submenu({ title: 'submenu', resultingProperty: '', submenuID: submenu.id })
         ]
      });
      await ctx.reply(menu.message, {
         parse_mode: menu.parseMode,
         reply_markup: menu.markup
      });
   }

   @Action(ACTIONS.MODE.TEXT)
   async onTextMode(@Ctx() ctx: ISceneContext) {
      await ctx.scene.enter(SCENES.MODE.TEXT);
      await ctx.answerCbQuery();
   }

   @UseGuards(AdminGuard)
   @Command(COMMANDS.ADMIN)
   async onAdminCommand(@Ctx() ctx: ISceneContext) {
      await ctx.scene.enter(SCENES.ADMIN);
   }
}
