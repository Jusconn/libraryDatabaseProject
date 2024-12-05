import SideBar from "../components/sideBar";

export default function ViewsScreen() {
    const sidebarButtons = ["Lookup", "Add Employee", "Remove Employee", "Edit Employee"];
    return (
        <SideBar buttons={sidebarButtons} />
    );
}