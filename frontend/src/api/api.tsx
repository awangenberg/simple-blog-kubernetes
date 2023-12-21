import { CreatePostModel, PostModel } from "./apiModels";


const baseUrl = process.env.REACT_APP_API_BASE_URL;

const getAllPosts = async () => {
    const response = await fetch(
        `${baseUrl}/posts`,
    );

    if (!response.ok) {
        console.log("Status code returned: " + response.status);
        console.log("message: " + response?.json)
        return [];
    } else {
        const data: PostModel[] = await response.json();
        return data;
    }
};

const deletePost = async (id: string) => {

    const response = await fetch(`${baseUrl}/posts/${id}`, {
        method: 'DELETE'
    })

    if (!response.ok) {
        console.log("Status code returned: " + response.status);
        console.log("message: " + response?.json)
        return [];
    } else {
        console.log("Successfully DELETED blog post with Id: " + id)
    }
};

const createNewPost = async (newPost: CreatePostModel) => {

    const response = await fetch(`${baseUrl}/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
    })

    if (!response.ok) {
        console.log("Status code returned: " + response.status);
        console.log("message: " + response?.json)
        return [];
    } else {
        console.log("Successfully created new blog post. response: " + response.json())
    }
};

const getHealthCheck = async () => {

    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    try {
        const response = await fetch(baseUrl + '/health-check', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        });
        if (response.ok) {
            return await response.json();
        }

    } catch (error) {
        console.error(error);
    }

};

export {
    getAllPosts,
    getHealthCheck,
    createNewPost,
    deletePost
};