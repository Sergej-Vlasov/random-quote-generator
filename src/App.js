import React, { Component } from 'react';
import './App.scss';
import axios from 'axios';

const URL_KEY = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'

class App extends Component {

  state = {
    quotes: [],
    selectedQuote: {},
    error: false,
    fade: false
  }

  componentDidMount() {
    this.getQuotes();
  }

  getQuotes = () => {
    if(this.state.quotes.length === 0) {
      axios.get(URL_KEY)
        .then(response => {
          this.setState({quotes: response.data.quotes})
          this.getRandomQuote();
        })
        .catch(error => {
          console.log(error);
          this.setState({error: true})
        })
    }
      
  }

  getRandomQuote = () => {
    if(this.state.quotes.length) {
      this.setState({fade: true});
      this.setState({selectedQuote: this.state.quotes[Math.floor(Math.random() * this.state.quotes.length)]});
    } else {
      this.getQuotes();
    }
    
  }

  render() {
    const { quotes, selectedQuote, error, fade } = this.state;
    const encodedTweet = encodeURIComponent(`"${selectedQuote.quote}" by ${selectedQuote.author}`);
    let content;
    if(error) {
      content = 
        <div id='quote box' className={`quote-box${fade ? ' fade' : ''}`} onAnimationEnd={() => this.setState({fade: false})}>
          <div id='text' className='quote'>Sorry, something went wrong!</div>
        </div>
    } else if (!quotes.length) {
      content = 
        <div id='quote box' className={`quote-box${fade ? ' fade' : ''}`} onAnimationEnd={() => this.setState({fade: false})}>
          <div id='text' className='quote'>Loading quote...</div>
        </div>
    } else {
      content = 
        <div id='quote box' className={`quote-box${fade ? ' fade' : ''}`} onAnimationEnd={() => this.setState({fade: false})}>
          <div id='text' className='quote'>{(typeof selectedQuote !== 'undefined') ? selectedQuote.quote : null }</div>
          <div id='author' className='quote--author'>-{(typeof selectedQuote !== 'undefined') ? selectedQuote.author : null }</div>
          <div className='buttons'>
            <a id='tweet-quote' className='button button--tweet' target='_blank' rel="noopener noreferrer" href={`https://twitter.com/intent/tweet?text=${encodedTweet}&hashtags=quotes`}>
            </a>
            <div id='new-quote'className='button' onClick={this.getRandomQuote} >New quote</div>
          </div>
        </div>
    }

    return (
      <div className="App">
        {content}
      </div>
    );
  }
}

export default App;
