import { useState, useEffect } from "react";
import Select from "react-select";
// import axios from "axios";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [newOrder, setNewOrder] = useState({
        symbol: "",
        token: "",
        side: "",
        order_type: "",
        quantity: "",
        price: "",
        stop_loss: "",
        target: "",
        product: "",
        validity: "",
    });

    // # Complete list of 200 NSE stock symbols
    const NSE_SYMBOLS = [
        // # Nifty 50 Components
        "ADANIENT",
        "ADANIPORTS",
        "APOLLOHOSP",
        "ASIANPAINT",
        "AXISBANK",
        "BAJAJ-AUTO",
        "BAJFINANCE",
        "BAJAJFINSV",
        "BPCL",
        "BHARTIARTL",
        "BRITANNIA",
        "CIPLA",
        "COALINDIA",
        "DIVISLAB",
        "DRREDDY",
        "EICHERMOT",
        "GRASIM",
        "HCLTECH",
        "HDFCBANK",
        "HDFCLIFE",
        "HEROMOTOCO",
        "HINDALCO",
        "HINDUNILVR",
        "ICICIBANK",
        "ITC",
        "INDUSINDBK",
        "INFY",
        "JSWSTEEL",
        "KOTAKBANK",
        "LT",
        "M&M",
        "MARUTI",
        "NTPC",
        "NESTLEIND",
        "ONGC",
        "POWERGRID",
        "RELIANCE",
        "SBILIFE",
        "SHREECEM",
        "SBIN",
        "SUNPHARMA",
        "TCS",
        "TATACONSUM",
        "TATAMOTORS",
        "TATASTEEL",
        "TECHM",
        "TITAN",
        "ULTRACEMCO",
        "UPL",
        "WIPRO",

        // # Nifty Next 50 Components
        "ABB",
        "ACC",
        "AUBANK",
        "AARTIIND",
        "ALKEM",
        "AMBUJACEM",
        "APLLTD",
        "AUROPHARMA",
        "BANDHANBNK",
        "BERGEPAINT",
        "BIOCON",
        "BOSCHLTD",
        "CADILAHC",
        "CHOLAFIN",
        "CUB",
        "DABUR",
        "DLF",
        "GAIL",
        "GLENMARK",
        "GODREJCP",
        "GODREJPROP",
        "HDFCAMC",
        "HAVELLS",
        "HINDPETRO",
        "ICICIPRULI",
        "IDEA",
        "IDFCFIRSTB",
        "IGL",
        "INDUSTOWER",
        "JINDALSTEL",
        "JUBLFOOD",
        "L&TFH",
        "LICHSGFIN",
        "LUPIN",
        "M&MFIN",
        "MANAPPURAM",
        "MARICO",
        "MCDOWELL-N",
        "MFSL",
        "MGL",
        "MINDTREE",
        "MPHASIS",
        "MRF",
        "MUTHOOTFIN",
        "NAM-INDIA",
        "NMDC",
        "OBEROIRLTY",
        "OFSS",
        "PEL",
        "PFC",

        // # Other Liquid Stocks
        "PIDILITIND",
        "PNB",
        "PVR",
        "RAMCOCEM",
        "RBLBANK",
        "RECLTD",
        "SAIL",
        "SIEMENS",
        "SRF",
        "SRTRANSFIN",
        "SUNTV",
        "SYNGENE",
        "TVSMOTOR",
        "TORNTPHARM",
        "TORNTPOWER",
        "TRENT",
        "UBL",
        "VEDL",
        "VOLTAS",
        "WHIRLPOOL",
        "ZEEL",
        "ZYDUSWELL",
        "ADANIGREEN",
        "ADANITRANS",
        "AMARAJABAT",
        "APOLLOTYRE",
        "ASHOKLEY",
        "BATAINDIA",
        "BHARATFORG",
        "BHEL",
        "BHARATRAS",
        "BLUEDART",
        "CANBK",
        "COFORGE",
        "CONCOR",
        "CUMMINSIND",
        "ESCORTS",
        "EXIDEIND",
        "FEDERALBNK",
        "FORTIS",
        "GLAND",
        "GMRINFRA",
        "GODREJIND",
        "HAL",
        "HEG",
        "HONAUT",
        "IBULHSGFIN",
        "ICICIGI",
        "IIFL",
        "INDHOTEL",
        "IOC",
        "IPCALAB",
        "JKCEMENT",
        "JSWENERGY",
        "JUBLPHARMA",
        "LALPATHLAB",
        "LAURUSLABS",
        "MOTHERSON",
        "NATCOPHARM",
        "NIACL",
        "PAGEIND",
        "PERSISTENT",
        "PETRONET",
        "PIIND",
        "POLYCAB",

        // # Additional Active Stocks
        "PRESTIGE",
        "RAIN",
        "RATNAMANI",
        "RVNL",
        "SANOFI",
        "SHILPAMED",
        "SOLARINDS",
        "SUPREMEIND",
        "SUZLON",
        "TATACHEM",
        "TATACOMM",
        "TATAPOWER",
        "TATAELXSI",
        "TATVA",
        "TIINDIA",
        "UNIONBANK",
        "VAIBHAVBNL",
        "VGUARD",
        "VMART",
        "YESBANK",
        "ABCAPITAL",
        "ABFRL",
        "ADANIPOWER",
        "AJANTPHARM",
        "APARINDS",
        "ASHOKA",
        "ASTERDM",
        "ATUL",
        "ASTRAL",
        "BALKRISIND",
        "BALRAMCHIN",
        "BANKBARODA",
        "BEL",
        "BEML",
        "CENTRALBK",
        "CHOLAHLDNG",
        "COCHINSHIP",
        "DCBBANK",
        "DEEPAKNTR",
        "DELTACORP",
        "DEVYANI",
        "DIXON",
        "ENDURANCE",
        "EQUITASBNK",
        "FACT",
        "FLUOROCHEM",
        "FINCABLES",
        "GRANULES",
        "GUJGASLTD",
        "HATSUN",
        "HFCL",
        "IRCTC",
        "IRB",
        "ITI",
        "JBCHEPHARM",
        "KAJARIACER",
        "KANSAINER",
        "LTI",
        "LTTS",
        "MAHABANK",
        "MAHINDCIE",
        "METROPOLIS",
        "NAUKRI",
        "NAVINFLUOR",
        "NBCC",
        "NLCINDIA",
        "PPLPHARMA",
        "QUESS",
        "RADICO",
        "RAJESHEXPO",
        "ROSSARI",
        "SFL",
        "SOBHA",
        "STAR",
        "SUNDARMFIN",
        "SUNDRMFAST",
        "TANLA",
        "TATAMETALI",
        "TTKPRESTIG",
        "UCOBANK",
        "UJJIVAN",
        "VINATIORGA",
        "WELCORP",
        "WESTLIFE",
        "ZENSARTECH",
    ];

    const symbol_options = NSE_SYMBOLS.map((symbol) => ({
        value: symbol,
        label: symbol,
    }));

    const API_BASE =
        process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

    const fetchOrders = async () => {
        try {
            const res = await fetch(`${API_BASE}/api/orders/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const data = await res.json(); // parse JSON
            setOrders(data); // use parsed data
        } catch (err) {
            console.error("Error fetching orders:", err);
        }
    };

    useEffect(() => {
        fetchOrders();
        const interval = setInterval(fetchOrders, 30000); // refresh every 30s
        return () => clearInterval(interval);
    }, []);

    const placeOrder = async (e) => {
        e.preventDefault();

        // Frontend Validation.
        if (!newOrder.symbol) return alert("Please select a symbol.");
        if (!newOrder.side) return alert("Please select side: BUY or SELL.");
        if (!newOrder.order_type) return alert("Please select an order type.");
        if (!newOrder.quantity || newOrder.quantity <= 0)
            return alert("Please enter a valid quantity.");

        // Price validation.
        if (
            ["LIMIT", "STOP-LIMIT"].includes(newOrder.order_type) &&
            (!newOrder.price || Number(newOrder.price) <= 0)
        )
            return alert(
                "Please enter a valid price for the selected order type."
            );

        // Stop-loss validation.
        if (
            ["LIMIT", "STOP-LIMIT"].includes(newOrder.order_type) &&
            (!newOrder.stop_loss || Number(newOrder.stop_loss) <= 0)
        )
            return alert("Please enter a valid stop loss value.");

        try {
            await axios.post(`${API_BASE}/api/orders/`, newOrder);
            fetchOrders();
            setNewOrder({
                symbol: "",
                token: "",
                side: "BUY",
                order_type: "MARKET",
                quantity: "",
                price: "",
                stop_loss: "",
                target: "",
                product: "CNC",
                validity: "DAY",
            });
        } catch (err) {
            console.error("Error placing order:", err);
        }
    };

    const cancelOrder = async (orderId) => {
        if (window.confirm("Are you sure you want to cancel this order?")) {
            try {
                await axios.post(`${API_BASE}/api/orders/${orderId}/cancel/`);
                fetchOrders();
            } catch (err) {
                console.error("Cancel order failed:", err);
            }
        }
    };

    return (
        <div className="p-6">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    Orders
                </h1>
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    onClick={() =>
                        document
                            .getElementById("orderForm")
                            .scrollIntoView({ behavior: "smooth" })
                    }
                >
                    + New Order
                </button>
            </div>

            {/* Order Form */}
            <div id="orderForm" className="bg-white shadow rounded-lg p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4">Place New Order</h2>
                <form
                    onSubmit={placeOrder}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                    {/* Symbol */}
                    <Select
                        options={symbol_options}
                        isSearchable
                        placeholder="Search or Select Symbol"
                        onChange={(option) =>
                            setNewOrder({ ...newOrder, symbol: option.value })
                        }
                        value={symbol_options.find(
                            (option) => option.value === newOrder.symbol
                        )}
                    />

                    {/* Order Side: BUY / SELL */}
                    <select
                        className="border p-2 rounded"
                        value={newOrder.side}
                        onChange={(e) =>
                            setNewOrder({ ...newOrder, side: e.target.value })
                        }
                    >
                        <option value="">Select side</option>
                        <option value="BUY">BUY</option>
                        <option value="SELL">SELL</option>
                    </select>

                    {/* Order Type: MARKET / LIMIT / STOP-LOSS / STOP-LIMIT */}
                    <select
                        className="border p-2 rounded"
                        value={newOrder.order_type}
                        onChange={(e) =>
                            setNewOrder({
                                ...newOrder,
                                order_type: e.target.value,
                            })
                        }
                    >
                        <option value="">Select order type</option>
                        <option value="MARKET">MARKET</option>
                        <option value="LIMIT">LIMIT</option>
                        <option value="STOP-LOSS">STOP-LOSS</option>
                        <option value="STOP-LIMIT">STOP-LIMIT</option>
                        {/* TODO: Later think and add for other Order Types as well */}
                    </select>

                    {/* Quantity */}
                    <input
                        type="number"
                        className="border p-2 rounded"
                        placeholder="Quantity"
                        value={newOrder.quantity}
                        onChange={(e) =>
                            setNewOrder({
                                ...newOrder,
                                quantity: e.target.value,
                            })
                        }
                    />

                    {/* Price: show only for LIMIT and STOP-LIMIT */}
                    {["LIMIT", "STOP-LIMIT"].includes(newOrder.order_type) && (
                        <input
                            type="number"
                            className="border p-2 rounded"
                            placeholder="Price"
                            value={newOrder.price}
                            onChange={(e) =>
                                setNewOrder({
                                    ...newOrder,
                                    price: e.target.value,
                                })
                            }
                            required
                        />
                    )}

                    {/* Stop-Loss: show only for STOP-LOSS and STOP-LIMIT */}
                    {["STOP-LOSS", "STOP-LIMIT"].includes(
                        newOrder.order_type
                    ) && (
                        <>
                            <label className="flex items-center gap-1">
                                Stop Loss
                                <span
                                    title="Automatically sell if price drops to this value to limit loss."
                                    className="cursor-help text-gray-400"
                                >
                                    ⓘ
                                </span>
                            </label>
                            <input
                                type="number"
                                className="border p-2 rounded"
                                placeholder="Stop Loss"
                                value={newOrder.stop_loss}
                                onChange={(e) =>
                                    setNewOrder({
                                        ...newOrder,
                                        stop_loss: e.target.value,
                                    })
                                }
                                required
                            />
                        </>
                    )}

                    {/* Target: for only relevant ones. */}
                    {newOrder.order_type !== "MARKET" &&
                        newOrder.order_type !== "" && (
                            <>
                                <label className="flex items-center gap-1">
                                    Target
                                    <span
                                        title="Set your target price to automatically take profit."
                                        className="cursor-help text-gray-400"
                                    >
                                        ⓘ
                                    </span>
                                </label>
                                <input
                                    type="number"
                                    className="border p-2 rounded"
                                    placeholder="Target"
                                    value={newOrder.target}
                                    onChange={(e) =>
                                        setNewOrder({
                                            ...newOrder,
                                            target: e.target.value,
                                        })
                                    }
                                />
                            </>
                        )}

                    {/* Legacy Code for PRICE, STOP-LESS and TARGET */}

                    {/* Product selector. */}
                    <select
                        className="border p-2 rounded"
                        value={newOrder.product}
                        onChange={(e) =>
                            setNewOrder({
                                ...newOrder,
                                product: e.target.value,
                            })
                        }
                    >
                        <option value="">Select order-product</option>
                        <option value="CNC">CNC</option>
                        <option value="MIS">MIS</option>
                    </select>

                    {/* Validity selector. */}
                    <select
                        className="border p-2 rounded"
                        value={newOrder.validity}
                        onChange={(e) =>
                            setNewOrder({
                                ...newOrder,
                                validity: e.target.value,
                            })
                        }
                    >
                        <option value="">Select validity</option>
                        <option value="DAY">DAY</option>
                        <option value="IOC">IOC</option>
                    </select>

                    <div className="col-span-2 text-right">
                        <button
                            type="submit"
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                        >
                            Place Order
                        </button>
                    </div>
                </form>
            </div>

            {/* Orders History */}
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Order History</h2>
                {orders.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full border text-left text-sm">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2">Order ID</th>
                                    <th className="px-4 py-2">Symbol</th>
                                    <th className="px-4 py-2">Side</th>
                                    <th className="px-4 py-2">Type</th>
                                    <th className="px-4 py-2">Quantity</th>
                                    <th className="px-4 py-2">Price</th>
                                    <th className="px-4 py-2">Status</th>
                                    <th className="px-4 py-2">Created</th>
                                    <th className="px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr
                                        key={order.order_id}
                                        className="border-t"
                                    >
                                        <td className="px-4 py-2 font-semibold">
                                            {order.order_id}
                                        </td>
                                        <td className="px-4 py-2">
                                            {order.symbol}
                                        </td>
                                        <td className="px-4 py-2">
                                            <span
                                                className={`px-2 py-1 rounded text-white ${
                                                    order.side === "BUY"
                                                        ? "bg-green-600"
                                                        : "bg-red-600"
                                                }`}
                                            >
                                                {order.side}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2">
                                            {order.order_type}
                                        </td>
                                        <td className="px-4 py-2">
                                            {order.quantity}
                                        </td>
                                        <td className="px-4 py-2">
                                            ₹{Number(order.price).toFixed(2)}
                                        </td>
                                        <td className="px-4 py-2">
                                            <span
                                                className={`px-2 py-1 rounded text-white ${
                                                    order.status === "OPEN"
                                                        ? "bg-yellow-500"
                                                        : order.status ===
                                                          "FILLED"
                                                        ? "bg-green-600"
                                                        : order.status ===
                                                          "CANCELLED"
                                                        ? "bg-red-600"
                                                        : "bg-gray-500"
                                                }`}
                                            >
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2">
                                            {order.created_at}
                                        </td>
                                        <td className="px-4 py-2">
                                            {order.status === "OPEN" ? (
                                                <button
                                                    className="text-red-600 hover:underline"
                                                    onClick={() =>
                                                        cancelOrder(
                                                            order.order_id
                                                        )
                                                    }
                                                >
                                                    Cancel
                                                </button>
                                            ) : (
                                                <span className="text-gray-400">
                                                    -
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center text-gray-500 py-6">
                        <p>
                            No orders found. Place your first order to get
                            started.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

{
    /* Price
                      <input
                        type="number"
            className="border p-2 rounded"
            placeholder="Price"
            value={newOrder.price}
                        onChange={(e) => setNewOrder({ ...newOrder, price: e.target.value })}
                      /> */
}

{
    /* Stop-Loss Value
                    <input
                        type="number"
                        className="border p-2 rounded"
                        placeholder="Stop Loss Value"
                        value={newOrder.stop_loss}
                        onChange={(e) =>
                            setNewOrder({
                                ...newOrder,
                                stop_loss: e.target.value,
                            })
                        }
                    /> */
}

{
    /* Target
                    <input
                        type="number"
                        className="border p-2 rounded"
                        placeholder="Target"
                        value={newOrder.target}
                        onChange={(e) =>
                            setNewOrder({ ...newOrder, target: e.target.value })
                        }
                    /> */
}
