import React, { Component } from "react";

import { Row, Col } from "reactstrap";

import Counter from './Counter';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: "",
        }
    }


    refreshList() {
        fetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY")
            .then(response => response.json())
            .then(data => {
                this.setState({ image: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    render() {
        const {
            image
        } = this.state;

        const valueValue1 = ((760 / 30) / 24) / 3600; // minimo
        const valueValue2 = ((1294 / 30) / 24) / 3600; // my
        const valueValue3 = ((5000 / 30) / 24) / 3600; // my
        const valueValue4 = ((17000000 / 30) / 24) / 3600; // ronaldo

        return (
            <div>

                <Row>

                    <Col className="col-8">

                        <Card className="shadow border-0" style={{ width: '36rem' }}>
                            <Card.Img variant="top" src={image.url} />
                            <Card.Body>
                                <Card.Title>{image.title}</Card.Title>
                                <Card.Text>{image.explanation}</Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>

                    </Col>


                    <Col>

                        <p>... para escrever o que me apetecer...</p>
<div>

                            <Counter incrementValue={valueValue1} />
                            <Counter incrementValue={valueValue2} />
                            <Counter incrementValue={valueValue3} />
                            <Counter incrementValue={valueValue4} />
                        </div> 

                    </Col>


                </Row>

            </div>
        )
    }
}