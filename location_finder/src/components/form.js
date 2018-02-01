import React from 'react';

class Form extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      address:'',
      location: {
        lat: 0,
        lng: 0,
      },
      error: null,
    }
  };

  onChange = event => {
    this.setState({ address: event.target.value })
  }

  onSubmit = event => {
    event.preventDefault();

    const address = this.state.address.replace(' ', '+')
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAoylo15DbCPTH8_s5uqGBTxsJ36oUPNq8`;
    const request = new XMLHttpRequest();
    request.open('GET', url);

    if(!this.state.address){
      this.setState({
        error: 'Input box should not be empty.'
      })
      return;
    }
    request.send();

   request.addEventListener('load', () => {
     if(request.status !== 200) return;
     const jsonString = request.responseText;
     const streets = JSON.parse(jsonString);
     console.log(streets);

     if (streets.status !== 'OK'){
       this.setState({ error: 'Address not found please check the spelling' })
       return
     }

     const location = streets.results[0].geometry.location
     this.setState({
       error: null,
       location,
     });
    })
  }

  render(){
    return (
  <form onSubmit={this.onSubmit}>
    {this.state.error && <h2>{this.state.error}</h2>}
    <input name='address' value={this.state.address} onChange={this.onChange}/>
    <input name='latitude' value={this.state.location.lat}/>
    <input name='longitude' value={this.state.location.lng}/>
    <button type='submit' visible='false'>FIND</button>
  </form>
  )
 }
}

export default Form
