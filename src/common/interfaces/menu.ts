import { InlineKeyboardMarkup, ParseMode } from 'telegraf/types';
import { ISceneContext } from './context';

export interface IMenuState {
   menuID: string;
   results: Record<string, Record<string, any>>;
   hints: Record<string, Record<string, string> & { currentID: string }>;
}

export interface IMenuOptions {
   message: string;
   parseMode: ParseMode;
   buttons: Array<(_: ISceneContext) => BuildedButton>;
}

export interface IMenu {
   message: string;
   markup: InlineKeyboardMarkup;
   parseMode: ParseMode;
}

export interface IBaseButton {
   title: string;
   hint?: string;
}

export type BuildedButton = { title: string; action: string; hintAction?: string; resultingProperty: string };
export type ButtonOptions<T extends IBaseButton> = { resultingProperty: string } & T;

export interface ISubmenuButton extends IBaseButton {
   submenu: IMenuOptions;
}
export interface IBackButton extends IBaseButton {}

export interface ISwitchButton extends IBaseButton {
   values: Array<number | string | boolean>;
}
export interface IBoolButton extends IBaseButton {
   default?: boolean;
}

export interface INumbersButton extends IBaseButton {
   option: 'single' | 'double' | 'both';
   min?: number;
   max?: number;
}
