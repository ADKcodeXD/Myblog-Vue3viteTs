<template>
  <div class="my-info">
    <!-- 封面图 头图 -->
    <div class="banner">
      <el-upload
        class="upload"
        action=""
        :before-upload="beforeBannerUpload"
        :show-file-list="true"
        :limit="1"
        accept=".png, .jpg, .jpeg"
        :on-exceed="handleExceed"
      >
        <el-button type="primary" plain>点击上传封面</el-button>
      </el-upload>
      <img :src="currentUser.banner" alt="" />
    </div>
    <!-- 个人信息 -->
    <div class="info-deatil">
      <!-- 左边 -->
      <div class="my-info-easy">
        <!-- icon 头像 -->
        <UploadAvatar
          @changeAvatar="changeAvatar"
          :size="200"
          :is-show="false"
          :avatar="currentUser.avatar"
        />
        <div class="infobox">
          <!-- 用户名 -->
          <div class="username">
            {{ currentUser.nickname }}
            <i
              class="iconfont icon-nansheng"
              v-if="currentUser.gender === '1'"
            ></i>
            <i class="iconfont icon-nvsheng" v-else></i>
          </div>
          <!-- 介绍 -->
          <div class="introuce">{{ currentUser.introduce }}</div>
          <!-- emil 性别 等 -->
          <div class="more-info">
            <div class="email">
              <i class="iconfont icon-riqi"></i>创建日期:{{ currentUser.date }}
            </div>
            <div class="email">
              <i class="iconfont icon-youjian"></i>邮件:{{
                currentUser.email ? currentUser.email : "未设置"
              }}
            </div>
            <div class="email">
              <i class="iconfont icon-gerenzhongxin"></i>用户名:{{
                currentUser.username
              }}
            </div>
          </div>
        </div>
      </div>
      <div class="all-info">
        <div class="top">
          <p style="font-size: 32px">详细信息</p>
          <div class="buttongroup">
            <el-button type="primary" @click="changeIsEdit(true)" v-if="!isEdit"
              >编辑资料</el-button
            >
            <el-button type="primary" plain @click="changeIsEdit(false)" v-else
              >取消</el-button
            >
            <el-button
              type="success"
              @click="formSubmit(formInstance)"
              v-if="isEdit"
              >完成</el-button
            >
          </div>
        </div>
        <el-divider></el-divider>
        <!-- 表单部分 -->
        <div class="form">
          <el-form
            ref="formInstance"
            label-position="left"
            label-width="100px"
            :rules="rules"
            :model="formAllinfo"
            style="max-width: 600px"
          >
            <el-form-item label="用户名">
              <p>{{ currentUser.username }}</p>
            </el-form-item>
            <el-form-item label="uid">
              <p>{{ currentUser.id }}</p>
            </el-form-item>
            <el-form-item label="角色">
              <p>{{ currentUser.role }}</p>
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
              <el-input
                :disabled="!isEdit"
                v-model="formAllinfo.nickname"
              ></el-input>
            </el-form-item>
            <el-form-item label="邮件地址" prop="email">
              <el-input
                :disabled="!isEdit"
                v-model="formAllinfo.email"
              ></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group :disabled="!isEdit" v-model="formAllinfo.gender">
                <el-radio label="1">男</el-radio>
                <el-radio label="2">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="创建时间">
              <p>{{ currentUser.date }}</p>
            </el-form-item>
            <el-form-item label="发布文章数量">
              <p>1</p>
            </el-form-item>
            <el-form-item label="简介" prop="introduce">
              <el-input
                :disabled="!isEdit"
                v-model="formAllinfo.introduce"
                type="textarea"
                show-word-limit
                maxlength="32"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <!-- 我的文章 -->
  </div>
</template>

<script setup lang="ts">
import { uploadBanner } from "@/api/article";
import { currentUserAll, currentUserApi, updateUserInfoApi } from "@/api/user";
import { UpdateUserInfoParams } from "@/interface/params";
import { UserAll } from "@/interface/user";
import { useUserStore } from "@/store/user";
import { isValidKey } from "@/utils/tools";
import {
  validateEmail,
  validateJianjie,
  validateNickname,
} from "@/utils/validate";
import { ElForm, ElMessage } from "element-plus";
import {
  ElFile,
  UploadFile,
} from "element-plus/es/components/upload/src/upload.type";

const userStore = useUserStore();
let formAllinfo = reactive<UpdateUserInfoParams>({
  email: "未设置",
  nickname: "",
  gender: "1",
  introduce: "",
  banner: "",
  avatar: "",
});

