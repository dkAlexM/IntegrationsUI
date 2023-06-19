import React, { Component } from "react";
import moment from "moment";

import { getAppEndpoint } from '../../components/Common/ReferenceData.js';

export class Companies extends Component {

    constructor(props) {
        super(props);
        this.state = {
            companies: [],
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
        fetch(getAppEndpoint.API_URL + 'Company/list')
            .then(response => response.json())
            .then(data => {
                this.setState({ companies: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }


    render() {

        const {
            companies
        } = this.state;

        return(
            
            <div>

                <div class="shadow p-3 mb-5 bg-white rounded">

                    <h4>Companies</h4>


                    <table className="table table-striped table-hover small">
                        
                        <thead>

                            <tr>
                                <th>CompanyId</th>
                                <th>Name</th>
                                <th>UpdatedAt</th>
                                <th></th>
                            </tr>

                        </thead>

                        <tbody>

                            {companies.map(c => 

                                <tr key={c.id}>
                                    <td>{c.companyId}</td>
                                    <td>{c.name}</td>
                                    <td>{moment(c.updatedAt).format("yyyy-MM-DD HH:mm:ss")}</td>
                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>
            
            </div>
        )

    }
}