interface SinglePageContent {
    id: string;
    imageHeader: string;
    title: string;
    mainText: string;
    tools: string[];
    gitHubAddress?: string;
    liveSiteAddress: string;
    imageSmall?: string;

}

const singlePageContent: SinglePageContent[] = [

    {   id: "TABZ",
        imageHeader: "/image/tabz-moviedatabase.png",
        imageSmall: "/image/tabz-s.png",
        title: "TABZ",
        mainText: "TABZ is a collaborative project that serves as an online movie database, crafted with React.js and powered by an API. This platform empowers users to effortlessly explore, search, and curate their list of favorite movies, which is conveniently stored in local storage for a personalized experience. The group project demonstrated effective version control through GitHub, ensuring smooth collaboration and efficient tracking of changes. Tailwind CSS was employed for a responsive and visually appealing design, enhancing the user interface. Rudax, a state management library for React, was utilized to streamline data flow and improve the overall performance of the application. A notable feature is the implementation of a favorite button, allowing users to easily mark and manage their preferred movies. The project showcases a seamless integration with external APIs, providing up-to-date and extensive movie information. Overall, TABZ stands as a testament to collaborative development, version control proficiency, and the effective use of React.js, Tailwind CSS, Rudax, and API integration to create a user-friendly and feature-rich online movie database.",
        tools: ["React", "RestAPI", "WooCommerce", "GitHub", "tailwind", "Figma"],
        gitHubAddress:"https://github.com/TaylorHillier/Movie-Database-TABZ",
        liveSiteAddress: "",
    },

    {   id: "vLive",
        imageHeader: "/image/tabz-moviedatabase.png",
        imageSmall: "/image/vlive-s.png",
        title: "Vancouver Live",
        mainText: "Vancouver Live is an annual convention center dedicated to hosting live music events, and our website ensures a seamless experience for music enthusiasts. Developed as a collaborative project, we utilized Trello as a project management tool, employing an agile system for efficient teamwork. The website, built on WordPress and WooCommerce, facilitates easy ticket purchases, provides detailed information about performers, and presents the event schedule in a user-friendly manner. Our process began with a comprehensive Website Content Inventory and Information Architecture, followed by meticulous wireframing and high-fidelity mockups. A well-structured site development plan guided the coding phase. One notable feature is the integration of the Google Maps API to enhance user navigation and provide location details. Additionally, a strong emphasis was placed on creating a detailed event schedule, showcasing effective planning and organization. The collaborative effort and strategic approach to development have resulted in a website that seamlessly combines functionality and aesthetics for an optimal user experience.",
        tools: ["WordPress", "PHP", "WooCommerce", "SCSS", "GitHub", "Figma"],
        gitHubAddress:"https://github.com/htpwebdesign/vancouver-live",
        liveSiteAddress: "https://vancouverlive.bcitwebdeveloper.ca/",
    },


    {   id: "zeiko",
        imageHeader: "/image/tabz-moviedatabase.png",
        imageSmall: "/image/tabz-s.png",
        title: "Zeiko",
        mainText: "My portfolio showcases my proficiency in web development using React and TypeScript, complemented by Vite for fast build times and Chakra UI for a streamlined design. The design process began with meticulous wireframing, followed by the creation of high-fidelity mockups to ensure a polished and user-friendly interface. The transition from design to code was seamless, highlighting my skills in both areas.To enhance the user experience, I incorporated animations and utilized Isotope for dynamic content presentation. This not only adds a touch of elegance but also makes the portfolio more engaging and visually appealing. The journey from concept to execution is well-documented, reflecting my commitment to a thoughtful and creative design process.",
        tools: ["React", "TypeScript", "Chakra UI", "CSS", "Figma"],
        gitHubAddress: "https://github.com/Zeinabkordeh/portfolio",
        liveSiteAddress: "",

    },


    {   id: "zekoyoga",
        imageHeader: "/image/zekoyoga.png",
        imageSmall: "/image/zekoyoga-s.png",
        title: "ZekoYoga",
        mainText: "Designed and implemented the Zekoyoga website on Shopify, featuring a streamlined user interface and integrated purchase functionality. This project showcases my skills in e-commerce web development, emphasizing a user-friendly design and a seamless purchasing experience within the Shopify platform. The inclusion of secure and efficient transaction processes enhances the overall functionality of the site, demonstrating my ability to create robust online shopping solutions.",
        tools: ["Shopify"],
        liveSiteAddress: "https://zekoyoga.myshopify.com/",

    },

    {   id: "game",
        imageHeader: "/image/game.png",
        imageSmall: "/image/game.png",
        title: "Breackout Ball",
        mainText: "Crafted an immersive Breakout ball game using JavaScript, complete with sound integration and adjustable difficulty modes. This project highlights my expertise in front-end development, incorporating both audio elements for a dynamic gaming experience and customizable difficulty settings to cater to diverse player preferences. The combination of interactive gameplay, sound design, and user customization underscores my proficiency in creating engaging and versatile web-based games.",
        tools: ["JavaScript", "HTML", "CSS", "Figma"],
        gitHubAddress: "https://github.com/Zeinabkordeh/Breakout-Ball-Game",
        liveSiteAddress: "",

    },  

    {   id: "calculator",
        imageHeader: "/image/calculator.png",
        imageSmall: "/image/calculator.png",
        title: "Calculator",
        mainText: "Developed a feature-rich calculator using React, enabling basic arithmetic operations with decimal precision. Advanced memory functions (M+, M-, MR, MC) provide enhanced usability. The clean and intuitive interface ensures a seamless user experience. This project showcases my proficiency in React and ability to create interactive, functional applications.",
        tools: ["React", "HTML", "CSS"],
        liveSiteAddress: "https://zekoyoga.myshopify.com/",

    },

   
]

export default singlePageContent;