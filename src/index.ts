import { TSpreadChainMoveOn } from './types';

export const spreadChain = <TGen>(key:string, moveOn:TSpreadChainMoveOn<TGen>) => {
  const allprops: TGen[][] = [];

  const getRtn = () => ({
    [key]: (...props:TGen[]) => {
      allprops.push(props);

      return getRtn();
    },
    ...moveOn(allprops),
  });
  console.log(1)

  return getRtn();
};
