import { userLogin, userRegister } from "@/api/login";
import { useStore } from "@/store/main";
import { setItem } from "@/utils/storage";
import {
    validateNickname,
    validatePassword,
    validateUsername,
} from "@/utils/validate";
import { useMouse } from "@vueuse/core";
import { ElForm, ElMessage } from "element-plus";
import { useRouter } from "vue-router";

export const useLoginprop = () => {
    // 公共部分
    const userStore = useStore();
    const router = useRouter();
    const isBlur = ref(false);
    const { x, y } = useMouse();
    let target = ref(null);
    // 控制移动端的登录显示
    let isMobileLoginShow = ref(false);
    // 做一个登录注册表单切换的按钮
    let isLogin = ref(true);
    // 登录部分的逻辑
    const form = reactive({
        username: "",
        password: "",
    });

    type FormInstance = InstanceType<typeof ElForm>;
    const ruleFormRef = ref<FormInstance | null>();
    // 注册部分的逻辑
    const registerForm = reactive({
        username: "",
        nickname: "",
        password: "",
        repassword: "",
    });
    const registerFormRef = ref<FormInstance>();
    return {
        registerFormRef,
        registerForm,
        ruleFormRef,
        form,
        isLogin,
        isMobileLoginShow,
        target,
        x,
        y,
        isBlur,
        router,
        userStore
    }
}
export const useLoginMethod = (userStore: any, router: any, form: any) => {
    type FormInstance = InstanceType<typeof ElForm>;

    const submitForm = (formEl: FormInstance | null) => {
        if (!formEl) return;
        formEl.validate(async (valid) => {
            if (valid) {
                const loginParams = { username: form.username, password: form.password };
                const result = await userLogin(loginParams);
                console.log(result);
                if (result.data.code === 200) {
                    userStore.user.token = result.data.data;
                    setItem("user", userStore.user.token);
                    router.push("/index");
                } else {
                    //   登录失败 提示msg
                    ElMessage.error(result.data.msg);
                }
            } else {
                ElMessage.error("请校验表单！");
                return false;
            }
        });
    };
    return {
        submitForm,
    }
}
export const useRoles = (registerForm: any) => {
    const rules = reactive({
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
    });
    // 确认密码表单校验
    const validateRePassword = (rule: any, value: any, callback: any) => {
        if (value === "") {
            callback(new Error("请确认密码"));
        } else if (value !== registerForm.password) {
            callback(new Error("确认密码必须与密码一致"));
        } else {
            callback();
        }
    };
    // 注册表单校验规则
    const registerRules = reactive({
        username: [{ validator: validateUsername, trigger: "blur" }],
        nickname: [{ validator: validateNickname, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        repassword: [{ validator: validateRePassword, trigger: "blur" }],
    });
    return {
        registerRules,
        rules
    }
}
export const useRegisterMethod=(userStore:any,router:any,registerForm:any,)=>{
    type FormInstance = InstanceType<typeof ElForm>;
    const submitRegister = (formEl: FormInstance | undefined) => {
        if (!formEl) return;
        formEl.validate(async (valid) => {
            if (valid) {
                const registerParams: RegisterParams = {
                    username: registerForm.username,
                    password: registerForm.password,
                    nickname: registerForm.nickname,
                };
                const result = await userRegister(registerParams);
                if (result.data.code === 200) {
                    userStore.user.token = result.data.data;
                    setItem("user", userStore.user.token);
                    router.push("/index");
                } else {
                    //   注册失败 提示msg
                    ElMessage.error(result.data.msg);
                }
            } else {
                ElMessage.error("请校验表单！");
                return false;
            }
        });
    };
    return{
        submitRegister
    }
}





