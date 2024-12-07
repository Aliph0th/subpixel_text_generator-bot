import { Markup } from 'telegraf';
import 'telegraf/types';
import { ACTIONS, MESSAGES } from '../constants';

export const selectModeKeyboard = Markup.inlineKeyboard([
   [Markup.button.callback('Преобразовать текст', ACTIONS.MODE.TEXT)],
   [Markup.button.callback('Преобразовать часть изображения', ACTIONS.MODE.IMG_PARTS)],
   [Markup.button.callback('Преобразовать всё изображение', ACTIONS.MODE.FULL_IMG)]
]);

export const destroyKeyboard = (message = MESSAGES.OK) =>
   Markup.inlineKeyboard([Markup.button.callback(message, ACTIONS.DESTROY)]);
