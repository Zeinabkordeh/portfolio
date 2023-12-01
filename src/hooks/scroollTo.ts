function scrollToTop(): void {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function scrollToTopOnPageLoad() {
    scrollToTop();
}

scrollToTopOnPageLoad();
