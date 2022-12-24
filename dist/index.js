(() => {
    let state;
    const main = () => {
        init();
        headings();
        link();
    };
    const init = () => {
        const page = doc();
        const anchorss = page.getElementsByTagName("a");
        const headingss = [];
        for (let i = 1, tag = `h${i}`; i < 6; tag = `h${++i}`) {
            headingss.push(page.getElementsByTagName(tag));
        }
        state = {
            page,
            headings: headingss.map(ary).flat(),
            anchors: ary(anchorss),
            links: { byid: {}, },
        };
    };
    const headings = () => {
        const { headings, links: { byid } } = state;
        headings.filter(x => !x.id).forEach(x => {
            const id = trim(x.innerText);
            x.id = id;
            byid[id] = x;
        });
    };
    const link = () => {
        const { anchors } = state;
        anchors.filter(x => !x.href).forEach(x => {
            const ref = href(x);
            if (!ref) {
                console.warn(`anchor failed to find heading: href=${ref}`);
                return;
            }
            x.href = `#${ref}`;
        });
    };
    const href = (anchors) => {
        const { links: { byid } } = state;
        const anchor = trim(anchors.innerText);
        if (byid[anchor]) {
            return anchor;
        }
        const sec = section(anchors);
        if (byid[sec]) {
            return sec;
        }
        return void 0;
    };
    const section = (anchors) => {
        const h = anchors.parentElement.previousElementSibling;
        if (sections[h.tagName]) {
            return trim(h.innerText);
        }
        return void 0;
    };
    const ary = (x) => {
        const result = [];
        for (let i = 0, size = x.length; i < size; i++) {
            result.push(x.item(i));
        }
        return result;
    };
    const trim = (x) => {
        let begin = 0, end = x.length;
        for (; space[x[begin]]; begin++)
            ;
        for (; space[x[end - 1]]; end--)
            ;
        return x.substring(begin, end);
    };
    const space = {
        " ": 1,
        "　": 1,
    };
    const sections = {
        "h1": 1,
        "h2": 1,
        "h3": 1,
        "h4": 1,
        "h5": 1,
        "H1": 1,
        "H2": 1,
        "H3": 1,
        "H4": 1,
        "H5": 1,
    };
    const doc = () => { var _a; return (_a = document.getElementById("main-content")) !== null && _a !== void 0 ? _a : document.getElementById("content"); };
    main();
})();
