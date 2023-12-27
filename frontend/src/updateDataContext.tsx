import React from "react";

const UpdateDataContext = React.createContext({
    shouldFetchPosts: false,
    setShouldFetchPosts: (value: boolean) => {}
    });

  export default UpdateDataContext;