'use strict';
import User from "./user.class";

class Article {
    title = '';
    subtitle = '';
    body = 'Write the content here...';
    coverImage = 'http://localhost:8000/static/defaultArticle.png';
    isPublished = false;
    isDraft = true;
    category = '';
    author = '';
}


export default Article;