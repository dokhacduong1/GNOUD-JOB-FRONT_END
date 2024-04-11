import { Outlet } from "react-router-dom";
import BoxSettings from "./box-settings";
import "./settings-account.scss"

function SettingsAccount() {

  return (
    <div className="cb-section cb-section-padding-bottom bg-grey2">
        <div className="container">
            <div className="row gx-4  justify-content-center">
                <Outlet/>
                <BoxSettings />
                
            </div>
           
        </div>
    </div>
  )
}
export default SettingsAccount;
