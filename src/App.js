import React, { Component } from 'react';
import './App.scss';
import axios from 'axios';

class App extends Component {

  state = {
    quotes: [],
    error: false,
    fade: false
  }

  componentDidMount() {
    this.getQuote();
  }

  getQuote = () => {
    this.setState({fade: true});
    axios.get('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
        .then(response => {
          const singleQuote = response.data.quotes[Math.floor(Math.random() * response.data.quotes.length)];
          this.setState({quotes: singleQuote})
        })
        .catch(error => {
          console.log(error);
          this.setState({error: true})
        })
  }

  render() {
    const quote = this.state.quotes;
    const encodedTweet = encodeURIComponent(`"${quote.quote}" by ${quote.author}`);
    let content;
    if(this.state.error) {
      content = 
        <div id='quote box' className={`quote-box${this.state.fade ? ' fade' : ''}`} onAnimationEnd={() => this.setState({fade: false})}>
          <div id='text' className='quote'>Sorry, something went wrong!</div>
        </div>
    } else if (!this.state.quotes.quote) {
      content = 
        <div id='quote box' className={`quote-box${this.state.fade ? ' fade' : ''}`} onAnimationEnd={() => this.setState({fade: false})}>
          <div id='text' className='quote'>Loading quote...</div>
        </div>
    } else {
      content = 
        <div id='quote box' className={`quote-box${this.state.fade ? ' fade' : ''}`} onAnimationEnd={() => this.setState({fade: false})}>
          <div id='text' className='quote'>{(typeof quote !== 'undefined') ? quote.quote : null }</div>
          <div id='author' className='quote--author'>-{(typeof quote !== 'undefined') ? quote.author : null }</div>
          <div className='buttons'>
            <a id='tweet-quote' className='button button--tweet' target='_blank' rel="noopener noreferrer" href={`https://twitter.com/intent/tweet?text=${encodedTweet}&hashtags=quotes`}>
            </a>
            <div id='new-quote'className='button' onClick={this.getQuote} >New quote</div>
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
