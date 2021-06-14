import React, { useState, useRef } from "react";
import Axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  Badge,
  CardFooter
} from "reactstrap";

import Header from "components/Headers/Header.js";

const Icons = () => {
  
  let searchInput = React.createRef();
  let x=""
  const [vulna,setValna] = useState([]);
  //https://official-joke-api.appspot.com/random_joke

  //Ashok
  //Basic ZDM4YzQwYjMtMDQ4Ni00OTU0LTk1YmItN2IwMTJjOTIyYmZhOmIxNjRhNjc3LWIxOWItNGQyMi04ZDk4LTE1NWIyZTJmOGMwYw==

  //Logesh
  //Basic ZjUzZDM1ZWYtMzBkNy00NjExLWEwOGItOWJjZTljZmI4NGQwOmRmZTdhM2JkLTY2ZDMtNGVjYi05NGRmLTZjOWJjYTA1Y2UzMQ==

  //Ashok1
  //Basic MWY2ZmRmNzQtYzUxOS00MzVjLWIzMTUtMzJhZTdlMzJhM2YwOjE0NzI0M2RlLWExYjktNGNmNC1iNDNlLWJkMjNhNGQwNjA4NQ==
  
  
  const getReq= () =>{
      x = searchInput.current.value
      Axios.defaults.headers.common['Accept'] = 'application/json';
      Axios.defaults.headers.common['Authorization'] = 'Basic MWY2ZmRmNzQtYzUxOS00MzVjLWIzMTUtMzJhZTdlMzJhM2YwOjE0NzI0M2RlLWExYjktNGNmNC1iNDNlLWJkMjNhNGQwNjA4NQ=='; 
      Axios.get("https://api.xforce.ibmcloud.com/vulnerabilities/fulltext?q="+x).then(
          (response)=>{
              console.log(response)
              setValna(response.data.rows)
              // console.log(response.data.rows[0])
          })
  };
  


  return (
    <>
      <Header data={vulna[2]} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
        <Card className="w-100">
            <CardHeader>
                <h1 className="display-3">SEARCH</h1>
            </CardHeader>
            <CardBody>
              
                <div className="input-group col-4 mb-3">
                  <input type="text" ref={searchInput} className="form-control border border-dark" placeholder="Search for Vulnerability" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                  <div className="input-group-append">
                    <button className="btn btn-primary" onClick={getReq} type="button">Search</button>
                  </div>
                  
                </div>
                <div>
                  <button className="btn bg-light" class="invisible" onClick={getReq} type="button"></button>
                  <a href="http://127.0.0.1:5500/afk.html">
                  <button className="btn btn-primary" type="submit">Add File</button>
                  </a>
                  </div>
                <hr className="bg-secondary"/>

                {/* Render cards Here */}
                  <div className="row">
                    { vulna.map(v=><VulCard data={v}/>) }
                  </div>


            </CardBody>
        </Card>
        </Row>
        
      </Container>
    </>
  );
};

function VulCard({data}){
  // console.log(data.title)
  return(
  
    <div className="col-6">
      <Card className="border mb-3 border-dark shadow">
    <CardHeader>
        {data.title}
    </CardHeader>
    <CardBody>
        <p>{data.description}</p>
        <hr/>
        <div className="row">
          <div className="col">
          <h5>Consequences</h5>
        <p>{data.consequences}</p>
          </div>
          <div className="col">
          <h5>Remedy</h5>
        <p>{data.remedy}</p>
          </div>
        </div>
        
    </CardBody>
    <CardFooter>
      
    <Badge href="#" color="success">CVSS Score <span>{data.risk_level}</span> </Badge>
    </CardFooter>
  </Card>
    </div>

  );
}

export default Icons;