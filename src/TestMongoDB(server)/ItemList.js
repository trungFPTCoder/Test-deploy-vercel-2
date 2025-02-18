import React, { useEffect, useState } from "react";
import axios from "axios";

const ItemList = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:9000/items")
            .then(response => setItems(response.data))
            .catch(error => console.error("❌ Error fetching data:", error));
    }, []);

    return (
        <div>
            <h2>Danh sách sản phẩm</h2>
            <ul>
                {items.map((item) => (
                    <li key={item._id}>
                        {item.accounts.map((account) => (
                            <div key={account.id}>
                                <p>{account.FullName}</p>
                                <p>{account.email}</p>
                            </div>
                        ))}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ItemList;
