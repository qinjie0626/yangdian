import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state:{
        arr:localStorage.getItem('arr')?JSON.parse(localStorage.getItem('arr')):[]
    },
    mutations:{
        getArr(state,obj){
            if(state.arr.length === 0){
                state.arr.push(obj)
                localStorage.setItem('arr',JSON.stringify(state.arr))
                return
            }else{
                let i
                let bool = state.arr.some((item,index)=>{
                    if(item.title == obj.title){
                        i = index
                        return true
                    }else{
                        return false
                    }
                })
                if(bool){
                    state.arr[i].value += obj.value
                }else{
                    state.arr.push(obj)
                }
                localStorage.setItem('arr',JSON.stringify(state.arr))
            }
        },
        getdel(state,num){
            state.arr.splice(num,1)
            localStorage.setItem('arr',JSON.stringify(state.arr))
        }
    },
    actions:{
        getDel({commit},num){
            commit('getdel',num)
        }
    }
})
export default store