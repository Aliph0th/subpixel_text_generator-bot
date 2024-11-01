import { Action, Command, Ctx, Start, Update } from 'nestjs-telegraf';
import { ACTIONS, COMMANDS, MESSAGES, SCENES } from '../common/constants';
import { IContext, ISceneContext } from '../common/interfaces';
import { selectModeKeyboard } from '../common/keyboards';
import { UseGuards } from '@nestjs/common';
import { AdminGuard } from '../common/guards';

@Update()
export class AppUpdate {
   @Start()
   async onStart(@Ctx() ctx: IContext) {
      await ctx.replyWithHTML(MESSAGES.START(ctx.from.first_name), {
         link_preview_options: { is_disabled: true },
         reply_markup: selectModeKeyboard.reply_markup
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
