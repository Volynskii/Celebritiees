import React, {useEffect, useState} from "react";
import SimpleCarousel from "./components/simpleCarousel";
import playButton from './img/play button.png';


function App() {

  const [celebrities,setCelebrities] = useState('');
  const [currentCelebrity,setCurrentCelebrity] = useState(0);
  const startFetch = async () => {
    const response = await fetch('https://cdnapi.smotrim.ru/api/v1/boxes/vesti2');
    let json = await response.json();

    let superStars = json.data.content.find((it) => it.title === "Персоны").content.map((el) => {
      return {...el,'img': `https://api.smotrim.ru/api/v1/pictures/${el['picId']}/bq/redirect`}
    });
    //  STORE DATA AND SET ACTIVE CARD
    setCelebrities(superStars);
    setCurrentCelebrity(0);
  };
  useEffect(() => {
    // START FETCHING
    startFetch()
  },[]);

  // ACTIVE INFO CARD
  const Info = ({currentCelebrity}) => {
    return (
        <>
          <div className="info">
            <div className="img-info">
              <img src={playButton} className="img-play-button" alt="123"/>
              <img src={celebrities[currentCelebrity]?.img} className="img-info" alt="123"/>
            </div>
            <div className="content">
              {celebrities[currentCelebrity].ocupation ? (
                  <h3>celebrities[currentCelebrity].ocupation</h3>
              ): <h3>ведущий</h3>
              }
              <h3 className="name">{celebrities[currentCelebrity]?.title}</h3>
              {celebrities[currentCelebrity].description ? (
                  <p className="desciption">celebrities[currentCelebrity].description</p>
              ): <p className="desciption">
                Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </p>
              }
            </div>
          </div>
        </>
    )
  };

  return (
      <div className="App">
        <div style={{paddingTop: '100px'}}>
        </div>
        {celebrities && (
            <section className="celebrities">
              <Info
                  currentCelebrity={currentCelebrity}
              />

              <div className="swiper products-slider  ">
                <div className="swiper-wrapper list">
                  <SimpleCarousel
                      show={9}
                  >
                    {celebrities.map((celebrity, index) => {
                      return (
                          <div key={celebrity.name} className="box swiper-slide slide">
                            <div onClick={() => setCurrentCelebrity(index)} className="box-img">
                              <img src={celebrity.img} alt="12"/>
                            </div>
                            <div className="box-title">{celebrity.title}</div>
                          </div>
                      )
                    })}
                  </SimpleCarousel>
                </div>
              </div>
            </section>
        )}
      </div>
  );
}

export default App;
