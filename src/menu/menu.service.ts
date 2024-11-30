import { Injectable } from '@nestjs/common';
import { Markup } from 'telegraf';
import { DEFAULT_MENU_STATE, MESSAGES } from '../common/constants';
import { IMenu, IMenuOptions, ISceneContext } from '../common/interfaces';
import { getNextID } from '../utils';
import { InlineKeyboardButton, InlineKeyboardMarkup } from 'telegraf/types';

@Injectable()
export class MenuService {
   build(ctx: ISceneContext, options: IMenuOptions): IMenu {
      if (!options.buttons.length) {
         throw new Error(MESSAGES.ERROR.EMPTY_BUTTONS);
      }
      ctx.session.menu ??= DEFAULT_MENU_STATE;
      const menuID = getNextID(ctx.session.menu.menuID);
      ctx.session.menu.menuID = menuID;
      ctx.session.menu.results[menuID] = {};
      const inlineButtons = options.buttons.map(buttonFn => {
         const builded = buttonFn(ctx);
         const initialValue = ctx.session.menu.results[menuID][builded.resultingProperty];
         const inlineButton = [Markup.button.callback(`${builded.title}: ${initialValue}`, builded.action)];
         if (builded.hintAction) {
            inlineButton.push(Markup.button.callback('?', builded.hintAction));
         }
         return inlineButton;
      });

      return {
         message: options.message,
         parseMode: options.parseMode,
         markup: { inline_keyboard: Markup.inlineKeyboard(inlineButtons).reply_markup.inline_keyboard }
      };
   }

   patch({ inline_keyboard }: InlineKeyboardMarkup, resulting: string, value: string): InlineKeyboardMarkup | null {
      const markup = inline_keyboard as InlineKeyboardButton.CallbackButton[][];
      const regex = new RegExp(`p:${resulting}$`, 'g');
      let found = false;
      for (let i = 0; i < markup.length; ++i) {
         if (found) {
            break;
         }
         for (let j = 0; j < markup[i].length; ++j) {
            const button = markup[i][j];
            if (button.callback_data.match(regex)) {
               const title = button.text.split(': ')[0];
               button.text = `${title}: ${value}`;
               found = true;
               break;
            }
         }
      }
      if (!found) {
         return null;
      }
      return { inline_keyboard };
   }
}
