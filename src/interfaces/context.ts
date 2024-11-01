import { Context } from 'telegraf';
import { SceneContextScene, SceneContext } from 'telegraf/typings/scenes';

export interface IContext extends Context {
   session: ISessionData;
}

export interface ISceneContext extends IContext {
   scene: SceneContextScene<SceneContext<ISessionData>, ISessionData> & ISceneState;
}

export interface ISceneState {
   state: any;
}

export interface ISessionData extends ISceneState {}
