import { useGlobalConfigStore } from '@/store/globalConfig'
import { isMobile } from '@/utils/mobile'

export const useEmoji = () => {
  const config = useGlobalConfigStore()
  const optionsName = {
    'Smileys & Emotion': '笑脸&表情',
    'Food & Drink': '食物&饮料',
    'People & Body': '人物&身体',
    'Animals & Nature': '动物&自然',
    'Travel & Places': '旅行&地点',
    Objects: '物品',
    Symbols: '符号',
    Flags: '旗帜',
    Activities: '活动'
  }
  const disableGroup = ['活动', '旗帜', '符号', '物品']
  const customSize = {
    'V3Emoji-width': isMobile() ? '60vw' : '25rem',
    'V3Emoji-height': isMobile() ? '20rem' : '25rem',
    'V3Emoji-fontSize': isMobile() ? '16px' : '18px',
    'V3Emoji-itemSize': isMobile() ? '24px' : '40px'
  }
  const customTheme = {
    'V3Emoji-hoverColor': config.config.hoverColor,
    'V3Emoji-activeColor': config.config.activeColor,
    'V3Emoji-shadowColor': config.config.shadowColor,
    'V3Emoji-backgroundColor': config.config.backgroundColor,
    'V3Emoji-fontColor': config.config.textColor
  }
  return {
    optionsName,
    disableGroup,
    customSize,
    customTheme
  }
}
