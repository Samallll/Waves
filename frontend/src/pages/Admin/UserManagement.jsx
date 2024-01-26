import React, { useState,useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { lockUser,unlockUser } from '../../utils/authMethods';

function UserManagement() {
    const [records ,setRecords] = useState([]);
    const [toggled,setToggled] = useState(false);
    const [search,setSearch] = useState("");
    const userServiceUri = import.meta.env.VITE_USER_SERVICE_BASE_URI
    

    useEffect(() => {

        fetch(`${userServiceUri}/all-users`) 
        .then(response => response.json())
        .then(responseData => {
          setRecords(responseData);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });

    },[toggled])

    const handleBlock = (row) => {
        lockUser(row.userId);
        console.log("blocked");
        setToggled(!toggled);
    }

    const handleUnBlock = (row) => {
        unlockUser(row.userId);
        console.log("unBlocked");
        setToggled(!toggled);
    }

    const searchChange = (e) => {
        setSearch(e.target.value);
        console.log(e.target.value)
    }

    const coloumn = [

        {
          name:'ID',
          selector : row=>row.userId,
          sortable : true
        },
        {
          name:"Full Name",
          selector : row=>row.fullName,
          sortable : true
        },
        {
          name:"Email",
          selector : row=>row.emailId
    
        },
        {
          name:"Role",
          selector : row=>row.role,
          sortable : true
        },
        {
          name: "Status",
          cell: (row) => {
            return (
              row.locked === false ? 
              <button className= "bg-transparent hover:bg-blue-700 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={() => handleBlock(row)}>BLOCK</button> :
              <button className= "bg-transparent hover:bg-blue-700 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={() => handleUnBlock(row)}>UNBLOCK</button>
            );
          },
        }
        
      ]

  return (

    <>
        <div className='flex flex-row justify-between items-center mt-20'>
          <h2 className='text-lg font-medium text-center ms-10'>User Table</h2>
          <form className='me-10'>   
              <label h="default-search" className="text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
              <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                      </svg>
                  </div>
                  <input onChange={searchChange} value={search} type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search by email.." required/>
                  <button type="submit" className=" text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
              </div>
          </form>
        </div>
        <DataTable
            className='my-5 py-5 px-6 border'
            columns ={coloumn}
            data = {records}
            pagination
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
    </>
  )
}

export default UserManagement