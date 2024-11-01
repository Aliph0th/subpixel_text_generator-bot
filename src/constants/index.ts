export const MESSAGES = {
   START: (username: string) =>
      `👋, ${username}\n<i><a href="https://github.com/essensuOFnull/subpixel_text_generator">Скрипт</a> написал</i> @essensuOFnull (<span class="tg-spoiler">Не против пообщаться, пишите</span>)\n<i>Бота сделал</i> @aliph0th\n\n<b>Выберите режим:</b>`,
   SEND_TEXT: 'Отправьте текст',
   DONE: 'Готово',
   ERROR: {
      GENERATION: 'Error during generating image on your request'
   }
};

export const ACTIONS = {
   MODE: {
      TEXT: 'text',
      IMG_PARTS: 'img-parts',
      FULL_IMG: 'full-img'
   }
};

export const SCENES = {
   MODE: {
      TEXT: `${ACTIONS.MODE.TEXT}-scene`
   }
};

export const CLIENTS = {
   GENERATOR: 'generator-client'
};
