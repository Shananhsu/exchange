export interface Response<T> {
    data: T;
    status: Status;
}

export interface Status {
    code: string;
    dt: string;
    msg: string;
    trace: string;
}
