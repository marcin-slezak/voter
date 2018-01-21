import {getAvailableTileImages, getRandomTileImage} from './modules/tileImages'

let exampleInitState = {
    user: {
      name: 'MarcinŚ',
      id: 1
    },
    pollsImages: getAvailableTileImages(),
    polls: [
      {
        id: 1,
        img: getRandomTileImage(),
        title: 'What for breakfest',
        author: 'Kowalski',
        open: 1,
        userVote: false,
        proposals: [
          {id: 1, name: "Eggs and bread", votes:0},
          {id: 2, name: "Chicken and pasta", votes:0},
          {id: 3, name: "Pizza", votes:0},
          {id: 4, name: "Burger", votes:0}
        ]
      },
      {
        id: 2,
        img: getRandomTileImage(),
        title: 'Best place to eat burger',
        open: 1,
        userVote: 5,
        author: 'Duda',
        proposals: [
          {id: 5, name: "Mad Mick", votes:10},
          {id: 6, name: "Krowa na wypasie", votes:0},
        ]
      },
      {
        id: 3,
        img: getRandomTileImage(),
        title: 'What Camera for professionals',
        author: 'Danson67',
        open: 0,
        userVote: false,
        proposals: [
          {id: 7, name: "Canon", votes:12},
          {id: 8, name: "Kodak", votes:3},
          {id: 9, name: "Sony", votes:123},
        ]
      }
    ]
  }

  export default exampleInitState