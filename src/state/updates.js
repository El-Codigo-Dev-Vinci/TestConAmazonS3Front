import { atomFamily, useSetRecoilState } from 'recoil';

export const counterUpdatesState = atomFamily({
  key: 'counterUpdates',
  default: 0,
});

export function useNotifyUpdate(entityName) {
  const setCounter = useSetRecoilState(counterUpdatesState(entityName));
  return () => {
    setCounter((counter) => counter + 1);
  };
}
