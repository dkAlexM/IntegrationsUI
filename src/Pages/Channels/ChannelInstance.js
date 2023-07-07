import React, { Component } from 'react';
import { getAppEndpoint, formatYesNo, getChannelConfig } from '../../components/Common/ReferenceData.js';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import SplitButton from 'react-bootstrap/SplitButton';

import DropdownMenu from 'react-bootstrap/esm/DropdownMenu.js';

export class ChannelInstance extends Component {

    constructor(props) {
        super(props);

        this.state = {
            departments: [],
            channelInstances: [],
            channelInstance: [],
            modalTitle: "",

            InstanceId: 0,
            InstanceName: "",
            Description: "",
            ChannelCode: "",
            ChannelId: 0,
            PropertyCode: "",
            PrimaryUser: "",
            PrimaryPassword: "",
            SecondaryUser: "",
            SecondaryPassword: "",
            Active: false,
            EndPoint: "",

            DefaultCurrency: "",

            //PhotoFileName: "anonymous.png",
            //PhotoPath: variables.PHOTO_URL

            connResult: "",
        }
    }

    refreshList() {

        fetch(getAppEndpoint.API_URL + 'ChannelInstance/list')
            .then(response => response.json())
            .then(data => {
                this.setState({ channelInstances: data });
            });

        fetch(getAppEndpoint.API_URL + 'ChannelConfig/list')
            .then(response => response.json())
            .then(data => {
                this.setState({ departments: data.response });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    changeInstanceName = (e) => {
        this.setState({ InstanceName: e.target.value });
    }
    changeDescription = (e) => {
        this.setState({ Description: e.target.value });
    }
    changeChannelCode = (e) => {
        this.setState({ ChannelCode: e.target.value });
    }
    changePropertyCode = (e) => {
        this.setState({ PropertyCode: e.target.value });
    }
    changePrimaryUser = (e) => {
        this.setState({ PrimaryUser: e.target.value });
    }
    changePrimaryPassword = (e) => {
        this.setState({ PrimaryPassword: e.target.value });
    }
    changeSecondaryUser = (e) => {
        this.setState({ SeondaryUser: e.target.value });
    }
    changeSecondaryPassword = (e) => {
        this.setState({ SecondaryPassword: e.target.value });
    }
    changeDefaultCurrency = (e) => {
        this.setState({ DefaultCurrency: e.target.value });
    }
    changeEndPoint = (e) => {
        this.setState({ EndPoint: e.target.value });
    }

    // changeDateOfJoining = (e) => {
    //     this.setState({ DateOfJoining: e.target.value });
    // }



    addClick() {
        this.setState({
            modalTitle: "Add Channel Instance",
            id: 0,
            InstanceName: "",
            Description: "",
            PropertyCode: "",
            PrimaryUser: "",
            PrimaryPassword: "",
            SecondaryUser: "",
            SecondaryPassword: "",
            ChannelConfig: "",
            EndPoint: "",
            DefaultCurrency: "",
            //DateOfJoining: "",
            //PhotoFileName: "anonymous.png"
        });
    }

    editClick(emp) {
        this.setState({
            modalTitle: "Edit Channel Instance",
            InstanceId: emp.id,
            InstanceName: emp.name,
            Description: emp.description,
            PropertyCode: emp.propertyCode,
            PrimaryUser: emp.primaryUser,
            PrimaryPassword: emp.primaryPassword,
            SecondaryUser: emp.secondaryUser,
            SecondaryPassword: emp.secondaryPassword,
            ChannelConfig: emp.channelConfigId,
            EndPoint: emp.endPoint,
            DefaultCurrency: emp.defaultCurrency,
            //DateOfJoining: emp.DateOfJoining,
            //PhotoFileName: emp.PhotoFileName
        });
    }

    createClick() {
        fetch(getAppEndpoint.API_URL + 'ChannelInstance', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.InstanceName,
                description: this.state.Description,
                channelId: this.state.ChannelId,
                propertyCode: this.state.PropertyCode,
                primaryUser: this.state.PrimaryUser,
                primaryPassword: this.state.PrimaryPassword,
                secondaryUser: this.state.SecondaryUser,
                secondaryPassword: this.state.SecondaryPassword,
                endPoint: this.state.EndPoint,
                defaultCurrency: this.state.DefaultCurrency,
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
        fetch(getAppEndpoint.API_URL + 'ChannelInstance', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.InstanceId,
                name: this.state.InstanceName,
                description: this.state.Description,
                propertyCode: this.state.PropertyCode,
                primaryUser: this.state.PrimaryUser,
                primaryPassword: this.state.PrimaryPassword,
                secondaryUser: this.state.SecondaryUser,
                secondaryPassword: this.state.SecondaryPassword,
                endPoint: this.state.EndPoint,
                defaultCurrency: this.state.DefaultCurrency,
                //DateOfJoining: this.state.DateOfJoining,
                //PhotoFileName: this.state.PhotoFileName
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

    deleteClick(id) {
        if (window.confirm('Are you sure?')) {
            fetch(getAppEndpoint.API_URL + 'employee/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then((result) => {
                    alert(result);
                    this.refreshList();
                }, (error) => {
                    alert('Failed');
                })
        }
    }

    testConnection(id) {
        fetch(getAppEndpoint.API_URL + 'ChannelManager/' + id + '/connection')
        .then(response => response.json())
        .then(data => {
            this.setState({ connResult: data });
        });
    }

    getReferenceData(id) {
        fetch(getAppEndpoint.API_URL + 'ChannelManager/' + id + '/referencedata')
        .then(response => response.json())
        .then(data => {
            this.setState({ connResult: data });
        });
    }

    getReservations(id) {
        fetch(getAppEndpoint.API_URL + 'ChannelManager/' + id + '/reservations')
        .then(response => response.json())
        .then(data => {
            this.setState({ connResult: data });
        });
    }

    activate(id) {
        fetch(getAppEndpoint.API_URL + 'ChannelInstance/' + id + '/activate', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then((result) => {
            alert(result.success);
            this.refreshList();
        }, (error) => {
            alert('Failed');
        })
    }

    // imageUpload = (e) => {
    //     e.preventDefault();

    //     const formData = new FormData();
    //     formData.append("file", e.target.files[0], e.target.files[0].name);

    //     fetch(variables.API_URL + 'employee/savefile', {
    //         method: 'POST',
    //         body: formData
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             this.setState({ PhotoFileName: data });
    //         })
    // }

    render() {
        const {
            departments,
            channelInstances,
            modalTitle,
            InstanceId,
            InstanceName,
            Description,
            ChannelCode,
            ChannelId,
            PrimaryUser,
            PrimaryPassword,
            SecondaryUser,
            SecondaryPassword,
            Active,
            EndPoint,
            PropertyCode,

            DefaultCurrency,

            Department,
            DateOfJoining,
            PhotoPath,
            PhotoFileName
        } = this.state;

        return (
               
            <div>
            
                <div class="shadow p-3 mb-5 bg-white rounded">

                    <table className="table table-striped table-hover small">

                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Channel</th>
                                <th>Property</th>
                                <th>Active</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {channelInstances.map((ci, key) =>
                                <tr key={ci.id}>
                                    <td className="col-2"><strong><small>{ci.name}</small></strong></td>
                                    <td className="col-1">{getChannelConfig(ci.code) ? <img alt="" src={getChannelConfig(ci.code).image} height={getChannelConfig(ci.code).iconSize}></img> : ''}</td>
                                    <td className="col-2"><small>{ci.propertyCode}</small></td>
                                    <td><small>{formatYesNo(ci.active)}</small></td>
                                    <td>
                                        <div>
                                            <Dropdown>
                                                <Dropdown.Toggle variant="primary" id="dropdown-basic-button" size="sm">Actions</Dropdown.Toggle>
                                                <DropdownMenu>
                                                    <Dropdown.Item as="button1" data-bs-toggle="modal" data-bs-target="#channelInstanceDetail" onClick={() => this.editClick(ci)}>Settings</Dropdown.Item>
                                                    <Dropdown.Divider />
                                                    <Dropdown.Item as="button2" disabled={ci.active == 0 ? true : false} onClick={() => this.testConnection(ci.id)}>Test Connection</Dropdown.Item>
                                                    <Dropdown.Item as="button3" disabled={ci.active == 0 ? true : false} onClick={() => this.getReferenceData(ci.id)}>Get Reference Data</Dropdown.Item>
                                                    <Dropdown.Item as="button4" disabled={ci.active == 0 ? true : false} onClick={() => this.getReservations(ci.id)}>Get Reservations</Dropdown.Item>
                                                    <Dropdown.Divider />
                                                    <Dropdown.Item as="button5" onClick={() => this.activate(ci.id)}>{ci.active == 0 ? "Enable" : "Disable"}</Dropdown.Item>
                                                </DropdownMenu>
                                            </Dropdown>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    
                    </table>
                                

                    {/* modal */}
                    {modalTitle ?
                    <div className="modal fade" id="channelInstanceDetail" tabIndex="-1" aria-hidden="true">
                        <div className="modal-dialog modal-lg modal-dialog-centered">
                            <div className="modal-content">
                                
                                <div className="modal-header">
                                    <h5 className="modal-title">{modalTitle}</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                    ></button>
                                </div>

                                <div className="modal-body">
                                    <div className="d-flex flex-row bd-highlight mb-3">

                                        <div class="row g-3">

                                            <div class="col-md-6">
                                                <label for="exampleFormControlInput1" class="form-label">Code</label>
                                                {/* <input type="text" class="form-control" id="exampleFormControlInput2" placeholder="Channel Code" value={EmployeeName} onChange={this.changeEmployeeName}></input> */}
                                                <select className="form-select" onChange={this.changeChannelConfig} value={ChannelCode}>
                                                    {departments.map(dep =>
                                                        <option key={dep.id}>
                                                            {dep.code}
                                                        </option>)}
                                                </select>
                                            </div>

                                            <div class="col-mb-6">
                                                <label for="exampleFormControlInput2" class="label">Name</label>
                                                <input type="text" class="form-control" id="exampleFormControlInput2" value={InstanceName} onChange={this.changeInstanceName}></input>
                                            </div>

                                            <div class="col-mb-12">
                                                <label for="exampleFormControlInput3" class="form-label">Description</label>
                                                <input type="text" class="form-control" id="exampleFormControlInput3" value={Description} onChange={this.changeDescription}></input>
                                            </div>

                                            <div class="col-md-12">
                                                <label for="exampleFormControlInput5" class="form-label">Property Code</label>
                                                <input type="text" class="form-control" id="exampleFormControlInput5" value={PropertyCode} onChange={this.changePropertyCode}></input>
                                            </div>

                                            <div class="col-md-6">
                                                <label for="exampleFormControlInput5" class="form-label">Primary User</label>
                                                <input type="text" class="form-control" id="exampleFormControlInput5" value={PrimaryUser} onChange={this.changePrimaryUser}></input>
                                            </div>

                                            <div class="col-md-6">
                                                <label for="exampleFormControlInput4" class="form-label">Primary Password</label>
                                                <input type="text" class="form-control" id="exampleFormControlInput4" value={PrimaryPassword} onChange={this.changePrimaryPassword}></input>
                                            </div>

                                            <div class="col-md-6">
                                                <label for="exampleFormControlInput7" class="form-label">Secondary User</label>
                                                <input type="text" class="form-control" id="exampleFormControlInput7" value={SecondaryUser} onChange={this.changeSecondaryUser}></input>
                                            </div>

                                            <div class="col-md-6">
                                                <label for="exampleFormControlInput6" class="form-label">Secondary Password</label>
                                                <input type="text" class="form-control" id="exampleFormControlInput6" value={SecondaryPassword} onChange={this.changeSecondaryPassword}></input>
                                            </div>

                                            <div class="col-md-9">
                                                <label for="exampleFormControlInput8" class="form-label">Endpoint</label>
                                                <input type="text" class="form-control" id="exampleFormControlInput8" value={EndPoint} onChange={this.changeEndPoint}></input>
                                            </div>

                                            <div class="col-md-3">
                                                <label for="exampleFormControlInput9" class="form-label">Default currency</label>
                                                <input type="text" class="form-control" id="exampleFormControlInput9" value={DefaultCurrency} onChange={this.changeDefaultCurrency}></input>
                                            </div>

                                            {/* <div className="input-group mb-3">
                                            <span className="input-group-text">DOJ</span>
                                            <input type="date" className="form-control"
                                                value={DateOfJoining}
                                                onChange={this.changeDateOfJoining} />
                                        </div> */}

                                        </div>


                                    </div>

                                    {InstanceId === 0 ?
                                        <button type="button"
                                            className="btn btn-primary float-start"
                                            onClick={() => this.createClick()}
                                        >Create</button>
                                        : null}

                                    {InstanceId !== 0 ?
                                        <button type="button"
                                            className="btn btn-primary float-start"
                                            onClick={() => this.updateClick()}
                                        >Update</button>
                                        : null}
                                </div>

                            </div>
                        </div>
                    </div>
                    :''}
                
                </div>

            </div>
        )
    }
}