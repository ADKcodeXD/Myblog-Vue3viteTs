<template >
    <div class="top">
        <p style="font-size: 32px">详细信息</p>
        <div class="buttongroup">
            <el-button type="primary" plain @click="changeIsEdit(true)" v-if="!isEdit">编辑资料</el-button>
            <el-button type="primary" plain @click="changeIsEdit(false)" v-else>取消</el-button>
            <el-button type="success" @click="formSubmit(formInstance)" v-if="isEdit" plain>完成</el-button>
        </div>
    </div>
    <el-divider></el-divider>
    <!-- 表单部分 -->
    <div class="form">
        <el-form ref="formInstance" label-position="left" label-width="100px" :rules="rules" :model="formAllinfo"
            style="max-width: 600px">
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
                <el-input :disabled="!isEdit" v-model="formAllinfo.nickname"></el-input>
            </el-form-item>
            <el-form-item label="邮件地址" prop="email">
                <el-input :disabled="!isEdit" v-model="formAllinfo.email"></el-input>
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
                <el-input :disabled="!isEdit" v-model="formAllinfo.introduce" type="textarea" show-word-limit
                    maxlength="32"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup lang="ts">
import { useFormGroup } from '@/hooks/Home';
import { UpdateUserInfoParams } from '@/interface/params';
import { UserAll } from '@/interface/user';

import { PropType } from 'vue';
const props = defineProps({
    formAllinfo: {
        type: Object as PropType<UpdateUserInfoParams>,
        default: {}
    },
    currentUser: {
        type: Object as PropType<UserAll>,
        default: {}
    }
})
const emit = defineEmits(['changeInfo']);

const { formSubmit,
    changeIsEdit,
    formInstance,
    rules,
    isEdit } = useFormGroup(emit);

</script>

<style lang="less">
.top {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>