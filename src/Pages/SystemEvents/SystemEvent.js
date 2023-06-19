import React, { Component } from "react";
import { Button, Card, CardBody, Modal, ModalHeader, ModalBody, Row, Col, InputGroup, InputGroupAddon, Input, CardHeader } from 'reactstrap';
import moment from "moment";

import { getAppEndpoint, getChannelConfig } from '../../components/Common/ReferenceData.js';
import CustomSelect from '../../components/Common/CustomSelect.js'

export class SystemEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            systemEvents: [],
            modalTitle: "",

            SystemEventId: 0,
            ChannelName: "",
            ChannelDescription: "",
            ChannelCode: "",
            AppId: null,
            AppKey: null,
            Notes: null,
            EndPoint: null,
            Assembly: "",
            RestrictionsSupported: [],
            Properties: [],

            SystemEventIdFilter: "",
            SystemEventNameFilter: "",
            systemEventsWithoutFilter: [],

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
        }
    }

    refreshList() {
        fetch(getAppEndpoint.API_URL + 'SystemEvent/list')
            .then(response => response.json())
            .then(data => {
                this.setState({ systemEvents: data.response, systemEventsWithoutFilter: data.response });
            });
    }

    componentDidMount() {
        this.refreshList();
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
            systemEvents,
            modalTitle,
            Channeld,
            ChannelName,
            ChannelCode,
            AppId,
            AppKey,
            Notes,
            EndPoint,
            Assembly,
            RestrictionsSupported,
            Properties,
            ChannelDescription
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
                                                placeholder="Type" 
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
                                                placeholder="Channels" 
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
                                                placeholder="Operation" 
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

                <div class="shadow p-1 mb-1 bg-white rounded">

                    <button type="button"
                        className="btn btn-primary m-2 float-end"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => this.addClick()}>
                        todo... something
                    </button>

                    <table className="table table-striped table-hover small">
                        <thead>
                            <tr>
                                <th>
                                    {/* <div className="d-flex flex-row">
                                        <input className="form-control m-2"
                                            onChange={this.changeChanneldFilter}
                                            placeholder="Filter" />

                                        <button type="button" className="btn btn-light"
                                            onClick={() => this.sortResult('Channeld', true)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                                            </svg>
                                        </button>

                                        <button type="button" className="btn btn-light"
                                            onClick={() => this.sortResult('Channeld', false)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                                <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                                            </svg>
                                        </button>
                                    </div> */}
                                    Created At
                                </th>
                                <th>
                                    {/* <div className="d-flex flex-row">
                                        <input className="form-control m-2"
                                            onChange={this.changeChannelNameFilter}
                                            placeholder="Filter" />

                                        <button type="button" className="btn btn-light"
                                            onClick={() => this.sortResult('ChannelName', true)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                                            </svg>
                                        </button>

                                        <button type="button" className="btn btn-light"
                                            onClick={() => this.sortResult('ChannelName', false)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                                <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                                            </svg>
                                        </button>
                                    </div> */}
                                    Type
                                </th>
                                <th>
                                    Channel
                                </th>
                                <th>Operation</th>
                                <th>Company Id</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {systemEvents.map(se =>
                                <tr key={se.id} data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => this.editClick(se)}>
                                    <td className="col-1"><small>{moment(se.createdAt).format("yyyy-MM-DD HH:mm:ss")}</small></td>
                                    <td className="col-1"><small>{se.type}</small></td>
                                    <td className="col-1"> 
                                        {getChannelConfig(se.channel) ? <img alt="" src={getChannelConfig(se.channel).image} height={getChannelConfig(se.channel).iconSize}></img> : ''}
                                        <small>  {se.channel}</small>
                                    </td>
                                    <td className=""><small>{se.operation}</small></td>
                                    <td className=""><small>{se.companyId}</small></td>
                                    <td><small>{se.description}</small></td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>

            </div>
        )
    }
}