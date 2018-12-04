export const getCategory = (state) => state.Category.categories;
export const getUser = (state) => state.User.User;
export const getOtherUser = (state, oId) => {
    if(oId){
        if(Object.keys(state.User.oUser).length > 0 && state.User.oUser.uniqueID === oId){
            return state.User.oUser;
        }
    }
    return null;
}
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
export const getPrevRoute = (state) => state.Route.previousRoute;