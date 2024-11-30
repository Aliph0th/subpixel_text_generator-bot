import { Injectable } from '@nestjs/common';
import {
   BuildedButton,
   ButtonOptions,
   IBaseButton,
   IBoolButton,
   IMenuState,
   ISceneContext,
   ISwitchButton
} from '../common/interfaces';
import { getNextID } from '../utils';
import { MESSAGES } from '../common/constants';

@Injectable()
export class MenuBuilder {
   constructor(/*@InjectBot() private readonly bot: Telegraf<ISceneContext>*/) {}
   private buildHint = (menu: IMenuState, hint: string) => {
      const menuID = menu.menuID;
      const hintID = (menu.hints[menuID] ??= { currentID: getNextID() }).currentID;
      menu.hints[menuID].currentID = getNextID(hintID);
      menu.hints[menuID][hintID] = hint;
      return `(hint)-m:${menuID}-h:${hintID}`;
   };
   private buildButton = (
      ctx: ISceneContext,
      menuID: string,
      action: string,
      initialValue: any,
      options: ButtonOptions<IBaseButton>
   ) => {
      if (action.length > 64) {
         throw new Error(MESSAGES.ERROR.ACTION_TOO_LONG);
      }
      ctx.session.menu.results[menuID][options.resultingProperty] = initialValue;
      const button: BuildedButton = {
         title: options.title,
         resultingProperty: options.resultingProperty,
         action
      };
      if (options.hint) {
         button.hintAction = this.buildHint(ctx.session.menu, options.hint);
      }
      return button;
   };

   bool = (options: ButtonOptions<IBoolButton>) => (ctx: ISceneContext) => {
      {
         const menuID = ctx.session.menu.menuID;
         return this.buildButton(
            ctx,
            menuID,
            `(btn)-t:bool-m:${menuID}-p:${options.resultingProperty}`,
            options.default || false,
            options
         );
      }
   };

   switch = (options: ButtonOptions<ISwitchButton>) => (ctx: ISceneContext) => {
      {
         const menuID = ctx.session.menu.menuID;
         return this.buildButton(
            ctx,
            menuID,
            `(btn)-t:switch-m:${menuID}-p:${options.resultingProperty}-v:{${options.values.join()}}`,
            options.values[0],
            options
         );
      }
   };
}
