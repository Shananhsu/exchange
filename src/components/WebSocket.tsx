import { useState, useEffect } from "react";
import Connection from "../libs/socket";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setIsConnected } from "../redux/socketSlice";
import { setDeal } from "../redux/dealSlice";
import { updateQueryData } from "../redux/commoditySlice";

const WebSocket = () => {
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.token.token);
    const [trigger, setTrigger] = useState(0);

    useEffect(() => {
        if (token === "") return;

        let connection = new Connection(token);
        connection.onOpen = (_event) => {
            dispatch(setIsConnected(true));
        };
        connection.onClose = (_event) => {
            dispatch(setIsConnected(false));
            setTimeout(() => {
                setTrigger(trigger + 1);
            }, 3000);
        };
        connection.onError = (_event) => {
            connection.close();
            dispatch(setIsConnected(false));
        };
        connection.onQuoteEvent = (event) => {
            dispatch(updateQueryData("getCommodity", { maincategory: "finance", token }, (finance) => {
                if (finance) {
                    let commodity = finance.data.commodities.find(c => c.symbol === event.Data.symbol);
                    if (commodity) {
                        commodity.lastclose = event.Data.last;
                        commodity.change = event.Data.change;
                        commodity.changepercent = event.Data.changepercent;
                        commodity.refclose = event.Data.refclose;
                        commodity.ts = event.Data.ts;
                        if (event.Data.last > commodity.high) {
                            commodity.high = event.Data.last;
                        }
                        if (event.Data.last < commodity.low) {
                            commodity.low = event.Data.last;
                        }
                    }
                };
            }));
        };
        connection.onKLineEvent = (_event) => {
        };
        connection.onDealEvent = (event) => {
            dispatch(setDeal(event.Data));
        };
        connection.onSettlePercentEvent = (_event) => {
        };
    }, [token, trigger]);

    return <></>;
};
export default WebSocket;
