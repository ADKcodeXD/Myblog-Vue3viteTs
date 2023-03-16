import bangumiData from 'bangumi-data'
/**
 * "siteMeta": {
        "bangumi": {
            "title": "番组计划",
            "urlTemplate": "https://bangumi.tv/subject/{{id}}",
            "type": "info"
        },
        "acfun": {
            "title": "AcFun",
            "urlTemplate": "https://www.acfun.cn/bangumi/aa{{id}}",
            "regions": [
                "CN"
            ],
            "type": "onair"
        },
        "bilibili": {
            "title": "哔哩哔哩",
            "urlTemplate": "https://www.bilibili.com/bangumi/media/md{{id}}/",
            "regions": [
                "CN"
            ],
            "type": "onair"
        },
        "bilibili_hk_mo_tw": {
            "title": "哔哩哔哩（港澳台）",
            "urlTemplate": "https://www.bilibili.com/bangumi/media/md{{id}}/",
            "regions": [
                "HK",
                "MO",
                "TW"
            ],
            "type": "onair"
        },
        "sohu": {
            "title": "搜狐视频",
            "urlTemplate": "https://tv.sohu.com/{{id}}",
            "regions": [
                "CN"
            ],
            "type": "onair"
        },
        "youku": {
            "title": "优酷",
            "urlTemplate": "https://list.youku.com/show/id_z{{id}}.html",
            "regions": [
                "CN"
            ],
            "type": "onair"
        },
        "qq": {
            "title": "腾讯视频",
            "urlTemplate": "https://v.qq.com/detail/{{id}}.html",
            "regions": [
                "CN"
            ],
            "type": "onair"
        },
        "iqiyi": {
            "title": "爱奇艺",
            "urlTemplate": "https://www.iqiyi.com/{{id}}.html",
            "regions": [
                "CN"
            ],
            "type": "onair"
        },
        "letv": {
            "title": "乐视",
            "urlTemplate": "https://www.le.com/comic/{{id}}.html",
            "regions": [
                "CN"
            ],
            "type": "onair"
        },
        "pptv": {
            "title": "PPTV",
            "urlTemplate": "http://v.pptv.com/page/{{id}}.html",
            "regions": [
                "CN"
            ],
            "type": "onair"
        },
        "mgtv": {
            "title": "芒果tv",
            "urlTemplate": "https://www.mgtv.com/h/{{id}}.html",
            "regions": [
                "CN"
            ],
            "type": "onair"
        },
        "nicovideo": {
            "title": "Niconico",
            "urlTemplate": "https://ch.nicovideo.jp/{{id}}",
            "regions": [
                "JP"
            ],
            "type": "onair"
        },
        "netflix": {
            "title": "Netflix",
            "urlTemplate": "https://www.netflix.com/title/{{id}}",
            "type": "onair"
        },
        "gamer": {
            "title": "動畫瘋",
            "urlTemplate": "https://acg.gamer.com.tw/acgDetail.php?s={{id}}",
            "regions": [
                "TW"
            ],
            "type": "onair"
        },
        "muse_hk": {
            "title": "木棉花 HK",
            "urlTemplate": "https://www.youtube.com/playlist?list={{id}}",
            "regions": [
                "HK",
                "MO"
            ],
            "type": "onair"
        },
        "ani_one_asia": {
            "title": "Ani-One Asia",
            "urlTemplate": "https://www.youtube.com/playlist?list={{id}}",
            "regions": [
                "HK",
                "TW",
                "MO",
                "SG",
                "MY",
                "PH",
                "TH",
                "ID",
                "VN",
                "KH",
                "BD",
                "BN",
                "BT",
                "FJ",
                "FM",
                "IN",
                "KH",
                "LA",
                "LK",
                "MH",
                "MM",
                "MN",
                "MV",
                "NP",
                "NR",
                "PG",
                "PK",
                "PW",
                "SB",
                "TL",
                "TO",
                "TV",
                "VU",
                "WS"
            ],
            "type": "onair"
        },
        "viu": {
            "title": "Viu",
            "urlTemplate": "https://www.viu.com/ott/hk/zh-hk/vod/{{id}}/",
            "regions": [
                "HK",
                "SG",
                "MY",
                "IN",
                "PH",
                "TH",
                "MM",
                "BH",
                "EG",
                "JO",
                "KW",
                "OM",
                "QA",
                "SA",
                "AE",
                "ZA"
            ],
            "type": "onair"
        },
        "dmhy": {
            "title": "动漫花园",
            "urlTemplate": "https://share.dmhy.org/topics/list?keyword={{id}}",
            "type": "resource"
        }
    },
 */
