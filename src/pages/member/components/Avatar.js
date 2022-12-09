import styled from '../../../styles/member-scss/Member.module.scss'
import styles from '../../../styles/member-scss/MemberInfo.module.scss'

export function titleLevel(height = 0) {
  if (height > 10000) {
    return '金級玩家'
  }
  if (height > 3000) {
    return '銀級玩家'
  }
  return '銅級玩家'
}

export function avatarLevel(height = 0) {
  if (height > 10000){
    return styled.gold
  }
  if (height > 3000) {
    return styled.silver
  }
  return styled.bronze
}

export function modalAvatarLevel(height = 0) {
  if (height > 10000){
    return styles.gold
  }
  if (height > 3000) {
    return styles.silver
  }
  return styles.bronze
}
