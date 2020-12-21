import React, { Component } from 'react';
import './App.css';

import marked from 'marked';
import { sampleText } from './sampleText';

class App extends Component {  
  state = {
    text: sampleText
  }

componentDidMount(){
  const text = localStorage.getItem('textUpdated');
  
  if(text){
    this.setState({ text })
  }else{
    this.setState({ text: sampleText })
    /* Si le champ de text est vide, à l'actualisation
     * de la page, elle est renderisée avec le texte sampleText
     */
  }
}

componentDidUpdate(){
  const { text } = this.state;
  localStorage.setItem('textUpdated', text)
}

handleChange = event => {
  const text = event.target.value;
  this.setState({ text })
}  

renderText = text => {
  const __html = marked(text, { sanitize: true });
  return{ __html }
}

  
render(){
    return (
      <>
        <div className="container">
          <div className="row" >
              <div className="col-sm-6">
                <textarea
                    onChange={this.handleChange}
                    value={ this.state.text } 
                    rows="25" 
                    className='form-control'>
                </textarea>
              </div>
              <div className="col-sm-6">
                <div>
                  <div dangerouslySetInnerHTML={this.renderText(this.state.text)}/>
                </div>
              </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
