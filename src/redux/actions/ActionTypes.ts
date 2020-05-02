export interface Action<P> {
  type: Symbol;
  payload: P;
}

export enum ChangeType {
  isHot = 'isHot',
  isComing = 'isComing',
  isClassic = 'isClassic',
}
