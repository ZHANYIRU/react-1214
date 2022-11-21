export const filter_if = (proofList, genders, data, setDatas) => {
  if (
    proofList.includes('抗水（Water Resistant）') &&
    proofList.includes('防潑水（Water Repellent）') &&
    proofList.includes('防水（Waterproof）') &&
    genders === '男'
  ) {
    const a = data.filter((v, i) => {
      return v.proof === '抗水' || v.proof === '防潑水' || v.proof === '防水'
    })
    const b = a.filter((v, i) => {
      return (
        v.product_category_sid == 9 ||
        v.product_category_sid == 7 ||
        v.product_category_sid == 11
      )
    })
    console.log(b)
    setDatas(b)
  }
  // 三種屬性 + 女
  else if (
    proofList.includes('抗水（Water Resistant）') &&
    proofList.includes('防潑水（Water Repellent）') &&
    proofList.includes('防水（Waterproof）') &&
    genders === '女'
  ) {
    const a = data.filter((v, i) => {
      return v.proof === '抗水' || v.proof === '防潑水' || v.proof === '防水'
    })
    const b = a.filter((v, i) => {
      return (
        v.product_category_sid == 8 ||
        v.product_category_sid == 10 ||
        v.product_category_sid == 12
      )
    })
    console.log(a)
    console.log(b)
    setDatas(b)
  }
  // 三種屬性
  else if (
    proofList.includes('抗水（Water Resistant）') &&
    proofList.includes('防潑水（Water Repellent）') &&
    proofList.includes('防水（Waterproof）')
  ) {
    const a = data.filter((v, i) => {
      return v.proof === '抗水' || v.proof === '防潑水' || v.proof === '防水'
    })
    console.log(a)
    console.log(a)
    setDatas(a)
  }
  // 抗水+防潑水+男
  else if (
    proofList.includes('抗水（Water Resistant）') &&
    proofList.includes('防潑水（Water Repellent）') &&
    genders === '男'
  ) {
    const a = data.filter((v, i) => {
      return v.proof === '抗水' || v.proof === '防潑水'
    })
    const b = a.filter((v, i) => {
      return (
        v.product_category_sid == 9 ||
        v.product_category_sid == 7 ||
        v.product_category_sid == 11
      )
    })
    console.log(b)
    setDatas(b)
  }
  // 防水+防潑水+男
  else if (
    proofList.includes('防潑水（Water Repellent）') &&
    proofList.includes('防水（Waterproof）') &&
    genders === '男'
  ) {
    const a = data.filter((v, i) => {
      return v.proof === '防潑水' || v.proof === '防水'
    })
    const b = a.filter((v, i) => {
      return (
        v.product_category_sid == 9 ||
        v.product_category_sid == 7 ||
        v.product_category_sid == 11
      )
    })
    console.log(b)
    setDatas(b)
  }
  // 抗水+防水+男
  else if (
    proofList.includes('抗水（Water Resistant）') &&
    proofList.includes('防水（Waterproof）') &&
    genders === '男'
  ) {
    const a = data.filter((v, i) => {
      return v.proof === '抗水' || v.proof === '防水'
    })
    const b = a.filter((v, i) => {
      return (
        v.product_category_sid == 9 ||
        v.product_category_sid == 7 ||
        v.product_category_sid == 11
      )
    })
    console.log(b)
    setDatas(b)
  }
  //抗水+防潑水 +女
  else if (
    proofList.includes('抗水（Water Resistant）') &&
    proofList.includes('防潑水（Water Repellent）') &&
    genders === '女'
  ) {
    const a = data.filter((v, i) => {
      return v.proof === '抗水' || v.proof === '防潑水'
    })
    const b = a.filter((v, i) => {
      return (
        v.product_category_sid == 8 ||
        v.product_category_sid == 10 ||
        v.product_category_sid == 12
      )
    })
    console.log(b)
    setDatas(b)
  }
  //防潑水+防水 +女
  else if (
    proofList.includes('防潑水（Water Repellent）') &&
    proofList.includes('防水（Waterproof）') &&
    genders === '女'
  ) {
    const a = data.filter((v, i) => {
      return v.proof === '防潑水' || v.proof === '防水'
    })
    const b = a.filter((v, i) => {
      return (
        v.product_category_sid == 8 ||
        v.product_category_sid == 10 ||
        v.product_category_sid == 12
      )
    })
    console.log(b)
    setDatas(b)
  }
  //抗水+防水 +女
  else if (
    proofList.includes('抗水（Water Resistant）') &&
    proofList.includes('防水（Waterproof）') &&
    genders === '女'
  ) {
    const a = data.filter((v, i) => {
      return v.proof === '抗水' || v.proof === '防水'
    })
    const b = a.filter((v, i) => {
      return (
        v.product_category_sid == 8 ||
        v.product_category_sid == 10 ||
        v.product_category_sid == 12
      )
    })
    console.log(b)
    setDatas(b)
  } //抗水+防潑水
  else if (
    proofList.includes('抗水（Water Resistant）') &&
    proofList.includes('防潑水（Water Repellent）')
  ) {
    const a = data.filter((v, i) => {
      return v.proof === '抗水' || v.proof === '防潑水'
    })
    console.log(a)
    setDatas(a)
  }
  //防水+防潑水
  else if (
    proofList.includes('防水（Waterproof）') &&
    proofList.includes('防潑水（Water Repellent）')
  ) {
    const a = data.filter((v, i) => {
      return v.proof === '防水' || v.proof === '防潑水'
    })
    console.log(a)
    setDatas(a)
  }
  //防水+抗水
  else if (
    proofList.includes('防水（Waterproof）') &&
    proofList.includes('抗水（Water Resistant）')
  ) {
    const a = data.filter((v, i) => {
      return v.proof === '抗水' || v.proof === '防水'
    })
    console.log(a)
    setDatas(a)
  }
  //抗水 + 男
  else if (proofList.includes('抗水（Water Resistant）') && genders === '男') {
    const a = data.filter((v, i) => {
      return v.proof === '抗水'
    })
    const b = a.filter((v, i) => {
      return (
        v.product_category_sid == 9 ||
        v.product_category_sid == 7 ||
        v.product_category_sid == 11
      )
    })
    console.log(b)
    setDatas(b)
  }
  //防潑水 +男
  else if (
    proofList.includes('防潑水（Water Repellent）') &&
    genders === '男'
  ) {
    const a = data.filter((v, i) => {
      return v.proof === '防潑水'
    })
    const b = a.filter((v, i) => {
      return (
        v.product_category_sid == 9 ||
        v.product_category_sid == 7 ||
        v.product_category_sid == 11
      )
    })
    console.log(b)
    setDatas(b)
  }
  //防水+男
  else if (proofList.includes('防水（Waterproof）') && genders === '男') {
    const a = data.filter((v, i) => {
      return v.proof === '防水'
    })
    const b = a.filter((v, i) => {
      return (
        v.product_category_sid == 9 ||
        v.product_category_sid == 7 ||
        v.product_category_sid == 11
      )
    })
    console.log(b)
    setDatas(b)
  }
  //-------------------
  //抗水 + 女
  else if (proofList.includes('抗水（Water Resistant）') && genders === '女') {
    const a = data.filter((v, i) => {
      return v.proof === '抗水'
    })
    const b = a.filter((v, i) => {
      return (
        v.product_category_sid == 8 ||
        v.product_category_sid == 10 ||
        v.product_category_sid == 12
      )
    })
    console.log(b)
    setDatas(b)
  }
  //防潑水 +女
  else if (
    proofList.includes('防潑水（Water Repellent）') &&
    genders === '女'
  ) {
    const a = data.filter((v, i) => {
      return v.proof === '防潑水'
    })
    const b = a.filter((v, i) => {
      return (
        v.product_category_sid == 8 ||
        v.product_category_sid == 10 ||
        v.product_category_sid == 12
      )
    })
    console.log(b)
    setDatas(b)
  }
  //防水+女
  else if (proofList.includes('防水（Waterproof）') && genders === '女') {
    const a = data.filter((v, i) => {
      return v.proof === '防水'
    })
    const b = a.filter((v, i) => {
      return (
        v.product_category_sid == 8 ||
        v.product_category_sid == 10 ||
        v.product_category_sid == 12
      )
    })
    console.log(b)
    setDatas(b)
  }
  //--------------

  //抗水
  else if (proofList.includes('抗水（Water Resistant）')) {
    const a = data.filter((v, i) => {
      return v.proof === '抗水'
    })
    console.log(a)
    setDatas(a)
  }
  //防潑水
  else if (proofList.includes('防潑水（Water Repellent）')) {
    const a = data.filter((v, i) => {
      return v.proof === '防潑水'
    })
    console.log(a)
    setDatas(a)
  }
  //防水
  else if (proofList.includes('防水（Waterproof）')) {
    const a = data.filter((v, i) => {
      return v.proof === '防水'
    })
    console.log(a)
    setDatas(a)
  } else if (genders === '男') {
    const a = data.filter((v, i) => {
      return (
        v.product_category_sid == 9 ||
        v.product_category_sid == 7 ||
        v.product_category_sid == 11
      )
    })
    console.log(a)
    setDatas(a)
  } else if (genders === '女') {
    const a = data.filter((v, i) => {
      return (
        v.product_category_sid == 10 ||
        v.product_category_sid == 8 ||
        v.product_category_sid == 12
      )
    })
    console.log(a)
    setDatas(a)
  } else if (!genders) {
    setDatas(data)
    // setFromFilterDataCard(datas)
    // setFromFilterDataGender(genders)
  }

  // console.log(data)
}
