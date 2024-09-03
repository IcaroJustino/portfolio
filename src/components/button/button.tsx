export default function SocialButton({ title, link, type }: { title: string, link: string, type: string }) {

    const get_icon = (type: string) => {
        switch (type) {
            case 'github':
                return 'github.svg';
            case 'linkedin':
                return 'linkedin.svg';
            case 'email':
                return 'email.svg';
            default:
                return 'github.svg';
        }
    }

    return (
        <a href={link} className={`social-button-${type}`}>
            <span>{title}</span>
            <img src={get_icon(type)} alt={title} />
        </a>
    )
};
