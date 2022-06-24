import {spreadChain} from '../src'


const chainFn = () => ({
  ...spreadChain("where", (numbers) => ({
    numbers,
    getNumbers: () =>  ['get', ...numbers],
    getMore: () => ({
      ...spreadChain("where", (differentNumbers) => ({
        getDifferentNumbers: () => ({ numbers, differentNumbers }),
        ...spreadChain("who", (people) => ({
          showEverything: () => ({people, numbers, differentNumbers}),
        })),
      })),
    }),
  })),
});


it('a chain function collects and returns value',()=>{
  const response = chainFn()
    .where(1,2)
    .where(3,4)
    .where(5,6)
    .where(7,8)
    .numbers
    
    expect(response).toEqual([ [1,2], [3,4], [5,6], [7,8] ]);
})
  
it("a chain function collects and returns value that's edited in the return of a function",()=>{
  const response = chainFn()
    .where(1,2)
    .where(3,4)
    .where(5,6)
    .where(7,8)
    .getNumbers()
  
  expect(response).toEqual(['get', [1,2], [3,4], [5,6], [7,8] ]);
})
  
it("a chain function that goes all over the shop",()=>{
  const response = chainFn()
    .where(11, 43)
    .where(55, 61)
    .getMore()
    .where(5, 5, 4)
    .where(5, 5, 4)
    .who("silad", "issie")
    .who("roblad", "silad", "roblad", "mattlad")
    .who("jakelad")
    .showEverything();

  console.log(response)
  
  expect(response).toEqual( {
    people: [
      [ 'silad', 'issie' ],
      [ 'roblad', 'silad', 'roblad', 'mattlad' ],
      [ 'jakelad' ]
    ],
    numbers: [ [11,43], [55,61] ],
    differentNumbers: [ [5,5,4], [5,5,4] ]
  });
})