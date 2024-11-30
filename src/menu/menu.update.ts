import { Action, Ctx, Update } from 'nestjs-telegraf';
import { InlineKeyboardMarkup } from 'telegraf/types';
import { ACTIONS, MESSAGES, REGEX } from '../common/constants';
import { CallbackData, CallbackKeyboard } from '../common/decorators';
import { ISceneContext } from '../common/interfaces';
import { destroyKeyboard } from '../common/keyboards';
import { MenuService } from './menu.service';

@Update()
export class MenuUpdate {
   constructor(private readonly menuService: MenuService) {}

   @Action(/\(hint\).+/)
   async onHelpAction(@Ctx() ctx: ISceneContext, @CallbackData(REGEX.HINT_BUTTON) data: Record<string, string>) {
      try {
         const message = ctx.session.menu.hints[data.menuID][data.hintID];
         await ctx.reply(message, destroyKeyboard());
         await ctx.answerCbQuery();
      } catch (_) {
         await ctx.answerCbQuery(MESSAGES.ERROR.UNKNOWN);
      }
   }
   @Action(/\(btn\).+/)
   async onButtonAction(
      @Ctx() ctx: ISceneContext,
      @CallbackData(REGEX.BUTTON_ACTION) data: Record<string, string>,
      @CallbackKeyboard() markup: InlineKeyboardMarkup
   ) {
      const resulting = ctx.session.menu.results[data.menuID];
      switch (data.type) {
         case 'bool':
            const newValue = !resulting[data.resulting];
            resulting[data.resulting] = newValue;
            const newKeyboard = this.menuService.patch(markup, data.resulting, newValue.toString());
            if (!newKeyboard) {
               await ctx.answerCbQuery(MESSAGES.ERROR.UNKNOWN);
               return;
            }
            await ctx.editMessageReplyMarkup(newKeyboard);
            break;
      }
   }

   @Action(ACTIONS.DESTROY)
   async onDestroyAction(@Ctx() ctx: ISceneContext) {
      await ctx.deleteMessage();
   }
}
