import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import DataPullTable from './Table';
import _ from 'lodash';
import './datapull.css';

const BASE_URL = 'http://localhost:1337'
const regex = /\[.*?\]/s;

const QueryData = ( props ) => {

    const householdNum = props.household
    const sortType = props.sortType
    const [revealTable, setTableReveal] = useState(false);
    const [ageRange, setAgeRange ] = useState(null);
    const [children, setChildren ] = useState(null);
    const [householdSize, setHouseholdSize ] = useState(null);
    const [homeOwner, setHomeOwner ] = useState(null);
    const [hhComp, setHhComp ] = useState(null);
    const [incomeRange, setIncomeRange ] = useState(null);
    const [lVal, setLVal ] = useState(null);
    const [marital, setMarital ] = useState(null);
    const [products, setProducts ] = useState(null);
    const [transactions, setTransactions ] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch (`${BASE_URL}/api/data/${householdNum}/${sortType}`)
            const json = await response.json()

            if(response.ok) {
                console.log(json)
                setAgeRange(json[0].AGE_RANGE)
                setChildren(json[0].CHILDREN)
                setHouseholdSize(json[0].HH_SIZE)
                setHomeOwner(json[0].HOMEOWNER)
                setHhComp(json[0].HH_COMPOSITION)
                setIncomeRange(json[0].INCOME_RANGE)
                setLVal(json[0].L)
                setMarital(json[0].MARITAL)
                setProducts(json[0].products)
                setTransactions(json[0].transactions)
                var mergedList = _.map(transactions, function(item){
                    return _.extend(item, _.findWhere(products, { PRODUCT_NUM: item.PRODUCT_NUM }));
                });
                console.log(mergedList)
                setTableReveal(true)
            }

            if(!response.ok) {
                console.log("Error")
            }
        }

        fetchData();
    }, [householdNum, sortType])       

    const getHeadings = () => {
        return Object.keys(transactions[0]);
    }

    return (
        <div className='tableContainer w-full h-full'>
            { revealTable && transactions &&
                // <DataPullTable theadData={getHeadings()} tbodyData={parsedJson}/>
                <div className='dataPullContainer'>
                    <div className='householdInformationContainer flex flex-row'>
                        <div className='informationContainer'>
                            <div className='info'>Household Number</div>
                            {householdNum}
                        </div>
                        <div className='informationContainer'>
                            <div className='info'>Age</div>
                            {ageRange}
                        </div>
                        <div className='informationContainer'>
                            <div className='info'>Children</div>
                            {children}
                        </div>
                        <div className='informationContainer'>
                            <div className='info'>Household Size</div>
                            {householdSize}
                        </div>
                        <div className='informationContainer'>
                            <div className='info'>Home Owner</div>
                            {homeOwner}
                        </div>
                        <div className='informationContainer'>
                            <div className='info'>Household Composition</div>
                            {hhComp}
                        </div>
                        <div className='informationContainer'>
                            <div className='info'>Income Range</div>
                            {incomeRange}
                        </div>
                        <div className='informationContainer'>
                            <div className='info'>L</div>
                            {lVal}
                        </div>
                        <div className='informationContainer'>
                            <div className='info'>Marital Status</div>
                            {marital}
                        </div>
                    </div>
                    <DataPullTable theadData={getHeadings(transactions)} tbodyData={transactions}/>
                </div>
            }
            { !revealTable &&
                <div>Loading....</div>
            }
        </div>
    );
}

export default QueryData