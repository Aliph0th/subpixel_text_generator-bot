import { Action, Ctx, Start, Update } from 'nestjs-telegraf';
import { ACTIONS, MESSAGES, SCENES } from '../constants';
import { IContext, ISceneContext } from '../interfaces';
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

   @Action(ACTIONS.MODE.TEXT)
   async onTextMode(@Ctx() ctx: ISceneContext) {
      await ctx.scene.enter(SCENES.MODE.TEXT);
      await ctx.answerCbQuery();
   }
}
