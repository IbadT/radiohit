import * as React from 'react';
import * as NProgress from 'nprogress';


interface NextTopLoaderProps {
    color?: string;
    height?: number;
    showSpinner?: boolean;
    crawl?: boolean;
    crawlSpeed?: number;
    initialPosition?: number;
    easing?: string;
    speed?: number;
    shadow?: string | boolean;
}

const NextTopLoader = ({
    color: propColor,
    height: propHeight,
    showSpinner,
    crawl,
    crawlSpeed,
    initialPosition,
    easing,
    speed,
    shadow
}: NextTopLoaderProps) => {
    const defaultColor = '#29d';
    const defaultHeight = 3;

    const color = propColor ?? defaultColor;
    const height = propHeight ?? defaultHeight;

    // Any falsy (except undefined) will disable the shadow
    const boxShadow = !shadow && shadow !== undefined
        ? ''
        : shadow
            ? `box-shadow:${shadow}`
            : `box-shadow:0 0 10px ${color},0 0 5px ${color}`;

    const styles = (
        <style>
            {`#nprogress{pointer-events:none}#nprogress .bar{background:${
                color
            };position:fixed;z-index:1031;top:0;left:0;width:100%;height:${
                height
            }px}#nprogress .peg{display:block;position:absolute;right:0;width:100px;height:100%;${
                boxShadow
            };opacity:1;-webkit-transform:rotate(3deg) translate(0px,-4px);-ms-transform:rotate(3deg) translate(0px,-4px);transform:rotate(3deg) translate(0px,-4px)}#nprogress .spinner{display:block;position:fixed;z-index:1031;top:15px;right:15px}#nprogress .spinner-icon{width:18px;height:18px;box-sizing:border-box;border:2px solid transparent;border-top-color:${
                color
            };border-left-color:${
                color
            };border-radius:50%;-webkit-animation:nprogress-spinner 400ms linear infinite;animation:nprogress-spinner 400ms linear infinite}.nprogress-custom-parent{overflow:hidden;position:relative}.nprogress-custom-parent #nprogress .bar,.nprogress-custom-parent #nprogress .spinner{position:absolute}@-webkit-keyframes nprogress-spinner{0%{-webkit-transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg)}}@keyframes nprogress-spinner{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}`}
        </style>
    );

    React.useEffect(() => {
        NProgress.configure({
            showSpinner: showSpinner ?? true,
            trickle: crawl ?? true,
            trickleSpeed: crawlSpeed ?? 200,
            minimum: initialPosition ?? 0.08,
            easing: easing ?? 'ease',
            speed: speed ?? 200,
        });

        function isAnchorOfCurrentUrl(currentUrl: string, newUrl: string) {
            const currentUrlObj = new URL(currentUrl);
            const newUrlObj = new URL(newUrl);
            // Compare hostname, pathname, and search parameters
            if (
                currentUrlObj.hostname === newUrlObj.hostname &&
                currentUrlObj.pathname === newUrlObj.pathname &&
                currentUrlObj.search === newUrlObj.search
            ) {
                // Check if the new URL is just an anchor of the current URL page
                const currentHash = currentUrlObj.hash;
                const newHash = newUrlObj.hash;
                return (
                    currentHash !== newHash && currentUrlObj.href.replace(currentHash, '') === newUrlObj.href.replace(newHash, '')
                );
            }
            return false;
        }

        // eslint-disable-next-line no-var
        let npgclass = document.querySelectorAll('html');
        function findClosestAnchor(element: HTMLElement | null): HTMLAnchorElement | null {
            while (element && element.tagName.toLowerCase() !== 'a') {
                element = element.parentElement;
            }
            return element as HTMLAnchorElement;
        }
        function handleClick(event: MouseEvent) {
            try {
                const target = event.target as HTMLElement;
                const anchor = findClosestAnchor(target);
                if (anchor) {
                    const currentUrl = window.location.href;
                    const newUrl = (anchor as HTMLAnchorElement).href;
                    const isExternalLink = (anchor as HTMLAnchorElement).target === "_blank";
                    const isBlob = newUrl.startsWith('blob:');

                    if (newUrl === currentUrl || isExternalLink || isBlob) {
                        [].forEach.call(npgclass, function (el: Element) {
                            el.classList.remove("nprogress-busy");
                        });
                    } else {
                        NProgress.start();
                        (function (history) {
                            const pushState = history.pushState;
                            history.pushState = function () {
                                NProgress.done();
                                [].forEach.call(npgclass, function (el: Element) {
                                    el.classList.remove("nprogress-busy");
                                });
                                return pushState.apply(history, arguments as any);
                            };
                        })(window.history);
                    }
                }
            } catch (err) {
                // Log the error in development only!
                // console.log('NextTopLoader error: ', err);
                NProgress.start();
                NProgress.done();
            }
        }

        // Add the global click event listener
        document.addEventListener("click", handleClick);

        // Clean up the global click event listener when the component is unmounted
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    return styles;
};
export default NextTopLoader;
