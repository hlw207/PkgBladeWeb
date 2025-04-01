import { defineStore } from 'pinia'
import {request} from "@/util/request";
import {ElMessage} from "element-plus";

export const usePipelineStore = defineStore('pipeline', {
    state: ()=> {
        return {
            missionName: '',
            dependency: ''
        }
    },
    actions: {
        async getDependency(){
            if(this.dependency == '') {
                await request({
                    url: '/dependency/getPackageDependency',
                    method: 'POST',
                    params: {
                        packageName: this.missionName
                    }
                }).then((res) => {
                    if (res.data.responseCode == 'SUCCESS') {
                        this.dependency = res.data.data
                    }else
                        ElMessage.warning('wrong')
                })
            }
        }
    },
    persist: true
})
