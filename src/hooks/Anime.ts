import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'

export const useAnime = () => {
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
      ease: CustomEase.create(
        'custom',
        'M0,0 C0.5,0 0.607,-0.062 0.78,0.054 0.904,0.137 0.972,0.088 1,1 '
      ),
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
      opacity: 0,
      ease: 'elastic.out(1, 0.5)',
      onComplete: done
    })
  }
  // Y轴进 下往上
  const translateYenter = (el, done) => {
    gsap.set(el, {
      y: 100,
      opacity: 0,
      position: 'absolute'
    })
    gsap.to(el, {
      duration: 0.4,
      position: 'static',
      y: 0,
      opacity: 1,
      ease: 'circ.out',
      onComplete: done
    })
  }
  // Y轴出 上往下
  const translateYleave = (el, done) => {
    gsap.set(el, {
      position: 'absolute',
      bottom: 0
    })
    gsap.to(el, {
      duration: 0.2,
      bottom: -100,
      width: '100%',
      opacity: 0,
      ease: 'power1.inOut',
      onComplete: done
    })
  }
  // list 延迟入场
  const infoXenter = (el, done) => {
    gsap.set(el, {
      x: -20,
      opacity: 0,
      position: 'absolute'
    })
    gsap.to(el, {
      opacity: 1,
      duration: 0.6,
      x: 0,
      position: 'static',
      ease: 'power1.inOut',
      delay: 0.3,
      onComplete: done
    })
  }
  // info 出场
  const infoXleave = (el, done) => {
    gsap.to(el, {
      opacity: 0,
      duration: 0.3,
      x: 30,
      ease: 'power1.inOut',
      onComplete: done
    })
  }
  return {
    rotateYenter,
    rotateYleave,
    translateXenter,
    translateXleave,
    translateYenter,
    translateYleave,
    infoXenter,
    infoXleave
  }
}
