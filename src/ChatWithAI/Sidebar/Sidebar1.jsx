import React, { useContext, useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';
// import 'bootstrap/dist/css/bootstrap.min.css';

const Sidebar1 = () => {
    const [extended, setExtended] = useState(false);
    const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt);
        await onSent(prompt);
    };

    return (
        <>
            <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSidebar" aria-controls="offcanvasSidebar">
                <img src={assets.menu_icon} alt="Menu Icon" />
            </button>

            <div className={`offcanvas offcanvas-start ${extended ? 'show' : ''}`} tabIndex="-1" id="offcanvasSidebar" aria-labelledby="offcanvasSidebarLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasSidebarLabel">Sidebar</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div onClick={() => newChat()} className="new-chat">
                        <img src={assets.plus_icon} alt="Plus Icon" />
                        <p>New Chat</p>
                    </div>
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {prevPrompts.map((item, index) => {
                            return (
                                <div key={index} onClick={() => loadPrompt(item)} className="recent-entry">
                                    <img src={assets.message_icon} alt="" />
                                    <p className="recent-entry-p">{item.slice(0, 18)} ...</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar1;