export const getSiteFromBGMId = (id: number, date: string) => {
  // 通过bgmid 获取到item的信息
  // 去查找 数据按照了时间顺序排序
  // 使用二分查找
  const targetDate = new Date(date)
  let end = bangumiData.items.length
  let start = 0
  // 先找到相应年份的
  let mid = 0
  while (start < end) {
    mid = start + Math.floor((end - start) / 2)
    const itemDate = new Date(bangumiData.items[mid].begin)
    if (itemDate.getFullYear() > targetDate.getFullYear()) {
      end = mid
    } else if (itemDate.getFullYear() < targetDate.getFullYear()) {
      start = mid
    } else {
      break
    }
  }

  // 找到相对应的年份了;但是不知道此时的索引相应的月份是什么 继续遍历找到相应的月份
  let cnt = 0
  while (mid > 0 && mid < bangumiData.items.length) {
    // 部分数据并不严格按照顺序排序 这里会有bug 设置搜索次数限制
    const itemDate = new Date(bangumiData.items[mid].begin)
    if (
      itemDate.getMonth() > targetDate.getMonth() &&
      itemDate.getFullYear() == targetDate.getFullYear() &&
      cnt < 100
    ) {
      mid--
    } else if (
      itemDate.getMonth() < targetDate.getMonth() &&
      itemDate.getFullYear() == targetDate.getFullYear() &&
      cnt < 100
    ) {
      mid++
    } else {
      break
    }
    cnt++
  }
  // 此时年份月份都是正确的 开始由mid这个索引 双向遍历 直到找到对应的id对象
  let up = mid
  let down = mid
  let findItem = null
  while (up < bangumiData.items.length && down >= 0) {
    const upDate = new Date(bangumiData.items[up].begin)
    const downDate = new Date(bangumiData.items[down].begin)
    if (upDate.getMonth() === targetDate.getMonth()) {
      const bgmitem = bangumiData.items[up].sites.find((it: any) => {
        return it.site == 'bangumi'
      })
      // 由于传进来的是number类型
      if (bgmitem && bgmitem.id == id) {
        findItem = bangumiData.items[up]
        break
      }
      up++
    }

    if (downDate.getMonth() === targetDate.getMonth()) {
      const bgmitem = bangumiData.items[down].sites.find((it: any) => {
        return it.site == 'bangumi'
      })
      // 由于传进来的是number类型
      if (bgmitem && bgmitem.id == id) {
        findItem = bangumiData.items[down]
        break
      }
      down--
    }
    if (
      upDate.getMonth() !== targetDate.getMonth() &&
      downDate.getMonth() !== targetDate.getMonth()
    )
      break
  }
  // 找到后 处理id和字符串
  if (findItem) {
    const res = []
    // 返回的格式 : "[{site:'bilibili',title:'哔哩哔哩',url:'www.bilibili.com/xxxx/',lang:['CN','HK','TW','JP','OTHER']}]"
    if (findItem.sites.length == 0) {
      return []
    } else {
      for (let i = 0; i < findItem.sites.length; i++) {
        if (findItem.sites[i].site == 'bangumi') continue
        const template = bangumiData.siteMeta[findItem.sites[i].site]
        const obj = {}
        obj['title'] = template['title']
        const urlTemplate = template['urlTemplate']
        const url = urlTemplate.replace('{{id}}', findItem.sites[i].id)
        obj['url'] = url
        obj['lang'] = template['regions']
        obj['site'] = findItem.sites[i].site
        res.push(obj)
      }
      return res
    }
  } else {
    return []
  }
}
