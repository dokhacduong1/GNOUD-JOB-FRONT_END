import { useDispatch, useSelector } from "react-redux";
import { actionDeposit, actionWithdraw } from "../../../stores/clients/actions/money";

function Test() {
  const money = useSelector((status) => status.MoneyReducer);
  const check = useSelector((status) => status);

  const dispatch = useDispatch();
  function handleNap() {
    dispatch(actionDeposit(1000));
  }
  function handleRut() {
    dispatch(actionWithdraw(1000));
  }

  return (
    <>
        <button onClick={handleNap}>Click Nạp</button>
        <button onClick={handleRut}>Click Rút</button>
      <p>{money}</p>
    </>
  );
}
export default Test;
