import Header from "../components/header";
import { navItems } from "../config/header";
export default function Homepage() {
    return(
        <main className="main_section">
            <Header navItems={navItems} />
        </main>
    )
};
