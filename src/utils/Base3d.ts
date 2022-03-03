// three.js工具类
import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Camera } from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { reject } from 'lodash';
class Base3d {
    camera: THREE.PerspectiveCamera;
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    container: HTMLElement | null;
    controls: OrbitControls;
    model: THREE.Group | THREE.Object3D<THREE.Event> | null;
    animateAction: THREE.AnimationAction | undefined;
    clock: THREE.Clock;
    mixer: any;
    timeoutId: any;
    rotationObjArray: Array<any>;
    pointer: THREE.Vector2;
    raycaster: THREE.Raycaster;
    INTERSECTED: any;
    labelRenderer: CSS2DRenderer | undefined;
    clickObjects: Array<any>;
    // 构造函数
    constructor(selector: string) {
        this.container = document.querySelector(selector);
        // 初始化
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.container?.appendChild(this.renderer.domElement);
        this.rotationObjArray = [];
        this.model = null;
        this.mixer = null;
        this.clickObjects = [];
        this.animate();
        this.clock = new THREE.Clock();
        this.init();
        this.pointer = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();

        // 监听大小改变
        window.addEventListener('resize', this.onWindowResize.bind(this));
        // 监听滚轮事件
        // window.addEventListener('wheel', this.onMouseWheel.bind(this));
        // 监听鼠标移动事件
        document.addEventListener('mousemove', this.onPointerMove.bind(this));
        document.addEventListener('mousedown', this.onPointerDown.bind(this));
    }
    // 浏览器自适应
    onWindowResize() {
        if (this.camera instanceof THREE.PerspectiveCamera) {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
        }
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        // this.render();
    }
    // 设置hdr图的函数
    setEnvMap(hdr: string) {
        return new Promise((resolve,reject)=>{
            new RGBELoader().setPath('/hdr/').load(hdr + '.hdr', (texture) => {
                texture.mapping = THREE.EquirectangularReflectionMapping;
                this.scene.environment = texture;
                // this.scene.background = texture;
                resolve(hdr + '添加成功');
            })
        })
    }
    init() {
        this.initCamera();
        this.initRenderer();
        this.initControls();
        this.initBoxparticle();
        this.initLight();
        this.init2DRender();
    }
    init2DRender() {
        this.labelRenderer = new CSS2DRenderer();
        this.labelRenderer.setSize(window.innerWidth, window.innerHeight);

        this.labelRenderer.domElement.style.position = "absolute";
        this.labelRenderer.domElement.style.top = "0px";
        this.labelRenderer.domElement.style.left = "0px";
        this.labelRenderer.domElement.style.zIndex = "0";
        this.container?.appendChild(this.labelRenderer.domElement);
        // 设置控制器为2drenderer
        this.controls = new OrbitControls(this.camera, this.labelRenderer.domElement);
        this.controls.autoRotate = true;
    }
    render() {
        let delta = this.clock.getDelta();
        this.mixer && this.mixer.update(delta);

        // 去旋转动画数组里取元素 
        if (this.rotationObjArray.length != 0) {
            this.rotationObjArray.forEach(item => {
                const obj = this.scene.getObjectByName(item);
                if (obj) {
                    obj.rotation.x += delta / 5;
                    obj.rotation.y += delta / 5;
                    obj.rotation.z += delta / 5;
                }
            })
        }
        // 鼠标移动 变色
        this.camera.updateMatrix();
        this.raycaster.setFromCamera(this.pointer, this.camera);

        const intersects = this.raycaster.intersectObjects(this.clickObjects, false);

        if (intersects.length > 0) {
            if (this.INTERSECTED != intersects[0].object) {
                if (this.INTERSECTED) this.INTERSECTED.material.color.set(0xffffff)
                this.INTERSECTED = intersects[0].object;
                this.INTERSECTED.material.color.set(0xFF9671);
            }
        } else {
            if (this.INTERSECTED) this.INTERSECTED.material.color.set(0xffffff)
            this.INTERSECTED = null;
        }
        // 自动旋转
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
        this.labelRenderer?.render(this.scene, this.camera)
    }
    animate() {
        this.renderer.setAnimationLoop(this.render.bind(this));
    }
    initRenderer() {
        this.renderer.setPixelRatio(window.devicePixelRatio);
        // 渲染尺寸大小
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        // 设置色调效果
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        // 设置曝光程度
        this.renderer.toneMappingExposure = 2;
    }
    initCamera() {
        this.camera.position.set(30, 20, 100);
        this.camera.lookAt(this.scene.position)

    }
    // 控制器初始化函数
    initControls() {
        this.controls.autoRotate = true;
    }

    // setmodel 设置模型
    setModel(modelName: string) {
        return new Promise((resolve, reject) => {
            const loader = new GLTFLoader().setPath('/model/' + modelName + '/');
            loader.load('scene.gltf', (gltf) => {
                gltf.scene.scale.set(0.1, 0.1, 0.1)
                this.scene.add(gltf.scene);
                resolve(modelName + '模型添加成功');
                
            });
        })
    }
    // 添加模型函数
    async addMesh(modelName: string) {
        await this.setModel(modelName);
    }

