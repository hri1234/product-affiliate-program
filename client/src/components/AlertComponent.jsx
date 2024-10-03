import React from 'react'
import { confirmAlert } from 'react-confirm-alert';

function AlertComponent(
    {
        handleDeleteYes,
        heading,
        handleSelected
    }
) {

    return confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <div className='  bg-white  shadow rounded  py-2 px-1 w-full'>
                    <div className=' pt-3 pb-1 px-3  flex items-center justify-center gap-7 flex-col'>
                        <h1 className=' text-[20px] text-wrap text-center w-[250px] break-normal font-semibold'>{heading} </h1>
                        <div className=' w-full flex justify-center gap-[40px]'>
                            <button
                                onClick={() => {
                                    handleDeleteYes();
                                    if (handleSelected) {
                                        handleSelected();
                                    }
                                    onClose();
                                }}
                                className=' py-[3px] px-3 bg-slate-600 rounded-full hover:opacity-75 text-[14px] text-white'
                            >
                                Yes
                            </button>
                            <button onClick={onClose} className=' py-[3px] px-3 bg-slate-600 text-[14px] rounded-full text-white hover:opacity-75'>No</button>
                        </div>
                    </div>
                </div>
            );
        }
    });
}

export default AlertComponent