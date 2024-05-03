import { useEffect } from "react";

// key is for example: Escape --- action is for example: setSelectedId 
export const useKey = (key: string, action: (id: string) => void) => {
  // NOTE: we need this useEffect to close the movie window when i press the Escape on the keyboard:
  useEffect(() => {
    // this effect should run on mount: addEventListener is a command in JS DOM and has nothing to do with React!

    // NOTE: This is a general callback function for both mount and unmount addEventListener from document!
    const addEventListenerCallback = (e: { code: string }) => {
      // if (e.code === "Escape") {
      // NOTE: Both sides are string, it would be bettter to convert them to the lowercase to avoid every typo errors!
      if (e.code.toLowerCase() === key.toLowerCase()) {
        // setSelectedId(""); // close movie, when i press the Escape button on Keyboard!
        action(""); // close movie, when i press the Escape button on Keyboard!
        // console.log("CLOSING");
      }
    };

    // NOTE: to mount or add eventListener to the document, when i press the escape button!
    document.addEventListener("keydown", addEventListenerCallback);

    // NOTE: to clean our eventAddListener() => because every time after clicking a new movie and then press escape to close the movie window, we see that the number of 'CLOSING' in console increased exponencially! => that's why we have to do the unmount(remove) => cleaning process the eventListener from document:
    return () => {
      document.removeEventListener("keydown", addEventListenerCallback);
      // NOTE: after this process, when i press the escape button 1000 times, it shows me only one CLOSING and not 1000 times CLOSING!
    };
    // }, [setSelectedId]);
  }, [action, key]);
};
