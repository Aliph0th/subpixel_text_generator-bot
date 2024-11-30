import { Context } from 'telegraf';
import { SceneContext, SceneContextScene, WizardContext, WizardContextWizard } from 'telegraf/typings/scenes';
import { IScriptOptions } from './generator';
import { IMenuState } from './menu';

export interface IContext extends Context {
   session: ISessionData;
}

export interface ISceneContext extends IContext {
   scene: SceneContextScene<SceneContext<ISessionData>, ISessionData> & ISceneState;
}

export interface IWizardContext extends ISceneContext {
   wizard: WizardContextWizard<WizardContext<ISessionData>>;
}

export interface ISceneState {
   state: any;
}

export interface ISessionData extends ISceneState {
   options: IScriptOptions;
   cursor: number;
   menu: IMenuState;
}
