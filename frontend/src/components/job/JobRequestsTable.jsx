import React, { useState,useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axiosHelper from '../../utils/axiosHelper';

function JobRequestsTable({jobPostId}) {

    const [records ,setRecords] = useState([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const eventServiceURI = import.meta.env.VITE_EVENT_SERVICE_BASE_URI
    const userServiceURI = import.meta.env.VITE_USER_SERVICE_BASE_URI
    const loggedUser = useSelector(state=>state.auth.loggedUser)
    const navigate = useNavigate();
    

    const fetchJobRequestsDetails = async () => {
        try {
            const response = await axiosHelper.get(`${eventServiceURI}/job-request/by-job-post?page=${page}&size=${pageSize}&jobPostId=${jobPostId}`);
            const records = response.data.content;
            const recordsWithUserDetails = await Promise.all(records.map(async (record) => {
                const userResponse = await axiosHelper.get(`${userServiceURI}/${record.userId}`);
                return {
                    ...record,
                    userDetails: userResponse.data
                };
            }));
            console.log(recordsWithUserDetails)
            setRecords(recordsWithUserDetails);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
      fetchJobRequestsDetails();
    }, [page, pageSize]);
  
    const handlePageChange = (jobPost, value) => {
      setPage(value - 1);
    };

  const coloumn = [

    {
      name:'Request ID',
      selector : row=>row.jobRequestId,
      sortable : true
    },
    {
      name:"Skills Required",
      selector : row=>row.userDetails.fullName,
      sortable : true
    },
    {
      name:"Skills Required",
      selector : row=>row.userDetails.emailId,
      sortable : true
    },
    {
      name: "Action",
      cell: (row) => {
        return ( 
          <button className= "bg-transparent hover:bg-blue-700 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={() =>{ 
            navigate(`/user/job-request/${row.jobRequestId}`)
          }}>View Details</button>
        );
      },
    }
  ]

  

  return (

    <>
      <div className='flex flex-row justify-between items-center mt-10'>
        <h2 className='text-lg font-medium text-center ms-10'>Job Request Details</h2>
      </div>
      <DataTable
          className='my-5 py-5 px-6 border-4'
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

export default JobRequestsTable