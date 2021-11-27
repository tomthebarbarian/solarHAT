import {React,  Component} from "react";
import axios from 'axios'
import className from 'classnames'
import '../Scoreboard.css'






export default class EdiSite extends Component{
  
  
  
  state = {
    siteData: [],
    option: ''
  }
   
  

   siteInformation = function (option) {
   
    axios.get(`/api/sites/${option}`)
      .then((response) => {
        // console.log(response.data)
        this.setState({siteData: response.data })
        
      })
      .catch((err) => {
        console.log('Error while getting data', err)
      })
  }

  componentDidMount ()  {
    this.siteInformation(this.state.option)

  }
  
  changeHandler = (e) => {
    this.setState({option: e.target.name}, ()=> {
      if(this.state.option === 'usage') {
      axios.get('/api/sites/usage')
      .then((response) => {
        console.log(response.data)
        this.setState({siteData: response.data })
      })
      .catch((err) => {
        console.log('Error while getting data', err)
      })
    }

    if(this.state.option === 'production') {
      axios.get('/api/sites/production')
      .then((response) => {
        // console.log(response.data)
        this.setState({siteData: response.data })
        
      })
      .catch((err) => {
        console.log('Error while getting data', err)
      })
    }
    if(this.state.option === 'cost') {
      axios.get('/api/sites/cost')
      .then((response) => {
        // console.log(response.data)
        this.setState({siteData: response.data })
        
      })
      .catch((err) => {
        console.log('Error while getting data', err)
      })
    }
    })

    
    

  }
  
  render() {
    
  return (
    <>
    {/* {console.log(this.state.siteData)} */}
    <div className='filter'>
      <div>
        <label for='usage'>Consumption</label>
        <input type='radio' id='usage'  name='usage' onChange={this.changeHandler} checked={this.state.option === 'usage'}/>
      </div>
      <div>
        <label for='production'>Production</label>
        <input type='radio' id='production'  name='production' onChange={this.changeHandler}  checked={this.state.option === 'production'} />
      </div>
      <div>
        <label for='cost'>Cost</label>
        <input type='radio' id='cost' name='cost'  onChange={this.changeHandler} checked={this.state.option === 'cost'} />
      </div>
      
    </div>
    <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Consumption</th>
      <th scope="col">Production</th>
      <th scope="col">Cost</th>
    </tr>
  </thead>
  <tbody>
    {this.state.siteData.map((site) => {
      
      return(<>
      <tr>
        <th scope='row'>{}</th>
        <td>{site.name}</td>
        <td>{site.usage_kWh}</td>
        <td>{site.production}</td>
        <td>{site.cost}</td>
      </tr>
      </>)
    })}
    </tbody>
    </table>
    </>
  )}
  }
