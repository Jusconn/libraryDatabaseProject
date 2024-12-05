import SideBar from "../components/sideBar";
import AddMemberForm from "../forms/Members/addMemberForm";
import RemoveMemberForm from "../forms/Members/removeMemberForm";
import MemberForm from "../forms/Members/membersTable";

export default function ManageMemsScreen() {
    const sidebarButtons = ["Members Table", "Add Member", "Remove Member"];
    const sidebarPages = [<MemberForm/>,<AddMemberForm/>, <RemoveMemberForm/>];
    return (
        <SideBar buttons={sidebarButtons} pages={sidebarPages} />
    );
}