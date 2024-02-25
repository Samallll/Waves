import React,{useState} from 'react'
import JobPostsTableByStatus from '../../components/job/JobPostsTableByStatus'
import ToastContainer from '../../components/ToastContainer';

function JobManagement() {

    const [activeTab, setActiveTab] = useState('Active');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

  return (
    <>
        <div className="border shadow-xl border-gray-200 pb-10 mt-28 mx-20 rounded-[20px]">
            <ul className="flex flex-wrap border-b-2 pl-2 text-sm font-medium text-center text-gray-500 bg-blue-200 rounded-t-[20px]">
                <li className="me-2">
                    <div className={`inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-green-600 hover:border-green-500 group ${activeTab === 'Active' ? 'text-blue-600 border-blue-600' : ''}`} onClick={() => handleTabClick('Active')}>
                        Active
                    </div>
                </li>
                <li className="me-2">
                    <div className={`inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-red-600 hover:border-red-300 group ${activeTab === 'Inactive' ? 'text-blue-600 border-blue-300' : ''}`} onClick={() => handleTabClick('Inactive')}>
                        Inactive
                    </div>
                </li>
            </ul>
            <div className='mx-10'>
                {activeTab === 'Inactive' && <JobPostsTableByStatus isActive={false} />}
                {activeTab === 'Active' && <JobPostsTableByStatus isActive={true} />}
            </div>
        </div>
        <ToastContainer/>
    </>
  )
}

export default JobManagement