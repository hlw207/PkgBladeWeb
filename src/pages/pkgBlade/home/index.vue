<script setup lang="ts">
import {request} from "@/util/request";
import {ElMessage} from "element-plus";
import {useUserInfoStore} from "@/stores/user";
import {useCookies} from "vue3-cookies";
import router from "@/router";
import {Key} from "@element-plus/icons-vue";
import PkgMain from "@/layouts/pkgMain.vue";
const { cookies } = useCookies();

const user = useUserInfoStore()
const logout = () => {
  request({
    url: '/auth/logout',
    method: 'post'
  }).then((res)=>{
    ElMessage.success('登出成功')
    user.name = user.token = '' //调试用
    cookies.remove('satoken')
    router.push('/pkgBlade/login')
  })
}
</script>

<route lang="yaml">
  meta:
    layout: pkgMain
</route>

<template>
  <div class="user">
    <div class="profile">
      <div style="display: flex;align-items: center;margin-bottom: 30px">
        <div style="font-weight: bold;font-size: 21px">
          您的信息
        </div>
        <div class="profile_right">
          <div class="profile_right_main">
            <div class="profile_key">
              <el-icon style="transform: rotate(30deg)"><Key /></el-icon>
            </div>
            <div class="profile_info">
              <div style="font-weight: bold">更改密码</div>
              <div class="profile_info_text">安全性</div>
            </div>
          </div>
        </div>
      </div>
      <div class="infoBox">
        <div class="infoLine">
          <div class="info_profile"><el-icon><User /></el-icon></div>
          <div class="info_profile_text">
            <div style="font-weight: bold;font-size: 20px;margin-bottom: 10px">{{user.name}}</div>
            <div>添加照片，个性化你的账户。 你的个人资料照片会显示在使用你的Prism帐户的应用和设备上。</div>
            <div class="info_profile_button">添加照片</div>
          </div>
          <div style="display: flex;justify-content: right;flex: 1;padding: 15px">
            <div style="font-size: 13px;color: #ce363a;cursor: pointer;margin-bottom: 120px" @click="logout">退出登录</div></div>
        </div>
        <div class="infoLineSplit"></div>
        <div class="infoLine infoLineNormal">
          <div class="titleNormal">全名</div>
          <div class="infoNormal">***</div>
          <!--        <div class="infoNormal infoNormalInput"><input class="input_input" placeholder="请输入名称"></div>-->
          <div class="clickNormal">
            编辑名称
          </div>
        </div>
      </div>

      <div class="infoBox">
        <div class="infoLine infoLineNormal">
          <div class="titleNormal" style="font-weight: bold">个人资料信息</div>
          <div class="clickNormal">
            编辑个人资料信息
          </div>
        </div>
        <div class="infoLineSplit"></div>
        <div class="infoLine infoLineNormal">
          <div class="titleNormal">出生日期</div>
          <div class="infoNormal">**********</div>
        </div>
        <div class="infoLineSplit"></div>
        <div class="infoLine infoLineNormal">
          <div class="titleNormal">性别</div>
          <div class="infoNormal">*</div>
        </div>
        <div class="infoLineSplit"></div>
        <div class="infoLine infoLineNormal">
          <div class="titleNormal">国家或地区</div>
          <div class="infoNormal">**</div>
        </div>
        <div class="infoLineSplit"></div>
        <div class="infoLine infoLineNormal">
          <div class="titleNormal">语言</div>
          <div class="infoNormal">中文（中国）</div>
        </div>
      </div>

      <div class="infoBox">
        <div class="infoLine infoLineNormal">
          <div class="titleNormal" style="font-weight: bold">账户信息</div>
          <div class="clickNormal">
            编辑账户信息
          </div>
        </div>
        <div class="infoLineSplit"></div>
        <div class="infoLine infoLineNormal">
          <div class="titleNormal">账户id</div>
          <div class="infoNormal">{{user.name}}</div>
        </div>
        <div class="infoLineSplit"></div>
        <div class="infoLine infoLineNormal">
          <div class="titleNormal">电子邮件地址</div>
          <div class="infoNormal">****************</div>
        </div>
        <div class="infoLineSplit"></div>
        <div class="infoLine infoLineNormal">
          <div class="titleNormal">电话号码</div>
          <div class="infoNormal">*********</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user{
  background: white;
  padding: 30px;
  border-radius: 10px;
}

