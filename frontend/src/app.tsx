import * as React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Header from './components/Header';
import PostDetailsPage from './components/PostDetailsPage';
import PostList from './components/PostsList';
import { PostModel } from './api/apiModels';
import { getAllPosts } from './api/api';
import { useEffect } from 'react';
import UpdateDataContext from './updateDataContext';


const App = () => {

    const [posts, setPosts] = React.useState<PostModel[]>([]);
    const [shouldFetchPosts, setShouldFetchPosts] = React.useState(true);

    useEffect(() => {
        if (shouldFetchPosts) {
            const fetchData = async () => {
                const result = await getAllPosts()

                result.sort(function (a, b) {
                    return new Date(b.created).valueOf() - new Date(a.created).valueOf();
                });

                console.log(result);
                setPosts(result);
                setShouldFetchPosts(false)
            };

            fetchData();
        }
    }, [shouldFetchPosts]);

    return (
        <>
            <React.StrictMode>
                <BrowserRouter>
                <UpdateDataContext.Provider value={{ shouldFetchPosts, setShouldFetchPosts }}>
                    <Header />
                    <Routes>
                        <Route path="/" element={<PostList posts={posts} />} />
                        <Route path="/posts/:postId" element={<PostDetailsPage />} />
                    </Routes>
                    </UpdateDataContext.Provider>
                </BrowserRouter>
            </React.StrictMode>
        </>
    );
}


export default App;