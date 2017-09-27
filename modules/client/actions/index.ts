export enum ActionTypeKeys {
  OTHER_ACTION = "fake"
}
export type ActionTypes = OtherAction;

export type OtherAction = {
  readonly type: ActionTypeKeys.OTHER_ACTION;
};
