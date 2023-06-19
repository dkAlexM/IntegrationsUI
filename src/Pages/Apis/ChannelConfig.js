import React, { Component } from 'react';
import { Button, Card, CardBody, Modal, ModalHeader, ModalBody, Row, Col, InputGroup, InputGroupAddon, Input, CardHeader } from 'reactstrap';

import { getAppEndpoint, formatYesNo, getChannelConfig, channelType } from '../../components/Common/ReferenceData.js';
import { handleNotification } from '../../components/Common/Notification.js';

import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu.js';

import CustomSelect from '../../components/Common/CustomSelect.js';


export class ChannelConfig extends Component {
    constructor(props) {
        super(props);
        this.state = {
            channels: [],
            modalTitle: "",
            channel: {},

            Channeld: 0,
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
            ChannelType: "",

            ChannelIdFilter: "",
            ChannelNameFilter: "",
            channelsWithoutFilter: [],

            selectedStatusType: "",
            status: [
                {
                    "value": "1",
                    "label": "Enable"
                },
                {
                    "value": "2",
                    "label": "Disable"
                }
            ],

            selectedApiType: "",
        }
    }


    // FilterFn() {
    //     var ChanneldFilter = this.state.ChanneldFilter;
    //     var ChannelNameFilter = this.state.ChannelNameFilter;

    //     var filteredData = this.state.channelsWithoutFilter.filter(
    //         function (el) {
    //             return el.Channeld.toString().toLowerCase().includes(
    //                 ChanneldFilter.toString().trim().toLowerCase()
    //             ) &&
    //                 el.ChannelName.toString().toLowerCase().includes(
    //                     ChannelNameFilter.toString().trim().toLowerCase()
    //                 )
    //         }
    //     );
    //     this.setState({ channels: filteredData });
    // }

    // sortResult(prop, asc) {
    //     var sortedData = this.state.channelsWithoutFilter.sort(function (a, b) {
    //         if (asc) {
    //             return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
    //         }
    //         else {
    //             return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
    //         }
    //     });
    //     this.setState({ channels: sortedData });
    // }

    // changeChanneldFilter = (e) => {
    //     this.state.ChanneldFilter = e.target.value;
    //     this.FilterFn();
    // }

    // changeChannelNameFilter = (e) => {
    //     this.state.ChannelNameFilter = e.target.value;
    //     this.FilterFn();
    // }

    refreshList() {
        fetch(getAppEndpoint.API_URL + 'ChannelConfig/list')
            .then(response => response.json())
            .then(data => {
                this.setState({ channels: data.response, channelsWithoutFilter: data.response });
            })
            
    }

    componentDidMount() {
        this.refreshList();
    }

    addClick() {
        this.setState({
            modalTitle: "Add Channel",
            channel: {},

            Channeld: 0,
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
            ChannelType: "",
        });
    }

    editClick(ch) {
        this.setState({
            modalTitle: "Edit Channel",
            channel: ch,

            Channeld: ch.id,
            ChannelName: ch.name,
            ChannelDescription: ch.description,
            ChannelCode: ch.code,
            AppId: ch.appId,
            AppKey: ch.appKey,
            Notes: ch.notes,
            EndPoint: ch.endPoint,
            Assembly: ch.assembly,
            RestrictionsSupported: ch.restrictionsSupported,
            Properties: ch.properties,
            channelType: ch.channelType
        });
    }

    // enable/disable channel

    changeStatus(id) {
        fetch(getAppEndpoint.API_URL + 'ChannelConfig/' + id + '/activate', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then((result) => {
                handleNotification(result, "Api Active", "title", result.success);
                this.refreshList();
            }, (error) => {
                alert('Failed');
            })
    }

    // filtros

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
            this.setState({ [evt]: targetValue, reservationid: '' })
    }

    // modal

    changeChannelName = (e) => {
        this.setState({ ChannelName: e.target.value });
    }
    changeChannelDescription = (e) => {
        this.setState({ ChannelDescription: e.target.value });
    }
    changeChannelCode = (e) => {
        this.setState({ ChannelCode: e.target.value });
    }
    changeChannelAppId = (e) => {
        this.setState({ AppId: e.target.value });
    }
    changeChannelAppKey = (e) => {
        this.setState({ AppKey: e.target.value });
    }
    changeChannelNotes = (e) => {
        this.setState({ Notes: e.target.value });
    }
    changeChannelEndPoint = (e) => {
        this.setState({ EndPoint: e.target.value });
    }
    changeChannelAssembly = (e) => {
        this.setState({ Assembly: e.target.value });
    }
    changeChannelType = (e) => {
        this.setState({ ChannelType: e.target.value });
    }

