import React, { Fragment, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import LoadingImage from '../../../Assets/logo/loading-7528_512.gif'

function ShareAffiliate() {

    // const URLData= URLSearchParams();
    // console.log(URLData,'urlDATA');

    const queryParams = new URLSearchParams(window.location.search);

    // Extract the 'id' parameter from the URL
    const shortId = queryParams.get('shortId');
    const id = queryParams.get('Id');
    const UserId = queryParams.get('UserId');
    const AffiliateLink = queryParams.get('AffiliateLink');
    const UniqueId = queryParams.get('UniqueId');


    // Log the 'id' parameter to the console
    console.log('ID from URL:', id);
    console.log('shortId from URL:', shortId);
    console.log('UserId from URL:', UserId);
    console.log('AffiliateLink from URL:', AffiliateLink);
    console.log('UniqueId from URL:', UniqueId);


    const ShareCopyLink = async () => {
        let data = JSON.parse(localStorage.getItem('userData')) || [];

        const existingUser = data.find(user => user.UserId === UserId);

        if (existingUser) {
            const existingItem = existingUser.items.find(i => i.shortId === shortId);
            if (existingItem) {
                console.log('Item already exists for this user, skipping API call');
                return window.location.href=(`${AffiliateLink}?utm_campaign=${UniqueId}`)
            } else {
                existingUser.items.push({ shortId });
                localStorage.setItem('userData', JSON.stringify(data));
            }
        } else {
            data.push({ UserId, items: [{ shortId }] });
            localStorage.setItem('userData', JSON.stringify(data));
        }

        try {
            const apiUrl = `https://product-affiliate-program-jz6xc.ondigitalocean.app/${shortId}?UserId=${UserId}`;
            // Make the API call
            const response = await axios.post(apiUrl, { id: id },
                {
                    headers: {

                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '/*/',
                        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                    },
                    withCredentials: false,
                    validateStatus: (status) => {
                        return status >= 200 && status < 300;
                    }
                }
            );
            console.log('API response:', response?.data?.message?.result);

            const redirectUrl = response?.data?.message?.result;

            // Check if the URL exists in the response
            if (redirectUrl) {
                // Redirect the user to the URL
                window.location.href=`${redirectUrl}?utm_campaign=${UniqueId}`;
            } else {
                console.error('No URL found in the response.');
            }

            // Perform further actions like navigating or showing a message
        } catch (error) {
            console.error('Error calling API:', error);
            toast.error('Internal server error')
        }

    }


    useEffect(() => {
        ShareCopyLink()
    }, [])



    return (
        <Fragment>
            <span className='loader-wrapper'>
                <img src={LoadingImage} height={50} width={50} alt="" />
            </span>
        </Fragment>

    )
}

export default ShareAffiliate;