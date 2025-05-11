import * as React from 'react';



export const useCloseModal = (ref, handler) => {
    React.useEffect(
        () => {
            const listener = (event) => {
                if (!ref.current || ref.current.contains(event.target)) {
                    return;
                }
                // if (localStorage.getItem("scroll") !== 'null') {
                //     document.querySelector("html").scrollTop=localStorage.getItem("scroll");
                //     localStorage.setItem("scroll", null);
                // }
                handler(event);
            };
            document.addEventListener("mousedown", listener);
            document.addEventListener("touchstart", listener);
            return () => {
                document.removeEventListener("mousedown", listener);
                document.removeEventListener("touchstart", listener);
            };
        },
        [ref, handler]
    );
}

