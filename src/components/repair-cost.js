import React , {Component} from 'react';
import '../styles/App.css';
import axios from 'axios';

let phoneId , manufacturer_id , model_id;

class RepairCost extends Component {
  constructor(props){
    super(props)
    this.state = {
      Cost : []
    }
  }
  componentDidMount(){
    const search = this.props.location.search; // could be '?phoneId=1'
    const params = new URLSearchParams(search);
    phoneId = params.get('phoneId'); // 1
    manufacturer_id = params.get('manufacturer_id');
    model_id = params.get('model_id');
    axios.get('https://api.geniusphonerepair.com/repair/getRepairsFromModels?repair_type='+phoneId+'&manufacturer_id='+manufacturer_id+'&model_id='+model_id+'')
    .then( costRes => {
      const Cost = costRes.data;
      this.setState({Cost});
    })
  }
  render(){
    const allModels = this.state.Cost;
    return(

      Object.keys(allModels).map(function (key){
        const modelDetails = allModels[key];
        const detailData = modelDetails.model_details;
        const repairDetails = modelDetails.repairs;
        console.log(repairDetails);
        console.log(detailData);
            if(detailData){
              return(
                  <div>
                    <section className="banner">
                        <div className="container">
                            <div className="row" id="brandType">
                                <div className="col-md-3">
                                    <h4>{key.name}</h4>
                                </div>
                               <div className="col-md-9">
                                 <p>{key.description}</p>
                               </div>
                             </div>
                        </div>
                    </section>
                    {
                      repairDetails.map(function (data){
                        return(
                          detailData.map(function (data1){
                            console.log(data);
                            return(
                              <div>
                                <section className="repairPhns">
                                  <div className="container">
                                      <div className="row" id="repairModels">
                                        <div className="col-xs-12 col-sm-4 col-md-3">
                                          <a href="#" class="individualPhns transition-fast">
                                              <div className="phoneImg margBtm25">
                                                <img src={data1.image} alt="" class="img-responsive auto" />
                                                <div className="imgHold">
                                                    <div>
                                                      <img src={data.image} alt="" class="img-responsive" />
                                                    </div>
                                                </div>
                                              </div>
                                          <div className="phnDetails text-center">
                                            <h6 className="">{data1.name}</h6>
                                              <div>
                                                <p className="service">{data.name}</p>
                                                <span className="serviceCost">{data.cost}</span>
                                              </div>
                                          </div>
                                        </a>
                                      </div>
                                    </div>
                                    </div>
                                </section>
                              </div>
                            )
                          })
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
    )
  }
}
export default RepairCost;
