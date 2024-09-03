import { Usertype } from "../../config/types"
import SocialButton from "../button/button";
import './styles.css';

export default function AboutMe(Devdata: { user: Usertype }) {

    const buttons = [
        {
            title: "Github",
            link: Devdata.user.github,
            type: "github"
        },
        {
            title: "Linkedin",
            link: Devdata.user.linkedin,
            type: "linkedin"
        }
    ]

    return (
        <section className="about" id="about">
            <div className="devinfo">
                <div className="usertext">
                    <h1>{Devdata.user.name}</h1>
                    <p>
                        {Devdata.user.description}
                    </p>
                </div>
                <div className="links">
                    {buttons.map((button) => (
                        <SocialButton key={button.title} title={button.title} link={button.link} type={button.type} />
                    ))}
                </div>
            </div>
            <img src={""} alt="Icaro Justino" id="devpicture" />
        </section>
    )

};
