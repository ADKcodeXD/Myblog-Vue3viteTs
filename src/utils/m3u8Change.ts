import axios from 'axios'

export const transformM3u8Utils = (videoUrl: string): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    try {
      axios.get(videoUrl).then(res => {
        const blob = new Blob([res.data])
        const filereader = new FileReader()
        filereader.readAsText(blob, 'utf-8')
        filereader.onload = () => {
          const result = filereader.result as string
          const arr = result.split('\n')
          const newarr = arr.map(item => {
            if (item.startsWith('http')) {
              item = `https://adkdream.top/otherSource/${item}`
              return item
            }
            return item
          })
          const newblob = new Blob([newarr.join('\n')], { type: 'text/plain' })
          const newurl = URL.createObjectURL(newblob as Blob)
          resolve(newurl)
        }
      })
    } catch (error) {
      reject(error)
    }
  })
}
