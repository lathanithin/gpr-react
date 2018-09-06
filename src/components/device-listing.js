import React , {Component} from 'react';
import '../styles/App.css';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';
import RepairCost from './repair-cost';

let phoneId , manufacturer_id;
class DeviceListing extends Component {
  constructor(props){
    super(props)
    this.state = {
      deviceList : []
    }
  }
  componentDidMount(){
    const search = this.props.location.search; // could be '?phoneId=1'
    const params = new URLSearchParams(search);
    phoneId = params.get('phoneId'); // 1
    manufacturer_id = params.get('manufacturer_id');
    console.log(phoneId);
    console.log(manufacturer_id);
    axios.get(`https://api.geniusphonerepair.com/repair/getModelsFromManufacturers?repair_type=`+phoneId+`&manufacturer_id=`+manufacturer_id)
    .then(devRes => {
      const deviceList = devRes.data;
      this.setState({deviceList});
    }
    )
  }
  render(){
    console.log(this.state.deviceList);
    let allDevices = this.state.deviceList;
    return(
      <div>
        <section className="breadCrumbs hidden-xs">
            <div className="container">
                <div className="breadLinks">
                    <a href="javascript:;">Home</a>
                    <span>/</span>
                    <a href="javascript:;">Repairs</a>
                    <span>/</span>
                    <a href="javascript:;" className="breadCrumb">Smartphone Repair</a>
                    <span>/</span>
                    <a className="active specificBreadCrumb">Samsung</a>
                </div>
            </div>
        </section>
        <section className="banner">
            <div className="container">
                <div className="row" id="specificType">
                {
                  Object.keys(allDevices).map(function (key){
                    const manufacturer = allDevices[key].manufacturers_details;
                    console.log(manufacturer);
                    if(manufacturer){
                      return(
                        <div>{
                          manufacturer.map(function (key){
                            return(
                              <div className="row">
                                <div className="col-md-3">
                                    <h4> {key.name} </h4>
                                </div>
                                <div className="col-md-9">
                                    <p>{key.description}</p>
                                </div>
                              </div>
                            )
                          })
                        }
                        </div>
                      )
                    }
                    else{
                      console.log("Empty Array");
                    }
                  })
                }
                </div>
            </div>
        </section>
        <section className="individualPhone">
            <div className="container">
                {
                  Object.keys(allDevices).map(function (key){
                    const devicedetails = allDevices[key];
                    const specificDetail = devicedetails.models;
                    if(specificDetail){
                      return(
                        <div>
                        {
                          specificDetail.map(function (key){
                            return(
                                <div className="col-xs-6 col-sm-4 col-md-3 inLine">
                                <Link to={'/repair-cost?phoneId=' + phoneId + '&manufacturer_id=' + manufacturer_id + '&model_id=' + key.id } className="individualPhns transition-fast">
                                     <div className="imgHold">
                                         <img src={key.image} alt="" className="auto img-responsive" />
                                      </div>
                                      <div className="phnName">
                                          <p className="text-center">{key.name}</p>
                                      </div>
                                </Link>
                                </div>
                            )
                          })
                        }
                        </div>
                      )
                    }
                    else{
                      console.log("Array is empty")
                    }
                  })
                }
            </div>
        </section>
      </div>
    )
  }
}
export default DeviceListing;
