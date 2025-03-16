import React from 'react'
import Sidebar from './Sidebar/Sidebar'
// import Sidebar1 from './Sidebar/Sidebar1'
import Main from './Main/Main'
function ChatWithAI() {
  return (
    <div className='d-flex'>
        <Sidebar/>
        {/* <Sidebar1/> */}
        <Main/>
    </div>
  )
}

export default ChatWithAI