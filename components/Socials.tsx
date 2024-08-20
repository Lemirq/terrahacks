import {FaDiscord, FaLinkedin, FaXTwitter, FaYoutube} from "react-icons/fa6";
import {IoLogoInstagram} from "react-icons/io5";

export default function Socials() {
    return <ul className="fr gap-2 nav-links text-white text-2xl">
        <li>
            <a
                href="https://discord.gg/cgBYcqnvVy"
                target="_blank"
                rel="noopener noreferrer"
            >
                <FaDiscord/>
            </a>
        </li>
        <li>
            <a
                href="https://www.instagram.com/hack49__/"
                target="_blank"
                rel="noopener noreferrer"
            >
                <IoLogoInstagram/>
            </a>
        </li>
        <li>
            <a
                href="https://x.com/hack49_"
                target="_blank"
                rel="noopener noreferrer"
            >
                <FaXTwitter/>
            </a>
        </li>
        <li>
            <a
                href="https://www.linkedin.com/company/hack49-global/"
                target="_blank"
                rel="noopener noreferrer"
            >
                <FaLinkedin/>
            </a>
        </li>
        {/* <li>
							<a href="https://www.tiktok.com/@hacks_49" target="_blank" rel="noopener noreferrer">
								<FaTiktok />
							</a>
						</li> */}
        <li>
            <a
                href="https://www.youtube.com/channel/UCHT4o_3qcYAMNw1Sgdq7FMQ"
                target="_blank"
                rel="noopener noreferrer"
            >
                <FaYoutube/>
            </a>
        </li>
    </ul>
}