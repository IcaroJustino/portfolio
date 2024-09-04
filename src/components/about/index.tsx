import { Usertype } from "../../config/types"
import SocialButton from "../button/button";
import { TypeAnimation } from "react-type-animation";
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
                    <h1>Ola,meu nome é {Devdata.user.name}</h1>
                    <span>
                        <TypeAnimation
                            sequence={[
                                // Same substring at the start will only be typed once, initially
                                'Desenvolvimento Fullstack',
                                1000,
                                'Analise de dados',
                                1000,
                                'Redes neurais',
                                1000,
                            ]}
                            speed={10}
                            style={{ fontSize: '2em' }}
                            repeat={Infinity}
                            deletionSpeed={10}
                        />
                    </span>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos odit ut itaque dignissimos. Molestias soluta eligendi incidunt harum voluptas quas aliquam tenetur eaque, reiciendis ipsam ipsum adipisci omnis earum! Corporis.
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
