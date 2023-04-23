import React, { useEffect } from 'react';
import './datapull.css';

const DataPullTable = ( props ) => {

    console.log(props)
    const theadData = props.theadData
    const tbodyData = props.tbodyData.slice(1)

    return (
        <table className='datapull-table w-full h-full'>
            <thead>
                <tr className='bg-slate-300'>
                    {theadData.map(heading => {
                        return <th className='border-black border-2' key={heading}>{heading}</th>
                    })}
                </tr>
            </thead>
            <tbody>
                {tbodyData.map((row, index) => {
                    return <tr key={index}>
                        {theadData.map((key, index) => {
                            return <td key={row[key]}>{row[key]}</td>
                        })}
                    </tr>;
                })}
            </tbody>
        </table>
    );
}

export default DataPullTable