
import "./AutoPage.css"
import TableComp from "../Common/Table/TableComp";

const AutoPage = () =>{
    return (
        <>
            <div className="centered">
                <h1 className="ciao">Lista Auto</h1>
                <div className="SearchBar">

                </div>
                <div className="table-container">
                    <TableComp />
                </div>
            </div>
            
        </>
    )
}; export  default AutoPage;