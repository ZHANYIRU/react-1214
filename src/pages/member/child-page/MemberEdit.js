import { useState } from 'react'
import styled from '../../../styles/member-scss/MemberEdit.module.scss'

export default function MemberEdit() {

  return (
    <>
            <div className={styled.row}>
        <div className={styled.col}>
          <div className={styled.card}>
            <h3>編輯會員資料</h3>
            <div className={styled.divider}></div>
            <form>
              <div className={styled.avatar}>
                {/* <img src="" alt="avatar"></img> */}
              </div>
              <label htmlFor="avatar" className={styled.avatarLabel}> 上傳大頭貼
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  name="avatar"
                  id='avatar'
                />
              </label>

              <p>(打*號為必填欄位)</p>
              <div className={styled.formRow}>
                <label className={styled.required}>姓名</label>
                <input type="text"></input>
              </div>
              <div className={styled.formRow}>
                <label className={styled.required}>顯示名稱</label>
                <input type="text"></input>
              </div>
              <div className={styled.formRow}>
                <label htmlFor="mobile">手機號碼</label>
                <input type="text" name="mobile"></input>
              </div>
              <div className={styled.formRow}>
                <label htmlFor="email" className={styled.required}>
                  電子信箱
                </label>
                <input type="email" name="email"></input>
              </div>
              <div className={styled.formRow}>
                <label htmlFor="birthday">生日</label>
                <input type="date" name="birthday"></input>
              </div>
              <div className={styled.formRow}>
                <label htmlFor="address" className={styled.forTxtArea}>地址</label>
                <textarea
                  rows="4"
                  style={{ resize: 'none' }}
                  maxLength="120"
                ></textarea>
              </div>
              <div className={styled.formRow}>
                <label htmlFor="address" className={styled.forTxtArea}>個人簡介</label>
                <textarea
                  placeholder="(最多120字)"
                  style={{ resize: 'none' }}
                  rows="4"
                  maxLength="120"
                ></textarea>
              </div>
              {/* bonus: 驗證碼API */}
              <button>更新資料</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
