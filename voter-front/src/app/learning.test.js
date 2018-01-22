// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from '../containers/App.js';

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
// });


// LEARNING TESTS

it('play with Jest - obvious test to check if object is pass by reference', () => {
  let someObject = {a:1, b:2}
  let someObject2 = someObject;
  someObject2.a=100
  expect(someObject.a).toBe(100)
  expect(someObject2.a).toBe(100)
  expect(someObject).toBe(someObject2)
})


it('next play with Jest - Object.assign', () => {
  let someObject = {a:1, b:2}
  let someObject2 = Object.assign({}, someObject, {c:3})
  someObject2.a=100
  expect(someObject.a).toBe(1)
  expect(someObject2.a).toBe(100)
  expect(someObject).not.toBe(someObject2)
  expect(someObject2.c).toBe(3)
  expect(someObject).not.toBe({a:1, b:2})
  expect(someObject).toEqual({a:1, b:2})
})

it('array pass by reference', ()=>{
  let obj1 = {a1:1}, obj2 = {a2:2};
  let a = [ obj1, obj2 ]
  let b = a;
  b[0].a1 = 100;
  expect(obj1.a1).toBe(100)
  expect(a).toBe(b)
})

it('when copy array of objects using slice(0) then array is new object but array objects are reference to objects from old array', () => {
  let obj1 = {a1:1}, obj2 = {a2:2};
  let a = [ obj1, obj2 ]
  let b = a.slice(0);
  expect(a).not.toBe(b)
  expect(a[0]).toBe(b[0])
})


it('how to find nasted elements in array', () => {
  let polls = [
    {
      id: 1,
      proposals: [
        {id: 1, name: "Eggs and bread", votes:0},
        {id: 2, name: "Chicken and pasta", votes:0},
        {id: 3, name: "Pizza", votes:0},
        {id: 4, name: "Burger", votes:0}
      ]
    },
    {
      id: 2,
      proposals: [
        {id: 5, name: "Mad Mick", votes:10},
        {id: 6, name: "Krowa na wypasie", votes:0},
      ]
    },
    {
      id: 3,
      proposals: [
        {id: 7, name: "Canon", votes:12},
        {id: 8, name: "Kodak", votes:3},
        {id: 9, name: "Sony", votes:123},
      ]
    }
  ]

  expect(
        polls.find(poll => poll.proposals.find(proposal => proposal.id === 7)).id
      ).toBe(3)
  expect(
    polls.findIndex(poll => poll.proposals.find(proposal => proposal.id === 7))
  ).toBe(2)

})

it('test object spread operator to create stateshallow copies ', () => {

  let obj1 = {a: 1, b:2, c:3}
  let obj2 = {a: 2, b:3, c:4}
  let obj3 = {a: 3, b:4, c:5}
  let obj3Alternative = {some: 'other'}
  let obj4 = {obj1, obj2, obj3}
  expect(obj4.obj1).toBe(obj1)

  let obj5 = {...obj4, obj3: obj3Alternative}
  expect(obj5).not.toBe(obj4) 
  expect(obj5.obj1).toBe(obj4.obj1) 
  expect(obj5.obj3).not.toBe(obj3)
  expect(obj5.obj3).toBe(obj3Alternative)
})

it('lets try to test array shallow copy', () => {
  let obj1 = {a: 1, b:2, c:3}
  let obj2 = {a: 2, b:3, c:4}
  let obj3 = {a: 3, b:4, c:5}
  let obj2Alternative = {some: 'other'}
  let arr1 = [obj1, obj2, obj3];
  let index = 1;
  let arr2 = [
    ...arr1.slice(0,index),
    obj2Alternative,
    ...arr1.slice(index+1)
  ]
  expect(arr1[0]).toBe(arr2[0])
  expect(arr1[1]).not.toBe(arr2[1])
  expect(arr2[1]).toBe(obj2Alternative)
  expect(arr1[2]).toBe(arr2[2])
})

it('test findindex ', () => {
  let obj1 = {a: 1, b:2, c:3}
  let obj2 = {a: 2, b:3, c:4}
  let obj3 = {a: 3, b:4, c:5}
  let arr = [obj1, obj2, obj3]
  expect(arr.findIndex(item => item.a === 2)).toBe(1)
  expect(arr.findIndex(item => item.b === 4)).toBe(2)
  expect(arr.findIndex(item => item.b === 444)).toBe(-1)
})

it('test spread operator on array instead of push on slice(0)', () => {
  let obj1 = {a: 1, b:2, c:3}
  let obj2 = {a: 2, b:3, c:4}
  let obj3 = {a: 3, b:4, c:5}
  let arr = [obj1, obj2, obj3]
  let obj3Alternative = {some: 'other'}
  let arr2 = [...arr, obj3Alternative]
  expect(arr2[3]).toBe(obj3Alternative)
  expect(arr[0]).toBe(arr2[0])
})

it('array.map - can change origin if arrays cntains objects', () => {
  let obj1 = {a: 1, b:2, c:3}
  let obj2 = {a: 2, b:3, c:4}
  let obj3 = {a: 3, b:4, c:5}
  let arr = [obj1, obj2, obj3]
  arr.map(e => {
    e.a = e.a+10;
    return e
  })
  expect(obj1.a).toBe(11)
})

it('play with promisses and how test callbacks', done => {
  expect.assertions(1);
  let p = new Promise(function(resolve, reject){
    resolve('was ok')
  })
  
  p.then(success => {
    expect(success).toBe('was ok')
    done()
  })

})

it('test callbacks by return promise', () => {
  expect.assertions(2)
  let p = () => new Promise(function(resolve, reject){
    resolve("ok")
  })

  return p().then(d => {expect(d).toBe("ok"); return 'okok' }).then(dd => expect(dd).toBe('okok') )
})

it('play with generators', () => {
  function* generator() {
    yield 11
    yield 22
    yield 33
    return 'aha'
  }

  let iterator = generator()

  expect(iterator.next()).toEqual({ value: 11, done: false })
  expect(iterator.next()).toEqual({ value: 22, done: false })
  expect(iterator.next()).toEqual({ value: 33, done: false })
  expect(iterator.next()).toEqual({ value: 'aha', done: true })

  iterator = generator()

  expect([...iterator]).toEqual([11,22,33])

  let [a,b,c] = generator()
  
  expect(a).toBe(11)
  expect(b).toBe(22)
  expect(c).toBe(33)

  

})

it('promises catch', done => {
  let p = () => new Promise(function(resolve, reject){
    reject('was NOT ok')
  })
  
  let p2 = () => new Promise(function(resolve, reject){
    resolve('was ok')
  })

  let run = () => p().then(() => p2).catch(err => {
  
    expect(err).toBe('was NOT ok')
    done()
  })

  run()

})

it('Promise chain', done => {
  let p = () => new Promise(function(resolve, reject){
    resolve('was ok')
  })

  p().then(() => { () => {} } ).then(() => done())
})

it('email validation req exp', () => {
  let reg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
  let emails = [
    'smth@gmail.com',
    'slezak_marcin@wp.pl',
    'ajsdnakjd_asda_dada@dasd.ds',
    'marcin.slezak@webanywhere.co.uk'
  ]

  emails.forEach(e => {
    expect(reg.test(e)).toBe(true)
  })

  let invalidEmails = [
    'dadadasd',
    '',
    '123123',
    '@asd.ds',
    'sdfsdf@dafsdfasfdsfd.sdfss'
  ]

  invalidEmails.forEach(e => {
    expect(reg.test(e)).toBe(false)
  })
})