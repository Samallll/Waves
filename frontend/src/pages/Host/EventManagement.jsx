import React,{useState} from 'react'
import EventsTableByStatus from '../../components/EventsTableByStatus'
import EventManagemtActions from '../../components/event/EventManagemtActions'
import ToastContainer from '../../components/ToastContainer';
function EventManagement() {

    const [activeTab, setActiveTab] = useState('Organizing');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

  return (
    <>
        <EventManagemtActions/>
        <div className="border shadow-xl border-gray-200 pb-10 mx-20 rounded-[20px]">
            <ul className="flex flex-wrap border-b-2 pl-2 text-sm font-medium text-center text-gray-500 bg-blue-200 rounded-t-[20px]">
                <li className="me-2">
                    <div className={`inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-green-600 hover:border-green-500 group ${activeTab === 'Live' ? 'text-blue-600 border-blue-600' : ''}`} onClick={() => handleTabClick('Live')}>
                        Live
                    </div>
                </li>
                <li className="me-2">
                    <div className={`inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-yellow-500 hover:border-yellow-300 group ${activeTab === 'Organizing' ? 'text-blue-600 border-blue-300' : ''}`} onClick={() => handleTabClick('Organizing')}>
                        Organizing
                    </div>
                </li>
                <li className="me-2">
                    <div className={`inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-red-600 hover:border-red-300 group ${activeTab === 'Expired' ? 'text-blue-600 border-blue-300' : ''}`} onClick={() => handleTabClick('Expired')}>
                        Expired
                    </div>
                </li>
            </ul>
            <div className='mx-10'>
                {activeTab === 'Expired' && <EventsTableByStatus eventStatus={"Expired"} />}
                {activeTab === 'Live' && <EventsTableByStatus eventStatus={"Live"} />}
                {activeTab === 'Organizing' && <EventsTableByStatus eventStatus={"Organizing"} />}
            </div>
        </div>
        <ToastContainer/>
    </>
  )
}

export default EventManagement