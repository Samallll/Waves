import React, { useState,useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { lockUser,unlockUser } from '../../utils/authMethods';

function UserManagement() {
    const [records ,setRecords] = useState([]);
    const [toggled,setToggled] = useState(false);
    const [searchData,setSearchData] = useState("");
    const userServiceUri = import.meta.env.VITE_USER_SERVICE_BASE_URI
    
    useEffect(() => {
      const searchUser = async (searchTerm) => {
        try {
          let response;
          if (searchTerm === '') {
            response = await fetch(`${userServiceUri}/all-users`);
          } else {
            response = await fetch(`${userServiceUri}/search-user/${searchTerm}`);
          }
          const data = await response.json();
          setRecords(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      searchUser(searchData);
    }, [searchData]);
  
    const searchChange = (event) => {
      setSearchData(event.target.value);
    };

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