import './App.css';
import HomeBrowser from './components/HomeBrowser.js';
import PlayBrowser from './components/PlayBrowser.js';
import PlayFilter from './components/PlayFilter.js';
import FavoriteBar from './components/FavoriteBar.js';
import PlayDetails from './components/PlayDetails';
import Header from './components/Header.js';

import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import * as cloneDeep from 'lodash/cloneDeep';
import Modal from 'react-modal';
import { Button, Layout, Space } from 'antd';
import 'antd/dist/antd.css';
import { Content } from 'antd/lib/layout/layout';
import { Collapse } from 'antd';

Modal.setAppElement(document.querySelector("#root"));

function App() {

  /**
  * Array of all plays, to be kept in local storage. This hook will always store the entire array of plays
  * for use in other methods. The array displayed in the play browser is the playResults hook further below.
  */
  const [plays, setPlays] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all plays
  useEffect(() => {
    const getData = async () => {
      try {
        if (localStorage.getItem("playsList")) {
          const data = JSON.parse(localStorage.getItem("playsList"));
          data.sort((a, b) => a.title > b.title ? 1 : -1);
          setPlays(data);
          setIsLoading(false);
        } else {
          const url = "https://www.randyconnolly.com//funwebdev/3rd/api/shakespeare/list.php";
          const response = await fetch(url);
          const data = await response.json();
          data.sort((a, b) => a.title > b.title ? 1 : -1);
          localStorage.setItem("playsList", JSON.stringify(data));
          setPlays(data);
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [])

  // Array of plays to display in PlayBrowser.
  const [playResults, setPlayResults] = useState([]);

  // Create new array of plays based on search query
  const searchPlays = (query) => {
    if (showDetails) setShowDetails(false);
    const results = plays.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));
    setPlayResults(results);
  }

  // Set PlayBrowser to display all plays
  const searchAllPlays = () => {
    if (showDetails) setShowDetails(false);
    setPlayResults(plays);
  }

  /**
  * Sort plays by a given field as a String - either by title or by year. The resulting plays
  * is then updated with the sorted plays
  */
  const sortPlays = (e) => {
    const playsCopy = cloneDeep(playResults);
    playsCopy.sort(function (a, b) {
      if (e.currentTarget.name === "title") return a.title > b.title ? 1 : -1;
      if (e.currentTarget.name === "year") return a.likelyDate > b.likelyDate ? -1 : 1;
    })
    setPlayResults(playsCopy);
  }

  // Array for favorited plays
  const [favoritePlays, setFavoritePlays] = useState([]);

  const addFavorite = (id) => {
    const copyPlays = cloneDeep(plays);

    const favPlay = copyPlays.find(p => p.id === id);

    if (isDuplicate(favPlay)) {
      alert("Play already in favorites!");
    } else {
      setFavoritePlays(favoritePlays.concat(favPlay));
    }

  }

  // Helper function to check if a play being added is already in favorites
  function isDuplicate(favPlay) {
    let dupe = false;
    favoritePlays.forEach(p => {
      if (p.id === favPlay.id) {
        dupe = true;
      }
    });
    return dupe;
  }

  // Removes a specific play from favorites list
  const removeFavorite = (play) => {
    const newFavorites = [...favoritePlays];
    const index = newFavorites.indexOf(play);
    newFavorites.splice(index, 1);
    setFavoritePlays(newFavorites);
  }

  const [showFavs, setShowFavs] = useState(false);

  const toggleDisplay = () => setShowFavs(!showFavs);

  /**
   * To filter plays, makes an array of every play by copying the 'plays' hook, then applies each
   * filter to copied array as necessary. Then updates state with results to display in PlayBrowser
   */
  const filterPlays = (title, beforeYear, afterYear, genre) => {
    let playsCopy = [...plays];
    playsCopy = playsCopy.filter(p => p.title.toLowerCase().includes(title.toLowerCase()));
    if (beforeYear !== "")
      playsCopy = playsCopy.filter(p => beforeYear > p.likelyDate);
    if (afterYear !== "")
      playsCopy = playsCopy.filter(p => afterYear < p.likelyDate);
    if (genre !== "")
      playsCopy = playsCopy.filter(p => genre === p.genre);
    setPlayResults(playsCopy);
  }

  // Boolean for whether or not to display play details pane
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => setShowDetails(!showDetails);

  // ID of play open in the Play Details view
  const [currentPlay, setCurrentPlay] = useState("");

  const viewPlay = (id) => {
    toggleDetails();
    setCurrentPlay(id);
  }

  const { Panel } = Collapse;

  /**
  * If still fetching from the API, display a loading animation. Otherwise, load the home browser.
  * Loading animation source: https://loading.io/css/
  */
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        <h1>Loading...</h1>
      </div>
    )
  } else {
    return (
      <main id="app-page" >
        <Route path='/' exact render={() => {
          return (
            <HomeBrowser searchPlays={searchPlays} searchAllPlays={searchAllPlays} />
          );
        }} />
        <Route path='/home' exact render={() => {
          return (
            <HomeBrowser searchPlays={searchPlays} searchAllPlays={searchAllPlays} />
          );
        }} />
        <Route path='/browse' exact render={() => {
          return (
            <Layout>
              <div>
                <div>
                  <Header />
                  <div className="main-container">
                    <div className="sidebar">
                      {!showDetails ? <div className="sort-container">
                        <Space size={20}>
                          <h2 className="inline-block">Sort by:</h2>
                          <Button type="primary" name="title" size="large" onClick={sortPlays}>Title</Button>
                          <Button type="primary" name="year" size="large" onClick={sortPlays}>Year</Button>
                        </Space>
                      </div> : null}
                      <Collapse accordion defaultActiveKey={['1']}>
                        {!showDetails ? <Panel header="Filters" key="1">
                          <PlayFilter plays={playResults} filterPlays={filterPlays} favState={showFavs} />
                        </Panel> : null}
                        <Panel header="Favourites" key="2">
                          <FavoriteBar favPlays={favoritePlays} removePlay={removeFavorite} toggleDisplay={toggleDisplay} showFavs={showFavs} viewPlay={viewPlay} />
                        </Panel>
                      </Collapse>
                    </div>
                    <Content>
                      {!showDetails ? <PlayBrowser plays={playResults} sortPlays={sortPlays} favoritePlay={addFavorite} viewPlay={viewPlay} favState={showFavs} /> : null}
                      {showDetails ? <PlayDetails play={plays.find(p => p.id === currentPlay)} viewPlay={viewPlay} favoritePlay={addFavorite} showFavs={showFavs} /> : null}
                    </Content>
                  </div>

                </div>
              </div>
            </Layout>
          );
        }} />
      </main>
    );
  }
}

export default App;
