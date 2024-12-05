import SideBar from "../components/sideBar";
import AddEmployeeForm from "../forms/Employees/addEmployeeForm";
import RemoveEmployeeForm from "../forms/Employees/removeEmployeeForm";
import EmployeeForm from "../forms/Employees/employeesTable";

export default function ManageEmpsScreen() {
    const sidebarButtons = ["Employees Table","Add Employee", "Remove Employee"];
    const sidebarPages = [<EmployeeForm/>,<AddEmployeeForm />, <RemoveEmployeeForm />];

    return (
        <SideBar buttons={sidebarButtons} pages={sidebarPages} />
    );
}