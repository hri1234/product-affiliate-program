import React from 'react'

const TermAndConditions = () => {
    const affiliateProgramTerms = [
        {
            id: 1,
            title: "Acceptance of Agreement",
            description: "By enrolling in this Affiliate Program, you agree to abide by the terms outlined in this Agreement. If you do not agree to these terms, you should not participate in the affiliate program."
        },
        {
            id: 2,
            title: "Program Participation",
            description: "Affiliates are eligible to earn commissions by promoting our products. Successful sales tracked via referral links will be rewarded with commission payouts according to the program's conditions."
        },
        {
            id: 3,
            title: "Registration and Approval",
            description: "To join the program, you must complete the affiliate application process. The company reserves the right to approve or deny applications at its sole discretion."
        },
        {
            id: 4,
            title: "Affiliate Responsibilities",
            description: "Affiliates must uphold ethical practices and agree to:",
            list: [
                'Promote products in an accurate and honest manner.',
                'Only use marketing materials that are provided or approved.',
                'Abide by all applicable local, national, and international laws.',
                'Respect intellectual property and refrain from using unauthorized trademarks or logos.',
                'Avoid making any false or misleading claims.'
            ]
        },
        {
            id: 5,
            title: "Restrictions on Promotion",
            description: "The following activities are prohibited for affiliates:",
            list: [
                'Engaging in deceptive or unlawful marketing strategies.',
                'Misrepresenting the brand or its products in any way.',
                'Using unsolicited emails, spam, or any form of mass marketing that violates legal guidelines.',
                'Promoting on websites that host illegal, harmful, or inappropriate content.',
            ]
        },
        {
            id: 6,
            title: "Tracking and Cookie Use",
            description: "This affiliate program uses cookies to monitor sales. Affiliates should understand that:",
            list: [
                'Sales are tracked using browser cookies, which must be enabled for commissions to be properly credited.',
                'Cookies have a specific lifespan, and any sales outside this timeframe may not be eligible for commission.',
                'Factors such as browser settings and privacy options may influence cookie tracking accuracy.'
            ]
        },
        {
            id: 7,
            title: "Commission Structure and Payment",
            description: "Commissions are earned based on successful sales referrals and are subject to the following:",
            list: [
                'A waiting period applies before commission payouts to account for returns or cancellations.',
                'Payments are made on the monthly schedule via paypal.',
            ]
        },
        {
            id: 8,
            title: "Program Termination",
            description: "Affiliates can be removed from the program at any time, with or without cause. If removed, all affiliate activities must cease, including the removal of links from promotional platforms."
        },
        {
            id: 9,
            title: "Liability Disclaimer",
            description: "The company is not responsible for any direct or indirect losses incurred through participation in the affiliate program. This includes, but is not limited to, lost revenue, profits, or business opportunities."
        },
        {
            id: 10,
            title: "Changes to Terms",
            description: "The company reserves the right to modify or update these terms at any time. Affiliates will be informed of any changes, and continued participation in the program constitutes acceptance of the new terms."
        }
    ];
    return (
        <div className='page-body'>

            <div style={{ width: '60%', margin: 'auto', display: 'flex', flexDirection: 'column', gap: '30px' }}>
                <h1 style={{ fontSize: '24px', color: 'black', fontWeight: '600', textAlign: 'center' }}>Terms and conditions</h1>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {affiliateProgramTerms.map(term => (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} key={term.id}>
                            <h3 style={{ fontSize: '18px', color: 'black', fontWeight: '500' }}>{term.id}. {term.title}</h3>
                            <div style={{ fontSize: '14px', color: 'black' }}>
                                {term.description}
                                {term?.list &&
                                    <p style={{ paddingLeft: '10px' }}>
                                        {term.list.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </p>}
                            </div>
                        </div>
                    ))
                    }
                </div>
            </div>
        </div>
    )
}

export default TermAndConditions;