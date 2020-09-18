import { last } from "lodash";

export default {
    state: {
        lastSearch: {
            from: null,
            to: null,
        },
        basket: {
            items: []
        }
    },
    mutations: {
        setLastSearch(state, payload){
            state.lastSearch = payload;
        },
        addBasketItems(state, payload){
            state.basket.items.push(payload);
        },
        removeBasketItems(state, payload){
            state.basket.items = state.basket.items.filter(item => item.bookable.id !== payload);
        },
        setBasket(state, payload){
            state.basket = payload;
        }
    },
    actions: {
        setLastSearch(context, payload){
            context.commit('setLastSearch', payload);
            localStorage.setItem('lastSearch', JSON.stringify(payload));
        },
        addBasketItems({commit, state}, payload){
            commit('addBasketItems', payload);
            localStorage.setItem('basket', JSON.stringify(state.basket));
        },
        removeBasketItems({commit, state}, payload){
            context.commit('removeBasketItems', payload);
            localStorage.setItem('basket', JSON.stringify(state.basket));
        },
        loadStore(context){
            const lastSearch = localStorage.getItem('lastSearch');
            if(lastSearch){
                context.commit('setLastSearch', JSON.parse(lastSearch));
            }
            const basket = localStorage.getItem('basket');
            if(basket){
                context.commit('setBasket', JSON.parse(basket));
            }
        }
    },
    getters: {
        itemsInBasket(state){
            return state.basket.items.length;
        },
        isAlreadyInBasket(state){
            return function(id){
                return state.basket.items.reduce((result, item) => result || item.bookable.id === id, false);
            }
        }
    }
}
