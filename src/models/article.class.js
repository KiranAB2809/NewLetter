export class Article {
    title = '';
    subtitle = '';
    body = 'Write the content here...';
    coverImage = 'http://segotn14123:85/static/defaultArticle.png';
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
    coverImage = '';
    body = '';
    type = 'S';
}
