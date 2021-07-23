import React, { useEffect } from 'react'
import Section from './Section'


function Home() {
    function handlecreate(data) {
        console.log("홈 데이터"+JSON.stringify(data))
    }

    return (
        <>
            <div>HOME PAGE</div>
            <Section/>       
        </>
    )
}

export default Home