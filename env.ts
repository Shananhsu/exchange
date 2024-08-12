const dev = process.env.NODE_ENV === "development";

export const DEVTOKEN = dev ? "testtoken" : "";

export const APIURL = dev ? "http://172.16.0.179:9527" : "https://www.pinary.io/api";

export const WSURL = dev ? "ws://172.16.0.179:9527" : "wss://www.pinary.io/ws";
