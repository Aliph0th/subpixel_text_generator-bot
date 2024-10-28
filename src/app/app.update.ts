import { Ctx, Start, Update } from 'nestjs-telegraf';
import { IContext } from '../interfaces';
import { MESSAGES } from '../constants';
import { selectModeKeyboard } from '../keyboards';

@Update()
export class AppUpdate {
   @Start()
   async onStart(@Ctx() ctx: IContext) {
      await ctx.replyWithHTML(MESSAGES.START(ctx.from.first_name), {
         link_preview_options: { is_disabled: true },
         reply_markup: selectModeKeyboard.reply_markup
      });
   }
}
