export const getCategory = (state) => state.Category.categories;
export const getUser = (state) => state.User.User;
export const getArticlesbyId = (state, categoryId) => {
    if(categoryId){
        if(state.Article.Articles.hasOwnProperty(categoryId)){
            return state.Article.Articles[categoryId];
        } 
        return [];
    }
    return state.Article.Articles;
};
export const getArticles = (state) => state.Article.Articles;