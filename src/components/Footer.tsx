import badge from "../assets/powered-by-flexbox.svg"
import badge2 from "../assets/made-with-military-grade-explosives.svg"
import badge3 from "../assets/funded-by-back-alley-deals.svg"
import badge4 from "../assets/give-me-kching-bucks.svg"

function Footer() {
    const badge_size = 25;
    return (
        <div
            style={{
                display: 'flex',
                height: '20vh',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgb(90, 79, 110)',
                gap: 10
            }}
        >
            <img src={badge} style={{height: badge_size}}/>
            <img src={badge2} style={{height: badge_size}}/>
            <img src={badge3} style={{height: badge_size}}/>
            <img src={badge4} style={{height: badge_size}}/>
        </div>
    )
}

export default Footer;