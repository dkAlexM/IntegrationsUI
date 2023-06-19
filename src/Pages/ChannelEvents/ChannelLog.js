import React, { Component, Fragment } from "react";
import { Button, Card, CardBody, Modal, ModalHeader, ModalBody, Row, Col, InputGroup, InputGroupAddon, Input, CardHeader } from 'reactstrap';
import moment from 'moment';

import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';

import { getAppEndpoint } from '../../components/Common/ReferenceData.js';
import CustomSelect from '../../components/Common/CustomSelect.js'

export class ChannelLog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logs: [],
            messages: [],
            logDetails: [],
            modalTitle: "",

            // filtros
            selectedEventType: "",
            errors: [
                {
                    "value": "1",
                    "label": "Connection" /*<FormattedMessage id="LogsEvents.Error" /> */
                },
                {
                    "value": "2",
                    "label": "Reservation" /*<FormattedMessage id="LogsEvents.Error" /> */
                }
            ],

            selectedStatusType: "",
            status: [
                {
                    "value": "1",
                    "label": "Success" /*<FormattedMessage id="LogsEvents.Error" /> */
                },
                {
                    "value": "2",
                    "label": "Error" /*<FormattedMessage id="LogsEvents.Error" /> */
                },
                {
                    "value": "3",
                    "label": "Warning" /*<FormattedMessage id="LogsEvents.Error" /> */
                }
            ],

            selectedChannel: "",

            logMessage: "",
        }
    }

    refreshList() {
        fetch(getAppEndpoint.API_URL + 'ChannelLog/list?pageIndex=' + 0 + '&pageSize=' + 10)
            .then(response => response.json())
            .then(data => {
                this.setState({ logs: data.response, logsWithoutFilter: data.response });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    getLogMessages(id) {
        fetch(getAppEndpoint.API_URL + 'ChannelLog/' + id)
            .then(response => response.json())
            .then(data => {
                this.setState({ log: data.response[0], messages: data.response[0].channelLogMessage, logDetails: data.response[0].channelLogDetail });
            });
    }

    showCallMessage(msg) {
        this.setState({
            modalTitle: "Show Channel Call Detail",
            logMessage: msg,
        });
    }

    setComboStatus = (evt, inputValue, actionMeta) => {
        var targetValue = '';
        if (Array.isArray(inputValue)) {
            targetValue = inputValue.map(el => el.value).join(',');
        } else {
            targetValue = inputValue ? inputValue.value : '';
        }

        if (targetValue.indexOf('Reservation') >= 0)
            this.setState({ [evt]: targetValue })
        else 
            this.setState({ [evt]: targetValue, reservationid : '' })      
    }

    render() {
        const {
            logs,
            messages,
            logDetails,
            modalTitle,
            logMessage,
        } = this.state;

        return (
            <div>
                
                {/* filtros */}
                <div class="shadow p-1 mb-1 bg-white rounded">

                    <Row>
                        <Col>
                            <Card className="border-0">
                                <CardBody>
                                    <Row>
                                        <Col className="col-2">
                                            <CustomSelect 
                                                icon={'fa fa-exclamation-triangle fa-fw'} 
                                                isClearable 
                                                isSearchable 
                                                placeholder="Status" /*{<FormattedMessage id="LogsEvents.Status" />} */
                                                options={this.state.status} 
                                                value={this.state.status.filter(el => el.value == this.state.selectedStatusType)} 
                                                onChange={this.setComboStatus.bind(this, 'selectedStatusType')} 
                                            />
                                        </Col>
                                        <Col className="col-2">
                                            <CustomSelect 
                                                icon={'fa fa-plug fa-fw'} 
                                                isClearable 
                                                isSearchable 
                                                placeholder="Channels" /*{<FormattedMessage id="LogsEvents.Status" />} */
                                                options={this.state.errors} 
                                                value={this.state.errors.filter(el => el.value == this.state.selectedChannel)} 
                                                onChange={this.setComboStatus.bind(this, 'selectedChannel')} 
                                            />
                                        </Col>
                                        <Col className="col-2">
                                            <CustomSelect 
                                                icon={'fa fa-exclamation-triangle fa-fw'} 
                                                isClearable 
                                                isSearchable 
                                                placeholder="Events" /*{<FormattedMessage id="LogsEvents.Status" />} */
                                                options={this.state.errors} 
                                                value={this.state.errors.filter(el => el.value == this.state.selectedEventType)} 
                                                onChange={this.setComboStatus.bind(this, 'selectedEventType')} 
                                            />
                                        </Col>
                                        <Col className="col-2">
                                        </Col>
                                        <Col className="col-2 px-1">

                                        </Col>
                                        <Col className="text-right">
                                            <button className="btn btn-host shadow btn-sm" onClick={this.search}><span className="fas fa-search"></span></button>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                </div>

                {/* results */}
                <div class="shadow p-1 mb-1 bg-white rounded">

                    <Row>
                        {/* events */}
                        <Col className="col-5 small">

                            <Card className="border-top-0 border-bottom-0 border-start-0">

                                <CardHeader className="bg-white">
                                    Events Timeline
                                </CardHeader>
                                <CardBody>

                                    <table className="table table-striped table-hover small">

                                        <tbody>

                                            {logs.map(log =>
                                                <tr key={log.id} onClick={() => this.getLogMessages(log.id)}>
                                                    <td><Badge bg={log.result == 'Ok' ? "success" : "danger"}>{log.result}</Badge></td>
                                                    <td>
                                                        <tr>
                                                            <td><small>{moment(log.createdAt).format("yyyy-MM-DD HH:mm:ss")} | {log.userName}</small></td>                                            
                                                        </tr>
                                                        <tr>
                                                            <td><small>{log.channelInstanceName} | {log.propertyCode}</small></td>
                                                        </tr>
                                                                                                
                                                    </td>
                                                    
                                                    <td>{log.eventType}</td>
                                                    <td>{log.action}</td>                                   
                                                </tr>
                                            )}

                                        </tbody>
                                    </table>

                                </CardBody>

                            </Card>

                        </Col>

                        {/* mensagens */}
                        <Col className="col-7 small">

                            <Card className="border-0">

                                <CardHeader className="bg-white">
                                    Event Details
                                </CardHeader>
                                <CardBody>

                                    <table className="table small">
                                        <tbody>
                                            {logDetails.map(item => 
                                                <tr key={item.id}> 
                                                    <td>
                                                        {
                                                            item.type == "Error" ? 
                                                                <i className="fas fa-exclamation-triangle text-danger" /> : 
                                                                item.type == "1" ?
                                                                    <i className="fas fa-exclamation-triangle text-warning" /> 
                                                                    :
                                                                    <i className="fas fa-exclamation-triangle text-info" /> 
                                                        }
                                                    </td>
                                                    <td><small>{item.code}</small></td>
                                                    <td><small>{item.description}</small></td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>

                                </CardBody>

                                <CardHeader className="bg-white">
                                    <div className="inline">
                                        <i className="far fa-envelope mr-2" />
                                        Calls
                                    </div>
                                </CardHeader>
                                <CardBody>

                                    <table className="table table-striped table-hover small">
                                        <thead>
                                            <tr>
                                                <th>Send</th>
                                                <th>Method</th>
                                                <th>Url</th>
                                                <th>Result</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {messages.map(msg =>
                                                <tr key={msg.id} data-bs-toggle="modal" data-bs-target="#callDetail" onClick={() => this.showCallMessage(msg)}>
                                                    <td class="col-2"><small>{moment(msg.sendedAt).format("yyyy-MM-DD HH:mm:ss")}</small></td>
                                                    <td><small>{msg.method}</small></td>
                                                    <td class="col-10"><small>{msg.url}</small></td>
                                                    <td><small>{msg.httpStatus}</small></td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>

                                    {/* modal */}
                                    <div className="modal fade" id="callDetail" tabIndex="-1" aria-hidden="true">
                                        <div className="modal-dialog modal-xl modal-dialog-centered">
                                            <div className="modal-content">
                                                
                                                <div className="modal-header">
                                                    <h5 className="modal-title">{modalTitle}</h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                                    ></button>
                                                </div>

                                                <div className="modal-body">
                                                    <div className="">

                                                        <Form>
                                                            <Form.Group as={Col} controlId="formGridMethod">
                                                                <Form.Label>{logMessage.method}</Form.Label>
                                                                <Form.Control value={logMessage.url}></Form.Control>
                                                            </Form.Group>

                                                            <Form.Group as={Col} controlId="formGridStatus">
                                                                <Form.Label>Status</Form.Label>
                                                                <Form.Control value={logMessage.httpStatus}></Form.Control>
                                                            </Form.Group>

                                                            <Row className="mb-12">

                                                                <Form.Group as={Col} controlId="formGridSendMessage">
                                                                    <Form.Label>Request</Form.Label>
                                                                    <Form.Label>{moment(logMessage.sendedAt).format("yyyy-MM-DD HH:mm:ss")}</Form.Label>
                                                                    <Form.Control value={logMessage.sendMessage}></Form.Control>


                                                                </Form.Group>

                                                                <Form.Group as={Col} controlId="formGridReceiveMessage">
                                                                    <Form.Label>Response</Form.Label>
                                                                    <Form.Label>{moment(logMessage.receivedAt).format("yyyy-MM-DD HH:mm:ss")}</Form.Label>
                                                                    <Form.Control value={logMessage.receiveMessage}></Form.Control>
                                                                </Form.Group>

                                                            </Row>

                                                        </Form>


                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                </CardBody>

                            </Card>

                        </Col>

                    </Row>

                </div>

            </div>
        )
    }
}