    // 设置滚轮事件
    onMouseWheel(e: WheelEvent) {
        let timeScale = e.deltaY > 0 ? 1 : -1;
        if (this.animateAction) {
            this.animateAction.setEffectiveTimeScale(timeScale);
            this.animateAction.paused = false;
            this.animateAction.play();
            // 如果
            if (this.timeoutId) {
                clearTimeout(this.timeoutId)
            }
            this.timeoutId = setTimeout(() => {
                this.animateAction?.halt(0.5);
            }, 300);
        }
    }

    // setCamera animation
    setCameraAnime(camera: Camera, animation: any) {
        // 调用动画
        this.mixer = new THREE.AnimationMixer(camera);
        this.animateAction = this.mixer.clipAction(animation);
        if (this.animateAction) {
            // 设置动画播放时长
            this.animateAction.setDuration(24).setLoop(THREE.LoopOnce, 1);
            // 播放动画
            this.animateAction.clampWhenFinished = true;
            this.animateAction.play();
        }
    }

    // child animation 设置旋转动画
    setChildRotationAnimation(name: string) {
        this.rotationObjArray.push(name);
    }

    // 监视鼠标移动
    onPointerMove(event: MouseEvent) {
        this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
    }

    // 监听鼠标点击
    onPointerDown(event: MouseEvent) {
        let mouse = new THREE.Vector2();
        mouse.x = (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
        mouse.y = -(event.clientY / this.renderer.domElement.clientHeight) * 2 + 1;
        this.raycaster.setFromCamera(mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.clickObjects);

        // console.log(intersects)
        if (intersects.length > 0) {
            // 在这里填写点击代码
            const name = intersects[0].object.name;
            const pannel: HTMLElement | null = document.querySelector('.' + name);
            if (name == 'gotoblog') {
                window.location.href = '/index';
            }
            if(name=='gotofirst'){
                window.location.href = '/welcome';
            }
            if(name=='gotologin'){
                window.location.href = '/login';
            }
            if (name == 'aboutme') {
                if (pannel) {
                    pannel.style.opacity = '1';
                    pannel.style.transform = 'translateX(0)';
                }
            }

        }
    }

    // init box particle
    initBoxparticle() {
        let s = 3;

        let cube = new THREE.BoxGeometry(s, s, s);

        for (let i = 0; i < 2000; i++) {

            let material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });

            let mesh = new THREE.Mesh(cube, material);

            mesh.position.x = 800 * (2.0 * Math.random() - 1);
            mesh.position.y = 800 * (2.0 * Math.random() - 1);
            mesh.position.z = 800 * (2.0 * Math.random() - 1);

            mesh.rotation.x = Math.random() * Math.PI;
            mesh.rotation.y = Math.random() * Math.PI;
            mesh.rotation.z = Math.random() * Math.PI;

            mesh.updateMatrix();

            this.scene.add(mesh);

        }
    }

    initLight() {
        // const light = new THREE.AmbientLight(0xff8fff); // soft white light
        const light = new THREE.SpotLight(0xffffff);
        light.position.set(10, 80, 10);
        light.lookAt(this.scene.position)
        light.castShadow = true;
        this.scene.add(light);
    }

    // 设置标签
    setLabel(name: string, content: string) {
        const labelDiv = document.createElement('canvas');
        labelDiv.width = 400;
        labelDiv.height = 400;
        labelDiv.style.fontSize = "30px";
        labelDiv.style.color = "#21A9FF"
        labelDiv.className = name;
        let context = labelDiv.getContext('2d');
        if (context) {
            context.beginPath();
            context.fillStyle = "#000";
            context.fillRect(0, 78, 50, 50);
            context.closePath();

            context.beginPath()
            context.fillStyle = "#fff";
            context.font = "70px 微软雅黑";
            context.textAlign = "left";
            context.textBaseline = "middle";
            context.fillText(content, 70, 110)
        }
        // 变成精灵材质
        const canvasTexture = new THREE.CanvasTexture(labelDiv)

        const spritMaterial = new THREE.SpriteMaterial({
            map: canvasTexture
        })
        // 新增一个精灵 

        const label = new THREE.Sprite(spritMaterial);

        label.position.set(random(15), random(10), random(15));
        label.scale.set(10, 10, 1);
        label.name = name;
        // 绘制线条
        let points: THREE.Vector3[] = [];
        let geometry = new THREE.BufferGeometry();
        points.push(new THREE.Vector3(0, 0, 0));
        points.push(new THREE.Vector3(label.position.x, 0, label.position.z));
        points.push(new THREE.Vector3(label.position.x, label.position.y > 0 ? label.position.y - 2 : label.position.y + 5, label.position.z));
        geometry.setFromPoints(points)
        const material = new THREE.LineBasicMaterial({
            color: 0xffffff,
            linewidth: 10,
            linecap: 'round',
            linejoin: 'round'
        });
        let line = new THREE.Line(geometry, material);
        this.clickObjects.push(label);
        this.scene.add(label);
        this.scene.add(line);
    }
}
function random(startrange: number) {
    // 范围 -15 - -25 以及 15-25
    let flag = 0;
    if (Math.floor(Math.random()*100)%2 !=0 ) {
        flag = -1;
    } else {
        flag = 1;
    }
    const randomNum = Math.random() * flag * 10 + (flag == 1 ? startrange + Math.random() * 5 : -startrange - Math.random() * 5);
    return randomNum;
}
export default Base3d;