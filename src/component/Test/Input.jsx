import React, { useState } from 'react'
import SearchSuggest from '../SearchSuggest';
import './Input.css'
function Input() {
    const [keywordFromURL, setKeywordFromURL] = useState("");
    const [display, setDisplay] = useState("d-none");
    // console.log(keywordFromURL);
    // if (keywordFromURL) {
    //     setDisplay("d-none");
    // }else{
    //     setDisplay("d-block");  
    // }
    const handleInputChange = (e) => {
        setKeywordFromURL(e.target.value);
        setDisplay("d-block");
    };
    return (
        <div style={{ paddingTop: '100px' }} className='bg-dark pb-3' onClick={() => setDisplay("d-none")}>
            <div className='mb-4 mx-2'>
                <input className='form-control' type="text" onChange={handleInputChange} />
            </div>
            <div className={`${display}`}>
                <SearchSuggest keywordFromURL={keywordFromURL} />
            </div>


            <div className="container-fluid">
                <div className="row">
                    <div className="col-4">
                        <div className='moviePic p-3' style={{ backgroundImage: 'url(https://phim.nguonc.com/public/images/Post/2/sat-thu-ve-vuon.jpg)' }}>
                            <div className='movieInfo text-light'>
                                <h3>Tiêu đề</h3>
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo a mollitia minus amet maxime ab accusamus sit sint iusto optio rem natus corrupti, at autem voluptatum in perferendis inventore earum?</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-8">
                        mmmmmmm
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Input