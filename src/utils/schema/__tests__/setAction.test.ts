import { Action } from 'src/types';
import { setAction } from '../setAction';

describe('setAction', () => {
  test('should return undefined if action is undefined', () => {
    expect(setAction(undefined)).toBeUndefined();
  });

  test('works correctly', () => {
    const action: Action = {
      actionType: 'myType',
      actionName: 'ActionMan',
      target: 'Super',
    };

    const data = setAction(action);

    expect(data).toEqual({
      '@type': 'myType',
      name: action.actionName,
      target: action.target,
    });
  });
});
