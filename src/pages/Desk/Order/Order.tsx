import { useMemo, useState } from "react";
import axios from "axios";
import useSWR from "swr";
import { OrderResponse, TOTrder } from "../../../libs/type/order";
import { useAppSelector } from "../../../redux/hooks";
import { APIURL } from "@/env";

// components
import PositionInvoice from "./PositionInvoice";
import HistoryInvoice from "./HistoryInvoice";
import FilterBar from "./FilterBar";
import PositionList from "./PositionList";
import HistoryList from "./HistoryList";

interface InvoiceBtn {
  id: number;
  text: string;
  state: string;
}

function fetchOrder(status: string, token: string) {
  let headers = { playertoken: token };
  return axios
    .get(`${APIURL}/order/${status}`, { headers })
    .then((r) => r.data);
}

function getOrder([url, token]: [string, string]) {
  return fetchOrder(url, token);
}

function cancelOrder(uuid: string, token: string) {
  let headers = { playertoken: token };
  return axios
    .delete(`${APIURL}/order/autosend/${uuid}`, { headers })
    .then((r) => r.data);
}

const Order = () => {
  const token = useAppSelector((state) => state.token.token);

  // 顯示持倉or歷史component狀態
  const [invoiceState, setInvoiceState] = useState("Position");

  // 持倉訂單詳細資料
  const [holdDetail, setHoldDetail] = useState<TOTrder | null>(null);

  // 歷史訂單詳細資料
  const [historyDetail, setHistoryDetail] = useState<TOTrder | null>(null);

  const { data: holdResponse, mutate: holdMutate } = useSWR<OrderResponse>(
    ["unsettle", token],
    getOrder
  );
  const { data: historyResponse } = useSWR<OrderResponse>(
    ["settled", token],
    getOrder
  );

  const holdList = useMemo(() => {
    if (!holdResponse) return [];
    return holdResponse.data.orders;
  }, [holdResponse]);

  const historyList = useMemo(() => {
    if (!historyResponse) return [];
    return historyResponse.data.orders;
  }, [historyResponse]);

  // 修改狀態按鈕, 顯示持倉或歷史
  const handleInvoiceState = (item: InvoiceBtn) => {
    setHoldDetail(null);
    setHistoryDetail(null);
    setInvoiceState(item.state);
  };

  // 顯示所選的持倉訂單詳細資訊
  const handlePositionDetail = (detail: TOTrder) => {
    setHoldDetail(detail);
  };

  // 顯示所選的歷史訂單詳細資料
  const handleHistoryDetail = (detail: TOTrder) => {
    setHistoryDetail(detail);
  };

  // 取消訂單
  const handleCancelOrder = (uuid: string) => {
    cancelOrder(uuid, token).then(() => holdMutate());
    setHoldDetail(null);
  };

  return (
    <div className="flex flex-col bg-bodyBgc">
      {invoiceState === "Position" && <PositionInvoice order={holdDetail} />}
      {invoiceState === "History" && <HistoryInvoice order={historyDetail} />}
      <FilterBar
        invoiceState={invoiceState}
        handleInvoiceState={handleInvoiceState}
        handleCancelOrder={handleCancelOrder}
        order={holdDetail}
      />
      {invoiceState === "Position" && (
        <PositionList
          orders={holdList}
          handlePositionDetail={handlePositionDetail}
        />
      )}
      {invoiceState === "History" && (
        <HistoryList
          orders={historyList}
          handleHistoryDetail={handleHistoryDetail}
        />
      )}
    </div>
  );
};
export default Order;
