import { navItem } from "../config/types";
import './styles.css';


export default function Header({navItems}: {navItems: navItem[]}) {

    // Ensure navItems is an array
    const items = Array.isArray(navItems) ? navItems : [];
    console.log(items);

    return(
        <header>
            <span>
                Icaro Justino
            </span>
            <ul>
                {items.map((item:navItem) => (
                    <li key={item.name}>
                        <a href={item.link}>
                            {item.name}
                        </a>
                    </li>
                ))}
            </ul>
        </header>
    )
};
