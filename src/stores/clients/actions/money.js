export function actionDeposit(payload) {
    return {
        type: "DEPOSIT",
        payload
    }
}
export function actionWithdraw(payload) {
    return {
        type: "WITHDRAW",
        payload
    }
}