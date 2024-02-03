import React, { useEffect,useState } from 'react'
import DataTable from 'react-data-table-component';
import { Pagination } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

function HostRequestManagement() {

    const hostServiceUri = import.meta.env.VITE_HOST_SERVICE_BASE_URI
    const [records ,setRecords] = useState([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [searchData,setSearchData] = useState("");

    const navigate = useNavigate();

    const fethHostRequests = async () => {
        try{
            const response = await fetch(`${hostServiceUri}/host-request/all?page=${page}&size=${pageSize}&searchQuery=${searchData}`);
            const data = await response.json();
            setRecords(data.content);
            setTotalPages(data.totalPages);
        }
        catch(error){
            console.log('Error fetching details:',error);
        }
    }

    const searchChange = (e) => {
      setSearchData(e.target.value)
    }

    useEffect(()=>{
      fethHostRequests();
    },[page, pageSize, searchData])

    const handlePageChange = (event, value) => {
        setPage(value - 1);
    };

    const coloumn = [

        {
          name:'Request ID',
          selector : row=>row.hostRequestId,
          sortable : true
        },
        {
          name:"Email",
          selector : row=>row.email
        },
        {
            name:"Status",
            selector : row=>row.status,
            sortable : true
        },
        {
          name: "Action",
          cell: (row) => {
            return ( 
              <Link className= "bg-transparent hover:bg-blue-700 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" to={`/admin/host-requests/${row.hostRequestId}`}>View Detatils</Link>
              );
          },
        }
        
      ]


  return (
    <>
        <div className='flex flex-row justify-between items-center mt-20'>
          <h2 className='text-lg font-medium text-center ms-10'>Host Requests Table</h2>
          <div className="flex flex-wrap items-center me-3">
            <input
              type="search"
              className=" m-0 -mr-0.5 block min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
              placeholder="Search by Email"
              aria-label="Search" 
              value={searchData} 
              onChange={searchChange}
              aria-describedby="button-addon3" />
          </div>
        </div>
        <DataTable
            className='my-5 py-5 px-6 border'
            columns ={coloumn}
            data = {records}
            customStyles={{
                headCells : {
                style: {
                    paddingLeft: '50px',
                    paddingRight : '8ox',
                    backgroundColor :'#4169E1',
                    fontWeight : 'bold',
                    color: '#ffffff', 
                    borderBottom: '1px solid #ddd',
                    },
                },
                cells : {
                    style: {
                    paddingLeft:'50px',
                    paddingRight: '8px',
                    borderBottom: '1px solid #ddd',
                    }
                }
            }}
            >    
        </DataTable>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Pagination
            count={totalPages}
            page={page + 1}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
          />
        </div>
    </>
  )
}

export default HostRequestManagement