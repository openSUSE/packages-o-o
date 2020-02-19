import React, { Fragment } from 'react';
import { getYastUrl, getZypperCommand, getRpmUrl, getObsUrl } from './binaries';

export default function PackageDetails({ binary, back }) {

    return <div className="card package-details">
        <div className="card-header">
            <button className="btn btn-secondary d-lg-none" onClick={() => back()}>Back</button> Package Details
        </div>
        <div className="card-body">
            {binary && <Fragment>
                <dl className="row mb-0">
                    <dt className="col-sm-4">Version</dt>
                    <dd className="col-sm-8">{binary.version}</dd>
                    <dt className="col-sm-4">Release</dt>
                    <dd className="col-sm-8">{binary.release}</dd>
                    <dt className="col-sm-4">Arch</dt>
                    <dd className="col-sm-8">{binary.arch}</dd>
                </dl>
                <p>
                    <a className="btn btn-primary mr-2" href={getYastUrl(binary)} download>YaST 1-Click</a>
                    <a className="btn btn-secondary mr-2" href={getRpmUrl(binary)} download>Download RPM</a>
                    <a className="btn btn-secondary mr-2" href={getObsUrl(binary)} target="_blank">OBS Support</a>
                </p>
                <pre>{getZypperCommand(binary)}</pre>
            </Fragment>}
        </div>
    </div>
}
