import './App.scss';
import { useEffect, useState } from 'react';
import { getComic } from './data/Api.js';
import {AiOutlineStar, AiFillStar} from 'react-icons/ai';

function App() {
  const [comic,setComic] = useState(null);
  const [score, setScore] = useState(0);
  const MILLISECONDS_PER_DAY = 600000; 

  const ObtainComic = async()=>{
    const response = await getComic();
    console.log(JSON.stringify(response));

    if (response.status === 200) {
      setComic(response.comics);
    } 
  }

  const handleScore = (value) => {
    setScore(value);
  };

  const Stars = ()=>{
    return [...new Array(5)].map((start, index)=>{
      return index < score ? (
        <AiFillStar 
          key={index} 
          className='star filled' 
          onClick={() => handleScore(index + 1)} 
        />
      ) : (
        <AiOutlineStar 
          key={index} 
          className='star' 
          onClick={() => handleScore(index + 1)} 
        />
      );
    })
  }

  useEffect(()=>{
    if (comic === null) {
      ObtainComic();
    }
  },[comic]);

  setInterval(() => {
    window.location.reload();
  }, MILLISECONDS_PER_DAY);

  if(comic == null){
    return(
      <main className='App'>
        <article className='App-header'>
          <h2 className='App-title'>Loading...</h2>
        </article>
      </main>
    )
  }
  return (
    <main className='App'>
      <article className='App-header'>
        <h2 className='App-title'>{comic.title}</h2>
        <div className='card border-dark mb-3'>
          <img src={comic.img} className='card-img-bottom' alt='comic' />
        </div>
        <div className='card-footer'>
          <Stars/>
        </div>
      </article>
    </main>
  );
}

export default App;
