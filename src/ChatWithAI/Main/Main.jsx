import React, {useContext, useEffect, useRef, useState} from 'react';
import './Main.css';
import {Context} from "../context/Context.jsx";
import { assets } from '../../assest/AI-assets/assets.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faBars, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const Main = () => {
    const {onSent, recentPrompt, showResult, loading, resultData, setInput, input} = useContext(Context);
    const resultRef = useRef(null);
    const [rows, setRows] = useState(1);

    useEffect(() => {
        const updateRows = () => {
            if (window.innerWidth <= 600) {
                setRows(2);
            } else {
                setRows(1);
            }
        };

        updateRows();
        window.addEventListener('resize', updateRows);
        return () => window.removeEventListener('resize', updateRows);
    }, []);

    useEffect(() => {
        if (resultRef.current) {
            resultRef.current.scrollTop = resultRef.current.scrollHeight;
        }
    }, [resultData]);

    return (
        <main className="main bg-dark text-light m-0">
            {/* <nav className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt=""/>
            </nav> */}
            {/* <div className='menu mx-4' data-bs-toggle="offcanvas" data-bs-target="#offcanvasSidebar" aria-controls="offcanvasSidebar">
                <FontAwesomeIcon icon={faBars} color='gray' />
            </div> */}
            <div className="main-container">
                {!showResult
                    ? <>
                        <div className="greet">
                            <p><span>Hello, Dev</span></p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="cards" style={{paddingBottom: '90px'}}>
                            <div className="card"
                                 onClick={() => setInput("Suggest beautiful places to see on an upcoming road trip")}>
                                <p>Suggest beautiful places to see on an upcoming road trip</p>
                                <img src={assets.compass_icon} alt=""/>
                            </div>
                            <div className="card"
                                 onClick={() => setInput("Briefly summarize this concept: urban planning")}>
                                <p>Briefly summarize this concept: urban planning</p>
                                <img src={assets.bulb_icon} alt=""/>
                            </div>
                            <div className="card"
                                 onClick={() => setInput("Brainstorm team bonding activities for our work retreat")}>
                                <p>Brainstorm team bonding activities for our work retreat</p>
                                <img src={assets.message_icon} alt=""/>
                            </div>
                            <div className="card" onClick={() => setInput("Tell me about React js and React native")}>
                                <p>Tell me about React js and React native</p>
                                <img src={assets.code_icon} alt=""/>
                            </div>
                        </div>
                    </>
                    :
                    <div className='result' ref={resultRef}>
                        <div className="result-title">
                            <img src={assets.user_icon} alt=""/>
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img className="result-data-icon" src={assets.gemini_icon} alt=""/>
                            {loading ?
                                <div className='loader'>
                                    <hr/>
                                    <hr/>
                                    <hr/>
                                </div>
                                :
                                <p dangerouslySetInnerHTML={{__html: resultData}}></p>
                            }
                        </div>
                    </div>
                }
                <div className="main-bottom">
                    <div className="search-box">
                        <textarea rows={rows} onChange={(e) => setInput(e.target.value)}
                                  onKeyUp={(e) => {
                                      if (e.key === 'Enter') {
                                          onSent();
                                      }
                                  }}
                                  value={input}
                                  type="text"
                                  placeholder="Hỏi tôi điều gì đó..."
                        />
                        <div className="icon-container">
                            {/* <button><img src={assets.gallery_icon} alt=""/></button> */}
                            {/* <button><img src={assets.mic_icon} alt=""/></button> */}
                            {/* <button type="submit" onClick={() => onSent()}><img src={assets.send_icon} alt=""/></button> */}
                            <button className='asking-btn' type="submit" onClick={() => onSent()} disabled={input === ""}>
                                <FontAwesomeIcon icon={faArrowUp}/>
                            </button>

                        </div>
                    </div>
                    <p className="bottom-info">
                        MyAI có thể gặp sai sót trong quá trình giải đáp. Mong bạn thông cảm!
                        {/* <a href="#">Your privacy and Gemini Apps</a> */}
                    </p>
                </div>
            </div>
        </main>
    );
}

export default Main;