    createClick() {
        fetch(getAppEndpoint.API_URL + 'ChannelConfig', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.ChannelName,
                description: this.state.ChannelDescription,
                code: this.state.ChannelCode,
                appId: this.state.AppId,
                appKey: this.state.AppKey,
                notes: this.state.Notes,
                endPoint: this.state.EndPoint,
                assembly: this.state.Assembly,
                restrictionsSupported: this.state.RestrictionsSupported,
                properties: this.state.Properties,
                channelType: this.state.ChannelType
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert('Failed');
            })
    }

    updateClick() {
        fetch(getAppEndpoint.API_URL + 'ChannelConfig', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.Channeld,
                name: this.state.ChannelName,
                description: this.state.ChannelDescription,
                code: this.state.ChannelCode,
                appId: this.state.AppId,
                appKey: this.state.AppKey,
                notes: this.state.Notes,
                endPoint: this.state.EndPoint,
                assembly: this.state.Assembly,
                restrictionsSupported: this.state.RestrictionsSupported,
                properties: this.state.Properties,
                channelType: this.state.ChannelType
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                
                alert('Failed');
            })
    }



    render() {
        const {
            channels,
            modalTitle,

            Channeld,
            ChannelName,
            ChannelDescription,
            ChannelCode,
            AppId,
            AppKey,
            Notes,
            EndPoint,
            Assembly,

            RestrictionsSupported,
            Properties,
            ChannelType,
        } = this.state;

        return (
            <div>

                {/* filtros */}
                <div class="shadow p-1 mb-1 bg-white rounded">

                    <Row>

                        <Col className="col-12">
                            <Card className="border-0">
                                <CardBody>

                                    <Row>
                                        <Col className="col-2">
                                            <CustomSelect
                                                icon={'fa fa-exclamation-triangle fa-fw'}
                                                isClearable
                                                isSearchable
                                                placeholder="Api Type" /*{<FormattedMessage id="LogsEvents.Status" />} */
                                                options={channelType}
                                                value={channelType.filter(el => el.value === this.state.selectedApiType)}
                                                onChange={this.setComboStatus.bind(this, 'selectedApiType')}
                                            />
                                        </Col>
                                        <Col className="col-2">
                                            <CustomSelect
                                                icon={'fa fa-exclamation-triangle fa-fw'}
                                                isClearable
                                                isSearchable
                                                placeholder="Status" /*{<FormattedMessage id="LogsEvents.Status" />} */
                                                options={this.state.status}
                                                value={this.state.status.filter(el => el.value === this.state.selectedStatusType)}
                                                onChange={this.setComboStatus.bind(this, 'selectedStatusType')}
                                            />
                                        </Col>
                                        <Col>

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
                        Add Api
                    </button>

                    {/*results */}
                    <table className="table table-striped table-hovers">

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
                                    Code
                                </th>
                                <th>
                                    Name
                                </th>
                                <th>Type</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {channels.map(cc =>
                                <tr key={cc.id}>
                                    <td className="col-3">
                                        {getChannelConfig(cc.code) ? <img alt="" src={getChannelConfig(cc.code).image} height={getChannelConfig(cc.code).iconSize}></img> : ''}
                                        <small><strong>  {cc.code}</strong></small>
                                    </td>
                                    <td className="col-3"><small>{cc.name}</small></td>
                                    <td className="col-3"><small>{cc.channelType}</small></td>
                                    <td className="col-3">
                                        <small>{formatYesNo(cc.active)}</small>
                                    </td>
                                    <td className="col-3">
                                        <div>
                                            <Dropdown>
                                                <Dropdown.Toggle variant="primary" id="dropdown-basic-button" size="sm">Actions</Dropdown.Toggle>
                                                <DropdownMenu>
                                                    <Dropdown.Item as="button1" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => this.editClick(cc)}>Settings</Dropdown.Item>
                                                    <Dropdown.Divider />
                                                    <Dropdown.Item as="button2" disabled={cc.active == 0 ? true : false}>Add Channel</Dropdown.Item>
                                                    <Dropdown.Divider />
                                                    <Dropdown.Item as="button5" onClick={() => this.changeStatus(cc.id)}>{cc.active == 0 ? "Enable" : "Disable"}</Dropdown.Item>
                                                </DropdownMenu>
                                            </Dropdown>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>


                    {/* modal */}
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">

                        <div className="modal-dialog modal-xl modal-dialog-centered">

                            <div className="modal-content">

                                <div className="modal-header">
                                    <h5 className="modal-title">{modalTitle}</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>

                                <div className="modal-body small">

                                    <Row>

                                        <Col className="mb-3">
                                            <label for="exampleFormControlInput2" class="form-label">Name</label>
                                            <input type="text" class="form-control" id="exampleFormControlInput2" value={ChannelName} onChange={this.changeChannelName}></input>
                                        </Col>

                                        <Col className="mb-3">
                                            <label for="exampleFormControlInput1" class="form-label">Code</label>
                                            <input type="text" class="form-control" disabled={Channeld !== 0} id="exampleFormControlInput1" value={ChannelCode} onChange={this.changeChannelCode}></input>
                                        </Col>

                                        <Col className="mb-3">
                                            <label for="exampleFormControlInput8" class="form-label">Assembly</label>
                                            <input type="text" class="form-control" disabled={Channeld !== 0} id="exampleFormControlInput8" value={Assembly} onChange={this.changeChannelAssembly}></input>
                                        </Col>

                                        <Col className="mb-3">
                                            <label class="form-label">Channel Type host... (no edit)</label>
                                            <Form.Select aria-label="Default select example">
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </Form.Select>
                                        </Col>
                                    </Row>


                                    <Row>

                                        <div className="mb-3 col-12">
                                            <label for="exampleFormControlInput3" class="form-label">Description</label>
                                            <input type="text" class="form-control" id="exampleFormControlInput3" value={ChannelDescription} onChange={this.changeChannelDescription}></input>
                                        </div>

                                    </Row>


                                    <Row>

                                        <div className="mb-3 col-12">
                                            <label for="exampleFormControlInput7" class="form-label">EndPoint</label>
                                            <input type="text" class="form-control" id="exampleFormControlInput7" value={EndPoint} onChange={this.changeChannelEndPoint}></input>
                                        </div>
                                    </Row>



                                    <Row>

                                        <Col className="mb-6">
                                            <label for="exampleFormControlInput4" class="form-label">AppId</label>
                                            <input type="text" class="form-control" id="exampleFormControlInput4" value={AppId} onChange={this.changeChannelAppId}></input>
                                        </Col>

                                        <Col className="mb-6">
                                            <label for="exampleFormControlInput5" class="form-label">AppKey</label>
                                            <input type="text" class="form-control" id="exampleFormControlInput5" value={AppKey} onChange={this.changeChannelAppKey}></input>
                                        </Col>

                                        <Col className="mb-6">
                                            <label for="exampleFormControlInput5" class="form-label">AppSecret</label>
                                            <input type="text" class="form-control" id="exampleFormControlInput5" value={AppKey} onChange={this.changeChannelAppKey}></input>
                                        </Col>

                                    </Row>

                                    <Row>
                                        <div className="mb-3 col-12">
                                            <label for="exampleFormControlInput6" class="form-label">Notes</label>
                                            <input type="text" class="form-control" id="exampleFormControlInput6" value={Notes} onChange={this.changeChannelNotes}></input>
                                        </div>
                                    </Row>

                                    <Row>
                                        <div className="mb-3 col-12">
                                            <label class="form-label">RestrictionsSupported so para tipo Host, multi offer</label>
                                            <input type="text" class="form-control"></input>
                                        </div>

                                    </Row>



                                </div>


                                <div className="modal-footer">

                                    {Channeld === 0 ?
                                        <button type="button"
                                            className="btn btn-primary float-start"
                                            onClick={() => this.createClick()}
                                        >Create</button>
                                        : null}

                                    {Channeld !== 0 ?
                                        <button type="button"
                                            className="btn btn-primary float-end"
                                            onClick={() => this.updateClick()}
                                        >Update</button>
                                        : null}

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        )
    }
}