import React, { Component } from "react";
import moment from "moment";

import Badge from 'react-bootstrap/Badge'; // { Badge } from "reactstrap";

import { getAppEndpoint, getChannelLogoImage } from '../../components/Common/ReferenceData.js';

export class Reservation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reservations: [],
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
        }
    }


    refreshList() {
        fetch(getAppEndpoint.API_URL + 'Reservation/list')
            .then(response => response.json())
            .then(data => {
                this.setState({ reservations: data.response });
            });
    }

    componentDidMount() {
        this.refreshList();
    }


    render() {

        const {
            reservations
        } = this.state;

        return(
            
            <div>

                <div class="shadow p-3 mb-5 bg-white rounded">


                    <table className="table table-striped table-hover small">
                        
                        <thead>

                            <tr>
                                <th></th>
                                <th>Locator</th>
                                <th>Created At</th>
                                <th>Channel</th>
                                <th>Source</th>
                                <th>Rooms</th>
                                <th>Guests</th>
                                <th>CheckIn</th>
                                <th>Nights</th>
                                <th>LastName</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Pms Send</th>
                                <th></th>
                            </tr>

                        </thead>

                        <tbody>

                            {reservations.map(r => 

                                <tr key={r.id}>
                                    <td>{getChannelLogoImage(r.channel)}</td>
                                    <td>{r.locatorId}</td>
                                    <td>{moment(r.createdAt).format("yyyy-MM-DD HH:mm:ss")}</td>
                                    <td>{r.channelInstanceId}</td>
                                    <td>{r.source}</td>
                                    <td>nRooms</td>
                                    <td>{r.numberOfGuests}</td>
                                    <td>checkIn</td>
                                    <td>nights</td>
                                    <td>{r.ownerLastName}</td>
                                    <td>{r.amount}</td>
                                    <td><Badge bg={r.status == 'Created' ? "success" : r.status == 'Modified' ? "warning" : "danger"}>{r.status}</Badge></td>
                                    <td>{r.communicationStatus}</td>
                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        )

    }
}