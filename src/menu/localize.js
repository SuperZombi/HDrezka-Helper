var browser = chrome || browser;
function localizeHtmlPage() {
    document.querySelectorAll('[localize]').forEach(elem => {
        elem.innerText = browser.i18n.getMessage(elem.getAttribute("localize"))
    })
    document.querySelectorAll('[localize-title]').forEach(elem => {
        elem.title = browser.i18n.getMessage(elem.getAttribute("localize-title"))
    })
}
localizeHtmlPage();