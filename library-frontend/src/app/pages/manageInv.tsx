import SideBar from "../components/sideBar";
import SearchForm from "../forms/Inventory/searchForm";
import CheckoutForm from "../forms/Inventory/checkoutForm";
import ReturnForm from "../forms/Inventory/returnForm";
import AddItemForm from "../forms/Inventory/addItemForm";
import RemoveItemForm from "../forms/Inventory/removeItemForm";


export default function ManageInvScreen() {
    const sidebarButtons = ["Lookup", "Checkout", "Return", "Add Item", "Remove Item"];
    const sidebarPages = [<SearchForm/>, <CheckoutForm/>, <ReturnForm/>, <AddItemForm/>, <RemoveItemForm/>];

    return (
        <SideBar buttons={sidebarButtons} pages={sidebarPages}/>
    );
}