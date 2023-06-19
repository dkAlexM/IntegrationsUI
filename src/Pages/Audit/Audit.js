import React, { Component } from "react";
import { getAppEndpoint } from '../../components/Common/ReferenceData.js';

export class Audit extends Component {
    render() {
        return(

            <div>

                <div class="shadow p-1 mb-1 bg-white rounded">
                    <h4>Audit</h4>
                    <ul>
                        <li>tabela selecionavel por tabela/chave</li>
                    </ul>
                </div>

            </div>
        )
    }
}