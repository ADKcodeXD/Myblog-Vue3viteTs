import { getYhdmAnimeSearchInfo } from "@/api/YhdmApi";
import { getSiteFromBGMId } from "@/utils/bangumiData";
import { TextFilter } from "@/utils/textFilter";
import { Ref } from "vue";

export const useYhdm = (animeDetail: Bangumi.AnimeDeatilItem|null) => {
    const infoboxVal: Ref<Array<Bangumi.InfoBoxItem>> | undefined =
        inject("infoboxVal");
    // 找出谁是导演
    const eps = computed(() => {
        return animeDetail?.eps.sort((a, b) => {
            if (a.type - b.type === 0) {
                return a.sort - b.sort;
            } else {
                return a.type - b.type;
            }
        });
    });
    
    let sites: any = [];
    const yhdmList = ref<Array<YhdmSearchInfo>>([]);
    const season = ref(false);
    let keywordArr: Array<string> = [];
    const getYhdmList = async (keywords: string) => {
        if (animeDetail && animeDetail.type == 2) {
            keywords = TextFilter(keywords);
            if (keywords.indexOf(" ") != -1) {
                keywordArr = keywords.split(" ");
                let regSeason = new RegExp(
                    /[\u7b2c][\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d0-9][\u7ae0\u5b63\u8282]/
                );
                let regEngname = new RegExp(/[a-zA-Z0-9]/);
                // 优化逻辑 如果第一个词语是(剧场版 那么不使用这个剧场版作为关键词)
                if (keywordArr[0] === "剧场版") {
                    keywords = keywordArr[1];
                } else if (regSeason.test(keywordArr[1])) {
                    season.value = true;
                    console.log(keywordArr[1]);
                    keywords = keywordArr[0] + " " + keywordArr[1];
                } else if (regEngname.test(keywordArr[1])) {
                    while (keywordArr[1] && regEngname.test(keywordArr[1])) {
                        keywordArr[0] += " " + keywordArr[1];
                        keywordArr.splice(1, 1);
                    }
                    keywords = keywordArr[0];
                } else {
                    keywords = keywordArr[0];
                }
            }
            try {
                const { data } = await getYhdmAnimeSearchInfo(keywords);
                return data.data.results;
            } catch (error) {
                console.log(error);
                return null
            }
        }
    };
    if (animeDetail) {
        sites = getSiteFromBGMId(
            animeDetail?.id,
            animeDetail?.air_date
        );
        let keywords = animeDetail.name_cn
            ? animeDetail.name_cn
            : animeDetail.name;
        // 这里如果第一次搜索不到，会根据别名的第一个项去再搜索一次，再搜索不到就不在进行搜索
        getYhdmList(keywords).then((results) => {
            if (results.length > 0) {
                yhdmList.value = results;
            } else {
                let name: Bangumi.InfoBoxItem | undefined;
                let keywordsTwo: string;
                // 如果是第二季之类的 加空格和不加空格各搜索一次
                if (season.value) {
                    keywordsTwo = keywords.split(" ").join("");
                    getYhdmList(keywordsTwo).then((results) => {
                        if (results.length > 0) {
                            yhdmList.value = results;
                        } else {
                            if (infoboxVal) {
                                name = infoboxVal.value.find((item) => {
                                    return item.key === "别名";
                                });
                            }
                            if (name) {
                                if (Array.isArray(name.value)) {
                                    keywordsTwo = name.value[0].v;
                                } else {
                                    keywordsTwo = name.value;
                                }
                                getYhdmList(keywordsTwo).then((results) => {
                                    yhdmList.value = results;
                                });
                            }
                        }
                    });
                }
                if (infoboxVal) {
                    name = infoboxVal.value.find((item) => {
                        return item.key === "别名";
                    });
                }
                if (name) {
                    if (Array.isArray(name.value)) {
                        keywordsTwo = name.value[0].v;
                    } else {
                        keywordsTwo = name.value;
                    }
                    getYhdmList(keywordsTwo).then((results) => {
                        yhdmList.value = results;
                    });
                }
            }
        });
    }
    const openUrl = (url: string) => {
        window.open(url, "_blank");
    };
    const cnSite = computed(() => {
        return sites.filter((item: any) => {
            if (item && item.lang) {
                return item.lang.includes("CN");
            } else {
                return false;
            }
        });
    });
    const jpSite = computed(() => {
        return sites.filter((item: any) => {
            if (item && item.lang) {
                return item.lang.includes("JP");
            } else {
                return false;
            }
        });
    });
    const twHkSite = computed(() => {
        return sites.filter((item: any) => {
            if (item.lang && item.lang.length < 3) {
                return item.lang.includes("TW") || item.lang.includes("HK");
            } else {
                return false;
            }
        });
    });
    const otherSite = computed(() => {
        return sites.filter((item: any) => {
            if (item.lang) {
                return item.lang.length > 4;
            } else {
                return false;
            }
        });
    });

    const urlFilter = (val: string) => {
        let arr = val.split("/");
        let strarr = arr[2].split(".");
        return strarr[0];
    };

    return {
        eps,
        sites,
        cnSite,
        jpSite,
        twHkSite,
        otherSite,
        openUrl,
        yhdmList,
        urlFilter,
    }
}