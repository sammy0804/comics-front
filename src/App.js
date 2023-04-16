import './App.scss';
import { useEffect, useState } from 'react';
import { getComic,getRatedComics,postRateComic } from './data/Api.js';
import {AiOutlineStar, AiFillStar} from 'react-icons/ai';

function App() {
  const [comic,setComic] = useState(null);
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [ratedComics, setRatedComics] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const handleClose = () => setShowModal(false);
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
    postRateComic(comic.num, value);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
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

  const toggleModal = async () => {
    setShowModal(!showModal);
    const response = await getRatedComics();
    console.log(JSON.stringify(response));

    if (response.status === 200) {
      setRatedComics(response.comics);
    }
  };

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
        <div className='card-button'>
          <button type='button' className='btn btn-primary' onClick={toggleModal}>Ver Cómics Calificados</button>
        </div>
        {showAlert && (
          <div className='alert alert-success' role='alert' onClose={()=>setShowAlert(false)}>
            Comic calificado exitosamente!
          </div>
        )}
        {showModal && (
        <div className="comic-modal">
          <div className="comic-modal-dialog">
            <div className="comic-modal-content">
              <div className="comic-modal-header">
                <h5 className="comic-modal-title">Comics List</h5>
              </div>
              <div className="comic-modal-body">
                <ul>
                  {ratedComics.map((comic,index) => (
                    <li key={index}>
                      {comic.comic.title} (ID: {comic.comic.num}) - Rating: {comic.rate}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="comic-modal-footer">
                <button className="btn btn-secondary" onClick={handleClose}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        )}
      </article>
    </main>
  );
}

export default App;
