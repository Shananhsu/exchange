declare global {
    interface String {
        toDigital(digital: number): string;
    }
}

String.prototype.toDigital = function (digital: number) {
    return this.replace(new RegExp(`^(\\d+\\.\\d{0,${digital}})\\d*$`), "$1").toString();
};

export { };
