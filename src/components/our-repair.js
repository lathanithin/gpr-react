import React, { Component } from 'react';
import '../styles/App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';
import RepairLists from './repair-list';

import axios from 'axios'
var answer;
var phoneName = [],phoneImage = [] , phoneDesc = [] , phoneId = [];

class OurRepair extends Component {
  constructor(props){
    super(props)
    this.state = {
      repairList: []
    }
  }

  componentDidMount() {
     axios.get(`https://api.geniusphonerepair.com/repair/getRepairsList`)
       .then(res => {
         const repairList = res.data;
         this.setState({ repairList });
       })
   }
  render() {
     var oldArr = this.state.repairList;
      console.log(phoneName);
      console.log(phoneImage);
      console.log(oldArr);
    return (
      <div>
      <section className="breadCrumbs">
        <div className="container">
            <div className="breadLinks">
                <a href="javascript:;">Home</a>
                <span>/</span>
                <a href="javascript:;" className="active">Repairs</a>
            </div>
        </div>
        </section>
      <section className="banner">
          <div className="container">
              <div className="row">
                  <div className="col-xs-12 col-md-3">
                      <h4>Our Repair</h4>
                  </div>
                  <div className="col-xs-12 col-md-9">
                      <p>When you are in need of repair services for your cell phone, tablet, laptop, or other electronics, depend on the professionals at Genius Phone Repair. GPR is yor one-stop tech repair shop in Minnesota, MN. From creacked screens and
                          water damage to faluty batteries and much more, you can rely on us for solutions to all of the most common issues with your devices.</p>
                  </div>
              </div>
          </div>
      </section>
      <section className="content">
          <div className="container">
              <div className="customDivHolder phoneRepairList">
            {
              Object.keys(oldArr).map(function (key){
                var ans = oldArr[key];
                console.log(ans);
             return (
               Object.keys(ans).map(function (key){
                 answer = ans[key];
                 phoneName.push(answer.name)
                 phoneImage.push(answer.image)
                 phoneDesc.push(answer.description)
                 phoneId.push(answer.id)
                return(
                   <div className="customDiv">
                      <div className="row">
                          <div className="col-md-6">
                              <div className="text-center">
                                  <img className="img-responsive" src={phoneImage[key]} alt=""/>
                              </div>
                          </div>
                          <div className="col-md-6">
                              <h3>{phoneName[key]}</h3>
                          </div>
                          <div className="col-md-12">
                              <div className="customDivContent">
                                  <p>{phoneDesc[key]}</p>
                              </div>
                          </div>
                          <div className="col-md-12">
                            <Link  to={'/repair-list?phoneId=' + phoneId[key]} className="btn btn-outline">View All</Link>
                            <Route path={'/repair-list?+phoneId=' + phoneId[key]} component={RepairLists} />
                          </div>
                      </div>
                  </div>
                    )
                  })
                  )
                })
              }
              </div>
          </div>
      </section>

      </div>
    );
  }
}

export default OurRepair;
