import { InlineKeyboardMarkup, ParseMode } from 'telegraf/types';
import { ISceneContext } from './context';

export interface IMenuState {
   menuID: string;
   results: Record<string, Record<string, any>>;
   hints: Record<string, Record<string, string> & { currentID: string }>;
   menus: Record<string, { config: string; parent?: string } & Omit<IMenuOptions, 'buttons'>>;
}

export interface IMenuOptions {
   message: string;
   parseMode: ParseMode;
   buttons: Array<(_: ISceneContext, __?: string) => BuildedButton>;
}

export interface IMenu {
   message: string;
   markup: InlineKeyboardMarkup;
   parseMode: ParseMode;
}

export interface IBaseButton {
   title: string;
   hint?: string;
   resultingProperty?: string;
}

export type BuildedButton = {
   title: string;
   action: string;
   hintAction?: string;
   resultingProperty?: string;
};

export interface ISubmenuButton extends IBaseButton, Omit<IMenu, 'markup'> {
   configResolver: (_: ISceneContext, __: string) => string;
}
export interface IBackButton extends IBaseButton {
   menuID: string;
}

export interface ISwitchButton extends IBaseButton {
   values: Array<number | string | boolean>;
   resultingProperty: string;
}
export interface IBoolButton extends IBaseButton {
   default?: boolean;
   resultingProperty: string;
}

export interface INumbersButton extends IBaseButton {
   option: 'single' | 'double' | 'both';
   min?: number;
   max?: number;
   resultingProperty: string;
}