let isEdit = ref(false);
let currentUser = reactive<UserAll>({
  id: "",
  username: "",
  nickname: "",
  role: "",
  email: "",
  gender: "",
  date: "",
  banner: "",
  avatar: "",
  introduce: "",
});
const getAllinfo = async () => {
  const { data } = await currentUserAll();
  const obj = data.data;
  for (let key in currentUser) {
    if (isValidKey(key, currentUser)) {
      currentUser[key] = obj[key];
    }
    currentUser.gender = obj.gender.toString();
  }
  formAllinfo.email = obj.email ? obj.email : "未设置";
  formAllinfo.gender = obj.gender ? obj.gender.toString() : "1";
  formAllinfo.introduce = obj.introduce;
  formAllinfo.nickname = obj.nickname;
};
// 控制编辑资料
const changeIsEdit = (val: boolean) => {
  isEdit.value = val;
};

// 编辑资料完成 调用api修改资料
const updateUserInfo = async () => {
  const { data } = await updateUserInfoApi(formAllinfo);
  if (data.code === 200) {
    ElMessage.success("修改成功");
  } else {
    ElMessage.error(data.msg);
  }
  getAllinfo();
};
const changeAvatar = (link: string) => {
  formAllinfo.avatar = link;
  updateUserInfo();
};
// 上传banner
const beforeBannerUpload = async (file: ElFile) => {
  const isImg = file.type === "image/jpeg" || file.type === "image/png";
  const isLt5M = file.size / 1024 / 1024 < 5;

  if (!isImg) {
    ElMessage.error("请上传jpg或者png格式的图片");
    return isImg;
  }
  if (!isLt5M) {
    ElMessage.error("请不要上传大于5MB的图片");
    return isLt5M;
  }
  let flag = true;
  // 上传到后端
  const fd = new FormData();
  fd.append("image", file);
  const { data } = await uploadBanner(fd);
  if (data.code !== 200) {
    ElMessage.error(data.msg);
    return flag;
  } else {
    formAllinfo.banner = data.data;
    updateUserInfo();
  }
  return flag;
};
const handleExceed = (files: FileList, fileList: UploadFile[]) => {
  ElMessage.warning("只能上传一张头图");
};

// 表单校验规则
const rules = reactive({
  nickname: [{ required: true, validator: validateNickname, trigger: "blur" }],
  email: [{ required: true, validator: validateEmail, trigger: "blur" }],
  introduce: [{ required: true, validator: validateJianjie, trigger: "blur" }],
});
// 获取表单实例
type FormInstance = InstanceType<typeof ElForm>;
const formInstance = ref<FormInstance>();
// 完成资料  获取表单 校验 发布
const formSubmit = (formEl: FormInstance | undefined) => {
  console.log(formEl);
  if (!formEl) {
    return;
  }
  formEl.validate(async (vaild) => {
    if (vaild) {
      await updateUserInfo();
      await getAllinfo();
      const {data} =await currentUserApi();
      userStore.setUser(data.data);
      isEdit.value=false;
    } else {
      ElMessage.error("请校验表单");
      return false;
    }
  });
};

onMounted(() => {
  getAllinfo();
});
</script>


<style lang="less" scoped>
.my-info {
  width: 80%;
  margin: 0 auto;
  min-height: 600px;
  background-color: white;
  .banner {
    position: relative;
    width: 100%;
    height: 300px;
    background-color: aqua;
    .upload {
      position: absolute;
      right: 20px;
      bottom: 30px;
    }
  }
  .info-deatil {
    display: flex;
    .my-info-easy {
      padding: 20px;
      display: flex;
      width: 25%;
      flex-shrink: 0;
      align-items: center;
      flex-direction: column;
      .infobox {
        width: 100%;
        text-align: left;
        padding-left: 20px;
        margin-top: 10px;
        .username {
          font-size: 30px;
          display: -webkit-box;
          text-overflow: ellipsis;
          overflow: hidden;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          .iconfont {
            font-size: 26px;
            transform: translateY(-10px);
            margin-left: 10px;
          }
        }
        .introuce {
          margin-top: 10px;
          font-size: 14px;
        }
        .more-info {
          i {
            margin-right: 2px;
          }
          margin-top: 10px;
          font-size: 16px;
          line-height: 30px;
        }
      }
    }
    .all-info {
      padding: 20px;
      width: 100%;
      display: flex;
      flex-direction: column;
      .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
}
</style>