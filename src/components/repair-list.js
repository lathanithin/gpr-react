import React , {Component} from 'react';
import axios from 'axios';
import '../styles/App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';
import DeviceListing from './device-listing';
let phoneName = [] , phoneDesc = [] , phImage = [];
let phoneId;
class RepairLists extends Component {
  constructor(props){
    super(props)
    this.state = {
      manufacturerList : []
    };
  }
  componentDidMount(name){
    const search = this.props.location.search; // could be '?phoneId=1'
    const params = new URLSearchParams(search);
    phoneId = params.get('phoneId'); // 1
    console.log(phoneId);
    axios.get(`https://api.geniusphonerepair.com/repair/getManufacturersFromRepair?repair_type=`+phoneId)
    .then( manures => {
      const manufacturerList = manures.data;
      this.setState({manufacturerList});
    }
    )
  }
  render(){
    var phoneList = this.state.manufacturerList;
    return(
      <div>
        <section className="breadCrumbs hidden-xs">
            <div className="container">
                <div className="breadLinks">
                    <a href="javascript:;">Home</a>
                    <span>/</span>
                    <a href="javascript:;">Repairs</a>
                    <span>/</span>
                    <a className="active breadCrumb">Smartphone Repair</a>
                </div>
            </div>
        </section>
        <section className="banner">
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <h4>Smartphone Repair</h4>
                    </div>
                    <div className="col-md-9">
                      <p>At Genius Phone Repair we fix smartphones of all makes and models. Our technicians are here to save your mobile life when damage to your smartphone is preventing you from getting the most out of your device.</p>                    </div>
                </div>
            </div>
        </section>
        <section className="smartPhoneRepair">
            <div className="container">
                  {
                    Object.keys(phoneList).map(function (key){
                    let phListName = phoneList[key];
                    let manuArray = phListName.manufacturers;
                    if(manuArray){
                      console.log("Dynamic Array");
                      return(
                        <div>
                         {
                           manuArray.map(function(key, idx){
                            return (
                                <div>
                                <div className="phones">
                                  <div className="row">
                                    <div className="col-xs-12 col-sm-3 col-md-2 col-lg-2">
                                          <img src={key.image} alt="" className="img-responsive auto"/>
                                        </div>
                                        <div className="col-xs-12 col-sm-6 col-md-7 col-lg-7">
                                          <div className="repairInfo">
                                              <h6>{key.name}</h6>
                                              <p>{key.description}</p>
                                          </div>
                                        </div>
                                        <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                                          <div className="viewAll">
                                            <Link  to={'/device-listing?phoneId=' + phoneId + '&manufacturer_id=' + key.id } className="btn btn-lg btn-primary transition-fast">View All Devices</Link>
                                            <Route path={'/repair-list?+phoneId=' + phoneId + '&manufacturer_id=' + key.id } component={RepairLists} />
                                            <p>For Queries Call</p>
                                            <a href="tel:8553492235" className="phn-num">(855) 349-2235</a>
                                         </div>
                                       </div>
                                      </div>
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
        </section>
      </div>
    )
  }
}
export default RepairLists;
