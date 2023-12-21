import { Post } from "./apiModels";


const baseUrl = process.env.REACT_APP_API_BASE_URL;

const getAllPosts = async () => {
    const response = await fetch(
        baseUrl + "/posts",
    );
    const data: Post[] = await response.json();

    if (!response.ok) {
        console.log("Status code returned: " + response.status);
        console.log("message: " + response?.json)
        return [];
    } else {
        return data;
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
        if(response.ok){
          return await response.json();
        }
  
      } catch (error) {
          console.error(error);
      }
    
  };

  export {
    getAllPosts,
    getHealthCheck
};