import React from 'react';
import TextField from 'material-ui/TextField';
//import SelectField from 'material-ui/SelectField';
//import MenuItem from '@material-ui/core/MenuItem';
import ImageResults from '../image-results/ImageResults';

import axios from 'axios';

class Search extends React.Component {
  state = {
    searchText: '',
    amount: 100,
    apiUrl:'https://pixabay.com/api',
    apiKey: '9731286-71ec3c3cb015402b63e447b63',
    images: []
  };

  ontextChange = (e) => {
    const val = e.target.value;
    this.setState({[e.target.name]:val},() => {
      if(val ==='')
      {
        this.setState({images: []});

      }
      else {
        axios.get(`${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.searchText}&image_type=photo&per_page=${this.state.amount}&safesearch=true`)
        .then(res => this.setState({images: res.data.hits}))
        .catch(err=>console.log(err));
      }

    });
  }
  //onAmountChange =(e,index,value) =>this.setState({amount:value});
  render() {
    console.log(this.state.images);
  //  if(this.state.images.length === 0) alert('Enter a valid text bro');
    return(
      <div>
      <TextField
      name="searchText"
      value = {this.state.searchText}
      onChange = {this.ontextChange}
      floatingLabelText = "search for Images"
      fullWidth = {true}
      />
      <br />
      {this.state.images.length > 0 ? (
          <ImageResults images={this.state.images} />
        ) : null}
      </div>
    );
  }
}
export default Search;
