import { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';

import NavBar from './components/navBar/NavBar';
import Chart from './components/chart/Chart';
import ShowCase from './components/showCase/ShowCase';
import Table from './components/table/DataTable';
import Loader from './components/Loader';

import { fetchCasesForAll, fetchIndiaData } from './API/api';

function App() {
    const [india, setIndia] = useState(false);
    const [loading, setLoading] = useState(false);

    const [tableData, setTableData] = useState([]);

    const [totalData, setTotalData] = useState({
        totalConfirmed: 0,
        totalRecovered: 0,
        totalDeaths: 0,
        newConfirmed: 0,
        newRecovered: 0,
        newDeaths: 0,
    }); 

    useEffect(() => {
        getGlobalData();
    }, []);

    const getGlobalData = () => {
        setLoading(true);
        setTableData([]);
        fetchCasesForAll().then((data) => {
            console.log(data);
            setTableData(data.Countries);
            setTotalData({
                totalConfirmed: data.Global.TotalConfirmed,
                totalRecovered: data.Global.TotalRecovered,
                totalDeaths: data.Global.TotalDeaths,
                newConfirmed: data.Global.NewConfirmed,
                newRecovered: data.Global.NewRecovered,
                newDeaths: data.Global.NewDeaths
            });
            setIndia(false);
            setLoading(false);
        });
    };

    const getIndianCases = async () => {
        setLoading(true);
        let result = fetchIndiaData();
        setTableData(result.statewise);
        setTotalData({
            totalConfirmed: result.statewise[0].confirmed,
            totalRecovered: result.statewise[0].recovered,
            totalDeaths: result.statewise[0].deaths,
            newConfirmed: result.statewise[0].deltaconfirmed,
            newRecovered: result.statewise[0].deltarecovered,
            newDeaths: result.statewise[0].deltadeaths,
            active: result.statewise[0].deltadeaths
        });
        setIndia(true);
        setLoading(false);
    };

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <Container maxWidth='xl'>
                        <NavBar
                            getIndianCases={getIndianCases}
                            getGlobalData={getGlobalData}
                            india={india}
                        />
                        <Table tableData={tableData} setTotalData={setTotalData} />
                        <Chart totalData={totalData} />
                        <ShowCase totalData={totalData} />
                    </Container>
                </>
            )}
        </>
    );
}

export default App;