.basic_button{
  background: rgba(0, 0, 0, 0.04);
  height: 25px;
  padding: 0 15px;
  border-radius: 12.5px;
  display: flex;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
}

.basic_button:hover{
  background: rgba(0, 0, 0, 0.08);
}

.blue_button{
  width: fit-content;
  font-size: 12px;
  background: linear-gradient(to right, #40a9ff, #1890ff);
  color: white;
}

.blue_button:hover{
  background: linear-gradient(to right, #69c0ff, #40a9ff);
}

.profile{
  padding: 15px;
}

.profile_right{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: right;
}

.profile_right_main{
  display: flex;
  align-items: center;
  justify-content: right;
  cursor: pointer;
}

.profile_key{
  width: 28px;
  height: 28px;
  border-radius: 14px;
  border: 1px solid rgba(115, 115, 115, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  background: #d0e5f5;
  color: #1c70c7;
}

.profile_info{
  font-size: 11px;
  margin-left: 10px;
  margin-right: 20px
}

.profile_info_text{
  color: rgb(50, 49, 48);
}

.profile_right_main:hover .profile_key{
  color: white;
  background: #1c70c7;
}

.profile_right_main:hover{
  color: #1c70c7;
}

.profile_right_main:hover .profile_info_text{
  color: #1c70c7;
}

.infoBox{
  margin: 15px 0;
  background: white;
  border: 1px solid rgba(115, 115, 115, 0.1);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1); /* 添加轻微阴影 */
  border-radius: 8px;
}

.infoLine{
  position: relative;
  display: flex;
  align-items: center;
}

.infoLineSplit{
  width: 100%;
  height: 1px;
  background: rgba(115, 115, 115, 0.1);;
}

.info_profile{
  margin: 15px;
  width: 150px;
  height: 150px;
  border-radius: 75px;
  border: 1px solid rgba(115, 115, 115, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1c70c7;
  color: white;
  font-size: 50px;
}

.info_profile_text{
  width: 230px;
  margin-left: 15px;
  font-size: 13px;
  color: rgb(50, 49, 48);
}

.info_profile_button{
  margin-top: 10px;
  background: white;
  height: 28px;
  width: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgb(50, 49, 48);
  font-weight: bold;
  border-radius: 1px;
  cursor: pointer;
  color: rgb(50, 49, 48);;
}

.info_profile_button:hover{
  background: #e8e8e8;
}

.infoLineNormal{
  height: 52px;
  padding: 0 15px;
}

.titleNormal{
  font-size: 13px;
  color: rgb(50, 49, 48);
}

.infoNormal{
  position: absolute;
  left: 235px;
  font-size: 13px;
  color: rgb(50, 49, 48);
  font-weight: bold;
}

.infoNormalInput{
  width: 110px;
  display: flex;
  align-items: center;
  padding-left: 8px;
  height: 24px;
  border: 1px solid rgba(115, 115, 115, 0.3);
}

.clickNormal{
  box-sizing: border-box;
  position: absolute;
  right: 0;
  display: flex;
  justify-content: right;
  align-items: center;
  flex: 1;
  margin-right: 15px;
  color: #1c70c7;
  font-size: 13px;
  cursor: pointer;
}

.clickNormal:hover{
  border-bottom: 1px solid #1c70c7;
}

.input_input{
  width: 100px;
  height: 20px;
  border: none;        /* 重置input */
  box-shadow:none;
  outline: none;
}
</style>