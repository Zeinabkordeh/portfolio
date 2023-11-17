interface SinglePageContent {
    id: string;
    imageHeader: string;
    title: string;
    mainText: string;
    tools: string[];
    gitHubaddress: string;
    liveSiteAddress: string;
    imageFooter?: string;

}

const singlePageContent: SinglePageContent[] = [
    {   id: "vLive",
        imageHeader: "../../image/new-moviedatabase.png",
        title: "Vancouver Live",
        mainText: "Vancouver Live is an annual convention center dedicated to hosting live music events, and our website ensures a seamless experience for music enthusiasts. Developed as a collaborative project, we utilized Trello as a project management tool, employing an agile system for efficient teamwork. The website, built on WordPress and WooCommerce, facilitates easy ticket purchases, provides detailed information about performers, and presents the event schedule in a user-friendly manner. Our process began with a comprehensive Website Content Inventory and Information Architecture, followed by meticulous wireframing and high-fidelity mockups. A well-structured site development plan guided the coding phase. One notable feature is the integration of the Google Maps API to enhance user navigation and provide location details. Additionally, a strong emphasis was placed on creating a detailed event schedule, showcasing effective planning and organization. The collaborative effort and strategic approach to development have resulted in a website that seamlessly combines functionality and aesthetics for an optimal user experience.",
        tools: ["WordPress", "PHP", "WooCommerce", "SCSS", "GitHub", "Figma"],
        gitHubaddress:"https://github.com/htpwebdesign/vancouver-live",
        liveSiteAddress: "https://vancouverlive.bcitwebdeveloper.ca/",
    },

    {   id: "TABZ",
        imageHeader: "../../image/new-moviedatabase.png",
        title: "TABZ",
        mainText: "TABZ is a collaborative project that serves as an online movie database, crafted with React.js and powered by an API. This platform empowers users to effortlessly explore, search, and curate their list of favorite movies, which is conveniently stored in local storage for a personalized experience. The group project demonstrated effective version control through GitHub, ensuring smooth collaboration and efficient tracking of changes. Tailwind CSS was employed for a responsive and visually appealing design, enhancing the user interface. Rudax, a state management library for React, was utilized to streamline data flow and improve the overall performance of the application. A notable feature is the implementation of a favorite button, allowing users to easily mark and manage their preferred movies. The project showcases a seamless integration with external APIs, providing up-to-date and extensive movie information. Overall, TABZ stands as a testament to collaborative development, version control proficiency, and the effective use of React.js, Tailwind CSS, Rudax, and API integration to create a user-friendly and feature-rich online movie database.",
        tools: ["React", "RestAPI", "WooCommerce", "SCSS", "GitHub"],
        gitHubaddress:"https://github.com/TaylorHillier/Movie-Database-TABZ",
        liveSiteAddress: "",
    },

    {   id: "zeiko",
        imageHeader: "../../image/new-moviedatabase.png",
        title: "zeiko",
        mainText: "My portfolio showcases my proficiency in web development using React and TypeScript, complemented by Vite for fast build times and Chakra UI for a streamlined design. The design process began with meticulous wireframing, followed by the creation of high-fidelity mockups to ensure a polished and user-friendly interface. The transition from design to code was seamless, highlighting my skills in both areas.To enhance the user experience, I incorporated animations and utilized Isotope for dynamic content presentation. This not only adds a touch of elegance but also makes the portfolio more engaging and visually appealing. The journey from concept to execution is well-documented, reflecting my commitment to a thoughtful and creative design process.",
        tools: ["React", "TypeScript", "Chakra UI", "CSS", "Figma"],
        gitHubaddress: "",
        liveSiteAddress: "",

}
]

export default singlePageContent;