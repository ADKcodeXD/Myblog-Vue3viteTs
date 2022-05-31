import gsap from 'gsap';
import { CustomEase } from "gsap/CustomEase";

export const useAnime=()=>{
    // Y轴进入
    const rotateYenter = (el, done) => {
        gsap.to(el, {
            duration: 1,
            rotationY: 0,
            ease: 'elastic.out(1, 0.5)',
            onComplete: done
        })
    }
    // 连续的离开
    const rotateYleave = (el, done) => {
        gsap.to(el, {
            duration: 0.6,
            rotationY: -90,
            ease: CustomEase.create("custom", "M0,0 C0.5,0 0.607,-0.062 0.78,0.054 0.904,0.137 0.972,0.088 1,1 "),
            onComplete: done
        })
    }
    // x轴进入
    const translateXenter = (el, done) => {
        gsap.to(el, {
            duration: 1,
            x: 0,
            ease: 'elastic.out(1, 0.5)',
            onComplete: done
        })
    }
    const translateXleave = (el, done) => {
        gsap.to(el, {
            duration: 0.8,
            x: -200,
            opacity:0,
            ease: 'elastic.out(1, 0.5)',
            onComplete: done
        })
    }
    return{
        rotateYenter,
        rotateYleave,
        translateXenter,
        translateXleave
    }
}
