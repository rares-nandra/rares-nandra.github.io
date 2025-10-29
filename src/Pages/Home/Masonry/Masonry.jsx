import React, {useState, useEffect} from "react";
import styles from "./Masonry.module.css";

import HomeCard from "./HomeCard/HomeCard";
import SegmentedControl from "../../../UI/SegmentedControl/SegmentedControl";

import ProfileImage from "../../../Assets/Images/Profile.jpeg";

import ReactCountryFlag from "react-country-flag"
import { FaMapPin, FaRobot } from "react-icons/fa";
import { PiGithubLogoFill } from "react-icons/pi";
import { FaLinkedinIn, FaTrophy, FaPhone } from "react-icons/fa6";
import { LiaNpm } from "react-icons/lia";
import { IoMdBriefcase, IoMdMail, IoMdDownload } from "react-icons/io";
import { BsFillMortarboardFill } from "react-icons/bs";

const Masonry = () => {
    const titles = [
        {text: "Rares", fontSize: "23px"},
        {text: "a student", fontSize: "23px"},
        {text: "a fullstack developer", fontSize: "23px"},
        {text: "expanding my DevOps skills", fontSize: "23px"},
        {text: "passionate about robotics", fontSize: "23px"}
    ]

    const mainContainerSelections = [
        {id: "Experience", name: "Experience", icon: IoMdBriefcase},
        {id: "Education", name: "Education", icon: BsFillMortarboardFill},
        {id: "Hackatons", name: "Hackatons", icon: FaTrophy},
        {id: "Volunteering", name: "Volunteering", icon: FaRobot},
    ]

    const languagesSelections = [
        {id: "EN", name: "", icon: <ReactCountryFlag countryCode = "US" style = {{fontSize: "22px", marginLeft: "-5px"}}/>, description: "Language competence: C1"},
        {id: "RO", name: "", icon: <ReactCountryFlag countryCode = "RO" style = {{fontSize: "22px", marginLeft: "-5px"}}/>, description: "Language competence: Native"},
    ]

    const ExperienceEntries = [
        {
            firm: "Sothapia", 
            title: "Collaborator", 
            date: "04/2024 - 08/2025", 
            location: "Cluj-Napoca, Romania",
            content: [
                {
                    type: "text", 
                    content: "As a collaborator at Sothapia, a startup focused on developing modular IoT solutions for industrial and commercial monitoring, I lead the technical efforts that allow clients to remotely monitor sensor data, generate compliance reports, and configure alarms via a mobile app, while ensuring reliability, security, and scalability."
                }, 
                {
                    type: "list", 
                    content: [
                        "Built ESP32-based sensors featuring encrypted storage, offline and online operation, and automated firmware updates.",
                        "Developed the end-to-end software stack, including MQTT communication, backend servers, and a React Native app for live data, historical trends, and automated reporting.",
                        "Engineered robust, secure, and modular systems, allowing rapid adaptation to new sensor types and data modalities.",
                        "Implemented scalable infrastructure, separating sensor communication and API (mobile app) servers, with support for canary builds and seamless updates."
                    ]
                },
                {
                    type: "text",
                    content: "The platform is currently used by clients in refrigeration, transport, and industrial monitoring. Its modular design allows quick extension to new sensors and applications, positioning the startup for further growth into additional monitoring solutions."
                }
            ],
            learnt: "Developed a reliable and secure end-to-end product, estimated project timelines, provided client support, and tailored solutions to user needs.",
            technologies: ["C++ (ESP32)", "Python", "Flask", "React Native (Expo)", "TypeScript", "React", "Vite", "MongoDB", "Redis", "Nginx", "Ansible", "Docker", "CI/CD", "Git", "Gunicorn", "fail2ban"]
        },
        {
            firm: "Institut de Physique Biologique", 
            title: "Internship", 
            date: "07/2024 - 10/2024", 
            location: "Strasbourg, France",
            content: [
                {
                    type: "text", 
                    content: "Developed IPB-viewer, a unified web platform for MRI image analysis that consolidates multiple desktop viewers into a single, intuitive, and modern web interface."
                }, 
                {
                    type: "list", 
                    content: [
                        "Packaged all existing view types into a tab-based interface, making navigation between anatomical, functional, connectome, and comparison views seamless.",
                        "Ported the full feature set of desktop viewers to the web, including configurations for intensities and orientations, colormaps, overlay management, and other advanced options.",
                        "Introduced unique capabilities not found in other MRI viewers, such as collaborative sessions with real-time synchronization and a custom viewer for patient metadata.",
                        "Forked and extended the Niivue WebGL library.",
                        "Built a modular and extensible architecture, allowing new view types and configurations to be added easily. The app manages state, files, and tabs independently of specific view implementations."
                    ]
                },
                {
                    type: "text",
                    content: "The platform has received positive feedback from the lab, is currently in active use, and there are plans to present it to other laboratories to standardize MRI workflow across research teams."
                }
            ],
            learnt: "Insight into the academic research environment, How to contribute to a complex open-source library.",
            technologies: ["TypeScript", "React", "WebGL", "Redis", "Python", "Flask", "Docker", "Git"]
        },
    ]

    const [currentTitle, setCurrentTitle] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsAnimating(true);

            setTimeout(() => {
                setCurrentTitle((prev) => (prev + 1) % titles.length);
            }, 500)

            setTimeout(() => {    
                setIsAnimating(false);
            }, 1000);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className = {styles.container}>
            <div className = {styles.row}>
                <div className = {styles.column}>
                    <div className = {styles.mainTitleContainer}>
                        <h1 className = {styles.mainTitle}>Heyo 👋 I'm</h1>
                        <div className = {`${styles.mainTitleDynamic} ${isAnimating ? styles.flip : ""}`}>
                            <h1 className = {styles.mainTitle}>{titles[currentTitle].text}</h1>
                        </div>
                    </div>

                    <HomeCard widthUnits = {30} heightUnits = {15}>
                        <div className = {styles.mainCardContainer}>
                            <div className = {styles.mainCardContentContainer}>


                            </div>

                            <SegmentedControl onChange = {(id) => {console.log(id)}} selections = {mainContainerSelections} customizations = {{backgroundColor: "var(--GLASS_backgroundDarker)", backgroundColorActive: "var(--GLASS_backgroundAccent)", foregroundColor: "var(--COLOR_textPrimary)", foregroundColorActive: "var(--COLOR_textOnAccent)", widthBehaviour: "scrollIndividualFillParent", padding: "4px 8px", borderRadiusTop: "0px", borderRadiusBottom: "8px"}} />
                        </div>
                    </HomeCard>

                    <div className = {styles.row}>
                        <HomeCard widthUnits = {17} heightUnits = {2} isClickable = {true}>
                            <div className = {styles.textAndIconContainer}>
                                <p className = {styles.text}>Download CV</p>
                                <IoMdDownload className = {styles.icon} />
                            </div>
                        </HomeCard>

                        <a href="mailto:rares.nandra@proton.me" style={{textDecoration: "none"}}>
                        <HomeCard widthUnits = {12} heightUnits = {2} isClickable = {true}>
                            <div className = {styles.textAndIconContainer}>
                                <p className = {styles.text}>rares.nandra@proton.me</p>
                                <IoMdMail className = {styles.icon} />
                            </div>
                        </HomeCard>
                        </a>
                    </div>
                </div>
                
                <div className = {styles.column}>
                    <div className = {styles.row}>
                        <div className = {styles.column}>
                            <a href="https://github.com/rares-nandra" target = "_blank" style={{textDecoration: "none"}}>
                            <HomeCard widthUnits = {2} heightUnits = {2} isClickable = {true} background = {"var(--COLOR_backgroundPrimary)"}>
                                <div className = {styles.centeredContainer}>
                                    <PiGithubLogoFill className = {styles.icon} />
                                </div>
                            </HomeCard>
                            </a>
                            
                            <a href="https://www.npmjs.com/~rares_nandra" target = "_blank" style={{textDecoration: "none"}}>
                            <HomeCard widthUnits = {2} heightUnits = {2} isClickable = {true} background = {"var(--COLOR_backgroundPrimary)"}>
                                <div className = {styles.centeredContainer}>
                                    <LiaNpm className = {styles.icon} />
                                </div>
                            </HomeCard>
                            </a>

                            <a href="https://www.linkedin.com/in/rares-nandra/" target = "_blank" style={{textDecoration: "none"}}>
                            <HomeCard widthUnits = {2} heightUnits = {2} isClickable = {true} background = {"var(--COLOR_backgroundPrimary)"}>
                                <div className = {styles.centeredContainer}>
                                    <FaLinkedinIn className = {styles.icon} />
                                </div>
                            </HomeCard>
                            </a>
                        </div>

                        <div className = {styles.column}>
                            <HomeCard widthUnits = {5} heightUnits = {5}>
                                <img src = {ProfileImage} className = {styles.image} />
                            </HomeCard>

                            <HomeCard widthUnits = {5} heightUnits = {2}>
                                <SegmentedControl onChange = {(id) => {console.log(id)}} selections = {languagesSelections} customizations = {{backgroundColor: "rgba(0, 0, 0, 0)", backgroundColorActive: "var(--GLASS_backgroundDarker)", foregroundColor: "var(--COLOR_textPrimary)", foregroundColorActive: "var(--COLOR_textPrimary)", widthBehaviour: "scrollIndividualFillParent", heigthBehaviour: "fillParent", padding: "4px 8px", borderRadiusTop: "0px", borderRadiusBottom: "8px"}} />
                            </HomeCard>
                        </div>
                    </div>
                    
                    <HomeCard widthUnits = {8} heightUnits = {2} padding = "2px 5px">
                        <div className = {styles.locationContainer}>
                            <FaMapPin className = {styles.icon} />

                            <div className = {styles.locationContainerText}>
                                <p className = {styles.text}>Cluj-Napoca,</p>
                                <p className = {styles.text}>Romania</p>
                            </div>
                        </div>
                    </HomeCard>
                    

                    <HomeCard widthUnits = {8} heightUnits = {9}>
                    
                    </HomeCard>
                </div>
            </div>
        </div>
    );
};

export default Masonry;