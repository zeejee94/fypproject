import React, { Component, lazy, Suspense } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'
import { userRef, databaseRef,storage,brochureRef,productRef,timeRef} from '../../firebase/init';
import Select from 'react-select';
import { options } from '../Product';
// import Widget03 from '../../views/Widgets/Widget03'
const Widget03 = lazy(() => import('../../views/Widgets/Widget03'));
const Loading = () => <div>Loading...</div>


const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')

const brandDanger = getStyle('--danger')

// Card Chart 1





// Social Box Chart



var data1 = [];
var data2 = [];
var data3 = [];
var date =[];
let tprice=0;
let tloction='';
let eprice=0;
let aprice=0;


const mainChart = {
  labels: date,
  datasets: [
    {
      label: 'TESCO',
      backgroundColor: hexToRgba(brandInfo, 10),
      borderColor: brandInfo,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data1,
    },
    {
      label: 'Econsave',
      backgroundColor: 'transparent',
      borderColor: brandSuccess,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data2,
    },
    {
      label: 'OTHER',
      backgroundColor: 'transparent',
      borderColor: brandDanger,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      borderDash: [8, 5],
      data: data3,
    },
  ],
};

const mainChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
    intersect: true,
    mode: 'index',
    position: 'nearest',
    callbacks: {
      labelColor: function(tooltipItem, chart) {
        return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
      }
    }
  },
  maintainAspectRatio: false,
  legend: {
    display: true,
  },
  title: {
    display: true,
    text: 'Price of Milo(RM) by Time'
},
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false,
        },
      }],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
         
        },
      }],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      name: "MILO 10KG",
    };
  }
  componentDidMount(){
    const {
      
      name
    } = this.state;
    console.log(name);
    productRef.once("value").then((snapshot)=>{
      snapshot.forEach(function (childSnapshot){
      let values = childSnapshot.val();
      if (values.retailer.toUpperCase()=="TESCO"&& values.name.toUpperCase()=="MILO 10KG")
      {
        date.push(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(values.date));
        data1.push(values.price);
        data2.push(eprice);
         data3.push(tprice);
       aprice=values.price;
      
 }else if (values.retailer.toUpperCase()=="ECONSAVE"&& values.name.toUpperCase()=="MILO 10KG")
 { date.push(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(values.date));
 data1.push(aprice);
 data2.push(values.price);
  data3.push(tprice);
eprice=values.price;}
 else
 {
  date.push(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(values.date));
  data1.push(aprice);
  data2.push(eprice);
   data3.push(values.price);
 tprice=values.price;


 }
      
  });
 

  })
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.name !== this.state.name){
      var data1 = [];
var data2 = [];
var data3 = [];
var date =[];
let tprice=0;
let tloction='';
let eprice=0;
let aprice=0;
const {
      
  name
} = this.state;
console.log(name);
productRef.once("value").then((snapshot)=>{
  snapshot.forEach(function (childSnapshot){
  let values = childSnapshot.val();
  if (values.retailer.toUpperCase()=="TESCO"&& values.name.toUpperCase()==name)
  {
    date.push(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(values.date));
    data1.push(values.price);
    data2.push(eprice);
     data3.push(tprice);
   aprice=values.price;
  
}else if (values.retailer.toUpperCase()=="ECONSAVE"&& values.name.toUpperCase()==name)
{ date.push(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(values.date));
data1.push(aprice);
data2.push(values.price);
data3.push(tprice);
eprice=values.price;}
else
{
date.push(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(values.date));
data1.push(aprice);
data2.push(eprice);
data3.push(values.price);
tprice=values.price;


}
  
    
  })
})
    }
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }
  selecthandleChange = names => {
    this.setState({ name:names.label});
    

    
  
  };
  render() {
    const {
      
      name
    } = this.state;
    return (
      <div className="animated fadeIn">
        
        <Row>
          <Col>
            <Card>
              <CardBody>
                <Row>
                  <Col sm="5">
                    <CardTitle className="mb-0">{this.state.name}</CardTitle>
                    <Select
                                        value={name}
                                        onChange={this.selecthandleChange}
                                        options={options}
                                      />
                  </Col>
                  <Col sm="7" className="d-none d-sm-inline-block">
                    
                    
                  </Col>
                </Row>
                <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
                  <Line data={mainChart} options={mainChartOpts} height={300} />
                </div>
              </CardBody>
            
            </Card>
          </Col>
        </Row>

        

       
      </div>
    );
  }
}

export default Dashboard;
