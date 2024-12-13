import { Injectable } from '@nestjs/common';
import {
   BuildedButton,
   IBackButton,
   IBaseButton,
   IBoolButton,
   IMenuState,
   INumbersButton,
   ISceneContext,
   ISubmenuButton,
   ISwitchButton
} from '../common/interfaces';
import { getNextID } from '../utils';
import { MESSAGES } from '../common/constants';

@Injectable()
export class MenuBuilder {
   private buildHint = (menuID: string, menu: IMenuState, hint: string) => {
      const hintID = (menu.hints[menuID] ??= { currentID: getNextID() }).currentID;
      menu.hints[menuID].currentID = getNextID(hintID);
      menu.hints[menuID][hintID] = hint;
      return `(hint)-m:${menuID}-h:${hintID}`;
   };
   private buildButton = (
      ctx: ISceneContext,
      action: string,
      options: IBaseButton,
      menuID: string,
      initialValue: any = null
   ) => {
      if (action.length > 64) {
         throw new Error(MESSAGES.ERROR.ACTION_TOO_LONG);
      }
      if (initialValue !== null && options.resultingProperty) {
         ctx.session.menu.results[menuID][options.resultingProperty] = initialValue;
      }
      const button: BuildedButton = {
         title: options.title,
         resultingProperty: options.resultingProperty,
         action
      };
      if (options.hint) {
         button.hintAction = this.buildHint(menuID, ctx.session.menu, options.hint);
      }
      return button;
   };

   bool = (options: IBoolButton) => (ctx: ISceneContext) => {
      const menuID = ctx.session.menu.menuID;
      return this.buildButton(
         ctx,
         `(btn)-t:bool-m:${menuID}-p:${options.resultingProperty}`,
         options,
         menuID,
         options.default || false
      );
   };

   switch = (options: ISwitchButton) => (ctx: ISceneContext) => {
      const menuID = ctx.session.menu.menuID;
      return this.buildButton(
         ctx,
         `(btn)-t:switch-m:${menuID}-p:${options.resultingProperty}-v:{${options.values.join()}}`,
         options,
         menuID,
         options.values[0]
      );
   };

   numbers = (options: INumbersButton) => (ctx: ISceneContext) => {
      const menuID = ctx.session.menu.menuID;
      let action = `(btn)-t:nums-m:${menuID}-p:${options.resultingProperty}-o:${options.option}`;
      if (options.min || options.max) {
         action += `-c:${options.min || '_'}@${options.max || '_'}`;
      }
      return this.buildButton(ctx, action, options, menuID);
   };

   submenu = (options: ISubmenuButton) => (ctx: ISceneContext, parentMenuID: string) => {
      const subMenuID = getNextID(parentMenuID);
      ctx.session.menu.menuID = subMenuID;
      ctx.session.menu.results[subMenuID] = {};
      ctx.session.menu.menus[subMenuID] = {
         config: options.configResolver(ctx, parentMenuID),
         message: options.message,
         parseMode: options.parseMode,
         parent: parentMenuID
      };
      return this.buildButton(ctx, `(btn)-t:sub-m:${subMenuID}`, options, subMenuID);
   };

   back = (options: IBackButton) => (ctx: ISceneContext) => {
      return this.buildButton(ctx, `(btn)-t:back-m:${options.menuID}`, options, options.menuID);
   };
}
