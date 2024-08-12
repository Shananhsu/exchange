import { useTranslation } from "react-i18next";
import { TOTrder } from "../../../libs/type/order";

interface Props {
    orders: TOTrder[];
    handleHistoryDetail: (order: TOTrder) => void;
}

const HistoryList = ({ orders, handleHistoryDetail }: Props) => {
    const { t } = useTranslation();
    return (
        <div className="mx-auto mt-1 h-[calc(100vh-34rem)] w-11/12 overflow-y-auto rounded-lg bg-arerBgc pb-7">
            <div className="my-3 flex px-3 text-center text-xs text-white">
                <p className=" w-1/5">名稱</p>
                <p className=" w-1/5">合約內容</p>
                <p className=" w-1/5">進場點位</p>
                <p className=" w-1/5">結果</p>
            </div>
            <div className="max-h-[calc(100vh-24rem)] flex-1 overflow-y-auto px-3">
                {orders.map((item) => (
                    <div
                        className="flex border-b border-b-gray-500 py-2"
                        key={item.orderid}
                    >
                        <div className=" w-1/5">
                            <p className="text-sm font-black text-white">{item.symbol}</p>
                            <p className="text-xs text-gray-500">{t(item.symbol)}</p>
                        </div>
                        <div className=" mx-auto flex w-1/5 items-center justify-center">
                            <div
                                className={`flex h-6 items-center justify-center rounded ${item.longshort === 1 ? "bg-green-500" : "bg-red-500"
                                    }`}
                            >
                                <p className="px-2 text-center text-xs text-white">
                                    {item.longshort === 1 ? "看漲" : "看跌"}
                                </p>
                            </div>
                        </div>
                        <div className=" flex w-1/5 items-center justify-center">
                            <p className="text-xs text-white">{item.dealprice}</p>
                        </div>
                        <div className=" flex w-1/5 items-center justify-center">
                            {item.orderresult === 1 ? (
                                <p className="text-xs text-green-500">W</p>
                            ) : (
                                <p className="text-xs text-red-500">L</p>
                            )}
                        </div>
                        <div className=" mx-auto flex w-1/5 items-center justify-center">
                            <div className="flex h-6 items-center justify-center rounded bg-gray-500">
                                <button
                                    className="px-1 text-center text-xs text-white"
                                    onClick={() => handleHistoryDetail({ ...item })}
                                >
                                    訂單詳情
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default HistoryList;
