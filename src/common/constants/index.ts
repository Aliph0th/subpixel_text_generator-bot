import { IMenuState } from '../interfaces';

export const MESSAGES = {
   START: (username: string) =>
      `👋, ${username}\n<i><a href="https://github.com/essensuOFnull/subpixel_text_generator">Скрипт</a> написал</i> @essensuOFnull (<span class="tg-spoiler">Не против пообщаться, пишите</span>)\n<i>Бота сделал</i> @aliph0th\n\n<b>Выберите режим:</b>`,
   OK: 'Ok',
   SEND_TEXT: 'Отправьте текст',
   SEND_ONE_NUMBER: 'Отправьте число',
   SEND_TWO_NUMBERS: 'Отправьте два числа через пробел',
   SEND_NUMBER_OR_NUMBERS: 'Отправьте число или два числа через пробел',
   DONE: 'Готово',
   ERROR: {
      GENERATION: 'Error during generating image on your request',
      EMPTY_BUTTONS: 'Buttons array cannot be empty',
      ATTEMPT_ADMIN: (id: number, username = '<none>') =>
         `Someone (${id}|@${username}) tried to get in to the admin panel`,
      UNKNOWN: 'Unknown error happened',
      ACTION_TOO_LONG: 'Action must not exceed 64 bytes',
      INVALID_DATA_FORMAT: 'Вы ввели данные неверного формата'
   },
   ADMIN: {
      ENTER: 'You entered the admin panel'
   }
};

export const DEFAULT_MENU_STATE: IMenuState = {
   menuID: '',
   hints: {},
   results: {}
};

export const ACTIONS = {
   MODE: {
      TEXT: 'text',
      IMG_PARTS: 'img-parts',
      FULL_IMG: 'full-img'
   },
   DESTROY: 'destroy'
};

export const REGEX = {
   BUTTON_ACTION: /\(btn\)-t:(?<type>\w+)-m:(?<menuID>\w+)-p:(?<resulting>\w+)/g,
   HINT_BUTTON: /\(hint\)-m:(?<menuID>\w+)-h:(?<hintID>\w+)/g,
   SWITCH_VALUES: /-v:{(?<values>[\w,]+)}/g,
   NUMBERS_OPTION: /-o:(?<option>single|double|both)/g,
   NUMBERS_CONSTRAINTS: /-c:(?<min>[\w,]+)@(?<max>[\w,]+)/g
};

export const SCENES = {
   MODE: {
      TEXT: `${ACTIONS.MODE.TEXT}-scene`
   },
   ADMIN: 'admin-scene',
   MENU_NUMBERS: 'menu-numbers-scene'
};

export const CLIENTS = {
   GENERATOR: 'generator-client'
};

export const COMMANDS = {
   MODE: 'mode',
   ADMIN: 'admin'
};
