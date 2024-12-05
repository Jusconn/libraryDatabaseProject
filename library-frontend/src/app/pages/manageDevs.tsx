import SideBar from "../components/sideBar";
import LoanDeviceForm from "../forms/Devices/loanDeviceForm";
import AddDeviceForm from "../forms/Devices/addDeviceForm";
import DeleteDeviceForm from "../forms/Devices/deleteDeviceForm";

export default function ManageDevsScreen() {
    const sidebarButtons = [ "Loan Device" ,"Add Device", "Remove Device"];
    const sidebarPages = [<LoanDeviceForm/>, <AddDeviceForm/>, <DeleteDeviceForm/>];
    return (<>
        <SideBar buttons={sidebarButtons} pages={sidebarPages} />
    </>);
}