import React, { Component } from 'react';
import './App.css';
import SearchResult from './components/searchResult';
import Favorites from './components/favorites';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        inputValue: '',
        data: [],
        searchTitles: [],
        searchResults: [],
        favoritesTitles: [],
        favorites: [],
    };
  }

  // when the app mounts, fetch the data
  componentDidMount() {
      this.fetchData();
  }

  fetchData() {
      fetch('https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000')
      .then(res => res.json())
      .then(data => { 
          this.setState({ data });
      })
  }

  // set inputValue to the value entered in the input box
  updateInputValue = (event) => {
    this.setState({
      [event.target.name]:  event.target.value,
    });

    // when the user clears the input field
    if(event.target.value.length < 1){
      this.handleClear();
    }
  }

  // when user types and hits enter
  handleSubmit = (e) => {
    e.preventDefault();
    this.handleSearch();
  }

  // when user types and clicks the search
  handleSearch = () => {
    // dont search if the input field is empty
    if(this.state.inputValue.length < 1){
      return;
    }

    let currentTitles = [...this.state.searchTitles];
    let newSearchResults = [];

    // search through the data
    this.state.data.forEach((data) => {
      // check if the input value is in the data's keywords or title
      if(data.keywords.includes(this.state.inputValue) || data.title.includes(this.state.inputValue)){
          currentTitles.push(data.title)

          // has html entities, so we need to decode
          let decodedString = this.decode(data.body);
          
          // create our new searched item obj
          let newSearchObj = {
            title: data.title,
            description: decodedString,
            title: data.title,
          }

          newSearchResults.push(newSearchObj)
          
          // the state now has the search results and categories found 
          this.setState({ 
            searchResults: [...newSearchResults],
            searchTitles: [...currentTitles],
          });
      }
    });
  }

  // clear search results
  handleClear = () => {
    // the search data is now empty
    this.setState((prevState, props) => { 
      return (
        {
          searchResults: [],
          searchTitles: [],
        }
      )
    });
  }

  // unescape/decode html entities
  decode = (str) => {
    var doc = new DOMParser().parseFromString(str, 'text/html');
    return doc.documentElement.textContent;
  }

  // adds the item into the favorites list
  addFavorite = (item) => {
    // get the list of the current favorite titles
    let currentFavoritesTitles = [...this.state.favoritesTitles];
    
    // if the one clicked isnt in the favorites list, add it
    if(!currentFavoritesTitles.includes(item.title)){
      currentFavoritesTitles.push(item.title);
      let newFavorites = [...this.state.favorites, item];
      this.setState({
        favoritesTitles: currentFavoritesTitles,
        favorites: newFavorites,
      })
    }
  }

  // remove the item from the favorites list
  removeFavorite = (item) => {
    let currentFavoritesTitles = [...this.state.favoritesTitles];
    let currentFavorites = [...this.state.favorites];

    // remove the favorite title from the array 
    currentFavoritesTitles.forEach((title, index) => {
      if(title === item.title){
        currentFavoritesTitles.splice(index, 1);
        return;
      }
    })

    // remove the favorite item from the list
    currentFavorites.forEach((favorite, index) => {
      if(favorite.title === item.title){
        currentFavorites.splice(index, 1);
        return;
      }
    })

    // update the state with the removed favorite item and title
    this.setState({
      favoritesTitles: currentFavoritesTitles,
      favorites: currentFavorites,
    })
  }

  render() {
    return (
      <div className='App'>
        <h1 className='header'>Toronto Waste Lookup</h1>
        <form onSubmit={(e) => this.handleSubmit(e)}>
            <input name='inputValue' type='text' placeholder='Search the waste wizard...'
                value={this.state.inputValue} onChange={(e) => this.updateInputValue(e)}/>
            <a href="#"className='btn' onClick={this.handleSearch}
            > <FontAwesomeIcon icon={faSearch} className='icon-flipped' /></a>
        </form>

        <SearchResult results={this.state.searchResults} favoritesTitles={this.state.favoritesTitles} 
          addFavorite={this.addFavorite} removeFavorite={this.removeFavorite}/>

        <Favorites favorites={this.state.favorites} removeFavorite={this.removeFavorite}/>
      </div>
    );
  }
}

export default App;
