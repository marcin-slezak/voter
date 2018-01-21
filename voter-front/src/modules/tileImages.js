import tileImage1 from '../assets/images/1.jpg'
import tileImage2 from '../assets/images/2.jpg'
import tileImage3 from '../assets/images/3.jpg'
import tileImage4 from '../assets/images/4.jpg'
import tileImage5 from '../assets/images/5.jpg'
import tileImage6 from '../assets/images/6.jpg'
import tileImage7 from '../assets/images/7.jpg'
import tileImage8 from '../assets/images/8.jpg'
import tileImage9 from '../assets/images/9.jpg'
import tileImage10 from '../assets/images/10.jpg'




function getRandomArrayElement(list) {
    return list[Math.floor((Math.random()*list.length))];
}

export function getAvailableTileImages(){
    return [tileImage1, tileImage2, tileImage3, tileImage4, tileImage5, tileImage6, tileImage7, tileImage8, tileImage9, tileImage10];
}

export function getRandomTileImage(){
    return getRandomArrayElement(getAvailableTileImages());
}

 