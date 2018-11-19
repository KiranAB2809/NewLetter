'use strict';
import User from "./user.class";

export class Article {
    title = '';
    subtitle = '';
    body = 'Write the content here...';
    coverImage = 'http://localhost:8000/static/defaultArticle.png';
    isPublished = false;
    isDraft = true;
    edited = '';
    list = [
        new CardForm()
    ];
    category = '';
    author = '';
}

export class CardForm {
    title = '';
    coverImage = 'http://localhost:8000/static/defaultdidYouKnow.jpg';
    body = '';
}
