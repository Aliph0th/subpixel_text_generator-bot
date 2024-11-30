export * from './context';
export * from './generator';
export * from './menu';

export interface IMessage {
   text: string;
}

export interface ICallbackData {
   action: string;
   data: Record<string, string>;
}
