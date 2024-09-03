import Header from "../components/header/header";
import { navItems } from "../config/header";
import AboutMe from "../components/about";
export default function Homepage() {

    const User = {
        name: "Icaro Justino",
        description: "Desenvolvedor Fullstack",
        github: "",
        linkedin: "",
        email: ""
    }


    return (
        <main className="main_section">
            <Header navItems={navItems} />
            <AboutMe user={User} />
        </main>
    )
};
