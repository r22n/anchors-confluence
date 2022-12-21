

type State = {
    page: HTMLElement;
    headings: HTMLElement[];
    anchors: HTMLAnchorElement[];
    links: { [id in string]?: HTMLElement };
};

(() => {
    let state: State;

    const main = () => {
        init();
        anchor();
        link();
    };

    const init = () => {
        const page = document.getElementById("main-content") ?? document.getElementById("content");
        const anchorss = page.getElementsByTagName("a");
        const headingss = [];
        for (let i = 1, tag = `h${i}`; i < 6; tag = `h${++i}`) {
            headingss.push(page.getElementsByTagName(tag));
        }

        state = {
            page,
            headings: headingss.map(ary).flat(),
            anchors: ary(anchorss),
            links: {},
        };
    };

    const anchor = () => {
        const { headings, links } = state;

        headings.filter(x => !x.id).forEach(x => {
            const id = x.innerText.trim();
            x.id = id;
            links[id] = x;
        });
    };

    const link = () => {
        const { links, anchors } = state;

        anchors.filter(x => !x.href).forEach(x => {
            const id = x.innerText;
            const href = `#${id}`;
            const to = links[id];
            if (!to) {
                console.warn(`ignore anchor link: heading=${id}`);
                return;
            }
            x.href = href;
        });
    };

    const ary = <T extends HTMLElement>(x: HTMLCollectionOf<T>) => {
        const result: T[] = [];
        for (let i = 0, size = x.length; i < size; i++) {
            result.push(x.item(i));
        }
        return result;
    };

    const trim = (x: string) => {
        let begin = 0, end = x.length;
        for (; space[x[begin]]; begin++);
        for (; space[x[end - 1]]; end--);
        return x.substring(begin, end);
    };

    const space = {
        " ": 1,
        "　": 1,
    };

    main();
})();