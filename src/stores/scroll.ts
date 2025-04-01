import { defineStore } from 'pinia'
import {request} from "@/util/request";

export const useScrollStore = defineStore('scroll', {
  state: ()=> {
    return {
      scrollTop: 0,
      scrollHeight: 0,
      scrollPosition: true,
      position: 0,
    }
  },
  actions: {
    toPosition(position: number){
      this.scrollPosition = !this.scrollPosition
      this.position = position
    }
  },
  persist: true
})
